# AutoDeck Backlog

**Project:** AutoDeck — React + Framer Motion Presentation Framework  
**Extracted from:** [AutoSpec](https://github.com/Hundia/autospec) — Sprints 10–38  
**Repository:** https://github.com/Hundia/AutoDeck  
**Last Updated:** 2026-04-03

---

## Sprint History (Extracted from AutoSpec)

The following sprints in AutoSpec built the presentation engine that became AutoDeck:

| Sprint | Theme | Status | Pts | Notes |
|--------|-------|--------|-----|-------|
| Sprint 10 | GitHub Pages Consolidation | ✅ Done | 10 | Initial Pages setup + README update |
| Sprint 12A | Presentation Evolution Narrative | ✅ Done | 55 | Multi-slide presentation with Framer Motion |
| Sprint 12B | Landing Page Evolution Narrative | ✅ Done | 14 | First landing page scaffold |
| Sprint 13A | Data Layer + New Slides + Title Overhaul | ✅ Done | 30 | Slide data architecture, TitleSlide redesign |
| Sprint 13B | Component Reworks + Wiring | ✅ Done | 24 | Component refactors, language wiring |
| Sprint 14 | Presentation Fixes + SDD Deepening | ✅ Done | 32 | Bug fixes, ClosingSlide, FinalSlide |
| Sprint 18 | Academic Paper Showcase | ✅ Done | 52 | PaperPage, academic content integration |
| Sprint 26 | OpenCode Skill Port | ✅ Done | 9 | plan-presentation skill, OpenCode commands |
| Sprint 27 | Landing Page Redesign — Elegant, Minimal | ✅ Done | 31 | Full landing page redesign with warm palette |
| Sprint 37 | LightSpeedSpec (LSS) Framework | ✅ Done | 134 | LSS presentation — engine extracted as AutoDeck |
| Sprint 38 | LSS Presentation Polish — Enterprise Grade | 🔄 In Progress | 52 | A11y, mobile, 4 new slides, animation upgrades |
| Sprint 39 | AutoDeck Launch — GitHub Pages + SDD Framework | ✅ Done | 48 | Landing page, SDD bootstrap, GitHub Pages deploy |
| Sprint 40 | DiagramSlide + MockupSlide + Two Flagship Presentations | 🔲 Planned | 53 | diagram/mockup types, TechBrief, UIMockup, generation recipes |

**Total investment:** ~443 points across 11 AutoSpec sprints

---

## Sprint 39: AutoDeck Launch — GitHub Pages + SDD Framework (48 pts)

**Theme:** Stand up AutoDeck as a fully independent, top-tier framework with landing page, SDD infrastructure, and self-sustained development environment.  
**Status:** ✅ Done  
**Date:** 2026-04-02

### Phase 1: Bootstrap (12 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 39.1 | Clone `hundia/AutoDeck` → `/opt/autodeck/`, rsync `~/slide-deck/`, push | DevOps | sonnet | 3 | ✅ Done | — | — |
| 39.2 | Copy SDD infrastructure from AutoSpec (specs/, .claude/commands/, skills/) | DevOps | sonnet | 4 | ✅ Done | 39.1 | — |
| 39.3 | Create `CLAUDE.md` — SDD rules, structure, commands, design system | PM | sonnet | 2 | ✅ Done | 39.1 | `CLAUDE.md` |
| 39.4 | Create `specs/backlog.md` — sprint history (10–38) + Sprint 39 | PM | sonnet | 3 | ✅ Done | 39.1 | `specs/backlog.md` |

### Phase 2: Landing Page (14 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 39.5 | Copy relevant `docs/` from AutoSpec + create engine/slides/landing stubs | DevOps | sonnet | 2 | ✅ Done | 39.2 | `docs/` |
| 39.6 | Install react-router-dom, create `LandingPage.tsx` (Hero, Features, HowItWorks, SlideTypes, AIAssisted, Footer) | Frontend | sonnet | 8 | ✅ Done | 39.1 | `docs/landing/` |
| 39.7 | Update `App.tsx` for HashRouter: `/` = Landing, `/presentation` = Viewer | Frontend | sonnet | 4 | ✅ Done | 39.6 | — |

### Phase 3: Polish + Docs (14 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 39.8 | Verify `deploy.yml` + add public/404.html if needed for SPA | DevOps | sonnet | 2 | ✅ Done | 39.7 | `docs/deployment/` |
| 39.9 | Update `README.md` — top-tier: live URLs, quick start, slide types, deploy guide | PM | sonnet | 4 | ✅ Done | 39.1 | `README.md` |
| 39.10 | Enhance `SKILL.md` — add landing page creation + SDD workflow sections | PM | sonnet | 3 | ✅ Done | 39.3 | `SKILL.md` |
| 39.11 | `npm run build` passes + push Sprint 39 work to `hundia/AutoDeck` | QA | sonnet | 3 | ✅ Done | 39.7, 39.8 | — |
| 39.12 | Verify `hundia.github.io/autodeck/` (landing) and `#/presentation` load | QA | sonnet | 2 | 🧪 QA Review | 39.11 | — |

### Phase 4: Close (8 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 39.13 | Sprint 39 summary in `sprints/sprint-39/summary.md` + close backlog | PM | sonnet | 3 | ✅ Done | all | `sprints/sprint-39/summary.md` |

---

## 🔲 Sprint 40: DiagramSlide + MockupSlide + Two Flagship Presentations

**Goal:** Add two new reusable slide types (`diagram`, `mockup`), two flagship example presentations (TechBrief at `/#/techbrief`, UIMockup at `/#/uimockup`), and AI generation recipes in SKILL.md so any developer can generate a presentation from a codebase or spec.  
**Points:** 53  
**Status:** 🔲 Planned  
**Date:** 2026-04-03

### Problem Statement

AutoDeck has one presentation (Acme) and no slide types for diagrams or wireframes — the two most common needs in technical and design presentations. Sprint 40 closes both gaps and establishes a generation workflow so AI tools can produce new decks from existing project artifacts.

### User Stories

- As a dev lead, I can point Claude at my git log + spec and get a 10-slide TechBrief deck using the SKILL.md generation recipe.
- As a designer/PM, I can describe my screens and design system to Claude and get a UIMockup deck with wireframe slides.
- As a slide author, I can use a `diagram` slide to show architecture, sequence, or ER diagrams using pure SVG — no external libraries.
- As a slide author, I can use a `mockup` slide to show a browser-chrome wireframe with navbar/sidebar/cards/table/form blocks — no images or Figma exports required.

### Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| DiagramSlide modes | Single component, `mode: arch/sequence/er` field | All 3 share node/edge primitives; one registry entry |
| DiagramSlide layout | Fixed viewBox 800×500, author-supplied col/row coords | Deterministic; no DOM measurement; SSR-safe |
| Arrow draw-on animation | Framer Motion `pathLength` 0→1 per edge, stagger 0.15s | No new deps; matches existing CodeSlide animation idiom |
| MockupSlide flow connectors | CSS-only absolutely-positioned divs with borders | `getBoundingClientRect` unreliable inside AnimatePresence |
| New routes | `#/techbrief`, `#/uimockup` added to App.tsx HashRouter | Keeps Acme at `#/presentation` unchanged |
| Data subdirectory | `src/slides/data/{name}-{lang}.ts` | Separates component code from presentation data |
| SKILL.md generation guide | New `## Generation Recipes` section | Between File Map and SDD sections; verbatim prompt templates |

### Phase 1: New Slide Types (26 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 40.1 | **DiagramSlide component** — Create `src/slides/components/DiagramSlide.tsx`. Three modes via `mode: 'arch' \| 'sequence' \| 'er'`. Shared interface: `nodes: [{id, label, sublabel?, col, row, color?}]`, `edges: [{from, to, label?, dashed?}]`. Fixed `viewBox="0 0 800 500"` SVG. Node layout: `x = col * 200 + 80`, `y = row * 120 + 60`. Nodes: `<rect>` + `<text>` color-coded. Edges: cubic bezier `<path>` with Framer Motion `pathLength` 0→1 draw-on (stagger 0.15s). Sequence mode: actor lifelines + horizontal message arrows. ER mode: field-list boxes. No new npm packages. | Frontend | sonnet | 8 | 🔲 | — | `docs/slides/README.md` |
| 40.2 | **DiagramSlide register** — Add `DiagramSlideData` to `src/engine/types.ts`. Register `diagram: DiagramSlide` in `src/slides/registry.ts`. `npm run build` exits 0. | Frontend | haiku | 2 | 🔲 | 40.1 | — |
| 40.3 | **MockupSlide component** — Create `src/slides/components/MockupSlide.tsx`. Browser chrome: 3 traffic-light dots + `bg-slate-800` bar + URL field (identical to CodeSlide pattern). Content area: `bg-slate-50 rounded-b-xl`. 8 block types: `navbar`, `hero`, `card-grid`, `table`, `form`, `chart-bar`, `sidebar`, `text-block`. `displayMode: 'flow'` renders 3 mini-frames side-by-side with CSS-only arrow connectors (absolutely-positioned divs with border — NO `getBoundingClientRect`, NO SVG overlay, must work inside Framer Motion AnimatePresence). Block stagger 0.1s. | Frontend | sonnet | 8 | 🔲 | — | `docs/slides/README.md` |
| 40.4 | **MockupSlide register** — Add `MockupSlideData` + `BlockType` union to `src/engine/types.ts`. Register `mockup: MockupSlide` in `src/slides/registry.ts`. `npm run build` exits 0. | Frontend | haiku | 2 | 🔲 | 40.3 | — |
| 40.5 | **Build gate (Phase 1)** — Add temp `diagram` slide (arch mode, 4 nodes, 3 edges) + `mockup` slide (browser, 3 blocks) to `slides-en.ts`. `npm run build` must exit 0. Confirm both render at `/#/presentation`. Remove temp slides. Hard binary gate — blocks Phase 2 if failing. | QA | haiku | 2 | 🔲 | 40.1–40.4 | — |
| 40.6 | **Docs: new types** — Update `docs/slides/README.md`: add `diagram` + `mockup` rows + usage examples. Create `src/slides/data/README.md`: naming convention (`{name}-en.ts` / `{name}-he.ts`). Update `CLAUDE.md`: slide count 8→10 in two places. Update `SKILL.md` built-in types table: add `diagram` + `mockup` rows. | PM | haiku | 4 | 🔲 | 40.2, 40.4 | `docs/slides/README.md`, `CLAUDE.md`, `SKILL.md`, `src/slides/data/README.md` |

### Phase 2: Example Presentations (20 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 40.7 | **TechBrief EN data** — Create `src/slides/data/slides-techbrief-en.ts`. 10 slides themed "AutoSpec": (1) title; (2) quote — spec drift problem; (3) content — 4 deliverable cards + 4 metrics; (4) timeline scrollable — 5 execution steps; (5) diagram `arch` — 5-node architecture; (6) diagram `sequence` — 4-actor flow; (7) diagram `er` — 3-entity model; (8) code — YAML sprint config 15 lines; (9) stats — 4 metrics + before/after columns; (10) closing — slash commands + links. Background: `circuits`. | PM | sonnet | 5 | 🔲 | 40.5 | — |
| 40.8 | **TechBrief HE translation** — Create `src/slides/data/slides-techbrief-he.ts`. Full Hebrew translation of 40.7. Prose fields translated; code/node labels/filenames stay English. | PM | haiku | 3 | 🔲 | 40.7 | — |
| 40.9 | **UIMockup EN data** — Create `src/slides/data/slides-uimockup-en.ts`. 10 slides themed "AutoDeck Dashboard DS": (1) title; (2) quote — design system problem; (3) content — 4 DS pillars + token counts; (4) stats — token/component counts + before/after; (5) timeline scrollable — 5-step design-to-code; (6) mockup wireframe — Dashboard (navbar, hero, card-grid, chart-bar); (7) mockup wireframe — Backlog (navbar, sidebar, table); (8) mockup flow — 3 mini-frames + CSS arrows; (9) comparison — Manual vs DS; (10) final. Background: `constellation`. | PM | sonnet | 5 | 🔲 | 40.5 | — |
| 40.10 | **UIMockup HE translation** — Create `src/slides/data/slides-uimockup-he.ts`. Full Hebrew translation of 40.9. Same English-preservation rule as 40.8. | PM | haiku | 3 | 🔲 | 40.9 | — |
| 40.11 | **Wire routes in App.tsx** — Import 4 new data files from `src/slides/data/`. Define `techBriefConfig` (background: `circuits`) + `uiMockupConfig` (background: `constellation`). Add `<Route path="/techbrief">` + `<Route path="/uimockup">`. Existing `path="/presentation"` (Acme) unchanged. `npm run build` exits 0. | Frontend | sonnet | 4 | 🔲 | 40.7, 40.9 | — |

### Phase 3: AI Generation Guide + Landing + Close (7 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 40.12 | **SKILL.md Generation Recipes** — Insert `## Generation Recipes` section between `## File Map` and `## SDD Development with AutoDeck`. **Recipe 1 (TechBrief)**: verbatim prompt template with `$PROJECT_NAME`, `$GIT_LOG`, `$SPEC_SUMMARY`, `$TEST_STATS` placeholders; slide-mapping table (feat commits → content cards, spec goal → quote question, test line → stats, done tickets → comparison right, open tickets → closing commands); 3-row error recovery. **Recipe 2 (UIMockup)**: verbatim template with `$DESIGN_BRIEF`, `$COMPONENT_LIST`, `$SCREEN_DESCRIPTIONS`; mapping table; error recovery. **Iteration Prompts**: 4 follow-up patterns. **Quality Bars**: TechBrief (≥1 diagram, ≥1 code, 8–12 slides, build passes); UIMockup (≥1 mockup wireframe, ≥1 mockup flow, 8–12 slides, build passes). | PM | sonnet | 4 | 🔲 | 40.11 | `SKILL.md` |
| 40.13 | **Landing page updates** — `SlideTypesSection`: add `diagram` + `mockup` cards, heading "8 Built-In Slide Types" → "10 Built-In Slide Types". `AIAssistedSection`: add TechBrief + UIMockup CTA cards linking to `#/techbrief` and `#/uimockup`. `FeaturesSection`: "8 slide types" → "10 slide types". `HowItWorksSection` step 2 path → `src/slides/data/acme-en.ts`. `npm run build`. | Frontend | haiku | 2 | 🔲 | 40.12 | `docs/landing/` |
| 40.14 | **Sprint close** — Verify `/#/presentation`, `/#/techbrief`, `/#/uimockup` all load, navigate, language-toggle. Verify backgrounds (`circuits`/`constellation`/`particles`) and RTL on all three. No console errors. Write `sprints/sprint-40/summary.md`. Update `specs/backlog.md` (all 40.x → ✅ Done). Commit + push. | QA | haiku | 1 | 🔲 | 40.12, 40.13 | `sprints/sprint-40/summary.md`, `specs/backlog.md` |

### QA Plan

| Test | Pass Condition |
|------|---------------|
| Build gate Phase 1 | `npm run build` exits 0 with temp diagram+mockup slides |
| DiagramSlide arch | Nodes + curved edges + draw-on animation at `#/techbrief` slide 5 |
| DiagramSlide sequence | Actor lifelines + horizontal message arrows at slide 6 |
| DiagramSlide ER | Entity boxes with field lists + relation labels at slide 7 |
| MockupSlide wireframe | Browser chrome + light bg + 4 blocks at `#/uimockup` slide 6 |
| MockupSlide sidebar+table | Sidebar rail + table rows at slide 7 |
| MockupSlide flow | 3 mini-frames + CSS arrow connectors at slide 8; no SVG in DOM |
| TechBrief EN nav | All 10 slides advance with ← →, progress dots correct |
| TechBrief HE RTL | Layout flips, Hebrew text, arrow keys reverse |
| UIMockup EN nav | All 10 slides, `constellation` background |
| UIMockup HE RTL | Same RTL checks |
| Acme regression | `#/presentation` still 9 slides, `particles` bg, no regression |
| Route isolation | `#/techbrief` + `#/uimockup` cold-navigated → correct deck loads |
| Language state isolation | Switch `#/techbrief` to HE; open `#/uimockup` → starts in EN |
| Landing CTA links | TechBrief + UIMockup CTAs from landing → correct presentations |
| Heading count | "10 Built-In Slide Types" in SlideTypesSection |
| Mobile 375px | No horizontal overflow on any new slide types |
| No new deps | `git diff package.json` shows no new entries |

### Docs Impact

| File | Action | Ticket |
|------|--------|--------|
| `src/slides/components/DiagramSlide.tsx` | Create | 40.1 |
| `src/slides/components/MockupSlide.tsx` | Create | 40.3 |
| `src/engine/types.ts` | Update — DiagramSlideData, MockupSlideData, BlockType | 40.2, 40.4 |
| `src/slides/registry.ts` | Update — diagram, mockup | 40.2, 40.4 |
| `src/slides/data/slides-techbrief-en.ts` | Create | 40.7 |
| `src/slides/data/slides-techbrief-he.ts` | Create | 40.8 |
| `src/slides/data/slides-uimockup-en.ts` | Create | 40.9 |
| `src/slides/data/slides-uimockup-he.ts` | Create | 40.10 |
| `src/slides/data/README.md` | Create — naming convention | 40.6 |
| `src/App.tsx` | Update — 2 new routes + inline configs | 40.11 |
| `SKILL.md` | Update — types table + Generation Recipes section | 40.6, 40.12 |
| `CLAUDE.md` | Update — slide count 8→10 | 40.6 |
| `docs/slides/README.md` | Update — diagram + mockup rows | 40.6 |
| `src/landing/LandingPage.tsx` | Update — 10 types, example links | 40.13 |
| `docs/landing/` | Update | 40.13 |
| `sprints/sprint-40/summary.md` | Create | 40.14 |
| `specs/backlog.md` | Update — Sprint 40 entries ✅ Done | 40.14 |

**Total: 53 points, 14 tickets**

---

## Bug Backlog

*No bugs yet — framework just launched.*

---

## Future Sprint Ideas

| Idea | Type | Notes |
|------|------|-------|
| Backport Sprint 38 a11y + mobile improvements | Enhancement | `prefers-reduced-motion`, hamburger nav |
| Add `UseCasesSlide` and `ArchitectureSlide` types | Feature | SVG pipeline, 3-column use cases |
| Add `LiveDemoSlide` with terminal typing simulation | Feature | macOS chrome, typing animation |
| Add speaker notes view | Feature | `notes` field, press S to toggle |
| Add light/dark theme switcher | Feature | Currently dark-only |
| Add copy-to-clipboard on ClosingSlide terminal | Enhancement | Clipboard button + tooltip |
| Full keyboard nav (Tab, Home, End) | Enhancement | Currently arrow keys only |
| Word-by-word animation on all text fields | Enhancement | Currently only TitleSlide tagline |
| Vitest unit tests for engine | Feature | Test navigation, RTL detection |
| Storybook for slide components | Feature | Visual dev environment |
