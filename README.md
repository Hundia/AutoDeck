# AutoDeck

![Build](https://github.com/Hundia/AutoDeck/actions/workflows/deploy.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Stars](https://img.shields.io/github/stars/Hundia/AutoDeck?style=social)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://hundia.github.io/AutoDeck/)

**AI-generated. Framework-ready. Open source. Build stunning animated presentations with React + Framer Motion.**

---

## Features

- **10 built-in slide types** — title, content, comparison, stats, quote, timeline, closing, final, code, diagram, mockup
- **3 runtime themes** — Aurora (blue-violet), Sivania (sage-terracotta), Noir (monochrome-cyan) — switchable live
- **Framer Motion animations** — stagger, scroll-triggered, spring physics, word-by-word reveals
- **Creation Story drawer** — every presentation ships with an AI creation narrative
- **Multi-language + RTL** — Hebrew, Arabic, Farsi, Urdu auto-detected and layout-mirrored
- **Zero backend** — pure static React, deploy anywhere in under 2 minutes
- **GitHub Pages CI/CD** — push to `main` → auto-deploy via GitHub Actions
- **TypeScript-native** — fully typed slide data, engine API, and component props

---

## Quick Start

```bash
git clone https://github.com/Hundia/AutoDeck
npm install
npm run dev
```

Open http://localhost:5173/AutoDeck/ and start editing `src/slides/slides-en.ts`.

---

## One-Click Deploy

| Platform | Deploy |
|----------|--------|
| **Vercel** | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Hundia/AutoDeck) |
| **Netlify** | [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Hundia/AutoDeck) |
| **StackBlitz** | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/Hundia/AutoDeck) |
| **Codespaces** | [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/Hundia/AutoDeck) |

---

## Presentations

Eight live presentations ship in the repo — each one a working example of a different use case:

| Presentation | Route | Description |
|--------------|-------|-------------|
| AutoDeck — The Framework | [#/meta](https://hundia.github.io/AutoDeck/#/meta) | AutoDeck pitching itself |
| Acme Corp Demo | [#/presentation](https://hundia.github.io/AutoDeck/#/presentation) | Enterprise SaaS pitch deck |
| AutoSpec TechBrief | [#/techbrief](https://hundia.github.io/AutoDeck/#/techbrief) | Technical architecture overview |
| Dashboard Design System | [#/uimockup](https://hundia.github.io/AutoDeck/#/uimockup) | UI component showcase |
| How to Build with AI | [#/howto](https://hundia.github.io/AutoDeck/#/howto) | AI-assisted development guide |
| LearnFlow Pitch Deck | [#/learnflow](https://hundia.github.io/AutoDeck/#/learnflow) | EdTech startup pitch |
| Ferric CLI v1.0 | [#/ferric](https://hundia.github.io/AutoDeck/#/ferric) | Rust CLI tool launch |
| Q2 2026 Business Review | [#/q2review](https://hundia.github.io/AutoDeck/#/q2review) | Quarterly business metrics |

---

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

---

## AI-Assisted Slide Creation

AutoDeck ships with `SKILL.md` — a tool-agnostic guide any AI coding assistant can read:

```
# In Claude Code, Cursor, Copilot, or Gemini:
"Read SKILL.md and help me create slides for a talk about [your topic]"
```

The AI understands all 10 slide types, animations, multi-language patterns, and quality requirements. `SKILL.md` also includes generation recipes to produce a full TechBrief or UIMockup from a codebase or design brief.

---

## Contributing

PRs are welcome. Whether it's a new slide type, a fourth theme, a fix, or an example presentation — open an issue or submit a pull request. See `CLAUDE.md` for the Spec-Driven Development workflow used in this project.

---

## License

MIT — use it for any talk, conference, or demo.

---

*Extracted from [AutoSpec](https://github.com/Hundia/autospec) — built across sprints 10–47.*
