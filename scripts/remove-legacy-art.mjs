/** Remove only the obsolete V6 low-resolution gatefold and corner raster artwork. */
import { rmSync, existsSync } from 'node:fs';
const list = ['top-left','top-right','bottom-left','bottom-right'].map(x => `public/botanicals/${x}.webp`);
for(const theme of ['sage','rose','lavender']) for(const part of ['doors','bow']) for(const size of ['desktop','mobile']) list.push(`public/art/${theme}/${part}-${size}.webp`);
let removed=0;
for(const p of list) {if(existsSync(p)){rmSync(p);removed++;console.log('removed',p)}}
console.log(`Removed ${removed} old low-resolution artwork file(s).`);
