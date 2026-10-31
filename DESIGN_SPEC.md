# Melanie & Marvin — Motion edition design brief

**Audience:** Wedding guests invited into Melanie and Marvin’s celebration.
**Mood:** Botanical · intimate · cinematic.
**Signature:** A tactile ivory-and-sage double-door invitation with a physical wax-seal lift and doors that open sideways. The underlying invitation page enters in a staggered paper-and-ink reveal, not with another competing animation.
**Stack:** Existing Next.js App Router + TypeScript + pnpm, unchanged. No Vite or motion dependency.

## MotionSites skill references (structure and craft, not a copied layout)

- `examples/stillmind.md`: spatial calm, editorial typography, and reduction of competing controls.
- `examples/bloom-ai-hero.md`: organic motion and deliberately restrained translucent layers.
- `examples/mostar-guide.md`: scroll-led storytelling and mobile-first progression.
- `references/techniques/INDEX.md`: one signature, supporting entrance and viewport reveals.

## Precision tokens

| Part | Setting |
|---|---|
| Palette | ivory `#fbf8f0`, dark sage `#324c3c`, ink `#303b30`, foil `#baa076` |
| Fonts | Cormorant Garamond display + DM Sans UI (Next font optimization) |
| Page margin | mobile 16–25px, desktop 54px |
| Opening doors | 1.85s, cubic-bezier(.22,.68,.17,1); second door delayed 110ms |
| Release overlay | 2.5s, dissolves during final 32% |
| Hero entrance | 940ms, `cubic-bezier(.2,.7,.16,1)`, staged offsets 75–540ms |
| Scroll entrance | 920–1000ms, reveal only after IntersectionObserver attaches |
| Decorative stem sway | 10–12s, low amplitude |
| Responsive viewport | `100dvw`, `100dvh`, `min()` and `clamp()`; vertical scroll fallback on short screens |

## Layout & content

1. Invitation cover: embroidered floral paper panels; monogram; invitation trigger.
2. Hero: Melanie & Marvin’s names, wedding date when known, RSVP.
3. Countdown: hidden or unknown-state until confirmed date, never a fabricated date.
4. Story: their words, not stock copy presented as fact.
5. Photos: editorial botanical interlude while portraits are unavailable; real gallery appears with genuine files only.
6. Schedule, venue, RSVP, practical information, and closing dedication.

## Quality and accessibility checks

- Avoid real photo placeholders, broken image requests, and invented wedding information.
- Modal keyboard focus stays inside opening invitation until it opens.
- Responsive at 320 / 390 / 768 / 1440 widths; no intentionally horizontal page scroll.
- All animations have reduced-motion off switches; no cursor-only essential interactions.
- Server validation and RSVP protection from the previous version remain intact.
