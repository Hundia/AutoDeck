# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About This Project

AutoDeck is a React + Framer Motion presentation framework, extracted from **AutoSpec** (~443 pts across 11 sprints) and developed using Spec-Driven Development (SDD). SDD means every change is spec-first: write/update a spec, track in backlog, implement, QA, then document. See `docs/methodology/` for the full methodology.

Use `/sprint-run`, `/execute-ticket`, `/sprint-status`, etc. in Claude Code.

---

## MANDATORY Development Workflow

### Rule 1: Backlog-First Development

Every fix, feature, or change MUST be tracked in `specs/backlog.md`:
1. Determine if this is a **bug** (B.XX), **new feature**, or **enhancement**
2. Add ticket to `specs/backlog.md` in the appropriate sprint section
3. Set status to 🔄 In Progress when starting
4. Set status to ✅ Done when complete

**Skip ONLY when user explicitly says** "skip backlog", "don't track this"

### Rule 2: Living Documentation

Every implemented feature MUST update `docs/`:
- Slide engine changes → `docs/engine/`
- Landing page changes → `docs/landing/`
- Deployment changes → `docs/deployment/`
- New slide types → `docs/slides/`
- New subsystem → create new `docs/<subsystem>/` directory

### Rule 3: QA Before Done

| Change Type | QA Required |
|-------------|-------------|
| Bug fix | Reproduce first, fix, verify flow passes |
| Engine change | `npm run build` + visual check |
| New slide type | `npm run build` + verify slide renders |
| Docs/config only | No QA — mark ✅ directly |
| New feature | Full build + smoke test |

### Rule 4: Orchestrator + Agent Execution Pattern

- **Opus 4.6** orchestrates: writes `agents/sprint-X-brief.md`, spawns Sonnet agents
- **Sonnet 4.6** implements: reads brief, implements tickets, updates backlog + docs
- **Parallel execution:** Independent tickets run as parallel agents in one message

---

## Project Structure

```
autodeck/
├── .claude/commands/    # 11 SDD skill files (plan-sprint, sprint-run, etc.)
├── .github/workflows/   # GitHub Actions (deploy.yml → GitHub Pages)
├── specs/               # 10 role specs + backlog.md
├── agents/              # Sprint briefing files (written by Opus orchestrator)
├── sprints/             # Sprint closure summaries
├── docs/                # Living documentation
│   ├── methodology/     # SDD methodology (10 files)
│   ├── deployment/      # GitHub Pages, Vercel, Netlify
│   ├── engine/          # PresentationViewer, backgrounds, types
│   ├── slides/          # All 8 built-in slide types + custom guide
│   └── landing/         # Landing page components + content guide
├── src/
│   ├── engine/          # PresentationViewer, BackgroundEffects, types
│   ├── slides/          # 8 built-in slide templates + registry
│   ├── landing/         # Landing page components
│   ├── config.ts        # Presentation config
│   ├── App.tsx          # Router: / = Landing, /#/presentation = Viewer
│   └── main.tsx
├── public/              # favicon.svg
├── CLAUDE.md            # This file
├── SKILL.md             # AI slide creation guide
└── README.md            # Project overview + quick start
```

## Key Commands

```bash
# Development
npm run dev              # Start dev server at localhost:5173/AutoDeck/
npm run build            # Build to dist/ (Vite, base: /autodeck/)
npm run preview          # Preview built site

# Git push → GitHub Pages auto-deploy via .github/workflows/deploy.yml
git push origin main

# SDD Development (in Claude Code)
/help                    # Show all available SDD commands
/sprint-run [N]          # Execute a sprint end-to-end
/sprint-status           # Check current sprint status
/sprint-close [N]        # Close sprint, archive + summarize
/execute-ticket [ID]     # Execute a single ticket
/plan-sprint             # Plan a new sprint with expert team
/plan-presentation       # Plan/overhaul a presentation slide
/update-backlog          # Add/update/link backlog tickets
/qa-review [ID]          # Run QA checklist on a ticket
```

## GitHub Pages

- **Landing:** https://hundia.github.io/autodeck/
- **Presentation:** https://hundia.github.io/autodeck/#/presentation
- **Auto-deploy:** push to `main` → GitHub Actions → Pages

Note: `HashRouter` is used for GitHub Pages SPA compatibility — the `#` in the presentation URL is required.

## Design System

- **Background:** Dark slate (`from-slate-900 via-slate-800 to-slate-900`)
- **Primary text:** White + opacity variants
- **Accent:** Tailwind full palette (blue, violet, emerald, cyan, amber)
- **Cards:** `bg-white/5 border border-{color}-500/20 rounded-xl`
- **Fonts:** Inter (body), JetBrains Mono (code/terminal)
- **NO shadcn/ui, NO @radix-ui** — raw Tailwind + Framer Motion only
- **Background effects (8):** `particles`, `circuits`, `matrix`, `constellation`, `hex`, `waves`, `gradient`, `grid` — set via `src/config.ts` → `background` field

## Slide Engine API

```typescript
// src/engine/types.ts
interface PresentationConfig {
  title: string
  languages: LanguageOption[]       // e.g. [{ id: 'en', label: 'English' }]
  defaultLanguage: string
  background: string                // one of 8 background effects
  branding?: string                 // footer text
  keyboardHint?: Record<string, string>  // per-language nav hint
}
```

**8 built-in slide types** (registered in `src/slides/registry.ts`):

| Type | Key Fields |
|------|-----------|
| `title` | `title`, `subtitle`, `tagline`, `badge?` |
| `content` | `title`, `cards[]`, `metrics?[]` |
| `comparison` | `left`, `right`, `callout?` |
| `stats` | `stats[]`, `leftItems?`, `rightItems?` |
| `quote` | `question`, `points[]` |
| `timeline` | `steps[]`, `scrollable?` |
| `closing` | `install?`, `commands?[]`, `links?[]` |
| `final` | `title`, `tagline` |

### Adding a Slide

1. Add data to `src/slides/slides-en.ts` (and `slides-he.ts` for Hebrew)
2. Create `src/slides/components/MySlide.tsx` (only for new custom types)
3. Register in `src/slides/registry.ts`: `'my-type': MySlide`

See `SKILL.md` for the complete AI-assisted slide creation guide.

## Multi-Language Support

RTL is auto-detected for `he`, `ar`, `fa`, `ur` — layout mirrors, keyboard navigation reverses. To add a language:

1. Create `src/slides/slides-{lang}.ts`
2. Add to `src/config.ts`: `languages: [..., { id: 'fr', label: 'Français' }]`
3. Import and add to slides map in `src/App.tsx`: `{ en: slidesEN, fr: slidesFR }`

## Current Sprint

Sprint 39 is complete (April 2, 2026 — landing page, SDD bootstrap, GitHub Pages deploy). See `specs/backlog.md` for Sprint 40 planning.
