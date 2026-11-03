"""Extract edge-faded floral corners from the approved high-resolution V10 gatefold artwork.
The original is already shipped with the site. No external downloads.
"""
from PIL import Image,ImageFilter
import numpy as np
from pathlib import Path

src=Image.open(Path(__file__).parent.parent / 'public/art/sage/doors-desktop-v10.webp').convert('RGB')
out=Path(__file__).parent.parent/'public/botanicals'
out.mkdir(exist_ok=True,parents=True)
# crops tuned to avoid the satin ribbon; keep embroidery intact
rects={
    'top-left':(0,0,610,700),
    'top-right':(1950,0,2560,700),
    'bottom-left':(0,1000,590,1440),
    'bottom-right':(1970,1000,2560,1440),
}
for name, box in rects.items():
    im=src.crop(box).convert('RGB')
    w,h=im.size
    raw=np.asarray(im).astype('float32')
    # Estimate linen color from a mostly undecorated edge patch. The extracted
    # embroidery remains photorealistic; only the plain linen substrate is lifted.
    if 'left' in name: blank=raw[int(h*.58):int(h*.88),int(w*.76):int(w*.98)]
    else: blank=raw[int(h*.58):int(h*.88),int(w*.02):int(w*.24)]
    bg=np.median(blank.reshape(-1,3),axis=0)
    # Far-away neutral paper should be transparent. Include ivory petals by
    # considering brightness relative to the linen (not just saturation).
    dif=raw-bg
    dark=np.maximum(0, -dif).max(axis=2)
    bright=np.maximum(0,dif).max(axis=2)
    chroma=np.max(raw,axis=2)-np.min(raw,axis=2)
    alpha=np.maximum((dark-11)/24, (bright-11)/18)
    alpha=np.clip(alpha,0,1)
    # Prevent linen grain noise on the light background.
    alpha=(alpha**.82)
    # Fade only toward the center of the invitation; flowers are concentrated
    # toward the outer corner. Avoid a rigid box-shaped edge.
    yy,xx=np.mgrid[0:h,0:w]
    if 'left' in name: dx=xx/w
    else: dx=(w-1-xx)/w
    if 'top' in name: dy=yy/h
    else: dy=(h-1-yy)/h
    fx=np.clip((.97-dx)/.28,0,1)
    fy=np.clip((.99-dy)/.26,0,1)
    fade=(fx*fx*(3-2*fx))*(fy*fy*(3-2*fy))
    # Keep petal interiors fully opaque, but let neutral shadows dissolve.
    mask=np.uint8(np.clip(alpha*fade,0,1)*255)
    mask=Image.fromarray(mask,'L').filter(ImageFilter.GaussianBlur(1.25))
    rgba=Image.merge('RGBA',(*im.split(),mask))
    # Keep a pristine lossless alpha master and web-optimized derivative.
    rgba.save(out/f'{name}-v11.png',optimize=True)
    rgba.save(out/f'{name}-v11.webp',format='WEBP',quality=96,method=6)
    print(name,w,h,'linen',bg.round(1),'size KB',round((out/f'{name}-v11.webp').stat().st_size/1024))
