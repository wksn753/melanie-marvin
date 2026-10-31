# Melanie & Marvin — Herbarium wedding invitation

**Next.js 16 App Router · React 19 · TypeScript · pnpm · PostgreSQL**

A personalized invitation website with an original botanical gatefold card: two illustrated panels open sideways from the center, revealing Melanie & Marvin's invitation. The site also includes a wedding countdown, photo gallery, love story, venue, program, calendar download and RSVP form. **No Vite, JavaScript-only frontend, or npm workflow.**

The artwork belongs to this project; it is inspired by the *style* of the Herbarium invitation, not copied from another site's files.

## New in v3.1 — living garden, calligraphy and optional music

- **Full-viewport invitation:** the hero fills the available dynamic viewport (`dvh`/`dvw`), with four animated edge-to-edge botanical clusters rather than a phone-shaped mockup. Floral growth animates via CSS transforms and respects reduced-motion settings.
- **Calligraphic names:** `Great_Vibes` via `next/font/google` is used for the names and selected elegant headings. Its stylesheet is compiled into locally hosted font resources by Next.js; `Cormorant_Garamond` and `DM_Sans` remain the supporting families.
- **Illustrated details:** original watercolor-inspired gramophone, calendar and dress-code illustrations are stored under `public/illustrations/`, avoiding remote hotlinks.
- **Guest music control:** select **No music** or **Garden Waltz** on the unopened card or in the site, with a visible pause/play control. Default is silence. Choosing a song on the introductory card does not begin playback until **Open our invitation** is clicked. Browser gesture requirements apply.
- **Soundtrack licensing:** the bundled `public/audio/garden-waltz.ogg` is an original ~25-second instrumental demonstration composed for this project, not a commercially released wedding song. To replace it, use your own recording or a song you have permission to publish; update the track title, duration, and URL in `components/Soundtrack.tsx`. Do not add copyrighted recordings without authorization.

### Verification and limitations for this version

The updated **standalone HTML preview** was rendered in Chromium at 320×680, 390×844, 768×1024 and 1440×900. At all four checked widths the document had zero horizontal overflow; the opening card and content appeared without page errors. The bundled preview is visual-only for RSVPs; the database-backed Next.js application must be deployed and configured to record real responses.

**A complete Next.js production build and fresh pnpm lockfile could not be verified in this environment** because the npm registry was unreachable. Run the project's `pnpm check` and `pnpm build` locally before deploying. Google Fonts also require internet access during the first Next.js build unless fonts are provided through an approved local build setup.

## Start locally

Requirements: **Node.js 22.12 or newer**, and **pnpm 12.16.0** (via Corepack). In a terminal:

```bash
corepack enable
corepack pnpm install
cp .env.example .env.local
corepack pnpm dev
```

Open **http://localhost:3000**. The gatefold opens from left/right, not top/bottom. Use **View invitation** in the header to replay it. The first visit in each tab shows the invitation.

Windows PowerShell: replace the `cp` line with `Copy-Item .env.example .env.local`.

**Important build note:** The generation environment could not reach npm's package registry, so this ZIP does **not** contain a fabricated `pnpm-lock.yaml` or an unverified `node_modules` folder. The first `corepack pnpm install` generates the real lockfile. **Commit that lockfile to Git**, then use `corepack pnpm install --frozen-lockfile` in CI and production.

## Responsive layout and botanical motion (v3.0)

The side-opening card now responds to **both dynamic viewport dimensions**, using CSS `100dvh`, `100dvw`, `min()` and `clamp()` rather than a fixed-width envelope. The full card and action button remain inside the horizontal viewport on very narrow browser panes; compact-height screens can scroll the overlay vertically rather than cropping the action button. The main hero also uses a dynamic-height viewport.

- `components/LiveFlorals.tsx`: lightweight SVG flower blossoms and soft drifting petals on the gatefold doors. CSS animations use transforms and opacity; no third-party animation runtime, remote scripts or frame-by-frame React state.
- `components/ScrollReveals.tsx`: `IntersectionObserver` scroll reveals for story, gallery, schedule, RSVP and closing sections. Contents remain visible without JavaScript.
- `app/globals.css`: mobile sizing, botanical breathing and swaying, gentle staggered reveals, and reduced-motion rules. `prefers-reduced-motion` disables non-essential effects.
- `preview.html`: standalone visual/interaction preview. **Preview RSVP is not connected to the database**, but the included Next.js form still uses the original secure route handler.

**Visual QA:** the standalone invitation was checked in Chromium with simulated viewports **207×500**, **320×568**, **375×667**, **390×844**, **430×932**, **768×1024**, **1440×900** and **980×480**. The closed card and action button fitted within every checked viewport; the 980×480 viewport scrolls vertically for the small amount of overflow. The opening state and story scroll reveal were also exercised at 390×844. These are checks of the self-contained design preview, **not a completed Next.js production build**.

## Motion edition — design review and enhancements

- The two front doors open in a staggered sequence, followed by a short dissolve into the hero. The name and invitation elements then enter with a restrained blur-rise choreography.
- Gentle gold foil and wax-seal effects supplement the existing embroidered artwork. They do not loop aggressively, and all optional animation respects `prefers-reduced-motion`.
- On phones and short viewports the gatefold is bounded using `dvw`, `dvh`, and `clamp()` with vertical scrolling as a fallback; decorative content never creates intentional horizontal page scroll.
- The empty photo gallery is now a designed botanical album interlude. Actual photographs automatically appear when their entries are added to `config/wedding.ts`.
- The opening dialog now focuses the invitation card and traps keyboard Tab focus until the invitation opens.
- `DESIGN_SPEC.md` records palette, typography, easing, breakpoints, and the MotionSites references studied.

**Verification performed in this iteration:** static preview structure and JavaScript syntax checks; TypeScript/TSX syntax checks for 19 source files; CSS brace balance; and 6 RSVP/security validation tests passed. That was the limitation of the earlier motion edition; the **v3.1 standalone preview was subsequently visually tested using inline-content rendering**. A full Next.js build is still unverified. Run `corepack pnpm install && corepack pnpm build` and visually test at 320px, 390px, 768px and desktop widths before publication.

## Customize the wedding

Edit `config/wedding.ts` for names, welcome message, story, venue, program, city, dress code and questions. Names are already **Melanie and Marvin**. The date, venue, RSVP deadline and photographs are deliberately **not invented**.

Set `dateTime` to a confirmed ISO date **including timezone offset** (e.g. `2027-06-19T15:00:00+03:00` for Kampala). The countdown, displayed date and downloadable calendar event then become active. Add pictures to `public/photos/` named `photo-1.jpg` to `photo-4.jpg` or adjust paths in the config. Until real photographs are added, the gallery displays an original botanical editorial interlude without broken image requests or fake photo boxes.

## Protect and enable real RSVPs

The invitation is viewable without a database, but the RSVP form is **fail-closed**: it cannot claim a successful submission when storage is unavailable.

1. Connect a **dedicated Postgres account** to your self-hosted database. Do **not** give the website your Supabase service-role key, a Postgres superuser password or access to unrelated schemas.
2. As a privileged migration account, run `db/schema.sql` **once**. It creates only the dedicated **`melanie_marvin` schema**, two tables, and indexes.
3. Grant the app login only the permissions illustrated at the end of `db/schema.sql`. Keep the migration account out of application environment variables.
4. Set `DATABASE_URL`, `RATE_LIMIT_SECRET` (random **32+ characters**) and `SITE_ORIGIN` in **`.env.local`**, not in code or a public environment variable. Generate secrets using `openssl rand -hex 32`.
5. For internet publishing, enable **Cloudflare Turnstile** by supplying both `TURNSTILE_SITE_KEY` and the **private** `TURNSTILE_SECRET_KEY`. The server verifies tokens with Cloudflare; setting only one key rejects submissions instead of silently bypassing verification.
6. Configure your reverse proxy to **discard all inbound X-Real-IP values from users and replace them with the actual client IP**. Only then set `TRUST_PROXY_HEADERS=true`. Otherwise, all visitors share one conservative rate bucket; this avoids trusting forged headers.
7. On your hosting/CDN firewall, set request limits for `/api/rsvp` and `/api/rsvps/export` as defense in depth. The included DB rate limiter allows **6 successfully validated requests per hour per trusted client IP** (atomic across application instances).
8. Publish a simple guest data handling notice. Dietary notes can be sensitive. Share exports only with organizers, and schedule deletion after the event (`db/maintenance.sql`).

Example private environment settings:

```dotenv
DATABASE_URL=postgresql://dedicated_user:password@db.example.internal:5432/appdb?sslmode=require
RATE_LIMIT_SECRET=<32-or-more-random-characters>
SITE_ORIGIN=https://your-wedding-domain.example
TRUST_PROXY_HEADERS=false
ADMIN_EXPORT_TOKEN=<a-different-32-or-more-character-secret>
TURNSTILE_SITE_KEY=<public-site-key>
TURNSTILE_SECRET_KEY=<private-secret>
ALLOW_INDEXING=false
```

Use TLS for database traffic outside a trusted private network. `TRUST_PROXY_HEADERS` is **off by default**, deliberately.

### Export wedding responses

Set a unique `ADMIN_EXPORT_TOKEN` (**32+ random characters**, not shared with guests). Download a CSV as an administrator using a terminal:

```bash
curl -fS -H "Authorization: Bearer YOUR_PRIVATE_ADMIN_EXPORT_TOKEN" \
  https://your-wedding-domain.example/api/rsvps/export \
  -o melanie-marvin-rsvps.csv
```

The endpoint checks the secret with constant-time comparison, caps exports at 10,000 records, marks them noncacheable, and neutralizes Excel/Sheets formula injection. Never put the token in a query string or frontend component. There is **no public admin dashboard**.

**Public invitation caution:** RSVP endpoints are not a personalized guest-list authorization system. An invited-only event needs per-invitation tokens and optional plus-one limits, if required later. Avoid relying on obscurity of the URL alone.

## Run checks

```bash
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm build
corepack pnpm audit
```

`pnpm test` runs pure validation/CSV security tests using Node's built-in test runner. The Next.js build and package audit must be performed after dependencies are installed. **No successful production build is claimed in this ZIP.**

### Deploy as a Node application

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm build
corepack pnpm start
```

Put HTTPS in front of your app (e.g., a properly configured reverse proxy). Set `SITE_ORIGIN` to the actual **https://** domain and pass the environment settings securely to the Node process. The production server must not be publicly exposed over unencrypted HTTP.

### Docker deployment

After generating and committing `pnpm-lock.yaml`:

```bash
docker build -t melanie-marvin-wedding .
docker run --rm -p 127.0.0.1:3000:3000 --env-file .env.production melanie-marvin-wedding
```

Keep `.env.production` **outside the Git repo** and set its file mode to only the server account. Place HTTPS and abuse protection at the reverse proxy. The Dockerfile uses a non-root runtime and Next.js standalone output.

## Architecture and security

- `app/page.tsx` and `app/layout.tsx`: React Server Components; only animation, countdown, gallery and form require Client Components.
- `components/GatefoldIntro.tsx`: original botanical panels, CSS 3D left/right hinges, responsive viewport sizing, animated floral overlays, reduced-motion support, replay in same tab.
- `components/LiveFlorals.tsx` and `components/ScrollReveals.tsx`: presentation-only SVG and CSS effects; no additional dependencies or API access.
- `app/api/rsvp/route.ts`: Node-only Next.js Route Handler. JSON content type and **8 KB** maximum input; schema checks, honeypot, same-origin protection, CAPTCHA optional, transactional rate limiting, parameterized insert.
- `app/api/rsvps/export/route.ts`: token-protected CSV download with formula escaping and `no-store` caching.
- `lib/db.ts`: pooled server-only database connection; no public Postgres URLs in browser code. The public Turnstile site key is passed from a Server Component to the Client Component at request time (also works in Docker at runtime).
- `proxy.ts`: Next.js 16 request proxy creates per-request CSP nonces for dynamic pages. This is **not** the authorization boundary for APIs.
- `next.config.ts`: safe security headers, no `X-Powered-By`, restrict image sources.
- `app/robots.ts`: disallow indexing until `ALLOW_INDEXING=true`.
- `db/schema.sql`: dedicated schema on shared PostgreSQL, no anonymous/public role grants. All stored guest data remains in your own database.
- `next/font/google`: fonts are self-hosted by Next.js at build time instead of fetching Google Fonts in visitors' browsers.

Keep Next.js, React, pnpm and transitive dependencies patched. **Next.js 16.4.3** was selected because earlier versions had critical security advisories in October 2026. Do not disable TypeScript checks, ESLint checks, request validation or CAPTCHA verification to force deployment.
