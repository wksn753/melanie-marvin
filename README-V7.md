# Marvin & Melanie — V7 artwork and music patch

## Design intent
Keep the existing OurYesDay-inspired wedding website, its original gatefold interaction, five real photographs, date **1 May 2027**, ceremony at **All Saints Cathedral, Nakasero**, and reception at **Naguru Gardens**.

The previous gatefold used source files of only 713×304 (desktop) and 204×301 (mobile), causing enlarged artwork to look soft. V7 replaces the four hero botanicals, twelve gatefold/bow images (3 themes × 2 sizes × 2 layers) with resolution-independent SVG artwork. The new illustrations are **crisp vector redraws rather than photographic upscales**; the embroidery-like style is retained, but they are not identical to the original photographic artwork.

## Installation into the existing GitHub checkout

The **V7-PATCH ZIP** is meant to be **merged** into your existing `wksn753/melanie-marvin` checkout, preserving your current working `pnpm-lock.yaml` and existing `.git` folder. Do not delete either file/folder. The patch does not add or modify package dependencies. It keeps `package.json` version at the existing 6.0.0 for lockfile parity.

1. Unzip the patch contents at the root of your existing project, allowing overwrites. New SVGs go in `public/art` and `public/botanicals`; components in `components/`.
2. Run `node scripts/remove-legacy-art.mjs` once to remove the old gatefold and corner raster files. This deletes only the allowlisted V6 files, which are no longer referenced.
3. Check the committed `pnpm-workspace.yaml` and retain any other preexisting allow/deny rules while ensuring `sharp: true` remains authorized.
4. In PowerShell:
   ```powershell
   node scripts/remove-legacy-art.mjs
   corepack pnpm install --frozen-lockfile
   corepack pnpm art:build
   corepack pnpm test
   corepack pnpm build
   git add components app public scripts pnpm-workspace.yaml
   git commit -m "feat: sharp vector wedding artwork and opening music"
   git push origin main
   ```
5. Vercel deploys the push. If a new lockfile error appears, check that the original `pnpm-lock.yaml` remained intact.

## Audio
The included **Garden Waltz** is a looping 25-second original instrumental demo, not a commercial song. It defaults to selected, **starts when a guest clicks 'Open Our Invitation'**, and can be paused or replaced with 'No music' via the music control. This is guest-initiated playback; browsers can block sound without a prior click. MP3 is first, OGG is the fallback. The studio may replace the track later only with appropriately licensed audio.

## Artwork details
* `public/art/{sage,rose,lavender}/doors-{desktop,mobile}.svg`: independently hinged full-screen artwork
* `public/art/{sage,rose,lavender}/bow-{desktop,mobile}.svg`: separately fading ribbon; no blurry bitmap cutout
* `public/botanicals/{top-left,top-right,bottom-left,bottom-right}.svg`: botanical decorations animated by the existing CSS
* `scripts/build-vector-assets.py`: deterministic source generator, optional (requires Python 3)
* `scripts/build-assets.mjs`: validates all 16 SVGs without regenerating tiny raster assets; runs through `pnpm art:build`
* `public/photos/*`: re-encoded higher-quality WebP exports sourced directly from the original five uploaded PNG photographs
* `public/audio/garden-waltz.mp3`: MP3 alternative for browsers that do not play OGG

## Verification performed
* All 16 SVG files validated.
* Six existing RSVP validation tests passed using `node --experimental-strip-types --test`.
* Standalone browser preview at 1440×900, 390×844 and 320×680: no JS errors, no horizontal overflow, all photos loaded, opening action started music and revealed the invitation.
* Browser screenshots are included separately. This QA is against the standalone preview (not a Next.js production build); **the production build must still be run in your existing installed local checkout**.

Use `preview.html` to preview the artwork and opening interaction independently of the Next.js app; it is a standalone demonstration and intentionally does not submit RSVPs.
