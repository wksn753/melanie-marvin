import Image from "next/image";
import { wedding } from "@/config/wedding";

/** A small two-scene editorial interlude, not a wall of thumbnails. */
export function Gallery() {
  return <div className="story-gallery">
    {wedding.gallery.map((photo, i) => <figure
      className={`story-gallery-frame story-gallery-${photo.shape}`}
      key={photo.src}
      data-reveal={i === 0 ? "left" : "right"}
    >
      <div className="story-gallery-photo">
        <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 90vw, 48vw" />
      </div>
      <figcaption><span>{String(i + 3).padStart(2, "0")} / OUR LITTLE MOMENTS</span><em>{photo.caption}</em></figcaption>
    </figure>)}
  </div>;
}
