import type { CSSProperties } from "react";

export function BotanicalSprig({ className = "", mirrored = false }: {className?: string; mirrored?: boolean}) {
  return <svg className={className} style={{ transform: mirrored ? "scaleX(-1)" : undefined }} viewBox="0 0 240 530" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M90 511C108 418 69 360 106 279c23-50 12-131 34-247" stroke="#70826b" strokeWidth="2.3"/>
    <path d="M99 457c-37-14-66-42-65-83 49 7 67 29 65 83Z" fill="#a1ab94" fillOpacity=".85" stroke="#7e917a"/>
    <path d="M107 415c38-17 61-48 60-82-43 4-61 26-60 82Z" fill="#8b9b83" fillOpacity=".78" stroke="#6f806c"/>
    <path d="M98 360c-32-11-55-36-57-74 42 6 62 30 57 74Z" fill="#a4b39b" fillOpacity=".78" stroke="#758a72"/>
    <path d="M113 320c40-10 71-41 73-82-46 2-70 30-73 82Z" fill="#85977e" fillOpacity=".72" stroke="#6c826c"/>
    <path d="M115 260c-35-16-49-39-47-78 37 13 54 39 47 78Z" fill="#9ea990" stroke="#788e73"/>
    <path d="M128 211c39-9 55-31 62-73-40 5-61 34-62 73Z" fill="#a2ad95" fillOpacity=".8" stroke="#7b8870"/>
    <path d="M131 156c-29-16-38-43-34-68 29 13 41 38 34 68Z" fill="#b2baa1" stroke="#829179"/>
    <g transform="translate(140 35)">
      <path d="M0 38C-6 7-11 6-13 0M0 38c9-24 20-31 19-46" stroke="#81846c" strokeWidth="1.5"/>
      {[0,72,144,216,288].map((angle) => <ellipse key={angle} cx="0" cy="-29" rx="14" ry="27" fill="#cc9d9f" fillOpacity=".9" stroke="#af7d86" strokeWidth=".9" transform={`rotate(${angle} 0 0)`}/>)}
      <circle cx="0" cy="0" r="10" fill="#c1a169" stroke="#8c7e50" strokeWidth="1"/>
      <circle cx="0" cy="0" r="3" fill="#6c6747"/>
    </g>
    <path d="M70 352C37 310 27 272 19 226" stroke="#80927c" strokeWidth="1.5"/>
    <g transform="translate(20 223)">
      {[0,60,120,180,240,300].map((a) => <ellipse key={a} cx="0" cy="-17" rx="7" ry="15" fill="#c7b4a0" stroke="#aa9a87" strokeWidth=".6" transform={`rotate(${a} 0 0)`}/>)}
      <circle r="7" fill="#baa477"/>
    </g>
    <path d="M114 289c11-65 42-99 74-124" stroke="#84917c" strokeWidth="1.4"/>
    <g transform="translate(187 163)">
      {[0,60,120,180,240,300].map((a) => <ellipse key={a} cx="0" cy="-18" rx="8" ry="17" fill="#b7a9c5" stroke="#9b8caa" strokeWidth=".7" transform={`rotate(${a} 0 0)`}/>)}
      <circle r="6" fill="#b3a068"/>
    </g>
  </svg>;
}

export function TinyFlower({ className = "", style }: {className?: string; style?: CSSProperties}) {
  return <svg className={className} style={style} width="48" height="48" viewBox="0 0 48 48" aria-hidden="true"><g fill="#d1a6aa" stroke="#b88991" strokeWidth=".7"><ellipse cx="24" cy="11" rx="6" ry="11"/><ellipse cx="24" cy="37" rx="6" ry="11"/><ellipse cx="11" cy="24" rx="11" ry="6"/><ellipse cx="37" cy="24" rx="11" ry="6"/><ellipse cx="15" cy="15" rx="6" ry="10" transform="rotate(-45 15 15)"/><ellipse cx="33" cy="33" rx="6" ry="10" transform="rotate(-45 33 33)"/><ellipse cx="33" cy="15" rx="6" ry="10" transform="rotate(45 33 15)"/><ellipse cx="15" cy="33" rx="6" ry="10" transform="rotate(45 15 33)"/></g><circle cx="24" cy="24" r="7" fill="#ba9964"/></svg>;
}
