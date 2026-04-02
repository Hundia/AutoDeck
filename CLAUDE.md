# Claude Code Memory — AutoDeck

## About This Project

AutoDeck is a React + Framer Motion presentation framework — extracted from AutoSpec and developed using Spec-Driven Development (SDD). Use `/sprint-run`, `/execute-ticket`, `/sprint-status`, etc. in Claude Code.

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
├── .claude/commands/    # 10 SDD skill files (plan-sprint, sprint-run, etc.)
├── .github/workflows/   # GitHub Actions (deploy.yml → GitHub Pages)
├── specs/               # 10 role specs + backlog.md
├── agents/              # Sprint briefing files
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
│   ├── App.tsx          # Router: / = Landing, /presentation = Viewer
│   └── main.tsx
├── public/              # favicon.svg
├── CLAUDE.md            # This file
├── SKILL.md             # AI slide creation guide
└── README.md            # Project overview + quick start
```

## Key Commands

```bash
# Development
npm run dev              # Start dev server at localhost:5173/autodeck/
npm run build            # Build to dist/ (Vite, base: /autodeck/)
npm run preview          # Preview built site

# Git push → GitHub Pages auto-deploy via .github/workflows/deploy.yml
git push origin main

# SDD Development (in Claude Code)
/sprint-run [N]         # Execute a sprint end-to-end
/sprint-status          # Check current sprint status
/execute-ticket [ID]    # Execute a single ticket
/plan-sprint            # Plan a new sprint with expert team
```

## GitHub Pages

- **Landing:** https://hundia.github.io/autodeck/
- **Presentation:** https://hundia.github.io/autodeck/presentation/
- **Auto-deploy:** push to `main` → GitHub Actions → Pages

## Design System

- **Background:** Dark slate (`from-slate-900 via-slate-800 to-slate-900`)
- **Primary text:** White + opacity variants
- **Accent:** Tailwind full palette (blue, violet, emerald, cyan, amber)
- **Cards:** `bg-white/5 border border-{color}-500/20 rounded-xl`
- **Fonts:** Inter (body), JetBrains Mono (code/terminal)
- **NO shadcn/ui, NO @radix-ui** — raw Tailwind + Framer Motion only

## Slide Engine API

```typescript
// src/engine/types.ts
interface PresentationConfig {
  title: string
  languages: LanguageOption[]
  defaultBackground: BackgroundType
  branding?: string
}

// Add a slide: define data in slides-en.ts + slides-he.ts, register in registry.ts
// See SKILL.md for complete guide
```

## Current Sprint

See `specs/backlog.md` → Sprint 39 for active work.
