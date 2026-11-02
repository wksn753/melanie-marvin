// V7: committed resolution-independent SVGs replace the older low-resolution raster pipeline.
// Validate the files without changing them. No native dependencies or internet needed.
import { existsSync, statSync } from 'node:fs';
const themes = ['sage','rose','lavender'];
const assets = ['/botanicals/top-left.svg','/botanicals/top-right.svg','/botanicals/bottom-left.svg','/botanicals/bottom-right.svg'];
for (const theme of themes) for (const mode of ['desktop','mobile']) {
  assets.push(`/art/${theme}/doors-${mode}.svg`, `/art/${theme}/bow-${mode}.webp`);
}
for (const asset of assets) {
  const filename = `public${asset}`;
  if (!existsSync(filename) || statSync(filename).size < 1000) {
    console.error(`Missing or invalid artwork: ${filename}`);
    process.exitCode = 1;
  }
}
if (!process.exitCode) console.log(`All ${assets.length} gatefold and botanical assets are present.`);
