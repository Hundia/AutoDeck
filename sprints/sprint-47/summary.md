# Sprint 47 Summary — Make AutoDeck Go Viral

**Date:** April 2026
**Theme:** Virality infrastructure — shareable meta-presentation, Share modal, GitHub star counter, deploy buttons, OG image, interactive branding link engine change, and README revamp.
**Points shipped:** 48 pts across 17 tickets

---

## What Shipped

| ID | Ticket | Description |
|----|--------|-------------|
| 47.1 | `slides-meta-en.ts` | 8-slide AutoDeck pitch deck: title, stats, content, diagram, code, comparison, timeline, closing. Exported as `slidesMetaEN`. |
| 47.2 | `creation-story-meta.ts` | `metaCreationStory` with 6 AI prompts covering deck concept, stats numbers, diagram layout, code snippet, comparison framing, closing CTA. |
| 47.3 | Wire `#/meta` route | `App.tsx` imports `slidesMetaEN` + `metaCreationStory`; defines `metaConfig`; adds `<Route path="/meta">` with full `PresentationViewer` wiring. |
| 47.4 | `brandingUrl` engine change | `PresentationConfig.brandingUrl?: string` added to `types.ts`. `PresentationViewer` branding block now has three states: `<button>` (creationStory), `<a>` (brandingUrl), `<div>` (neither). |
| 47.5 | `brandingUrl` on all configs | Added `brandingUrl: 'https://github.com/Hundia/AutoDeck'` to every existing `PresentationConfig` in `App.tsx` and `config.ts`. |
| 47.6 | `ShareModal.tsx` | New engine component: Link/Embed/Social tabs, copy-to-clipboard with 2 s reset, iframe snippet with GitHub Pages note, X + LinkedIn share buttons, Escape-to-close. |
| 47.7 | Share button in `PresentationViewer` | `shareOpen` state, `<AnimatePresence>` wrapping `<ShareModal>`, Share2 icon button as rightmost control; arrow/space suppressed while modal open. |
| 47.8 | `GalleryEntry.featured` + meta card | `featured?: boolean` on `GalleryEntry`; meta entry prepended with `featured: true`; featured card rendered with `ring-2 ring-blue-500` and "★ Featured" badge. |
| 47.9 | `GitHubStarCounter.tsx` | Fetches `stargazers_count` from GitHub API, 1-hour localStorage TTL cache (`autodeck-gh-stars`), Framer Motion spring animation, skeleton pulse, `'—'` on error. |
| 47.10 | `ByTheNumbersSection` | 4-tile stat grid (GitHub Stars, 7 Showcase Decks, 10 Slide Types, 443 pts). `whileInView` entrance. Inserted between `GallerySection` and `FooterSection`. |
| 47.11 | `DeployButtonsSection` | 4 one-click deploy buttons (Vercel, Netlify, Stackblitz, Codespaces). `motion.a` with `whileHover={{ y: -2 }}`. Inserted between `HowItWorksSection` and `QuickStartSection`. |
| 47.12 | README revamp | Rewrote `README.md`: badge row, tagline, features list, Quick Start, deploy table, all 8 presentation routes, Contributing + License. |
| 47.13 | Capture `meta.png` thumbnail | Added `#/meta` to `scripts/gallery-capture.js` PRESENTATIONS array. Ran gallery capture. `public/thumbnails/meta.png` generated at 1440×900. |
| 47.14 | `public/og-image.png` + OG meta tags | `scripts/og-capture.js` at 1200×630 viewport. `index.html` updated with `og:image`, `og:title`, `og:description` meta tags. |
| 47.15 | E2E Playwright verification | `e2e-sprint47.js`: 25/25 assertions passed, screenshots to `e2e-screenshots/sprint-47/`, zero JS errors across all 8 routes. |
| 47.16 | TC-UI-10/11/12 in QA spec | Appended TC-UI-10 (`#/meta`), TC-UI-11 (Share modal), TC-UI-12 (ByTheNumbers + Deploy) to `specs/05_qa_lead.md`. |
| 47.17 | Sprint close + docs | Updated `docs/landing/README.md`, `docs/engine/README.md`. Wrote this summary. Marked all 47.x tickets ✅ Done. Committed + pushed. |

---

## Key Decisions

1. **Meta route wires `creationStory`** — `metaConfig` in `App.tsx` passes `creationStory: metaCreationStory`, which means the branding block renders as a `<button>` opening the Creation Story drawer (not a plain link). This takes priority over `brandingUrl` per the three-state branding logic added in 47.4.

2. **OG image at 1200×630** — The `scripts/og-capture.js` viewport is locked to the standard Open Graph image dimension (1200×630 px) to ensure correct rendering on Twitter/X cards and LinkedIn link previews. Gallery thumbnails remain at 1440×900.

3. **Gallery thumbnail at 1440×900** — All gallery thumbnails (including the new `meta.png`) are captured at 1440×900 to fill the 16:9 card ratio in `GallerySection` without letterboxing.

4. **1-hour localStorage TTL for GitHub API** — `GitHubStarCounter` caches the star count with a 1-hour TTL (`Date.now() - ts < 3_600_000`) using key `autodeck-gh-stars`. This avoids GitHub's 60 req/hour unauthenticated rate limit while keeping the count reasonably fresh for landing page visitors.

---

## E2E Results

- **Test file:** `e2e-sprint47.js`
- **Assertions:** 25/25 passed
- **JS errors:** Zero across all 8 routes (`/`, `#/presentation`, `#/techbrief`, `#/uimockup`, `#/howto`, `#/acme`, `#/ferric`, `#/meta`)
- **Screenshots:** Saved to `e2e-screenshots/sprint-47/`

---

## Files Created / Modified

| File | Action |
|------|--------|
| `src/slides/data/slides-meta-en.ts` | Created |
| `src/slides/data/creation-story-meta.ts` | Created |
| `src/engine/ShareModal.tsx` | Created |
| `src/landing/GitHubStarCounter.tsx` | Created |
| `scripts/og-capture.js` | Created |
| `public/og-image.png` | Created |
| `public/thumbnails/meta.png` | Created |
| `e2e-sprint47.js` | Created |
| `sprints/sprint-47/summary.md` | Created (this file) |
| `src/App.tsx` | Modified — `#/meta` route, `brandingUrl` on all configs |
| `src/engine/types.ts` | Modified — `brandingUrl` field |
| `src/engine/PresentationViewer.tsx` | Modified — branding states, Share button, ShareModal |
| `src/landing/LandingPage.tsx` | Modified — `ByTheNumbersSection`, `DeployButtonsSection` |
| `src/landing/galleryConfig.ts` | Modified — `featured` field, meta entry |
| `src/landing/GallerySection.tsx` | Modified — featured card ring + badge |
| `src/config.ts` | Modified — `brandingUrl` on default config |
| `index.html` | Modified — OG meta tags |
| `package.json` | Modified — `og:capture` script |
| `scripts/gallery-capture.js` | Modified — meta route added |
| `README.md` | Modified — full revamp |
| `specs/05_qa_lead.md` | Modified — TC-UI-10/11/12 |
| `docs/landing/README.md` | Modified — ByTheNumbers + DeployButtons sections |
| `docs/engine/README.md` | Modified — ShareModal section, brandingUrl field |
| `specs/backlog.md` | Modified — all 47.x ✅ Done, Last Updated |

**Total: 9 new files, 15 modified files**
