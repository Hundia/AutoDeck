# Sprint 46: Presentation Gallery Section

**Date:** 2026-04-06  
**Points:** 25  
**Tickets:** 9  
**Status:** ✅ Done

## What Shipped

| Ticket | Deliverable |
|--------|-------------|
| 46.1 | `src/landing/galleryConfig.ts` — `GalleryEntry` interface + 7-entry static array |
| 46.2 | `src/landing/GallerySection.tsx` — responsive 4-col grid, Framer Motion stagger, onError fallback |
| 46.3 | `src/landing/LandingPage.tsx` — GallerySection inserted before FooterSection |
| 46.4 | `scripts/gallery-capture.js` — Playwright thumbnail capture script |
| 46.5 | `package.json` `gallery:capture` script + 7 PNGs committed to `public/thumbnails/` |
| 46.6 | `e2e-sprint46.js` — 27 assertions, 0 failures; `specs/05_qa_lead.md` TC-UI-09 added |
| 46.7 | `SKILL.md` — GallerySection authoring guide + BASE_URL path convention |
| 46.8 | `docs/landing/README.md` — GallerySection entry + section inventory updated |
| 46.9 | Sprint close |

## Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Thumbnail path resolution | `${import.meta.env.BASE_URL}thumbnails/{id}.png` | Hardcoded `/AutoDeck/` would break any fork with a different repo name; `BASE_URL` reads from `vite.config.ts` `base` field |
| Thumbnail generation strategy | Manual capture via Playwright, committed to `public/thumbnails/` | One-time capture, static serving — no backend, no runtime cost, consistent quality |
| Gallery placement | After TestimonialsSection, before FooterSection | HX expert recommendation: gallery answers "what does this look like?" as the penultimate section, after social proof |
| onError fallback | Replace `<img>` with placeholder div (slate bg + title initials) | No broken-image icon, no layout shift — graceful degradation if thumbnail missing |
| Responsive breakpoints | 1-col mobile / 2-col tablet / 4-col desktop | Matches FeaturesSection pattern; 7 cards fills 2 rows on desktop (4+3) |

## E2E Results

| Test | Result |
|------|--------|
| All 7 gallery routes linked | ✅ Pass |
| `<img>` alt attributes populated | ✅ Pass |
| Zero JS console errors (desktop) | ✅ Pass |
| No horizontal overflow (mobile 390×844) | ✅ Pass |
| All 7 presentation routes load | ✅ Pass |
| TC-UI-09 added to QA spec | ✅ Pass |
| Total assertions | 27/27 |

## Follow-on Ideas

- **Filter by category** — Add client-side category filter tabs (Pitch / Dev / Tutorial / Review) above the grid
- **Animated previews** — On hover, cycle through 3 slide screenshots instead of static thumbnail
- **8th presentation** — Adding new decks: update `galleryConfig.ts`, run `gallery:capture`, done
- **Thumbnail optimization** — Convert PNGs to WebP for ~60% size reduction
