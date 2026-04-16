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
│   ├── slides/          # All 10 built-in slide types + custom guide
│   └── landing/         # Landing page components + content guide
├── src/
│   ├── engine/          # PresentationViewer, BackgroundEffects, types
│   ├── slides/          # 10 built-in slide templates + registry
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

## Theme System

AutoDeck presentations support three runtime themes: **Aurora** (blue-violet, default), **Sivania** (sage-terracotta, Cormorant Garamond), and **Noir** (monochrome-cyan, JetBrains Mono).

### How It Works

- 16 CSS custom-property tokens per theme set on `document.documentElement` via `[data-theme="aurora|sivania|noir"]`
- `ThemeProvider` above `<HashRouter>` in `App.tsx` reads/writes `localStorage.getItem('autodeck-theme')`
- `useTheme()` hook gives any engine component access to `{ theme, setTheme }`
- Theme switcher is the Palette dropdown (leftmost in the PresentationViewer top-right cluster)
- Landing page is intentionally unthemed

### Adding a Fourth Theme

1. Add a new `[data-theme="mytheme"]` block to `src/index.css` with all 16 tokens
2. Add `{ id: 'mytheme', label: 'My Theme', previewColors: ['#...', '#...', '#...'] }` to `THEMES` in `src/engine/themes.ts`
3. That's it — no code changes needed

### SVG Critical Rule

SVG presentation attributes (`fill="rgba(…)"`, `stroke="rgba(…)"`) do NOT inherit CSS custom properties. Always use React inline style:
```tsx
// WRONG — CSS vars don't work as SVG attributes
<circle fill="var(--theme-accent-primary)" />

// CORRECT
<circle style={{ fill: 'var(--theme-accent-primary)' }} />
```

### Token Reference

| Token | Purpose |
|-------|---------|
| `--theme-bg` | Page/presentation background |
| `--theme-surface` | Card/panel surface color |
| `--theme-surface-border` | Card border color |
| `--theme-text-primary` | Primary text |
| `--theme-text-secondary` | Secondary/muted text |
| `--theme-accent-primary` | Primary accent (links, highlights) |
| `--theme-accent-secondary` | Secondary accent (taglines, sub-accents) |
| `--theme-accent-glow` | Glow/shadow color for accent elements |
| `--theme-nav-bg` | Navigation background |
| `--theme-nav-border` | Navigation border |
| `--theme-dot-active` | Active slide dot + active dropdown item dot |
| `--theme-font-display` | Display/heading font family |
| `--theme-font-body` | Body font family |
| `--theme-bg-effect-color-1` | Background effect primary tint |
| `--theme-bg-effect-color-2` | Background effect secondary tint |
| `--theme-gradient` | Gradient for progress bar, taglines, connecting lines |

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

**10 built-in slide types** (registered in `src/slides/registry.ts`):

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
| `code` | `title`, `language`, `code`, `filename?`, `highlights?[]` |
| `diagram` | `title`, `mode` (arch/sequence/er), `nodes[]`, `edges[]` |
| `mockup` | `title`, `displayMode` (browser/flow), `blocks[]` or `frames[]` |

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

Sprint 49 is complete (April 17, 2026 — Edit Mode toggle, Slide Notes for LLM, `editModeEnabled` config flag, `/apply-slide-notes` skill). See `docs/engine/edit-mode.md`. See `specs/backlog.md` for Sprint 50 planning.
