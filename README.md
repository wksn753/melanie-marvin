# Marvin & Melanie — Wedding Invitation V5

**Next.js App Router · TypeScript · pnpm · PostgreSQL RSVP API · no Vite**

The cinematic, embroidered floral double-door invitation is intact. This edition confirms the wedding date and both wedding locations and spreads the couple's own five photographs across distinct editorial chapters rather than placing everything inside a single photo gallery.

## Confirmed details

- **Saturday, 1 May 2027** — the website countdown runs to the beginning of the wedding date in `Africa/Kampala`. It does **not** imply the church service starts at midnight.
- **Church:** All Saints Cathedral, Nakasero, Kampala.
- **Reception:** Naguru Gardens, Kampala, following the ceremony.
- **Unknown:** ceremony start time, reception start time, RSVP deadline, dress code. The UI says these are to be confirmed, rather than inventing them.
- **Calendar:** `/api/calendar` produces an **all-day** May 1 event with both locations and a note to check back for times. This avoids an erroneous six-hour event starting at midnight.

## Photo-story flow

1. `marvin-melanie-laughter.webp` — an opening editorial photo after the invitation.
2. `marvin-melanie-dancing.webp` — a story interlude after their introduction.
3. `melanie-golden-hour.webp` — warm portrait in the small central gallery.
4. `marvin-melanie-joy.webp` — a joyful two-person image in the gallery.
5. `marvin-melanie-beach.webp` — full-width photo chapter immediately before RSVP.

All files are optimized WebP images inside `public/photos/`. There are no remotely hosted or placeholder photographs. Existing watercolor botanical artwork, subtle animations, music choice and scroll-reveal interactions remain intact.

## Start locally

```bash
corepack enable
corepack pnpm install
corepack pnpm dev
```

Open `http://localhost:3000`. The couple's names, date, locations, program, gallery and FAQ are configured in `config/wedding.ts`. Source changes for the story sections live in `app/page.tsx` and styling in `app/globals.css`.

`preview.html` is a simplified standalone preview that uses assets from `public/` (open it after unzipping); the separate download `marvin-melanie-v5-preview.html` embeds those assets to work by itself. For the fully interactive Next.js website, use the steps above.

## Production and security

Create `.env.local` from `.env.example`, configure the PostgreSQL credentials, and apply `db/schema.sql` before enabling RSVP submissions. Only public media belongs under `public/`. Keep admin credentials and database connection strings server-side and **never** commit `.env.local` or export RSVP data publicly.

The existing RSVP API retains validation, origin checks, SQL query parameterization, PostgreSQL-backed rate limiting, and optional Cloudflare Turnstile verification. The admin RSVP export remains protected. The calendar endpoint does not require authentication because it exposes public event details only.

```bash
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm build
```

Dependency installation and the complete production build need to be run on a networked local or CI environment; they are **not** claimed as passed here. A `pnpm-lock.yaml` is not included because the registry was inaccessible: generate and commit it with your first successful install.

## Accessibility

Motion respects `prefers-reduced-motion`, the invitation opens with accessible controls, the images have meaningful alt text, and location links open Google's search result for the supplied venue names, without asserting a precise address or service time.
