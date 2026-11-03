# Marvin & Melanie — V12 Photograph Frame Patch

This change affects only the first “01 / LITTLE JOYS” photograph in the story section. The real couple photograph is unchanged.

## What changed
- Replaced the full-bleed photo block with a realistic champagne-gold framed photograph
- Added layered moulding, ivory mat, inset edge, subtle glass highlight and wall shadow
- Responsive sizing for mobile and desktop, with reduced-motion support
- No additional packages; the gatefold, countdown, music and RSVP are untouched

## Apply
Extract this archive into the ROOT of the Next.js project, replacing `app/page.tsx` and `app/globals.css`.

```powershell
corepack pnpm test
corepack pnpm build

git add app/page.tsx app/globals.css
git commit -m "feat: present first couple photograph in heirloom frame"
git push origin main
```

The source is based on the earlier site with the V11 floral-corner update applied; if you have made custom changes to `app/page.tsx` or `app/globals.css` after V11, merge only the `photo-intro` JSX and `V12` CSS block instead of replacing those files wholesale.

## Verification
- Standalone Chromium preview checked at desktop 1440px and mobile 390px/320px
- Original photograph loaded at all tested sizes; no horizontal overflow
- Six RSVP unit tests pass
- Full Next.js production build not verified in this environment because package installation is blocked
