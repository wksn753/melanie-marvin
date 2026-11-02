#!/usr/bin/env python3
"""Build resolution-independent artwork; no network access or node dependencies required.
The generated public SVGs are committed, so the production build never needs Python.
"""
from pathlib import Path
import math, random
from xml.sax.saxutils import escape

ROOT=Path(__file__).resolve().parent.parent
PALETTES={
 'sage': dict(petal='#fffcf2', mid='#e7d4b6', shadow='#c7aa81',leaf='#667c58', leaf2='#a4af85', thread='#b19354', soft='#f3e9d8'),
 'rose': dict(petal='#f4c8c9', mid='#d79b9d', shadow='#a36a77',leaf='#667861', leaf2='#a6ad8d', thread='#b18b62', soft='#f6e8e0'),
 'lavender': dict(petal='#dfcce9', mid='#b399d1', shadow='#85709e',leaf='#697a66', leaf2='#a7af9b', thread='#ad956e', soft='#f3ebed'),
}

def defs(p):
  return f'''<defs>
<radialGradient id="paper" cx="52%" cy="40%" r="78%"><stop stop-color="#fff9ef"/><stop offset=".6" stop-color="#f4e9d7"/><stop offset="1" stop-color="#e7d9c3"/></radialGradient>
<linearGradient id="petal" x1=".2" y1="0" x2=".95" y2="1"><stop stop-color="#fffef8"/><stop offset=".27" stop-color="{p['petal']}"/><stop offset=".62" stop-color="{p['mid']}"/><stop offset="1" stop-color="{p['shadow']}"/></linearGradient>
<radialGradient id="bud"><stop stop-color="#fffef5"/><stop offset=".50" stop-color="{p['petal']}"/><stop offset=".95" stop-color="{p['shadow']}"/></radialGradient>
<linearGradient id="leaf" x1="0" y1="0" x2=".9" y2="1"><stop stop-color="{p['leaf2']}"/><stop offset=".42" stop-color="{p['leaf']}"/><stop offset="1" stop-color="#394e3f"/></linearGradient>
<linearGradient id="gold"><stop stop-color="#fff2ba"/><stop offset=".45" stop-color="{p['thread']}"/><stop offset="1" stop-color="#8f7147"/></linearGradient>
<linearGradient id="ribbon" x1="0" y1="0" x2=".85" y2="1"><stop stop-color="#fffefa"/><stop offset=".23" stop-color="#f3ede2"/><stop offset=".55" stop-color="#e2d4c0"/><stop offset=".72" stop-color="#fffbf1"/><stop offset="1" stop-color="#c7b69a"/></linearGradient>
<pattern id="linen" width="9" height="9" patternUnits="userSpaceOnUse"><path d="M0 0V9 M3 0V9 M6 0V9 M0 1H9 M0 4H9 M0 7H9" stroke="#967c58" stroke-opacity=".075" stroke-width=".6"/><path d="M1 0V9M0 5H9" stroke="#fff" stroke-opacity=".30" stroke-width=".55"/></pattern>
<filter id="emboss" x="-30%" y="-30%" width="160%" height="170%"><feGaussianBlur in="SourceAlpha" stdDeviation="2.4" result="blur"/><feOffset in="blur" dy="3" dx="1" result="shift"/><feComponentTransfer in="shift" result="shade"><feFuncA type="linear" slope=".23"/></feComponentTransfer><feMerge><feMergeNode in="shade"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="subtleShadow" x="-30%" y="-40%" width="160%" height="180%"><feDropShadow dx="1" dy="3" stdDeviation="2.5" flood-color="#4a3929" flood-opacity=".29"/></filter>
</defs>'''

def rose(x,y,r,p,rot=0):
 out=[f'<g transform="translate({x:.1f} {y:.1f}) rotate({rot:.1f})" filter="url(#emboss)">']
 # many petal layers with visible stitches, folds and gold edging
 for ring,count,distance,scale in [(0,9,r*.60,.68),(1,7,r*.37,.48),(2,5,r*.16,.29)]:
  for i in range(count):
   a=i*360/count+ring*13
   out.append(f'<g transform="rotate({a:.2f}) translate(0 {-distance:.1f}) scale({scale:.3f})">'
              '<path d="M 0 40 C-36 22-60-25-26-57 C-9-73 16-70 30-48 C57-5 26 30 0 40Z" fill="url(#petal)" stroke="url(#gold)" stroke-width="1.25"/>'
              '<path d="M-19-41 C-14-17-11 6 0 33 M-10-51 C6-33 17-12 7 18" fill="none" stroke="#fff9e8" stroke-width="2" opacity=".65"/>'
              '<path d="M-22-51 Q0-68 25-47" fill="none" stroke="#9b805e" stroke-width="1" opacity=".35"/></g>')
 out.append(f'<circle r="{r*.10:.1f}" fill="url(#gold)" stroke="#fff3cc" stroke-width="1"/>')
 out.append(f'<path d="M{-r*.15:.1f} {-r*.02:.1f}q{r*.22:.1f} {-r*.13:.1f} {r*.28:.1f} {r*.02:.1f}q{-r*.13:.1f} {r*.15:.1f} {-r*.20:.1f} 0" fill="none" stroke="#997444" stroke-width="2"/>')
 out.append('</g>')
 return ''.join(out)

def daisy(x,y,r,p,rot=0):
 out=[f'<g transform="translate({x:.1f} {y:.1f}) rotate({rot})" filter="url(#subtleShadow)">']
 for i in range(11):
  out.append(f'<g transform="rotate({i*360/11:.1f})"><path d="M0 {-r*.1:.1f} C{-r*.26:.1f} {-r*.50:.1f} {-r*.24:.1f} {-r*1.2:.1f} 0 {-r*1.18:.1f} C{r*.25:.1f} {-r*1.2:.1f} {r*.28:.1f} {-r*.45:.1f} 0 {-r*.1:.1f}Z" fill="url(#petal)" stroke="#bba689" stroke-width=".85"/><path d="M0 {-r*.3:.1f} V{-r*.98:.1f}" stroke="#fff" stroke-width="1.6" opacity=".7"/></g>')
 out.append(f'<circle r="{r*.27:.1f}" fill="url(#gold)" stroke="#fff5cd" stroke-width="1.7"/>')
 rng=random.Random(x*7+y)
 for i in range(14):
  a=i*math.pi/7
  out.append(f'<circle cx="{r*.18*math.cos(a):.1f}" cy="{r*.18*math.sin(a):.1f}" r="1.1" fill="#ffe9a5"/>')
 out.append('</g>')
 return ''.join(out)

def leaf(x,y,angle,size,p):
 # stem anchored at 0, pointed end along -y
 return f'''<g transform="translate({x:.1f} {y:.1f}) rotate({angle:.1f}) scale({size/68:.3f})" filter="url(#subtleShadow)">
<path d="M0 0 C-40-20-32-52 0-77 C29-48 35-18 0 0Z" fill="url(#leaf)" stroke="#465b45" stroke-width="1.5"/>
<path d="M0 0L0-71 M0-20L-17-43 M0-28L17-48 M0-44L-13-58" stroke="#e7e3bd" stroke-width="1.35" fill="none" opacity=".76"/>
<path d="M-7-8C-31-29-22-52-1-69" stroke="#dbe3c9" stroke-width="2" opacity=".36" fill="none"/>
</g>'''

def twigs(x,y,scale,p,seed=1,orientation=1):
 random.seed(seed)
 out=[f'<g transform="translate({x} {y}) scale({orientation*scale} {scale})">']
 out.append('<path d="M0 0 C42 14 92 39 160 32 Q220 27 270 78 M145 34 Q190-10 230-22 M74 22 Q90-23 100-48 M204 58 Q238 38 277 37" stroke="url(#gold)" stroke-width="3.3" fill="none"/>')
 for i in range(13):
  d=i/12
  px=16+d*255
  py=8+36*d+8*math.sin(d*math.pi*2)
  a=(-25 if i%2 else 28)
  out.append(leaf(px,py,a,25+8*(i%3),p))
  if i%3==0:
   out.append(f'<circle cx="{px:.1f}" cy="{py-38:.1f}" r="{6+i%3}" fill="url(#bud)" stroke="url(#gold)" stroke-width="1.3"/>')
 out.append('</g>')
 return ''.join(out)

def bouquet(x,y,s,p,seed=1):
 out=[f'<g transform="translate({x:.2f} {y:.2f}) scale({s:.3f})">']
 out.append(twigs(-36,38,1.03,p,seed,1))
 out.append(twigs(20,65,.62,p,seed+1,-1))
 for xx,yy,a,ss in [(-80,45,-48,88),(-20,-62,-13,75),(59,5,45,78),(10,95,155,62),(-116,5,-76,56),(128,-26,62,56),(-28,130,145,66)]:
  out.append(leaf(xx,yy,a,ss,p))
 out.append(rose(0,0,105,p,seed*9))
 out.append(daisy(-107,112,31,p,11))
 out.append(daisy(128,95,28,p,23))
 out.append(daisy(-96,-106,24,p,-15))
 for xx,yy in [(-141,-44),(-166,78),(165,27),(140,-71),(-56,163),(104,160)]:
  out.append(f'<circle cx="{xx}" cy="{yy}" r="7" fill="url(#bud)" stroke="url(#gold)" stroke-width="2"/>')
 out.append('</g>')
 return ''.join(out)

def svg(width,height,p,body,transparent=False):
 return f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-label="">{defs(p)}{body}</svg>'''

def door_asset(w,h,p):
 # Entire viewport motif generated as VECTOR — never scaled from an underlying bitmap.
 is_portrait=h>w
 bg=f'<rect width="{w}" height="{h}" fill="url(#paper)"/><rect width="{w}" height="{h}" fill="url(#linen)" opacity=".8"/>'
 cx=w/2
 bg+=f'<path d="M{cx-4} 0V{h}H{cx+4}V0Z" fill="#ad9172" opacity=".28"/><path d="M{cx-1} 0V{h}" stroke="#594732" stroke-width="2" opacity=".32"/><path d="M{cx+6} 0V{h}" stroke="#fff" stroke-width="2" opacity=".6"/>'
 if is_portrait:
  # proportions keep decoration OUTSIDE the central ribbon area
  base=w/1600
  # drawing at w=900/h=1600, bouquets intentionally ornate near upper edges
  bg+=bouquet(120,175,1.42,p,1)+f'<g transform="translate({w} 0) scale(-1 1)">'+bouquet(120,175,1.42,p,1)+'</g>'
  bg+=bouquet(95,h-230,.88,p,4)+f'<g transform="translate({w} 0) scale(-1 1)">'+bouquet(95,h-230,.88,p,4)+'</g>'
  bg+=f'<rect x="4" y="5" width="{w-8}" height="{h-10}" fill="none" stroke="#cfba91" stroke-opacity=".36" stroke-width="2"/>'
 else:
  bg+=bouquet(195,210,1.78,p,1)+f'<g transform="translate({w} 0) scale(-1 1)">'+bouquet(195,210,1.78,p,1)+'</g>'
  bg+=bouquet(148,h-150,1.05,p,4)+f'<g transform="translate({w} 0) scale(-1 1)">'+bouquet(148,h-150,1.05,p,4)+'</g>'
  bg+=f'<rect x="5" y="5" width="{w-10}" height="{h-10}" fill="none" stroke="#cfba91" stroke-opacity=".33" stroke-width="3"/>'
 return svg(w,h,p,bg)

def bow_asset(w,h,p):
 x=w/2;y=h*.52
 sc=min(w/1600,h/900)*1.05 if w>h else w/900*1.18
 # center bow at seam. Controlled 3D folds with vector gradient
 g=f'''<g transform="translate({x:.2f} {y:.2f}) scale({sc:.3f})" filter="url(#subtleShadow)">
<path d="M -27 15 C-58 110 -105 202 -175 296 L-245 271 C-185 161 -160 77 -116 8Z" fill="url(#ribbon)" stroke="#dcc9ad" stroke-width="2"/>
<path d="M 21 10 C45 109 113 206 181 290 L258 250 C187 154 163 65 120 -7Z" fill="url(#ribbon)" stroke="#dcc9ad" stroke-width="2"/>
<path d="M-28-5 C-145 -85 -249-107 -295-60 C-325 -21 -238 39 -115 50 C-64 46 -46 26 -28-5Z" fill="url(#ribbon)" stroke="#e0d1bb" stroke-width="2.2"/>
<path d="M27-5 C154 -98 249-114 299-56 C329-12 234 42 111 50 C62 48 44 26 27-5Z" fill="url(#ribbon)" stroke="#e0d1bb" stroke-width="2.2"/>
<path d="M-35-2 C-120-64 -233-67 -289-57 M34-4 C133-72 234-77 296-55" stroke="#fffef9" stroke-width="10" opacity=".64" fill="none"/>
<path d="M-132 18 C-206-7 -266-27 -291-58 M121 18 C191-7 264-30 296-55" stroke="#bca88d" stroke-width="4" opacity=".46" fill="none"/>
<path d="M-105 79 C-131 159-159 232-228 265 M110 79 C131 167 173 224 238 257" stroke="#fffef8" stroke-width="7" opacity=".58" fill="none"/>
<path d="M-44-43 C-25-55 24-53 42-35 C49-11 50 27 27 49 C8 56-26 52-42 34 C-53 12 -52-20 -44-43Z" fill="url(#ribbon)" stroke="#d1bca1" stroke-width="2"/>
<path d="M-34-37C-41-16-41 15-28 39 M-4-43 C-7-15-4 15 2 44 M27-41C34-14 36 19 20 43" stroke="#fffcf4" stroke-width="5" opacity=".6" fill="none"/>
</g>'''
 return svg(w,h,p,g,True)

def corner_asset(which,p):
 w=h=760
 # use different deterministic cluster/arrangements for corner and gentle mirroring
 flip_x='right' in which; flip_y='bottom' in which
 body='<g'+(f' transform="translate({w if flip_x else 0} {h if flip_y else 0}) scale({-1 if flip_x else 1} {-1 if flip_y else 1})"' if flip_x or flip_y else '')+'>'
 body+=bouquet(115,115,.83,p,seed=2)
 body+=twigs(-15,156,1.45,p,seed=8,orientation=1)
 body+=twigs(64,-10,1.2,p,seed=14,orientation=1)
 body+=leaf(230,230,72,94,p)+leaf(270,122,34,85,p)
 body+='</g>'
 return svg(w,h,p,body,True)

for name,p in PALETTES.items():
 out=ROOT/'public'/'art'/name;out.mkdir(parents=True,exist_ok=True)
 for mode,w,h in [('desktop',2560,1440),('mobile',1170,2535)]:
  (out/f'doors-{mode}.svg').write_text(door_asset(w,h,p),encoding='utf-8')
  (out/f'bow-{mode}.svg').write_text(bow_asset(w,h,p),encoding='utf-8')
# Hero accents use sage palette and intrinsic 760px vector artwork.
out=ROOT/'public'/'botanicals'
for pos in ['top-left','top-right','bottom-left','bottom-right']:
 (out/f'{pos}.svg').write_text(corner_asset(pos,PALETTES['sage']),encoding='utf-8')
print('Generated 16 infinitely sharp SVG assets')
