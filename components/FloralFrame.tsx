import Image from "next/image";

/**
 * V11: high-detail embroidered botanical corners lifted from the same approved
 * linen artwork as the gatefold. Transparent WebP files retain the original
 * flower/leaf texture, with the paper lifted away at the edges.
 *
 * Decorative images are excluded from screen readers. Keep their dimensions
 * independent to prevent the stretched, flat look of the previous assets.
 */
const corners = ["top-left", "top-right", "bottom-left", "bottom-right"] as const;

export function FloralFrame() {
  return (
    <div className="floral-frame floral-frame-painted" aria-hidden="true">
      {corners.map((corner) => (
        <div className={`floral-corner floral-${corner}`} key={corner}>
          <Image
            src={`/botanicals/${corner}-v11.webp`}
            alt=""
            fill
            sizes="(max-width: 680px) 43vw, (max-width: 1200px) 28vw, 425px"
            quality={95}
            unoptimized
            className="floral-watercolor"
            priority={corner === "top-left" || corner === "top-right"}
          />
        </div>
      ))}
    </div>
  );
}
