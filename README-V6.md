# Marvin & Melanie — embroidered gatefold asset pack (v6)

**Stack:** Next.js App Router, TypeScript, pnpm. The existing wedding site, five real photographs, ceremony/reception details, date, countdown, music, and secure RSVP API are unchanged.

## Design

A full-screen embroidered ivory linen gatefold replaces the compact first-screen card. Each half uses the left/right half of a single seamless source image. A separate transparent chiffon bow is split across the doors, and fades before the panels rotate outwards. The invitation underneath is revealed, and then the real wedding website becomes available. The door artwork uses separate WebP images for mobile portrait (1170×2535) and desktop landscape (2560×1440).

Three palettes are included: Sage, Rose, Lavender. To select a palette for the public invitation, update `config/gatefold.ts`. The public site deliberately **does not show** a theme-picker; the standalone preview has a theme-picker for review.

## Editing the art

`raw/sage`, `raw/rose`, and `raw/lavender` each contain `doors-mobile.png`, `doors-desktop.png`, and `bow.png`. `raw/linen.png` is shared. Replace these raw sources with higher-resolution imagery whenever available, then run:

```bash
corepack enable
corepack pnpm install
corepack pnpm art:build
corepack pnpm dev
```

The script is `scripts/build-assets.mjs`, uses Sharp, and outputs `public/art/<palette>/doors-{mobile,desktop}.webp` and `bow-{mobile,desktop}.webp` plus `public/art/linen.webp`. The source artwork was generated and prepared from a design contact sheet; while output sizes are retina-compatible, higher-resolution input images will yield sharper embroidery on large desktop screens.

All original wedding information lives in `config/wedding.ts`, with the wedding on 1 May 2027 at All Saints Cathedral, Nakasero, and reception at Naguru Gardens. Times and dress code have not been invented. Configure PostgreSQL for live RSVP before publishing; see the main `README.md` for security and deployment notes.

## Checks

- `node scripts/build-assets.mjs` completed successfully for all three themes.
- Six RSVP validation tests passed.
- This environment could not fetch the dependency registry, so a full Next.js production build still requires verification on a machine with dependencies installed.

## Artwork rights

The generated illustration set and its derivative image assets can be swapped for any approved wedding artwork. The couple's original supplied photographs remain unchanged.
