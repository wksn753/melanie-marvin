import Image from 'next/image';
/** Realistic painterly botanicals, extracted from the wedding illustration assets.
 * These transparent corner images replace the flat vector flowers. */
const corners = ['top-left','top-right','bottom-left','bottom-right'] as const;
export function FloralFrame() {
  return <div className="floral-frame floral-frame-painted" aria-hidden="true">
    {corners.map(corner=><div className={`floral-corner floral-${corner}`} key={corner}>
      <Image src={`/botanicals/${corner}.webp`} alt="" fill sizes="(max-width:640px) 42vw, 250px" className="floral-watercolor" priority={corner==='top-left'||corner==='top-right'} />
    </div>)}
  </div>;
}
