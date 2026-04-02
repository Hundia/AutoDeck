# AutoDeck Backlog

**Project:** AutoDeck — React + Framer Motion Presentation Framework  
**Extracted from:** [AutoSpec](https://github.com/Hundia/autospec) — Sprints 10–38  
**Repository:** https://github.com/Hundia/AutoDeck  
**Last Updated:** 2026-04-02

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
