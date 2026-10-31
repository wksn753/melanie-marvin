"use client";

import { useState } from "react";
import Image from "next/image";
import { wedding } from "@/config/wedding";
import { BotanicalSprig, TinyFlower } from "./Botanicals";

/** No generic mock images or 404s while the couple's portraits are being chosen. */
function BotanicalInterlude() {
  return <div className="gallery-interlude" data-reveal="up">
    <div className="gallery-garden" aria-hidden="true">
      <BotanicalSprig className="gallery-garden-left" />
      <BotanicalSprig className="gallery-garden-right" mirrored />
      <div className="gallery-garden-ring"><TinyFlower/><span>M <i>&</i> M</span><small>AN ALBUM OF US</small></div>
    </div>
    <div className="gallery-interlude-copy">
      <p className="eyebrow">MOMENTS MADE TO LAST</p>
      <h3>Some memories are<br/><em>still becoming.</em></h3>
      <p>Photographs of Marvin and Melanie will find their home here soon.</p>
    </div>
  </div>;
}

function ImageSlot({src, alt, caption, shape, index}: {src: string; alt: string; caption: string; shape: string; index: number}) {
  const [broken, setBroken] = useState(false);
  if (broken) return null;
  return <figure className={`gallery-item gallery-${shape}`} data-reveal="up" data-reveal-delay={String(index % 3)}>
    <div className={`gallery-image gallery-image-${index}`}>
      <Image src={src} alt={alt} width={1280} height={854} sizes="(max-width: 680px) 50vw, 33vw" onError={() => setBroken(true)} />
    </div>
    <figcaption>{caption}</figcaption>
  </figure>;
}

export function Gallery() {
  if (wedding.gallery.length === 0) return <BotanicalInterlude/>;
  return <div className="gallery-grid">{wedding.gallery.map((photo, i) => <ImageSlot key={`${photo.src}-${i}`} {...photo} index={i}/>)}</div>;
}
