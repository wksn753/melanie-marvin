import type { SVGProps } from 'react';

type IconName = 'arrow-up-right' | 'arrow-right' | 'arrow-down' | 'arrow-up' | 'music' | 'chevron-down' | 'flower' | 'heart' | 'pause' | 'play' | 'volume-off' | 'check' | 'calendar' | 'map-pin' | 'church' | 'party';
export function Icon({name, size=18, ...props}: SVGProps<SVGSVGElement> & {name: IconName;size?:number}) {
  const common = {xmlns:'http://www.w3.org/2000/svg',width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.65,strokeLinecap:'round' as const,strokeLinejoin:'round' as const,'aria-hidden':true as const,...props};
  switch(name){
    case 'arrow-up-right': return <svg {...common}><path d="M7 17 17 7M8 7h9v9"/></svg>;
    case 'arrow-right': return <svg {...common}><path d="M5 12h14m-7-7 7 7-7 7"/></svg>;
    case 'arrow-down': return <svg {...common}><path d="M12 5v14m-7-7 7 7 7-7"/></svg>;
    case 'arrow-up': return <svg {...common}><path d="M12 19V5m-7 7 7-7 7 7"/></svg>;
    case 'music': return <svg {...common}><path d="M9 18V5l11-2v13"/><ellipse cx="6" cy="18" rx="3" ry="2"/><ellipse cx="17" cy="16" rx="3" ry="2"/></svg>;
    case 'chevron-down':return <svg {...common}><path d="m6 9 6 6 6-6"/></svg>;
    case 'flower':return <svg {...common}><path d="M12 12c-4-3-6-7-3-9 3-2 6 2 3 9Zm0 0c3-4 7-6 9-3 2 3-2 6-9 3Zm0 0c4 3 6 7 3 9-3 2-6-2-3-9Zm0 0c-3 4-7 6-9 3-2-3 2-6 9-3Z"/><circle cx="12" cy="12" r="1.5"/></svg>;
    case 'heart':return <svg {...common}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>;
    case 'pause':return <svg {...common}><path d="M9 5v14M15 5v14"/></svg>;
    case 'play':return <svg {...common}><path d="m8 5 11 7-11 7Z"/></svg>;
    case 'volume-off':return <svg {...common}><path d="M11 5 6 9H3v6h3l5 4V5ZM17 9l5 6m0-6-5 6"/></svg>;
    case 'check':return <svg {...common}><path d="m5 12 4 4L19 6"/></svg>;
    case 'calendar':return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/></svg>;
    case 'church':return <svg {...common}><path d="M12 2v6m-3-3h6M5 22V10l7-5 7 5v12M3 22h18M9 22v-8h6v8M5 12h14"/></svg>;
    case 'party':return <svg {...common}><path d="m3 21 9-3-6-6-3 9Zm3-9 6 6M14 4l.5 2M20 9l-2 .5M16 12l2 2M18 4l2-2M11 8l2-2"/></svg>;
    case 'map-pin':return <svg {...common}><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.4"/></svg>;
  }
}
