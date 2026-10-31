/** Decorative, lightweight SVG blossoms layered over the invitation artwork.
 * They animate with CSS only; no timers, layout shifts, canvas or remote assets.
 */
function Blossom({ className }: { className: string }) {
  return <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <g className="blossom-petals" fill="#fff9eb" stroke="#c8b693" strokeWidth="1">
      <ellipse cx="32" cy="17" rx="8.4" ry="14" />
      <ellipse cx="32" cy="47" rx="8.4" ry="14" />
      <ellipse cx="17" cy="32" rx="14" ry="8.4" />
      <ellipse cx="47" cy="32" rx="14" ry="8.4" />
      <ellipse cx="21.4" cy="21.4" rx="8.4" ry="13" transform="rotate(-45 21.4 21.4)" />
      <ellipse cx="42.6" cy="42.6" rx="8.4" ry="13" transform="rotate(-45 42.6 42.6)" />
      <ellipse cx="42.6" cy="21.4" rx="8.4" ry="13" transform="rotate(45 42.6 21.4)" />
      <ellipse cx="21.4" cy="42.6" rx="8.4" ry="13" transform="rotate(45 21.4 42.6)" />
    </g>
    <circle cx="32" cy="32" r="8" fill="#d1b37b" stroke="#9f875d" strokeWidth="1" />
    <circle cx="32" cy="32" r="3" fill="#faeed4" />
  </svg>;
}

export function LivingEmbroidery({ side }: { side: "left" | "right" }) {
  return <span className={`living-embroidery living-embroidery-${side}`} aria-hidden="true">
    <Blossom className="embroidered-flower embroidered-flower-top" />
    <Blossom className="embroidered-flower embroidered-flower-middle" />
    <Blossom className="embroidered-flower embroidered-flower-bottom" />
    <span className="embroidered-leaf leaf-one" />
    <span className="embroidered-leaf leaf-two" />
  </span>;
}

const petals = ["one", "two", "three", "four", "five", "six"] as const;

export function FallingPetals() {
  return <span className="floating-petals" aria-hidden="true">
    {petals.map((petal) => <span className={`floating-petal floating-petal-${petal}`} key={petal} />)}
  </span>;
}
