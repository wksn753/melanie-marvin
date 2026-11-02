/**
 * pnpm art:build
 * Build responsive gatefold texture assets from original generated art.
 * Each bow source is an RGBA PNG, with no background. Everything is local.
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const THEMES = ['sage', 'rose', 'lavender'];
const MIRROR = true; // symmetric embroidery with a perfectly straight center seam
const SIZES = {
  mobile: { w: 1170, h: 2535, bow: { width: 1130, cy: 0.53 } },
  desktop: { w: 2560, h: 1440, bow: { height: 870, cy: 0.53 } },
};

async function buildDoors(source, { w, h }, destination) {
  let img = await sharp(source).resize(w, h, { fit: 'fill', kernel: 'lanczos3' }).sharpen().png().toBuffer();
  if (MIRROR) {
    const left = await sharp(img).extract({ left: 0, top: 0, width: w / 2, height: h }).toBuffer();
    const right = await sharp(left).flop().toBuffer();
    img = await sharp({ create: { width: w, height: h, channels: 4, background: '#f2e9d9' } })
      .composite([{ input: left, top: 0, left: 0 }, { input: right, top: 0, left: w / 2 }]).png().toBuffer();
  }
  await sharp(img).webp({ quality: 85, effort: 5 }).toFile(destination);
}

async function buildBow(source, { w, h, bow }, destination) {
  const scaled = await sharp(source).resize(bow.width ? { width: bow.width } : { height: bow.height }).png().toBuffer();
  const info = await sharp(scaled).metadata();
  const left = Math.round((w - info.width) / 2);
  const top = Math.round(bow.cy * h - info.height / 2);
  if (left < 0 || top < 0 || top + info.height > h) throw new Error(`Bow outside canvas ${destination}`);
  await sharp({ create: { width: w, height: h, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: scaled, left, top }])
    .webp({ quality: 90, alphaQuality: 100, effort: 5 })
    .toFile(destination);
}

await fs.mkdir('public/art', { recursive: true });
await sharp('raw/linen.png').resize(512, 512).webp({ quality: 82 }).toFile('public/art/linen.webp');
for (const theme of THEMES) {
  await fs.mkdir(path.join('public/art', theme), { recursive: true });
  for (const [orientation, size] of Object.entries(SIZES)) {
    await buildDoors(`raw/${theme}/doors-${orientation}.png`, size, `public/art/${theme}/doors-${orientation}.webp`);
    await buildBow(`raw/${theme}/bow.png`, size, `public/art/${theme}/bow-${orientation}.webp`);
  }
  console.log(`Ready: ${theme} (mobile + desktop)`);
}
