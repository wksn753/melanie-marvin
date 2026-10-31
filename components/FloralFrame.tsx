/** Original layered botanical vectors: leaves, magnolia petals and white daisies.
 * Pure SVG, aria-hidden, and compositor-only motion: no canvas or network dependency.
 */
const petals = Array.from({ length: 8 }, (_, i) => i * 45);
function Daisy({ x, y, size = 1, warm = false }: { x: number; y: number; size?: number; warm?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${size})`} className="garden-bloom">
    <g fill={warm ? "#f5dcd6" : "#fffcf3"} stroke={warm ? "#c49a9b" : "#cabf9d"} strokeWidth="1">
      {petals.map(a => <ellipse key={a} cx="0" cy="-23" rx="12" ry="28" transform={`rotate(${a})`} opacity={a % 90 ? ".91" : "1"} />)}
    </g><circle r="13" fill="#d3b77d"/><circle r="7" fill="#a38b55"/><circle r="3.2" fill="#f7ecc9"/>
  </g>;
}
function Leaf({ x, y, a, scale = 1, tone = "#8b9b77" }: {x: number;y: number;a: number;scale?:number;tone?:string}) {
  return <g transform={`translate(${x} ${y}) rotate(${a}) scale(${scale})`} className="garden-leaf"><path d="M0 0 C-17 -18 -13 -45 0 -61 C16 -40 15 -18 0 0Z" fill={tone} stroke="#6f836a" strokeWidth="1.4"/><path d="M0 0V-58" stroke="#637b63" strokeWidth="1.1" opacity=".7"/></g>;
}
export function GardenCluster({ className = "" }: {className?:string}) {
  return <svg className={className} viewBox="0 0 360 520" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g className="garden-cluster-core">
      <path d="M-14 8C35 94 107 129 116 223C129 313 212 371 349 525" stroke="#829273" strokeWidth="3"/>
      <path d="M-8 200C78 216 124 268 182 372M41 48C102 74 163 131 235 232M112 231C192 176 261 181 335 180M164 349C202 292 267 294 346 302" stroke="#9ba47b" strokeWidth="2.4"/>
      <Leaf x={65} y={112} a={-62} scale={.95}/><Leaf x={87} y={167} a={60} scale={1.12} tone="#a4aa89"/>
      <Leaf x={123} y={231} a={-45} scale={1.05}/><Leaf x={140} y={288} a={70} scale={1.08} tone="#77896e"/>
      <Leaf x={187} y={365} a={-44} scale={1.18}/><Leaf x={210} y={384} a={80} scale={.92} tone="#b3b79b"/>
      <Leaf x={220} y={212} a={-41} scale={.92} tone="#a3af94"/><Leaf x={271} y={181} a={62} scale={.95} tone="#819677"/>
      <Leaf x={270} y={303} a={-43} scale={.94}/><Leaf x={309} y={309} a={65} scale={.85} tone="#a9b397"/>
      <Leaf x={62} y={232} a={-71} scale={.8}/><Leaf x={87} y={268} a={78} scale={.77} tone="#a5ac93"/>
      <Daisy x={42} y={83} size={1.22}/><Daisy x={121} y={204} size={1.14} warm/>
      <Daisy x={240} y={264} size={.87}/><Daisy x={210} y={419} size={1.35}/><Daisy x={326} y={451} size={.79} warm/>
      <Daisy x={312} y={148} size={.6}/><Daisy x={34} y={314} size={.65} warm/>
      <g fill="#dec3a1" opacity=".8">{Array.from({length:13},(_,i) => <circle key={i} cx={39+i*24} cy={290+Math.sin(i*1.7)*40} r={2.4+(i%3)} />)}</g>
    </g>
  </svg>;
}
export function FloralFrame() {
  return <div className="floral-frame" aria-hidden="true">
    <GardenCluster className="garden-corner garden-top-left"/>
    <GardenCluster className="garden-corner garden-top-right"/>
    <GardenCluster className="garden-corner garden-bottom-left"/>
    <GardenCluster className="garden-corner garden-bottom-right"/>
    <div className="garden-pollen garden-pollen-a"/><div className="garden-pollen garden-pollen-b"/><div className="garden-pollen garden-pollen-c"/>
  </div>;
}
