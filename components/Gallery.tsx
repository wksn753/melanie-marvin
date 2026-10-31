"use client";

import { useState } from "react";
import Image from "next/image";
import { wedding } from "@/config/wedding";
import { TinyFlower } from "./Botanicals";

function ImageSlot({src, alt, caption, shape, index}: {src: string; alt: string; caption: string; shape: string; index: number}) {
  const [broken, setBroken] = useState(false);
  return <div className={`gallery-item gallery-${shape}`} data-reveal="up" data-reveal-delay={String(index % 3)}>
    <div className={`gallery-image gallery-image-${index}`}>
      {!broken && <Image src={src} alt={alt} width={900} height={1200} unoptimized sizes="(max-width: 680px) 50vw, 33vw" onError={() => setBroken(true)}/>}
      {broken && <div className="photo-placeholder"><TinyFlower/><span>your favorite<br/>photograph</span><small>PHOTO {String(index + 1).padStart(2, '0')}</small></div>}
    </div><p>{caption}</p>
  </div>;
}

export function Gallery() {
  return <div className="gallery-grid">{wedding.gallery.map((photo, i) => <ImageSlot key={photo.src} {...photo} index={i}/>)}</div>;
}
