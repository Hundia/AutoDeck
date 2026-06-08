# Sprint 50 Summary — "מהדמו לפרודקשן" (Dr. Yuval Dror Q&A Presentation)

**Date:** 2026-06-09
**Status:** ✅ Complete
**Points:** 29 / 8 tickets

## What Shipped

A Hebrew (RTL) **editorial** Q&A presentation built from Eli's interview answers to Dr. Yuval Dror on leading AI adoption across ~85 engineers. Live (unlisted) at `#/demo-to-prod`, Aurora theme + constellation background.

12 slides: title → פתיח (quote) → Q1 identity (content) → "להתקין כלי / לבנות בית הנדסי" (comparison) → Q2 challenge (quote) → Q3 breakthrough journey (scrollable timeline) → Q4 advice (quote) → "השאלות הקשות" (content) → Q5 "אשליית ההתקדמות" (comparison) → Q6 "סיכון מידע / סיכון למידה" (comparison) → "מה הייתי עושה אחרת" (content) → final ("כלי אפשר להתקין — תרבות הנדסית צריך לבנות").

## Completed Tickets

| ID | Ticket | Pts |
|----|--------|-----|
| 50.1 | `slides-demotoprod-he.ts` — 12-slide Hebrew deck | 8 |
| 50.2 | `creation-story-demotoprod.ts` | 2 |
| 50.3 | `App.tsx` — `demoToProdConfig` + `/demo-to-prod` route (he-only) | 3 |
| 50.4 | UI/UX + Framer Motion RTL polish | 5 |
| 50.5 | Build gate (`npm run build` clean) | 2 |
| 50.6 | Playwright visual + RTL QA (43 assertions) | 5 |
| 50.7 | Docs (README + docs/slides) | 2 |
| 50.8 | Deploy → GitHub Pages | 2 |

## Key Decisions

- **Editorial, not pitch.** The source argues against hype-metrics, so the deck intentionally uses **no `stats` and no `code` slide** — a flashy "10x" number would contradict the speaker's own thesis. Content stays in his words; nothing fabricated.
- **Hebrew-only, RTL automatic.** `defaultLanguage: 'he'` — `PresentationViewer` mirrors layout, transitions, and keyboard nav for `he`. No per-slide overrides.
- **TimelineSlide RTL fix (shared component).** The step rail was hardcoded to the left (`left-6`/`left-3`/`pl-14`). Added Tailwind `rtl:` variants (`rtl:right-6`/`rtl:right-3`/`rtl:pr-14`) so the rail mirrors to the right under `dir="rtl"`. LTR decks unchanged; **all** Hebrew decks (acme/techbrief/howto) improved consistently.

## QA & Test Results

- `npm run build`: exits 0, zero errors (CSS 40.05 → 40.33 kB after the `rtl:` variants compiled in).
- Playwright `e2e-sprint50.js`: 43/43 assertions passed — `dir="rtl"` on every slide, no overflow/clipping at 1440×900, RTL-reversed keyboard nav, expected Hebrew headlines present. Screenshots in `e2e-screenshots/sprint-50/`.
- New cases: TC-UI-16 (build), TC-UI-17 (RTL visual), TC-UI-18 (keyboard nav), TC-UI-19 (content fidelity).

## Docs Updated

- `README.md` — added deck to Presentations table (8 → 9).
- `docs/slides/README.md` — TimelineSlide RTL note + Authored Presentations content-fidelity note.

## Retrospective

- **Went well:** Editorial framing kept the deck faithful to a hype-skeptical source; the one genuine RTL defect (timeline rail) was caught in visual QA and fixed with a low-risk, framework-wide improvement.
- **Challenge:** Source document was a private `.docx`; required the user to download it locally before content extraction.
