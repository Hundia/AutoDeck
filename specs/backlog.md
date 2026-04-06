# AutoDeck Backlog

**Project:** AutoDeck — React + Framer Motion Presentation Framework  
**Extracted from:** [AutoSpec](https://github.com/Hundia/autospec) — Sprints 10–38  
**Repository:** https://github.com/Hundia/AutoDeck  
**Last Updated:** 2026-04-06 (Sprint 47 closed)

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
| Sprint 40 | DiagramSlide + MockupSlide + Two Flagship Presentations | ✅ Done | 53 | diagram/mockup types, TechBrief, UIMockup, generation recipes |

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

## ✅ Sprint 40: DiagramSlide + MockupSlide + Two Flagship Presentations

**Goal:** Add two new reusable slide types (`diagram`, `mockup`), two flagship example presentations (TechBrief at `/#/techbrief`, UIMockup at `/#/uimockup`), and AI generation recipes in SKILL.md so any developer can generate a presentation from a codebase or spec.  
**Points:** 53  
**Status:** ✅ Done  
**Date:** 2026-04-04

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
| 40.1 | **DiagramSlide component** — Create `src/slides/components/DiagramSlide.tsx`. Three modes via `mode: 'arch' \| 'sequence' \| 'er'`. Shared interface: `nodes: [{id, label, sublabel?, col, row, color?}]`, `edges: [{from, to, label?, dashed?}]`. Fixed `viewBox="0 0 800 500"` SVG. Node layout: `x = col * 200 + 80`, `y = row * 120 + 60`. Nodes: `<rect>` + `<text>` color-coded. Edges: cubic bezier `<path>` with Framer Motion `pathLength` 0→1 draw-on (stagger 0.15s). Sequence mode: actor lifelines + horizontal message arrows. ER mode: field-list boxes. No new npm packages. | Frontend | sonnet | 8 | ✅ Done | — | `docs/slides/README.md` |
| 40.2 | **DiagramSlide register** — Add `DiagramSlideData` to `src/engine/types.ts`. Register `diagram: DiagramSlide` in `src/slides/registry.ts`. `npm run build` exits 0. | Frontend | haiku | 2 | ✅ Done | 40.1 | — |
| 40.3 | **MockupSlide component** — Create `src/slides/components/MockupSlide.tsx`. Browser chrome: 3 traffic-light dots + `bg-slate-800` bar + URL field (identical to CodeSlide pattern). Content area: `bg-slate-50 rounded-b-xl`. 8 block types: `navbar`, `hero`, `card-grid`, `table`, `form`, `chart-bar`, `sidebar`, `text-block`. `displayMode: 'flow'` renders 3 mini-frames side-by-side with CSS-only arrow connectors (absolutely-positioned divs with border — NO `getBoundingClientRect`, NO SVG overlay, must work inside Framer Motion AnimatePresence). Block stagger 0.1s. | Frontend | sonnet | 8 | ✅ Done | — | `docs/slides/README.md` |
| 40.4 | **MockupSlide register** — Add `MockupSlideData` + `BlockType` union to `src/engine/types.ts`. Register `mockup: MockupSlide` in `src/slides/registry.ts`. `npm run build` exits 0. | Frontend | haiku | 2 | ✅ Done | 40.3 | — |
| 40.5 | **Build gate (Phase 1)** — Add temp `diagram` slide (arch mode, 4 nodes, 3 edges) + `mockup` slide (browser, 3 blocks) to `slides-en.ts`. `npm run build` must exit 0. Confirm both render at `/#/presentation`. Remove temp slides. Hard binary gate — blocks Phase 2 if failing. | QA | haiku | 2 | ✅ Done | 40.1–40.4 | — |
| 40.6 | **Docs: new types** — Update `docs/slides/README.md`: add `diagram` + `mockup` rows + usage examples. Create `src/slides/data/README.md`: naming convention (`{name}-en.ts` / `{name}-he.ts`). Update `CLAUDE.md`: slide count 8→10 in two places. Update `SKILL.md` built-in types table: add `diagram` + `mockup` rows. | PM | haiku | 4 | ✅ Done | 40.2, 40.4 | `docs/slides/README.md`, `CLAUDE.md`, `SKILL.md`, `src/slides/data/README.md` |

### Phase 2: Example Presentations (20 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 40.7 | **TechBrief EN data** — Create `src/slides/data/slides-techbrief-en.ts`. 10 slides themed "AutoSpec": (1) title; (2) quote — spec drift problem; (3) content — 4 deliverable cards + 4 metrics; (4) timeline scrollable — 5 execution steps; (5) diagram `arch` — 5-node architecture; (6) diagram `sequence` — 4-actor flow; (7) diagram `er` — 3-entity model; (8) code — YAML sprint config 15 lines; (9) stats — 4 metrics + before/after columns; (10) closing — slash commands + links. Background: `circuits`. | PM | sonnet | 5 | ✅ Done | 40.5 | — |
| 40.8 | **TechBrief HE translation** — Create `src/slides/data/slides-techbrief-he.ts`. Full Hebrew translation of 40.7. Prose fields translated; code/node labels/filenames stay English. | PM | haiku | 3 | ✅ Done | 40.7 | — |
| 40.9 | **UIMockup EN data** — Create `src/slides/data/slides-uimockup-en.ts`. 10 slides themed "AutoDeck Dashboard DS": (1) title; (2) quote — design system problem; (3) content — 4 DS pillars + token counts; (4) stats — token/component counts + before/after; (5) timeline scrollable — 5-step design-to-code; (6) mockup wireframe — Dashboard (navbar, hero, card-grid, chart-bar); (7) mockup wireframe — Backlog (navbar, sidebar, table); (8) mockup flow — 3 mini-frames + CSS arrows; (9) comparison — Manual vs DS; (10) final. Background: `constellation`. | PM | sonnet | 5 | ✅ | 40.5 | — |
| 40.10 | **UIMockup HE translation** — Create `src/slides/data/slides-uimockup-he.ts`. Full Hebrew translation of 40.9. Same English-preservation rule as 40.8. | PM | haiku | 3 | ✅ | 40.9 | — |
| 40.11 | **Wire routes in App.tsx** — Import 4 new data files from `src/slides/data/`. Define `techBriefConfig` (background: `circuits`) + `uiMockupConfig` (background: `constellation`). Add `<Route path="/techbrief">` + `<Route path="/uimockup">`. Existing `path="/presentation"` (Acme) unchanged. `npm run build` exits 0. | Frontend | sonnet | 4 | ✅ | 40.7, 40.9 | — |

### Phase 3: AI Generation Guide + Landing + Close (7 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 40.12 | **SKILL.md Generation Recipes** — Insert `## Generation Recipes` section between `## File Map` and `## SDD Development with AutoDeck`. **Recipe 1 (TechBrief)**: verbatim prompt template with `$PROJECT_NAME`, `$GIT_LOG`, `$SPEC_SUMMARY`, `$TEST_STATS` placeholders; slide-mapping table (feat commits → content cards, spec goal → quote question, test line → stats, done tickets → comparison right, open tickets → closing commands); 3-row error recovery. **Recipe 2 (UIMockup)**: verbatim template with `$DESIGN_BRIEF`, `$COMPONENT_LIST`, `$SCREEN_DESCRIPTIONS`; mapping table; error recovery. **Iteration Prompts**: 4 follow-up patterns. **Quality Bars**: TechBrief (≥1 diagram, ≥1 code, 8–12 slides, build passes); UIMockup (≥1 mockup wireframe, ≥1 mockup flow, 8–12 slides, build passes). | PM | sonnet | 4 | ✅ Done | 40.11 | `SKILL.md` |
| 40.13 | **Landing page updates** — `SlideTypesSection`: add `diagram` + `mockup` cards, heading "8 Built-In Slide Types" → "10 Built-In Slide Types". `AIAssistedSection`: add TechBrief + UIMockup CTA cards linking to `#/techbrief` and `#/uimockup`. `FeaturesSection`: "8 slide types" → "10 slide types". `HowItWorksSection` step 2 path → `src/slides/data/acme-en.ts`. `npm run build`. | Frontend | haiku | 2 | ✅ Done | 40.12 | `docs/landing/` |
| 40.14 | **Sprint close** — Verify `/#/presentation`, `/#/techbrief`, `/#/uimockup` all load, navigate, language-toggle. Verify backgrounds (`circuits`/`constellation`/`particles`) and RTL on all three. No console errors. Write `sprints/sprint-40/summary.md`. Update `specs/backlog.md` (all 40.x → ✅ Done). Commit + push. | QA | haiku | 1 | ✅ Done | 40.12, 40.13 | `sprints/sprint-40/summary.md`, `specs/backlog.md` |

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
| ~~Add light/dark theme switcher~~ | ~~Feature~~ | Completed in Sprint 42 — three themes (Aurora/Sivania/Noir) |
| Add copy-to-clipboard on ClosingSlide terminal | Enhancement | Clipboard button + tooltip |
| Full keyboard nav (Tab, Home, End) | Enhancement | Currently arrow keys only |
| Word-by-word animation on all text fields | Enhancement | Currently only TitleSlide tagline |
| Vitest unit tests for engine | Feature | Test navigation, RTL detection |
| Storybook for slide components | Feature | Visual dev environment |

---

## 🔲 Sprint 41: Creation Story Panel

**Goal:** Add an opt-in "How This Was Built" side drawer to every presentation — surfacing the exact prompts, slide decisions, and framework comparisons (Claude Code / Copilot / Cursor / Gemini) that generated each deck.
**Points:** 44
**Status:** 🔲 Planned

### Problem Statement

AutoDeck presentations are AI-generated, but viewers have no window into how each deck was built. Engineers and PMs who want to replicate or iterate on a deck cannot see which prompts were used, what decisions were made per-slide, or how different AI frameworks compare. Sprint 41 surfaces this metadata as an opt-in Creation Story drawer accessible from any presentation.

### User Stories

- As a presentation viewer, I can open a Creation Story panel from any slide with a single click (or `I` key) and read the prompts that generated the deck.
- As a developer evaluating AI tools, I can read a framework comparison table showing how Claude Code, Copilot, Cursor, and Gemini performed on the same task.
- As a presentation author, I can opt in by passing `creationStory` to `PresentationViewer`; omitting it hides the feature entirely.
- As an RTL user, the drawer mounts on the left edge and the trigger pill button flips correctly.

### Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| `creationStory` placement | Separate prop on `PresentationViewerProps`, NOT `PresentationConfig` | Keeps config a pure presentation descriptor; story is viewer-level opt-in |
| Drawer mount side | `isRTL ? 'left-0' : 'right-0'` fixed panel | RTL-correct mirror |
| Keyboard | `I` toggles, `Escape` closes; `drawerOpen` guard before arrow/space | Avoids arrow key conflicts |
| Accordion | CSS `max-height` transition — no new npm deps | Zero-dep policy |
| Data location | Inline objects in `App.tsx` (or `src/slides/data/stories.ts`) | Adjacent to config/slides declarations |

### Phase 1: Types (4 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 41.1 | **Types** — Add `StoryPrompt`, `SlideDecision`, `CreationStory` interfaces to `src/engine/types.ts`. Add `creationStory?: CreationStory` to `PresentationViewerProps` (NOT PresentationConfig). `npm run build` exits 0. | PM | sonnet | 3 | ✅ | — | `src/engine/types.ts` |
| 41.2 | **Build gate** — Verify TypeScript compile exits 0 after types added. Hard binary gate. | QA | haiku | 1 | ✅ | 41.1 | — |

### Phase 2: Drawer Component (8 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 41.3a | **Drawer shell** — Create `src/engine/CreationStoryDrawer.tsx`. Fixed full-height panel `w-80 sm:w-96`, `right-0` (LTR) or `left-0` (RTL). Framer Motion spring slide-in (`x: '100%'→0` LTR / `x: '-100%'→0` RTL). Backdrop `bg-black/40` closes on click. Close button top-right (LTR) / top-left (RTL). Scrollable inner area. Props: `story: CreationStory`, `isRTL: boolean`, `onClose: () => void`. `npm run build` exits 0. | Frontend | sonnet | 3 | ✅ | 41.1 | — |
| 41.3b | **Prompts + Decisions sections** — Header stats pills (`totalPrompts` + `totalMinutes`). Collapsible Prompts accordion: each `StoryPrompt` renders label, framework badge (Claude Code=blue, Copilot=emerald, Cursor=violet, Gemini=amber), monospace prompt text. Collapsible Slide Decisions (if `decisions` defined): slide number chip + decision text. CSS `max-height` transitions. | Frontend | sonnet | 3 | ✅ | 41.3a | — |
| 41.3c | **Framework comparison** — Collapsible section (if `frameworkNotes` defined). Two-column table: framework name (color-coded) + note text. `npm run build` exits 0. | Frontend | sonnet | 2 | ✅ | 41.3a | — |

### Phase 3: PresentationViewer Integration (8 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 41.7 | **Trigger pill + drawer state** — In `PresentationViewer.tsx`: accept `creationStory?: CreationStory` prop. Add `drawerOpen` state. Render trigger pill fixed `bottom-8`, `isRTL ? 'left-4' : 'right-4'` only when `creationStory` defined — label "Creation Story", `BookOpen` icon. Render `<CreationStoryDrawer>` inside `<AnimatePresence>`. `npm run build` exits 0. | Frontend | sonnet | 5 | ✅ | 41.3a, 41.3b, 41.3c | — |
| 41.8 | **Keyboard guard** — `I` key toggles drawer; `Escape` closes; when `drawerOpen` is true arrow/space do not advance slides. Add `drawerOpen` to `useEffect` dep array. Verify backdrop click closes. No console errors. | QA | sonnet | 3 | ✅ | 41.7 | — |

### Phase 4: Data Files (12 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 41.9 | **Acme creation story** — `acmeStory: CreationStory` with 6–8 prompts, SlideDecisions, frameworkNotes for Claude Code + Copilot. | PM | sonnet | 3 | ✅ | 41.1 | — |
| 41.10 | **TechBrief creation story** — `techBriefStory: CreationStory` with 8–10 prompts referencing diagrams + YAML code. All 4 frameworks in frameworkNotes. | PM | sonnet | 3 | ✅ | 41.1 | — |
| 41.11 | **UIMockup creation story** — `uiMockupStory: CreationStory` with 8–10 prompts referencing mockup wireframe + flow. | PM | sonnet | 3 | ✅ | 41.1 | — |
| 41.12 | **HowTo creation story** — `howToStory: CreationStory` with 4–6 prompts. No `frameworkNotes` (single-framework deck). | PM | haiku | 3 | ✅ | 41.1 | — |

### Phase 5: App.tsx Wiring (4 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 41.13 | **Wire all four presentations** — Pass `creationStory={acmeStory}` / `techBriefStory` / `uiMockupStory` / `howToStory` to each `<PresentationViewer>`. `npm run build` exits 0. | Frontend | sonnet | 4 | ✅ | 41.7, 41.9–41.12 | — |

### Phase 6: Docs + Close (8 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 41.14 | **SKILL.md** — Add `## Creation Story` section: interface fields, wiring snippet, quality bar (≥4 prompts, RTL passes, `I` key works). | PM | sonnet | 3 | ✅ | 41.13 | `SKILL.md` |
| 41.15 | **Sprint close** — Smoke test all 4 presentations (drawer opens/closes, RTL, keyboard guard, mobile). Write `sprints/sprint-41/summary.md`. Update `specs/backlog.md` all 41.x → ✅ Done. Commit + push. | QA | haiku | 2 | ✅ | 41.14 | `sprints/sprint-41/summary.md` |
| 41.16 | **Landing page callout** — Add Creation Story feature callout card to `AIAssistedSection` in `LandingPage.tsx`. `npm run build` exits 0. | Frontend | haiku | 2 | ✅ | 41.7 | `src/landing/LandingPage.tsx` |
| 41.17 | **docs/engine/creation-story-drawer.md** — Interface reference, keyboard table, RTL behaviour, accordion sections, framework color map. | PM | haiku | 1 | ✅ | 41.14 | `docs/engine/creation-story-drawer.md` |

### QA Plan

| Test | Pass Condition |
|------|---------------|
| Build gate Phase 1 | `npm run build` exits 0 after types added |
| Build gate full | `npm run build` exits 0 after all implementation |
| Trigger pill visible (LTR) | Pill renders bottom-right on all 4 presentations when `creationStory` prop provided |
| Trigger pill absent | No pill when `creationStory` prop omitted |
| Drawer opens via pill | Click pill → spring slide-in from right (LTR) |
| Drawer opens via `I` key | Press `I` → drawer opens |
| Drawer closes — Escape | Press `Escape` → drawer closes, slide unchanged |
| Drawer closes — backdrop | Click backdrop → drawer closes |
| Arrow keys suppressed when open | `→` while drawer open → no slide advance |
| Arrow keys resume | After close → arrows advance slides normally |
| RTL pill position | Hebrew (HE): pill appears bottom-left |
| RTL drawer side | Hebrew (HE): drawer slides in from left edge |
| Prompts accordion | All prompts render label + framework badge + monospace text |
| Framework badge colors | Claude Code=blue, Copilot=emerald, Cursor=violet, Gemini=amber |
| Decisions accordion | Renders only when `decisions` defined; default collapsed |
| Framework comparison | Renders only when `frameworkNotes` defined |
| HowTo — no comparison section | `howToStory` has no `frameworkNotes` → section absent |
| Mobile 375px | `w-80` drawer fits; no overflow; pill visible |
| No new npm deps | `git diff package.json` zero new entries |
| Landing callout | Creation Story card visible in AIAssistedSection |

### Docs Impact

| File | Action | Ticket |
|------|--------|--------|
| `src/engine/types.ts` | Update — 3 new interfaces + PresentationViewerProps.creationStory | 41.1 |
| `src/engine/CreationStoryDrawer.tsx` | Create | 41.3a–c |
| `src/engine/PresentationViewer.tsx` | Update — drawerOpen state, trigger pill, keyboard guard | 41.7, 41.8 |
| `src/App.tsx` | Update — pass creationStory to all 4 routes | 41.13 |
| `src/landing/LandingPage.tsx` | Update — Creation Story callout card | 41.16 |
| `SKILL.md` | Update — ## Creation Story section | 41.14 |
| `docs/engine/creation-story-drawer.md` | Create | 41.17 |
| `sprints/sprint-41/summary.md` | Create | 41.15 |
| `specs/backlog.md` | Update — all 41.x → ✅ Done | 41.15 |

**Total: 44 points, 17 tickets**

---

## ✅ Sprint 42: Three Design Systems — Theme Switcher

**Goal:** Introduce a CSS-custom-property theme system with three named themes (Aurora, Sivania, Noir), wire a live theme-switcher into PresentationViewer, and migrate every hardcoded colour in slides and engine to semantic tokens.
**Points:** 49
**Status:** ✅ Complete

### Problem Statement

Every colour in AutoDeck is hardcoded: `bg-blue-500`, `text-purple-400`, `rgba(59,130,246,…)`. Switching visual style requires editing dozens of files. Sprint 42 introduces a 16-token CSS-variable contract, three pre-built themes, and a runtime switcher — so any presentation can be re-skinned instantly without touching slide data or component logic.

### User Stories

- As a presenter, I can select Aurora, Sivania, or Noir from a palette dropdown — deck re-skins instantly.
- As a presenter, my chosen theme persists via localStorage across sessions.
- As a slide author, I change nothing in slide data files — theming is CSS-only.
- As a developer, adding a fourth theme requires only one new `[data-theme="x"]` block in `index.css`.

### Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Token delivery | `[data-theme]` CSS custom properties on `document.documentElement` | Zero JS overhead; inherited by all children |
| ThemeProvider placement | Above `<HashRouter>` in App.tsx — single shared instance | No per-route flicker; theme persists across route changes |
| SVG colours | React inline `style={{ fill: 'var(--theme-…)' }}` | SVG presentation attributes do NOT inherit CSS vars — critical rule |
| ScrollProgressBar | `style={{ background: 'var(--theme-gradient)' }}` inline | Tailwind gradient utilities cannot reference CSS vars |
| Theme toggle UI | Third `<LanguageDropdown>` with `<Palette>` icon in existing cluster | Zero new UI primitives |
| Sivania font | Cormorant Garamond via Google Fonts CDN `@import` | CDN, not npm — allowed |

### CSS Token Reference

| Token | Aurora | Sivania | Noir |
|-------|--------|---------|------|
| `--theme-bg` | `#0f172a` | `#1a1a1a` | `#0a0a0a` |
| `--theme-surface` | `rgba(255,255,255,0.05)` | `#252525` | `#111111` |
| `--theme-surface-border` | `rgba(255,255,255,0.1)` | `#333333` | `#1e1e1e` |
| `--theme-text-primary` | `#ffffff` | `#f5f0e8` | `#f0f0f0` |
| `--theme-text-secondary` | `rgba(255,255,255,0.6)` | `#9a8c7e` | `#666666` |
| `--theme-accent-primary` | `#60a5fa` | `#698472` | `#00d9ff` |
| `--theme-accent-secondary` | `#a78bfa` | `#8e6a59` | `#0099b8` |
| `--theme-accent-glow` | `rgba(96,165,250,0.4)` | `rgba(105,132,114,0.3)` | `rgba(0,217,255,0.3)` |
| `--theme-nav-bg` | `rgba(255,255,255,0.1)` | `rgba(105,132,114,0.15)` | `rgba(0,217,255,0.08)` |
| `--theme-nav-border` | `rgba(255,255,255,0.06)` | `rgba(105,132,114,0.2)` | `rgba(0,217,255,0.15)` |
| `--theme-dot-active` | `#3b82f6` | `#698472` | `#00d9ff` |
| `--theme-font-display` | `'Inter' sans-serif` | `'Cormorant Garamond' serif` | `'JetBrains Mono' monospace` |
| `--theme-font-body` | `'Inter' sans-serif` | `'Inter' sans-serif` | `'JetBrains Mono' monospace` |
| `--theme-bg-effect-color-1` | `rgba(96,165,250,0.3)` | `rgba(105,132,114,0.2)` | `rgba(0,217,255,0.2)` |
| `--theme-bg-effect-color-2` | `rgba(139,92,246,0.2)` | `rgba(142,106,89,0.15)` | `rgba(0,153,184,0.12)` |
| `--theme-gradient` | `linear-gradient(to bottom, #60a5fa, #a78bfa)` | `linear-gradient(to bottom, #698472, #8e6a59)` | `linear-gradient(to bottom, #00d9ff, #0099b8)` |

### Phase 1: Theme Foundation (12 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 42.1 | **`src/engine/themes.ts`** — Export `ThemeId = 'aurora' \| 'sivania' \| 'noir'`, `THEMES` array `[{id, label}]`, `DEFAULT_THEME = 'aurora'`. No logic, pure constants. `npm run build` exits 0. | Frontend | haiku | 2 | ✅ | — | — |
| 42.2 | **`src/engine/ThemeContext.tsx`** — `ThemeContext`, `ThemeProvider` (reads/writes `localStorage.getItem('autodeck-theme')`, sets `document.documentElement.dataset.theme` on change), `useTheme()` hook. `npm run build` exits 0. | Frontend | haiku | 3 | ✅ | 42.1 | — |
| 42.3 | **`src/index.css` CSS tokens** — Add Cormorant Garamond to Google Fonts `@import`. Add three `[data-theme="aurora"]`, `[data-theme="sivania"]`, `[data-theme="noir"]` blocks with all 16 tokens from table above. Add `:root` Aurora fallback. `npm run build` exits 0. | Frontend | sonnet | 4 | ✅ | — | — |
| 42.4 | **`src/App.tsx` ThemeProvider** — Import `ThemeProvider`. Wrap `<HashRouter>` (above `<Routes>`) with single `<ThemeProvider>` — NOT inside individual route elements. LandingPage receives NO ThemeProvider. `npm run build` exits 0. | Frontend | haiku | 3 | ✅ | 42.2, 42.3 | — |

### Phase 2: PresentationViewer Integration (13 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 42.5 | **Apply `data-theme` + remove hardcoded bg** — In `PresentationViewer.tsx`: `useTheme()` → `data-theme={theme}` on root div. Replace `bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900` with `style={{ background: 'var(--theme-bg)' }}`. Replace active nav dot `bg-blue-500` with `style={{ background: 'var(--theme-dot-active)' }}`. `npm run build` exits 0. | Frontend | haiku | 3 | ✅ | 42.3, 42.4 | — |
| 42.6 | **Palette theme dropdown** — Import `Palette` from lucide-react (add to existing import). Define `THEME_OPTIONS` from `THEMES`. Add third `<LanguageDropdown>` (leftmost in cluster): icon=`<Palette size={14} />`, options=THEME_OPTIONS with `previewColors` arrays per theme. `npm run build` exits 0. | Frontend | sonnet | 3 | ✅ | 42.2, 42.5 | — |
| 42.6b | **`DropdownOption.previewColors`** — In `LanguageDropdown.tsx`, add `previewColors?: string[]` to `DropdownOption` interface. Render small color swatch circles next to label when present. Existing BG_OPTIONS/language options unaffected. `npm run build` exits 0. | Frontend | haiku | 2 | ✅ | 42.6 | — |
| 42.7 | **ScrollProgressBar gradient** — Replace Tailwind gradient class with `style={{ background: 'var(--theme-gradient)' }}`. `npm run build` exits 0. | Frontend | haiku | 2 | ✅ | 42.3, 42.4 | — |
| 42.8 | **LanguageDropdown active-dot** — Replace `bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.5)]` with `style={{ background: 'var(--theme-dot-active)', boxShadow: '0 0 6px var(--theme-accent-glow)' }}`. `npm run build` exits 0. | Frontend | haiku | 3 | ✅ | 42.3, 42.4 | — |

### Phase 3: Slide Component Theming (12 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 42.9 | **TitleSlide** — Replace: title gradient (`linear-gradient(135deg, var(--theme-accent-primary)…)`), drop-shadow hex → `var(--theme-accent-glow)`, ambient dots `bg-blue-400/20` → inline style, tagline `text-cyan-300` → `style={{ color: 'var(--theme-accent-secondary)' }}`. `npm run build` exits 0. | Frontend | sonnet | 4 | ✅ | 42.3, 42.4 | — |
| 42.10 | **ClosingSlide** — Replace tagline gradient with `var(--theme-gradient)` inline style; `text-blue-400` command code → `var(--theme-accent-primary)`; `text-white/60` links → `var(--theme-text-secondary)`. `npm run build` exits 0. | Frontend | haiku | 4 | ✅ | 42.3, 42.4 | — |
| 42.11 | **QuoteSlide + StatsSlide + ComparisonSlide + TimelineSlide** — Replace hardcoded `text-purple-400`, `text-blue-400`, `bg-cyan-500/10` etc. with CSS var equivalents. TimelineSlide connecting line gradient → `var(--theme-gradient)`. ComparisonSlide title gradient → `var(--theme-gradient)`. `npm run build` exits 0. | Frontend | sonnet | 4 | ✅ | 42.3, 42.4 | — |

### Phase 4: BackgroundEffects + DiagramSlide (6 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 42.12 | **BackgroundEffects SVG → inline style** — CRITICAL: SVG attributes `fill="rgba(…)"` do NOT inherit CSS vars. Convert all hardcoded fill/stroke rgba literals in CircuitLines, HexGrid, GradientPulse, WaveMesh, ParticleField to React `style={{ fill: 'var(--theme-bg-effect-color-1)' }}`. `npm run build` exits 0. | Frontend | sonnet | 4 | ✅ | 42.3, 42.4 | — |
| 42.13 | **DiagramSlide colorMap** — Replace blue/cyan colorMap entries with `{ fill: 'var(--theme-surface)', stroke: 'var(--theme-accent-primary/secondary)' }`. Convert `fill={colors.fill}` / `stroke={colors.stroke}` SVG attributes to `style={{ fill: colors.fill, stroke: colors.stroke }}` inline style. `npm run build` exits 0. | Frontend | sonnet | 2 | ✅ | 42.3, 42.4 | — |

### Phase 5: QA + Docs + Close (6 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 42.14 | **QA pass** — `npm run build` exits 0. Smoke-test all 3 themes on all 4 routes. Verify: ThemeProvider above Routes, no per-route flicker, localStorage persists, SVG fills use inline style (no `fill="rgba(…)"` remaining), BackgroundEffects tint shifts, ScrollProgressBar gradient tracks theme. | QA | haiku | 3 | ✅ | 42.1–42.13 | — |
| 42.15 | **Docs** — Update `CLAUDE.md`: add Theme System section (16 tokens, SVG inline-style rule, `useTheme()` hook). Update `docs/engine/` README: ThemeContext, themes.ts, token contract. | PM | haiku | 2 | ✅ | 42.14 | `CLAUDE.md`, `docs/engine/` |
| 42.16 | **Sprint close** — Write `sprints/sprint-42/summary.md`. Update `specs/backlog.md` all 42.x → ✅ Done. Commit + push. | PM | haiku | 1 | ✅ | 42.15 | `sprints/sprint-42/summary.md` |

### QA Plan

| Test | Pass Condition |
|------|---------------|
| Build gate | `npm run build` exits 0, zero TS errors |
| ThemeProvider placement | Single provider wraps `<HashRouter>`; no per-route providers |
| Aurora default | Fresh browser → `data-theme="aurora"`, visual matches current prod |
| Sivania switch | Bg `#1a1a1a`, Cormorant Garamond display font, sage/terracotta gradient |
| Noir switch | Bg `#0a0a0a`, cyan `#00d9ff` accent, JetBrains Mono display font |
| localStorage persist | Switch theme, refresh → same theme; `localStorage.getItem('autodeck-theme')` correct |
| Cross-route persistence | Switch theme on `/techbrief`, navigate to `/uimockup` → same theme |
| Landing isolation | No `data-theme` attribute on landing page DOM |
| Nav dot color | Active dot tracks `--theme-dot-active` in all 3 themes |
| ScrollProgressBar | Gradient tracks `--theme-gradient` (not Tailwind gradient class) |
| TitleSlide gradient | Title colors shift between blue/violet → sage/terracotta → cyan |
| BackgroundEffects | No `fill="rgba(…)"` SVG attributes; all use `style={{ fill: 'var(…)' }}` |
| DiagramSlide rects | `fill`/`stroke` via `style` prop, not SVG presentation attributes |
| Control cluster order | Theme | Background | Language pills left-to-right |
| No new npm packages | `git diff package.json` — zero new entries |
| Mobile 375px | All 3 pills visible; no overflow |

### Docs Impact

| File | Action | Ticket |
|------|--------|--------|
| `src/engine/themes.ts` | Create | 42.1 |
| `src/engine/ThemeContext.tsx` | Create | 42.2 |
| `src/index.css` | Update — Cormorant Garamond + 3× [data-theme] CSS blocks | 42.3 |
| `src/App.tsx` | Update — ThemeProvider above HashRouter | 42.4 |
| `src/engine/PresentationViewer.tsx` | Update — data-theme, hardcoded bg removal, Palette dropdown | 42.5, 42.6 |
| `src/engine/LanguageDropdown.tsx` | Update — previewColors field + active-dot CSS var | 42.6b, 42.8 |
| `src/engine/ScrollProgressBar.tsx` | Update — inline style gradient | 42.7 |
| `src/slides/components/TitleSlide.tsx` | Update | 42.9 |
| `src/slides/components/ClosingSlide.tsx` | Update | 42.10 |
| `src/slides/components/QuoteSlide.tsx` | Update | 42.11 |
| `src/slides/components/StatsSlide.tsx` | Update | 42.11 |
| `src/slides/components/ComparisonSlide.tsx` | Update | 42.11 |
| `src/slides/components/TimelineSlide.tsx` | Update | 42.11 |
| `src/engine/BackgroundEffects.tsx` | Update — SVG attrs → inline style | 42.12 |
| `src/slides/components/DiagramSlide.tsx` | Update — colorMap + SVG attrs | 42.13 |
| `CLAUDE.md` | Update — Theme System section | 42.15 |
| `docs/engine/README.md` | Update | 42.15 |
| `sprints/sprint-42/summary.md` | Create | 42.16 |
| `specs/backlog.md` | Update — all 42.x → ✅ Done | 42.16 |

**Total: 49 points, 16 tickets**

---

## Sprint 43: Polish + E2E Verification (18 pts)

**Theme:** Four targeted fixes — Creation Story discoverability, Acme closing slide whitespace, landing 3-steps alignment, hero CTA label — plus clean-folder E2E verification of all 4 presentations.  
**Status:** 🔄 In Progress  
**Date:** 2026-04-04

### Phase 1: Fixes (14 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 43.1 | **Creation Story pill prominence** — Remove `hidden sm:inline` from pill label so "Creation Story" text is always visible. Add subtle pulse animation on first render to draw attention. Keep bottom-right/left position, `z-50`. `npm run build` exits 0. | Frontend | sonnet | 3 | ✅ Done | — | — |
| 43.2 | **Acme ClosingSlide whitespace** — In `ClosingSlide.tsx`, fix the commands layout: change `flex items-center justify-between` to a two-column grid (`grid grid-cols-[auto_1fr]`) so code and description don't have excessive gap. `npm run build` exits 0. | Frontend | sonnet | 3 | ✅ Done | — | — |
| 43.3 | **Landing 3-steps Deploy alignment** — In `LandingPage.tsx`, shorten step 3 `desc` to `'GitHub Actions auto-deploys to Pages.'` so it fits one line like steps 1 & 2. Verify all three code chips are vertically aligned at same position. `npm run build` exits 0. | Frontend | haiku | 2 | ✅ Done | — | — |
| 43.4 | **Hero CTA rename** — In `LandingPage.tsx`, rename `'Build with AI →'` button to `'How to Build with AI →'`. Keep the violet-600 styling and Sparkles icon. Same href `#/howto`. Also update the QuickStart section if it has a duplicate CTA. `npm run build` exits 0. | Frontend | haiku | 2 | ✅ Done | — | — |
| 43.5 | **Backlog + sprint close** — Mark 43.1–43.4 ✅ Done. Write `sprints/sprint-43/summary.md`. | PM | haiku | 1 | ✅ Done | 43.1–43.4 | — |

### Phase 2: E2E Verification (4 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 43.6 | **Clean-folder E2E (run 1)** — `npm run build && npm run preview &`. Write and run Playwright script: verify all 4 presentations (/ → #/presentation, #/techbrief, #/uimockup, #/howto). Each: (a) slides render, (b) Creation Story pill visible + label text readable, (c) drawer opens on click, (d) no JS errors. Screenshots to `e2e-screenshots/run1/`. | QA | sonnet | 2 | ✅ Done | 43.1–43.4 | — |
| 43.7 | **Clean-folder E2E (run 2)** — Kill preview, rebuild from scratch. Re-run same Playwright script to `e2e-screenshots/run2/`. Both runs must pass 0 errors. | QA | sonnet | 2 | ✅ Done | 43.6 | — |

**Total: 18 points, 7 tickets**

---

## Sprint 44: Community Personas + Testimonials + E2E Verification (30 pts)

**Theme:** Three persona presentations from realistic users (EdTech founder, Rust OSS developer, PM), a "From the Community" testimonials section on the landing page, and Playwright E2E verification of all 7 presentations.  
**Status:** ✅ Done  
**Date:** 2026-04-05

### Phase 1: Slide Data (15 pts)

| ID | Ticket | Owner | Model | Pts | Status |
|----|--------|-------|-------|-----|--------|
| 44.1 | LearnFlow slides + creation story (9 slides, Noa Ben-David persona) | Frontend | sonnet | 5 | ✅ Done |
| 44.2 | Ferric slides + creation story (9 slides, Marcus Webb persona) | Frontend | sonnet | 5 | ✅ Done |
| 44.3 | Q2 Review slides + creation story (9 slides, Sarah Kim persona) | Frontend | sonnet | 5 | ✅ Done |

### Phase 2: Wiring + UI (8 pts)

| ID | Ticket | Owner | Model | Pts | Status |
|----|--------|-------|-------|-----|--------|
| 44.4 | App.tsx — 6 imports + 3 PresentationConfig objects + 3 Route elements | Frontend | sonnet | 3 | ✅ Done |
| 44.5 | LandingPage.tsx — TestimonialsSection + insert between AIAssisted/Footer | Frontend | sonnet | 5 | ✅ Done |

### Phase 3: QA + Close (7 pts)

| ID | Ticket | Owner | Model | Pts | Status |
|----|--------|-------|-------|-----|--------|
| 44.6 | E2E Playwright script — all 7 routes, 28 screenshots, 0 JS errors | QA | sonnet | 5 | ✅ Done |
| 44.7 | Build gate + QA smoke + sprint summary | QA | sonnet | 2 | ✅ Done |

**Total: 30 points, 7 tickets**

---

## Sprint 45: Image Blocks + DiagramSlide autoEdges + CodeSlide Terminal Chrome (32 pts)

**Theme:** Three slide-engine enhancements — image blocks in MockupSlide, autoEdges in DiagramSlide, and terminal chrome in CodeSlide — plus two updated showcase presentations, full documentation, and E2E verification.  
**Status:** ✅ Done  
**Date:** 2026-04-05

### Problem Statement

MockupSlide has no way to embed real screenshots or product images — it is wireframe-only, limiting its use for polished demos. DiagramSlide requires authors to manually specify every edge, a tedious and error-prone chore for well-structured node grids. CodeSlide renders code in a floating box but lacks the terminal/editor chrome that gives code slides visual authority. These three gaps are the most-requested enhancements from the Sprint 44 community persona presentations, and all three are additive — no existing slide data is broken.

### Phase 1: Types (4 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 45.1 | **`MockupBlock` image variant in `src/engine/types.ts`** — Extend `BlockType` union to include `'image'`. Add an `ImageBlock` sub-interface (or discriminated union member) with fields: `type: 'image'`, `src: string`, `alt: string` (required — TypeScript must enforce this at the data layer, not optional), `caption?: string`, `aspectRatio?: '16/9' \| '4/3' \| 'square'`. Ensure `MockupBlock` correctly covers all block types including the new image variant. `npm run build` exits 0. | Frontend | haiku | 2 | ✅ | — | `src/engine/types.ts` |
| 45.2 | **`DiagramSlideData.autoEdges` flag in `src/engine/types.ts`** — Add optional boolean field `autoEdges?: boolean` to `DiagramSlideData`. When `true`, the renderer should connect adjacent nodes in grid order (left-to-right within a row, then row-to-row), synthesizing edges automatically. The field is optional and defaults to `false` — all existing diagram slide data remains valid with zero changes. `npm run build` exits 0. | Frontend | haiku | 2 | ✅ | — | `src/engine/types.ts` |

### Phase 2: Components (16 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 45.3 | **MockupSlide image block renderer** — In `src/slides/components/MockupSlide.tsx`: (1) Delete all locally-declared types (`BlockType`, `MockupBlock`, `MockupFrame`) and replace with imports from `../../engine/types` — no duplicate type declarations. (2) Add a new `case 'image':` branch in `renderBlock()` that renders a `<figure>` element containing `<img alt={block.alt} />` styled to fill the block according to `block.aspectRatio` (default to `16/9` if omitted); when `block.caption` is present, render `<figcaption>` below the image. (3) `alt: string` is required — TypeScript must enforce this, so any image block missing `alt` must produce a compile-time error. `npm run build` exits 0. | Frontend | sonnet | 5 | ✅ | 45.1 | `src/slides/components/MockupSlide.tsx` |
| 45.4 | **DiagramSlide `autoEdges` computation** — In `src/slides/components/DiagramSlide.tsx`: (1) Delete locally-declared `DiagramNode`, `DiagramEdge`, `DiagramSlideData` interfaces and replace with imports from `../../engine/types`. (2) When `data.autoEdges === true`, compute a synthetic edge list before rendering: for each node, add an edge to the node with the next `col` in the same `row` (left-to-right), and to the node with the same `col` in the next `row` (top-to-bottom), skipping pairs where no such node exists. Merge synthesized edges with any explicitly provided `data.edges`. (3) Animate synthesized edges identically to manual edges (Framer Motion `pathLength` 0→1, stagger 0.15 s). `npm run build` exits 0. | Frontend | sonnet | 5 | ✅ | 45.2 | `src/slides/components/DiagramSlide.tsx` |
| 45.5 | **CodeSlide terminal/editor chrome** — In `src/slides/components/CodeSlide.tsx`: (1) Delete the locally-declared `CodeSlideData` interface and replace with an import from `../../engine/types` (add `CodeSlideData` there if not yet exported). (2) Wrap the existing code block in a terminal chrome frame: a top bar with three macOS-style traffic-light dots (red `#ff5f57`, yellow `#febc2e`, green `#28c840`) and, when `data.filename` is set, a centered filename pill in `text-xs text-slate-400`. The frame border and background must use CSS vars (`--theme-surface`, `--theme-surface-border`) so it themes correctly. (3) When `data.language` equals `'terminal'` or `'bash'`, prefix lines with a `$` prompt glyph in `--theme-accent-secondary`. `npm run build` exits 0. | Frontend | sonnet | 6 | ✅ | — | `src/slides/components/CodeSlide.tsx`, `src/engine/types.ts` |

### Phase 3: Showcase (4 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 45.6 | **Update LearnFlow + Q2 Review showcase presentations** — In `src/slides/data/slides-learnflow-en.ts` and `src/slides/data/slides-q2review-en.ts`: add at least one `mockup` slide per presentation that uses an `image` block (with a realistic placeholder `src` URL, required `alt` text, and `caption`). In `src/slides/data/slides-learnflow-en.ts` and/or `src/slides/data/slides-techbrief-en.ts`, add at least one `diagram` slide that uses `autoEdges: true`. Also update `src/slides/data/creation-story-learnflow.ts` and `src/slides/data/creation-story-q2review.ts` to add a prompt entry noting the new image block and/or autoEdges usage. `npm run build` exits 0. | Frontend | sonnet | 4 | ✅ | 45.3, 45.4, 45.5 | `src/slides/data/slides-learnflow-en.ts`, `src/slides/data/slides-q2review-en.ts`, `src/slides/data/creation-story-learnflow.ts`, `src/slides/data/creation-story-q2review.ts` |

### Phase 4: Docs (6 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 45.7 | **`SKILL.md` — image block + autoEdges + terminal chrome authoring guide** — Add or update three sub-sections in `SKILL.md`: (1) MockupSlide `image` block — block-types table row with all four fields (`src`, `alt`, `caption`, `aspectRatio`), a copy-paste example, and a warning that `alt` is required (TS error if omitted); include an "authenticated URLs will not load" warning with a positive example (public CDN URL) and a negative example (private/signed URL). (2) DiagramSlide `autoEdges` flag — explain grid-layout prerequisite (nodes must have distinct `col`/`row` coords), copy-paste example, and note that explicit `edges` are merged with generated ones. (3) CodeSlide terminal chrome — explain the `language: 'terminal'` prompt-glyph behavior and the filename pill. | PM | sonnet | 4 | ✅ | 45.3, 45.4, 45.5 | `SKILL.md` |
| 45.8 | **`docs/slides/README.md` — update slide type reference** — Update the MockupSlide, DiagramSlide, and CodeSlide sections of `docs/slides/README.md` (or equivalent docs file) to document the new fields: `image` block with all four properties, `autoEdges` boolean, and CodeSlide terminal chrome behavior. Ensure the block-types table for MockupSlide includes the `image` row. | PM | haiku | 2 | ✅ | 45.7 | `docs/slides/README.md` |

### Phase 5: QA + Close (2 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 45.9 | **E2E Playwright verification** — Run `npm run build && npm run preview`. Write and run a Playwright script that visits all active routes (`/`, `#/presentation`, `#/techbrief`, `#/uimockup`, `#/howto`, `#/learnflow`, `#/ferric`, `#/q2review`) and: (a) verifies zero JS console errors; (b) on LearnFlow and Q2 Review routes, navigates to the mockup slide with an image block and asserts that `<figure>` is present in the DOM and `<img>` has a non-empty `alt` attribute; (c) on any diagram slide with `autoEdges: true`, asserts that at least one `<path>` edge element is rendered; (d) on any CodeSlide with `language: 'terminal'`, asserts the `$` prompt glyph is present. Screenshots to `e2e-screenshots/sprint-45/`. | QA | haiku | 1 | ✅ | 45.6 | — |
| 45.10 | **Sprint close** — Mark all 45.x tickets ✅ Done. Write `sprints/sprint-45/summary.md` covering: what shipped, key architectural decisions (image block semantic HTML, autoEdges grid algorithm, terminal chrome theming), and any follow-on ideas. Update `specs/backlog.md` header `Last Updated` date. Commit + push. | PM | haiku | 1 | ✅ | 45.9 | `sprints/sprint-45/summary.md`, `specs/backlog.md` |

### QA Plan

| Test | Pass Condition |
|------|----------------|
| Build gate | `npm run build` exits 0, zero TypeScript errors |
| `alt` required enforcement | Omitting `alt` from an image block in slide data produces a TS compile error |
| `<figure>` wrapper present | Image block in MockupSlide renders `<figure>` in the DOM; no bare `<img>` without wrapper |
| `<figcaption>` conditional | `<figcaption>` is present in DOM when `caption` set; absent when `caption` omitted |
| autoEdges path count | A diagram slide with 4 nodes in a 2×2 grid and `autoEdges: true`, no explicit edges → renders ≥ 3 `<path>` elements |
| autoEdges + explicit edges merge | A diagram with `autoEdges: true` plus 1 explicit extra edge → renders more paths than autoEdges alone would produce |
| autoEdges animation | Synthesized edge paths animate `pathLength` 0→1 with stagger (same as manual edges) |
| Terminal chrome dots | CodeSlide with any `language` value renders three traffic-light dots in the top bar |
| Terminal `$` glyph | CodeSlide with `language: 'terminal'` or `'bash'` renders `$` glyph prefix on code lines |
| Filename pill | CodeSlide with `filename` set renders the filename in the top chrome bar |
| Chrome theming | CodeSlide frame border and background use `--theme-surface` / `--theme-surface-border`; visually correct in all 3 themes |
| SKILL.md `image` row | SKILL.md MockupSlide block-types table includes `image` row with all four fields (`src`, `alt`, `caption`, `aspectRatio`) |
| SKILL.md auth URL warning | SKILL.md includes "authenticated URLs will not load" warning with positive + negative URL examples |
| LearnFlow/Q2 image block E2E | Playwright visits LearnFlow and Q2 Review routes, finds `<figure>` + non-empty `alt` in image block slide |
| autoEdges E2E | Playwright visits a route with `autoEdges: true` diagram slide, asserts `<path>` elements present |
| No new npm deps | `git diff package.json` — zero new entries |
| All 8 routes load | Zero JS console errors on all routes in Playwright run |

### Docs Impact

| File | Action |
|------|--------|
| `src/engine/types.ts` | Update — `BlockType` extended with `'image'`; `ImageBlock` interface added; `autoEdges?: boolean` on `DiagramSlideData`; `CodeSlideData` exported |
| `src/slides/components/MockupSlide.tsx` | Update — local types deleted, imported from engine; `case 'image'` block renderer with `<figure>`/`<img>`/`<figcaption>` |
| `src/slides/components/DiagramSlide.tsx` | Update — local types deleted, imported from engine; `autoEdges` grid computation + merge logic |
| `src/slides/components/CodeSlide.tsx` | Update — local types deleted, imported from engine; terminal chrome frame + traffic-light dots + filename pill + `$` glyph |
| `src/slides/data/slides-learnflow-en.ts` | Update — add mockup slide with image block + diagram slide with `autoEdges: true` |
| `src/slides/data/slides-q2review-en.ts` | Update — add mockup slide with image block |
| `src/slides/data/creation-story-learnflow.ts` | Update — add prompt entry for new image block / autoEdges usage |
| `src/slides/data/creation-story-q2review.ts` | Update — add prompt entry for new image block usage |
| `SKILL.md` | Update — image block section, autoEdges section, terminal chrome section |
| `docs/slides/README.md` | Update — MockupSlide image block, DiagramSlide autoEdges, CodeSlide terminal chrome |
| `sprints/sprint-45/summary.md` | Create |
| `specs/backlog.md` | Update — all 45.x → ✅ Done, header date updated |

**Total: 32 points, 10 tickets**

---

## Sprint 46: Presentation Gallery Section (25 pts)

**Theme:** Add a Presentation Gallery section to the landing page — a responsive grid of Playwright-captured thumbnail cards (one per showcase presentation) that lets visitors preview all 7 AutoDeck demos at a glance, with slide count, "View →" link, and `onError` fallback for resilience.
**Status:** ✅ Done
**Date:** 2026-04-05

### Problem Statement

The landing page describes AutoDeck's capabilities but never shows the actual presentations. A first-time visitor reads "Beautiful animated presentations" but must click blindly into `#/presentation` to see one. The Gallery section closes this gap: a responsive grid of thumbnail cards immediately after the Testimonials section answers "what does this look like?" for all 7 showcase presentations in one scan. Thumbnails are captured once via Playwright and committed to `public/thumbnails/`; all paths use `import.meta.env.BASE_URL` so any fork or GitHub Pages deployment works correctly without path changes.

### Phase 1: Config + Types (3 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 46.1 | **`galleryConfig.ts` — `GalleryEntry` interface + 7-entry static array** — Create `src/landing/galleryConfig.ts`. Define and export a `GalleryEntry` interface with fields: `id: string`, `title: string`, `slideCount: number`, `route: string` (hash route, e.g. `'#/techbrief'`), `thumbnail: string` (PNG filename, e.g. `'techbrief.png'`). Export `galleryConfig: GalleryEntry[]` with all 7 presentations: acme (9 slides, `#/presentation`), techbrief (10 slides), uimockup (verify count from `slidesUimockupEN.length`), howto (10 slides), learnflow (9 slides), ferric (9 slides), q2review (verify count from `slidesQ2ReviewEN.length`). `npm run build` exits 0. | Frontend | haiku | 3 | ✅ | — | `src/landing/galleryConfig.ts` |

### Phase 2: Component + Wiring (5 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 46.2 | **`GallerySection.tsx` — responsive gallery grid component** — Create `src/landing/GallerySection.tsx`. Import `galleryConfig`. Render a `<section>` with heading ("Presentation Gallery") and responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`). Per card: (1) `<img src={${import.meta.env.BASE_URL}thumbnails/${entry.thumbnail}} alt={${entry.title} — ${entry.slideCount} slides}` with `onError` handler that injects a styled placeholder div (slate bg + title initials — no layout shift); (2) title (`text-white font-semibold`); (3) slide count (`text-white/50 text-xs`); (4) `<a href={entry.route}>View →</a>` in blue. Cards animate with Framer Motion `whileInView`, `viewport={{ once: true }}`, stagger `delay: i * 0.08`. Card hover: `whileHover={{ y: -4 }}`. No new npm deps. `npm run build` exits 0. | Frontend | sonnet | 4 | ✅ | 46.1 | `src/landing/GallerySection.tsx` |
| 46.3 | **Wire `GallerySection` into `LandingPage.tsx`** — In `src/landing/LandingPage.tsx`: add `import GallerySection from './GallerySection'`; insert `<GallerySection />` between `<TestimonialsSection />` and `<FooterSection />` in the JSX return (do NOT modify `src/landing/index.ts` — it only re-exports `LandingPage` and needs no change). `npm run build` exits 0. | Frontend | haiku | 1 | ✅ | 46.2 | `src/landing/LandingPage.tsx` |

### Phase 3: Thumbnails (3 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 46.4 | **`scripts/gallery-capture.js` — Playwright thumbnail capture script** — Create `scripts/gallery-capture.js`. Model on `e2e-sprint44.js` (same route list, same viewport 1440×900). Output dir: `public/thumbnails/` (create with `fs.mkdirSync`). For each route: `goto`, `waitForLoadState('networkidle')`, `waitForTimeout(1500)`, then `page.screenshot({ path: \`public/thumbnails/${name}.png\` })`. Names: `acme`, `techbrief`, `uimockup`, `howto`, `learnflow`, `ferric`, `q2review`. Script exits 0. | QA | haiku | 2 | ✅ | 46.3 | `scripts/gallery-capture.js` |
| 46.5 | **Add `gallery:capture` npm script + run + commit 7 PNGs** — In `package.json` add `"gallery:capture": "node scripts/gallery-capture.js"` to `scripts`. Start `npm run preview` (port 4173), run `npm run gallery:capture`, verify 7 PNG files exist in `public/thumbnails/`. Commit the PNGs as static assets (they are deployed verbatim to GitHub Pages). `npm run build` exits 0. | Frontend | haiku | 1 | ✅ | 46.4 | `package.json`, `public/thumbnails/` |

### Phase 4: QA + Verification (3 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 46.6 | **E2E Playwright verification** — Write and run `e2e-sprint46.js` (model on `e2e-sprint45.js`). Assertions: (1) landing page `#/` — `GallerySection` present in DOM (check for 7 card `<a>` elements pointing to gallery routes); (2) each card `<img>` has non-empty `alt`; (3) zero JS console errors on `#/`; (4) programmatically set one `<img src>` to an invalid URL and assert the `onError` placeholder div appears (no broken-image icon, no layout collapse); (5) run at mobile viewport 390×844 — gallery section visible, cards stack correctly. Screenshots to `e2e-screenshots/sprint-46/`. Add **TC-UI-09** to `specs/05_qa_lead.md`: `\| TC-UI-09 \| \`/\` Gallery section \| All 7 thumbnail cards render, links resolve, onError fallback present, mobile layout collapses correctly \|`. Both runs must exit 0. | QA | sonnet | 3 | ✅ | 46.5 | `specs/05_qa_lead.md` |

### Phase 5: Docs + Close (3 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 46.7 | **`SKILL.md` — GallerySection authoring guide** — Add a sub-section under the landing page documentation in `SKILL.md` titled "### GallerySection". Document: (1) how to add a new presentation to `galleryConfig.ts` (copy-paste `GalleryEntry` example); (2) how to regenerate thumbnails (`npm run build && npm run preview &` then `npm run gallery:capture`); (3) thumbnail path convention — `${import.meta.env.BASE_URL}thumbnails/{id}.png` — with a positive example (`${BASE_URL}thumbnails/techbrief.png`) and a negative example (hardcoded `/AutoDeck/thumbnails/techbrief.png` — breaks forks); (4) `onError` fallback behavior. | PM | haiku | 1 | ✅ | 46.6 | `SKILL.md` |
| 46.8 | **`docs/landing/README.md` — add GallerySection entry** — Add a `### GallerySection` entry documenting: layout (4-col desktop / 2-col tablet / 1-col mobile), thumbnail path convention (`import.meta.env.BASE_URL`), `onError` fallback, and how to add a card (update `galleryConfig.ts` + run `npm run gallery:capture`). Update the section inventory at the top of the file to include `GallerySection` (after TestimonialsSection). | PM | haiku | 1 | ✅ | 46.7 | `docs/landing/README.md` |
| 46.9 | **Sprint close** — Mark all 46.x tickets ✅ Done in `specs/backlog.md`. Write `sprints/sprint-46/summary.md` following Sprint 45 format: what shipped, key decisions (BASE_URL thumbnail path, onError fallback, gallery placement), E2E results, follow-on ideas. Update `specs/backlog.md` Sprint 46 status to ✅ Done. Update header `Last Updated`. | PM | haiku | 1 | ✅ | 46.8 | `sprints/sprint-46/summary.md`, `specs/backlog.md` |

### QA Plan

| Test | Pass Condition |
|------|----------------|
| Build gate | `npm run build` exits 0, zero TypeScript errors |
| All 7 cards render | Landing page DOM contains 7 gallery card `<a>` elements |
| `<img>` alt attributes | Each card `<img>` has non-empty `alt` matching `"{title} — {N} slides"` |
| Thumbnail `BASE_URL` path | Each `<img src>` is prefixed with `import.meta.env.BASE_URL` — not hardcoded `/AutoDeck/` |
| `onError` fallback | Programmatically broken `<img src>` → placeholder div renders; no layout shift |
| Mobile layout (390×844) | Gallery section visible; cards stack to ≤2 columns; no horizontal overflow |
| Gallery links correct | Each card `href` matches one of the 7 known hash routes |
| Zero JS console errors | `page.on('pageerror')` array empty after landing page load + 2s settle |
| 7 PNG thumbnails committed | `public/thumbnails/` contains all 7 `.png` files, each >1 KB |
| TC-UI-09 added | `specs/05_qa_lead.md` contains TC-UI-09 row |
| SKILL.md `BASE_URL` example | SKILL.md includes both positive and negative thumbnail path examples |

### Docs Impact

| Doc File | Action | Description |
|----------|--------|-------------|
| `src/landing/galleryConfig.ts` | Create | `GalleryEntry` interface + 7-entry static metadata array |
| `src/landing/GallerySection.tsx` | Create | Responsive gallery grid component |
| `src/landing/LandingPage.tsx` | Update | Import + insert `<GallerySection />` between Testimonials and Footer |
| `scripts/gallery-capture.js` | Create | Playwright thumbnail capture script |
| `package.json` | Update | Add `gallery:capture` npm script |
| `public/thumbnails/` | Create | 7 PNG files committed as static assets |
| `specs/05_qa_lead.md` | Update | Add TC-UI-09 |
| `SKILL.md` | Update | GallerySection authoring guide + BASE_URL convention |
| `docs/landing/README.md` | Update | Add `### GallerySection` entry + update section inventory |
| `sprints/sprint-46/summary.md` | Create | Sprint summary |
| `specs/backlog.md` | Update | All 46.x → ✅ Done; header date |

**Total: 25 points, 9 tickets**

---

## Sprint 47: Make AutoDeck Go Viral (48 pts)

**Theme:** Virality infrastructure — a shareable meta-presentation at `#/meta`, a Share modal on every presentation, GitHub star counter, deploy buttons, "By the Numbers" stats section, OG image generation, an interactive branding link engine change, and a README prose upgrade to attract stars and forks.
**Status:** ✅ Done
**Date:** 2026-04-06

### Problem Statement

AutoDeck has 7 polished showcase presentations and a well-documented landing page, but no viral loop. Visitors cannot share a presentation link with a preview image — no Open Graph tags means blank social previews on Twitter/LinkedIn. There is no one-click deploy path for new users, and the landing page shows no social proof from the repo itself. The branding watermark in every presentation is plain static text with no action. Sprint 47 closes all four gaps: a `#/meta` deck serves as AutoDeck's own pitch page and OG-image source; a Share modal gives every deck a native share/embed flow; a GitHub star counter and deploy buttons anchor social credibility on the landing page; and the branding block becomes an interactive link backed by a typed `brandingUrl` field in `PresentationConfig`.

### Phase 1: Meta Presentation (8 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 47.1 | **`slides-meta-en.ts` — AutoDeck pitch deck data** — Create `src/slides/data/slides-meta-en.ts`. 8 slides: (1) `title` — "AutoDeck" / tagline "AI-generated. Framework-ready. Open source." / badge "11 Sprints"; (2) `stats` — 4 counters: 10 slide types, 7 showcase decks, 3 themes, ~443 pts invested; (3) `content` — feature pillars (Framer Motion, RTL, Theme System, Creation Story); (4) `diagram` arch — App → PresentationViewer → SlideRegistry → SlideComponent, `autoEdges: true`; (5) `code` — SKILL.md generation recipe snippet, `language: 'bash'`, `filename: 'SKILL.md'`; (6) `comparison` — Manual slide building vs AutoDeck AI generation; (7) `timeline` — Sprint 39→46 milestones; (8) `closing` — GitHub link + "Build Your First Deck" CTA. Background: `particles`. Export `slidesMetaEN`. `npm run build` exits 0. | PM | sonnet | 5 | ✅ | — | `src/slides/data/slides-meta-en.ts` |
| 47.2 | **`creation-story-meta.ts` — meta creation story data** — Create `src/slides/data/creation-story-meta.ts`. Export `metaCreationStory: CreationStory` with 6 prompts covering: deck concept, stats slide numbers, diagram layout, code snippet selection, comparison framing, closing CTA. `frameworkNotes` for Claude Code. `npm run build` exits 0. | PM | haiku | 2 | ✅ | 47.1 | `src/slides/data/creation-story-meta.ts` |
| 47.3 | **Wire `#/meta` route in `App.tsx`** — Import `slidesMetaEN` and `metaCreationStory`. Define `metaConfig: PresentationConfig` (`title: 'AutoDeck'`, `background: 'particles'`, `branding: 'Built with AutoDeck'`, `brandingUrl: 'https://github.com/Hundia/AutoDeck'`). Add `<Route path="/meta">` with full `PresentationViewer` wiring. `npm run build` exits 0. | Frontend | haiku | 1 | ✅ | 47.1, 47.2 | `src/App.tsx` |

### Phase 2: Branding Link Engine Change (6 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 47.4 | **`PresentationConfig.brandingUrl` + interactive branding block** — (a) In `src/engine/types.ts`, add `brandingUrl?: string` field to `PresentationConfig` after `branding?: string`. (b) In `src/engine/PresentationViewer.tsx`, replace the branding `<div>` with a conditional: if `creationStory` defined → `<button>` that calls `setDrawerOpen(true)`; else if `brandingUrl` defined → `<a href={brandingUrl} target="_blank" rel="noopener noreferrer">`; else → original `<div>`. All three share existing `fixed bottom-4 text-xs text-white/30` classes. (c) Update `docs/engine/README.md`: add `brandingUrl` to `PresentationConfig` fields table; add `### Branding Block` section documenting the three-state rendering logic. `npm run build` exits 0. | Frontend | sonnet | 5 | ✅ | — | `src/engine/types.ts`, `src/engine/PresentationViewer.tsx`, `docs/engine/README.md` |
| 47.5 | **Add `brandingUrl` to all existing configs** — In `src/App.tsx` and `src/config.ts`, add `brandingUrl: 'https://github.com/Hundia/AutoDeck'` to every `PresentationConfig` object that has `branding: 'Built with AutoDeck'`. `npm run build` exits 0. | Frontend | haiku | 1 | ✅ | 47.4 | `src/App.tsx`, `src/config.ts` |

### Phase 3: Share Modal (10 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 47.6 | **`ShareModal.tsx` — share and embed modal component** — Create `src/engine/ShareModal.tsx`. Props: `url: string`, `title: string`, `onClose: () => void`. Modal overlay `bg-black/60`, centered card `bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md`. Three tabs: **Link** (copy-to-clipboard button for `url`, green checkmark 2s reset), **Embed** (`<textarea>` with `<iframe>` snippet; beneath: `text-xs text-white/40` note "Note: Embedding requires the presentation to be deployed on a non-GitHub-Pages host (GitHub Pages restricts iframe embedding)."), **Social** (X and LinkedIn share URL `window.open` buttons). Close on backdrop click and `Escape` key. Framer Motion `AnimatePresence` scale-in. No new npm deps. `npm run build` exits 0. | Frontend | sonnet | 6 | ✅ | — | `src/engine/ShareModal.tsx` |
| 47.7 | **Wire Share button into `PresentationViewer.tsx`** — Add `shareOpen` state. Import and render `<ShareModal>` inside `<AnimatePresence>` when open. Add Share button (Lucide `Share2` icon, size 14) as rightmost control in the existing control cluster (same pill style). Pass `url={window.location.href}` and `title={config.title}`. While `shareOpen` is true, suppress arrow/space key slide advance (same guard as `drawerOpen`). `npm run build` exits 0. | Frontend | sonnet | 4 | ✅ | 47.6 | `src/engine/PresentationViewer.tsx` |

### Phase 4: GitHub Stars + Gallery Featured Card (8 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 47.8 | **`GalleryEntry.featured` + meta gallery card** — (a) In `src/landing/galleryConfig.ts`, extend `GalleryEntry` interface with `featured?: boolean`. Prepend entry `{ id: 'meta', title: 'AutoDeck — The Framework', slideCount: 8, route: '#/meta', thumbnail: 'meta.png', featured: true }`. (b) In `src/landing/GallerySection.tsx`, replace any `id === 'meta'` magic check with `entry.featured === true`; render the featured card with `ring-2 ring-blue-500` and a "★ Featured" badge (`absolute top-2 right-2`). `npm run build` exits 0. | Frontend | haiku | 3 | ✅ | 47.3 | `src/landing/galleryConfig.ts`, `src/landing/GallerySection.tsx` |
| 47.9 | **`GitHubStarCounter.tsx` — live star count with cache** — Create `src/landing/GitHubStarCounter.tsx`. On mount, fetch `https://api.github.com/repos/Hundia/AutoDeck` for `stargazers_count`. localStorage cache with 1-hour TTL: key `autodeck-gh-stars`, value `{ count: number, ts: number }` — if `Date.now() - ts < 3_600_000` use cached value, else fetch and update. Render: Lucide `Star` icon (yellow) + animated count (Framer Motion spring from 0). Skeleton pulse while loading. Show `'—'` on fetch error. No new npm deps. `npm run build` exits 0. | Frontend | sonnet | 5 | ✅ | — | `src/landing/GitHubStarCounter.tsx` |

### Phase 5: Landing Page Viral Sections (10 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 47.10 | **`ByTheNumbersSection`** — Add `ByTheNumbersSection` function to `src/landing/LandingPage.tsx`. Four stat cards `grid-cols-2 md:grid-cols-4`: (1) GitHub Stars → `<GitHubStarCounter />`; (2) "7 Showcase Decks"; (3) "10 Built-In Types"; (4) "443 pts invested". Framer Motion `whileInView` entrance. Insert between `<GallerySection />` and `<FooterSection />`. Import `GitHubStarCounter` from `./GitHubStarCounter`. `npm run build` exits 0. | Frontend | sonnet | 4 | ✅ | 47.9 | `src/landing/LandingPage.tsx` |
| 47.11 | **`DeployButtonsSection`** — Add `DeployButtonsSection` function to `src/landing/LandingPage.tsx`. Four buttons: Vercel (`https://vercel.com/new/clone?repository-url=https://github.com/Hundia/AutoDeck`), Netlify (`https://app.netlify.com/start/deploy?repository=https://github.com/Hundia/AutoDeck`), Stackblitz (`https://stackblitz.com/github/Hundia/AutoDeck`), Codespaces (`https://github.com/codespaces/new?repo=Hundia/AutoDeck`). Each shows platform name + Lucide icon. Insert between `<HowItWorksSection />` and `<QuickStartSection />`. `npm run build` exits 0. | Frontend | sonnet | 4 | ✅ | — | `src/landing/LandingPage.tsx` |
| 47.12 | **README revamp** — Rewrite `README.md`: (1) badge row (build status, license, stars shields.io badge, demo link); (2) one-sentence tagline; (3) features bullet list; (4) Quick Start 3-command block; (5) deploy table (Vercel/Netlify/Stackblitz/Codespaces); (6) presentations table with all 8 routes including `#/meta`; (7) Contributing + License. `npm run build` exits 0. | PM | haiku | 2 | ✅ | 47.3 | `README.md` |

### Phase 6: OG Image + Meta Thumbnail (5 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 47.13 | **Capture `meta.png` thumbnail** — Add `{ route: '#/meta', name: 'meta' }` to `PRESENTATIONS` array in `scripts/gallery-capture.js`. Run `npm run build && npm run preview`, then `npm run gallery:capture`. Verify `public/thumbnails/meta.png` exists and is > 1 KB (1440×900 — consistent with other 7 gallery thumbnails). Commit. `npm run build` exits 0. | QA | haiku | 2 | ✅ | 47.3 | `scripts/gallery-capture.js`, `public/thumbnails/meta.png` |
| 47.14 | **`public/og-image.png` + OG meta tags** — Create `scripts/og-capture.js`: Playwright viewport 1200×630, navigate to `http://localhost:4173/AutoDeck/#/meta`, `waitForLoadState('networkidle')`, `waitForTimeout(2000)`, screenshot to `public/og-image.png`. Add `"og:capture": "node scripts/og-capture.js"` to `package.json`. Run script. In `index.html` add: `<meta property="og:image" content="/AutoDeck/og-image.png" />`, `<meta property="og:title" content="AutoDeck — AI-Powered Presentation Framework" />`, `<meta property="og:description" content="Build stunning animated presentations with React + Framer Motion + AI." />`. Commit `public/og-image.png`. `npm run build` exits 0. | DevOps | haiku | 3 | ✅ | 47.3 | `scripts/og-capture.js`, `public/og-image.png`, `index.html`, `package.json` |

### Phase 7: QA + Docs + Close (7 pts)

| ID | Ticket | Owner | Model | Pts | Status | Deps | Docs |
|----|--------|-------|-------|-----|--------|------|------|
| 47.15 | **E2E Playwright verification** — Write and run `e2e-sprint47.js`. Assertions: (1) `#/meta` loads, 8 slides, no JS errors; (2) branding block is `<a>` pointing to GitHub; (3) Share button present on `#/presentation`; (4) Share modal opens, shows 3 tabs; (5) Embed tab contains iframe limitation note text; (6) `#/` — ByTheNumbers section present (4 stat tiles); (7) DeployButtonsSection — Vercel link present; (8) meta gallery card has `ring-2` class; (9) `public/thumbnails/meta.png` exists (fs.existsSync); (10) zero JS console errors on all 8 routes. Screenshots to `e2e-screenshots/sprint-47/`. | QA | sonnet | 4 | ✅ | 47.8, 47.13, 47.7, 47.10, 47.11 | `e2e-sprint47.js` |
| 47.16 | **Add TC-UI-10/11/12 to `specs/05_qa_lead.md`** — Append: `TC-UI-10 | #/meta | Meta presentation loads 8 slides, branding renders as <a> pointing to GitHub |`; `TC-UI-11 | Share modal | Share button visible, modal opens with Link/Embed/Social tabs, iframe note present in Embed tab |`; `TC-UI-12 | / ByTheNumbers + Deploy | 4 stat tiles present, Vercel deploy link present, GitHub counter renders or shows dash |`. | QA | haiku | 1 | ✅ | 47.15 | `specs/05_qa_lead.md` |
| 47.17 | **Sprint close + docs** — Update `docs/landing/README.md`: add `### ByTheNumbersSection` and `### DeployButtonsSection` entries. Update `docs/engine/README.md`: add `### ShareModal` section. Write `sprints/sprint-47/summary.md`. Update `specs/backlog.md` all 47.x → ✅ Done, header `Last Updated`. Commit + push. | PM | haiku | 2 | ✅ | 47.16 | `docs/landing/README.md`, `docs/engine/README.md`, `sprints/sprint-47/summary.md`, `specs/backlog.md` |

### QA Plan

| Test | Pass Condition |
|------|----------------|
| Build gate | `npm run build` exits 0, zero TypeScript errors |
| `#/meta` loads | 8 slides, `particles` background, no JS errors |
| Branding as `<a>` | When `brandingUrl` set, branding renders `<a>` not `<div>` |
| Branding as `<button>` | When `creationStory` present, branding opens drawer |
| Share button | Present on all 8 presentation routes |
| Share modal opens | Scale-in animation, 3 tabs visible |
| Link tab copy | URL copied, green checkmark, 2s reset |
| Embed tab note | Iframe limitation note present |
| Share modal Escape | Modal closes, slide unchanged |
| Arrow keys suppressed | `→` does not advance slides while modal open |
| GitHub stars | Counter renders or shows `'—'` on rate-limit error |
| localStorage TTL | Second render within 1h skips fetch |
| ByTheNumbers | 4 stat tiles present on landing page |
| DeployButtons | All 4 platform deep-links present |
| Featured gallery card | meta card has `ring-2 ring-blue-500` and "★ Featured" badge |
| `meta.png` exists | `public/thumbnails/meta.png` > 1 KB, 1440×900 |
| `og-image.png` exists | `public/og-image.png` > 1 KB, 1200×630 |
| OG tags in index.html | `og:image`, `og:title`, `og:description` present |
| TC-UI-10/11/12 added | `specs/05_qa_lead.md` contains 3 new rows |
| README badges | Stars badge + live demo link present |
| All 8 routes | Zero JS console errors |

### Docs Impact

| Doc File | Action | Description |
|----------|--------|-------------|
| `src/slides/data/slides-meta-en.ts` | Create | 8-slide AutoDeck meta presentation |
| `src/slides/data/creation-story-meta.ts` | Create | `metaCreationStory` — 6 prompts |
| `src/App.tsx` | Update | `#/meta` route + `brandingUrl` on all configs |
| `src/config.ts` | Update | `brandingUrl` on main config |
| `src/engine/types.ts` | Update | `brandingUrl?: string` in `PresentationConfig` |
| `src/engine/PresentationViewer.tsx` | Update | Branding conditional + Share button + ShareModal |
| `src/engine/ShareModal.tsx` | Create | Share/embed modal component |
| `src/landing/galleryConfig.ts` | Update | `featured?: boolean` on `GalleryEntry`; meta entry |
| `src/landing/GallerySection.tsx` | Update | Featured card ring + badge |
| `src/landing/GitHubStarCounter.tsx` | Create | Live star count + localStorage cache |
| `src/landing/LandingPage.tsx` | Update | `ByTheNumbersSection` + `DeployButtonsSection` |
| `scripts/gallery-capture.js` | Update | Add meta to PRESENTATIONS array |
| `scripts/og-capture.js` | Create | 1200×630 OG image capture |
| `public/thumbnails/meta.png` | Create | 1440×900 gallery thumbnail |
| `public/og-image.png` | Create | 1200×630 OG social preview |
| `index.html` | Update | OG meta tags |
| `package.json` | Update | `og:capture` script |
| `README.md` | Update | Badges, tagline, deploy table, presentations table |
| `docs/engine/README.md` | Update | `brandingUrl` docs + ShareModal section |
| `docs/landing/README.md` | Update | ByTheNumbers + DeployButtons sections |
| `specs/05_qa_lead.md` | Update | TC-UI-10, TC-UI-11, TC-UI-12 |
| `e2e-sprint47.js` | Create | Sprint 47 E2E assertions |
| `sprints/sprint-47/summary.md` | Create | Sprint close summary |
| `specs/backlog.md` | Update | All 47.x → ✅ Done; header updated |

**Total: 48 points, 17 tickets**
