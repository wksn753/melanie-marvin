# Marvin & Melanie — Wedding Website (Version 4.0)

Next.js App Router + TypeScript + pnpm. **No Vite.**

This update preserves the Herbarium-inspired double-door opening, music selection, countdown, schedule, and PostgreSQL RSVP API. Changes made in v4:

- Marvin now appears **first** throughout the site and metadata.
- Replaced flat SVG hero flowers with painterly botanical assets (`public/botanicals/`), gently animated and responsive.
- Added **all five actual supplied couple photographs** (optimized WebP in `public/photos/`); no generic gallery placeholders.
- Added a photo-and-story editorial section below the full-screen floral cover.
- Added consistent **inline SVG icons**, not emoji glyphs, for arrows, music, replay, and invitation controls.
- Retained dates/venue as unconfirmed rather than inventing them.
- Source files for images, date, timeline, and venue are local and editable.

## Run locally

```bash
corepack enable
corepack pnpm install
corepack pnpm dev
```

Visit `http://localhost:3000`. Edit `config/wedding.ts` to enter confirmed wedding details; add or reorder photographs in `public/photos/` and the `gallery` array. The original gatefold is in `components/GatefoldIntro.tsx`; the full-screen floral frame is in `components/FloralFrame.tsx`.

## Security and deployment

Copy `.env.example` to `.env.local` and configure server-side Postgres credentials. Run `db/schema.sql` against the authorized database before using RSVPs. Do not commit secrets or include `.env.local` in a deployment ZIP. The RSVP route keeps server validation, parameterized queries, Postgres-backed rate limiting, origin enforcement, and optional Turnstile support. The export endpoint requires the configured admin credential. Use HTTPS in production.

```bash
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm build
```

Run `corepack pnpm install` to generate `pnpm-lock.yaml`, and commit that lockfile for reproducible deployments. A complete Next.js dependency installation and production build were **not possible in this execution environment**, so the full build is not claimed as verified. Source syntax checks and six RSVP validation tests passed. Browser checks on the standalone visual preview at 1440, 390 and 320px passed with no broken images, JavaScript errors or horizontal overflow. The standalone preview is representative; live Next.js interactions and font loading should be checked locally before deployment.

`preview.html` is an HTML preview meant for viewing from inside the extracted project; if opened from the project folder, it loads local assets from `public/`.
