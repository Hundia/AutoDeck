# AutoDeck

> Beautiful animated presentations with React + Framer Motion. Clone, customize, deploy.

**Live:** https://hundia.github.io/AutoDeck/

**Example Presentations:**
- [Acme — Developer Tools](https://hundia.github.io/AutoDeck/#/presentation) (particles background)
- [AutoSpec TechBrief](https://hundia.github.io/AutoDeck/#/techbrief) (circuits background)
- [AutoDeck Dashboard DS](https://hundia.github.io/AutoDeck/#/uimockup) (constellation background)

[![Deploy](https://github.com/Hundia/AutoDeck/actions/workflows/deploy.yml/badge.svg)](https://github.com/Hundia/AutoDeck/actions/workflows/deploy.yml)

---

## Features

- **10 built-in slide types** — title, content, comparison, stats, quote, timeline, closing, final, code, diagram, mockup
- **Keyboard navigation** — ← → arrows, progress dots, space for scrollable slides
- **Multi-language + RTL** — Hebrew, Arabic, Farsi auto-detected and mirrored
- **8 animated backgrounds** — particles, circuits, matrix, constellation, hex, waves, gradient, grid
- **Framer Motion animations** — stagger, scroll-triggered, spring physics
- **GitHub Pages ready** — CI/CD via GitHub Actions (zero config)
- **AI-assisted** — feed `SKILL.md` to Claude, Copilot, Cursor, Gemini to build slides instantly
- **Mobile responsive** — works on phone through 4K display
- **Dark theme** — glass morphism cards, Inter + JetBrains Mono fonts

## Quick Start

```bash
# 1. Fork or clone this repo
git clone git@github.com:Hundia/AutoDeck.git my-talk
cd my-talk && npm install

# 2. Edit your slides
# src/slides/slides-en.ts

# 3. Run locally
npm run dev
# → http://localhost:5173/AutoDeck/#/presentation

# 4. Deploy
git push origin main
# → https://your-username.github.io/AutoDeck/#/presentation
```

## Slide Types

| Type | Description | Key Fields |
|------|-------------|------------|
| `title` | Hero with animated gradient title | `title`, `subtitle`, `tagline`, `badge?` |
| `content` | Icon cards grid + optional metrics bar | `title`, `cards[]`, `metrics?[]` |
| `comparison` | Two colored panels side-by-side | `left`, `right`, `callout?` |
| `stats` | Animated stat counters + comparison lists | `stats[]`, `leftItems?`, `rightItems?` |
| `quote` | Typewriter question + staggered bullets | `question`, `points[]` |
| `timeline` | Vertical step pipeline | `steps[]`, `scrollable?` |
| `closing` | macOS terminal + CTA links | `install?`, `commands?[]`, `links?[]` |
| `final` | Word-by-word tagline reveal | `title`, `tagline` |
| `code` | Syntax-highlighted code + output panel | `filename`, `lines[]`, `highlights?[]`, `output?[]` |
| `diagram` | Architecture/sequence/ER via pure SVG | `mode` (arch/sequence/er), `nodes[]`, `edges[]` |
| `mockup` | Browser-chrome wireframe (8 block types) | `displayMode` (browser/flow), `blocks[]` or `frames[]` |

## Example Slide

```typescript
// src/slides/slides-en.ts
import { SlideData } from '../engine/types'

export const slidesEN: SlideData[] = [
  {
    type: 'title',
    title: 'My Talk',
    subtitle: 'A deep dive into something awesome',
    tagline: 'Built with AutoDeck',
    badge: 'v1.0',
  },
  {
    type: 'stats',
    title: 'By The Numbers',
    stats: [
      { label: 'Users', value: '12,000+', color: 'blue' },
      { label: 'Uptime', value: '99.9%', color: 'green' },
    ],
  },
  {
    type: 'final',
    title: 'Thank You',
    tagline: 'Questions? Find me on GitHub → @hundia',
  },
]
```

## AI-Assisted Slide Creation

AutoDeck includes `SKILL.md` — a tool-agnostic guide that any AI coding assistant can read:

```
# In Claude Code, Cursor, Copilot, Gemini:
"Read SKILL.md and help me create slides for a talk about [your topic]"
```

The AI will understand all 10 slide types, animations, multi-language patterns, and quality requirements. `SKILL.md` also includes generation recipes to produce a full TechBrief or UIMockup presentation from a codebase or design brief.

## Backgrounds

| Value | Effect |
|-------|--------|
| `particles` | Floating dots with connecting lines |
| `circuits` | Animated circuit board traces |
| `matrix` | Matrix rain columns |
| `constellation` | Star field with constellations |
| `hex` | Hexagonal grid pulse |
| `waves` | Sine wave animation |
| `gradient` | Color-shifting gradient |
| `grid` | Subtle dot grid |

Set in `src/config.ts`:
```typescript
export const config: PresentationConfig = {
  title: 'My Talk',
  defaultBackground: 'particles', // ← change this
  languages: [{ code: 'en', label: 'EN' }],
}
```

## Multi-Language

```typescript
// 1. Create src/slides/slides-fr.ts (copy slides-en.ts, translate)
// 2. In src/config.ts:
languages: [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' }, // ← add this
]
// 3. In src/App.tsx:
import { slidesFR } from './slides/slides-fr'
const slides = { en: slidesEN, fr: slidesFR }
```

RTL languages (Hebrew, Arabic, Farsi, Urdu) are auto-detected — the layout mirrors automatically.

## Deploy to GitHub Pages

1. Fork this repo
2. Go to **Settings → Pages → Source: GitHub Actions**
3. Push to `main` → auto-deploys to `https://your-username.github.io/AutoDeck/`

For other platforms: `npm run build` → upload `dist/` to Vercel, Netlify, or any static host.

## Custom Slide Types

```typescript
// 1. Create src/slides/components/MySlide.tsx
import { SlideComponentProps } from '../../engine/types'

interface MySlideData extends SlideData {
  type: 'my-slide'
  message: string
}

export function MySlide({ data, lang }: SlideComponentProps<MySlideData>) {
  return <div className="text-white text-4xl">{data.message}</div>
}

// 2. Register in src/slides/registry.ts
import { MySlide } from './components/MySlide'
export const slideComponents = {
  ...existing,
  'my-slide': MySlide,
}
```

## SDD Development

This project uses [Spec-Driven Development](./CLAUDE.md). All development is tracked in `specs/backlog.md` and executed via Claude Code `/sprint-run`.

## License

MIT — use it for any talk, conference, or demo.

---

*Extracted from [AutoSpec](https://github.com/Hundia/autospec) — built across sprints 10–38.*
