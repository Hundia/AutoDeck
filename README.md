# AutoDeck

Beautiful, animated presentations built with React + Framer Motion. Clone, define your slides, deploy.

**[Live Demo](https://hundia.github.io/autodeck/)**

## Features

- **Keyboard navigation** — Arrow keys, Space for scrollable slides
- **Multi-language** — Built-in bilingual support with automatic RTL detection
- **8 animated backgrounds** — Particles, circuits, matrix rain, constellation, and more
- **Progress dots** — Click any dot to jump to a slide
- **Scroll-mode slides** — Timeline and long-form slides with scroll progress bar
- **Dark theme** — Slate gradient with glass morphism cards
- **Responsive** — Works on desktop and mobile
- **GitHub Pages ready** — One-push deployment via GitHub Actions
- **AI-assisted** — Feed `SKILL.md` to any AI coding tool for guided slide creation

## Quick Start

```bash
git clone https://github.com/hundia/autodeck.git
cd autodeck
npm install
npm run dev
```

Edit `src/slides/slides-en.ts` to define your slides. Changes hot-reload instantly.

## Slide Types

| Type | Purpose | Preview |
|------|---------|---------|
| `title` | Hero opening with gradient title, word-by-word tagline | Cinematic entrance |
| `content` | Icon cards grid + optional metrics bar | Feature showcase |
| `comparison` | Side-by-side colored panels | Before/after, pros/cons |
| `stats` | Animated stat counters + optional column lists | Metrics dashboard |
| `quote` | Typewriter question with staggered sub-points | Thought-provoking pause |
| `timeline` | Vertical step pipeline (supports scroll mode) | Process walkthrough |
| `closing` | Terminal install command + links + CTA | Call to action |
| `final` | Word-by-word tagline reveal | Closing statement |

## Adding Custom Slides

1. Create a component in `src/slides/components/MySlide.tsx`
2. Register it in `src/slides/registry.ts`
3. Add data entries in your slide data files

See `SKILL.md` for the full guide with code examples.

## Multi-Language

Add a new language file (`src/slides/slides-fr.ts`), register it in `src/App.tsx`, and add the language option to `src/config.ts`. RTL languages (Hebrew, Arabic, etc.) are automatically detected.

## Backgrounds

Set `background` in `src/config.ts` to any of: `none`, `grid`, `particles`, `circuits`, `gradient`, `matrix`, `constellation`, `waves`, `hex`.

## AI-Assisted Slide Creation

Feed `SKILL.md` to your AI coding assistant (Claude Code, GitHub Copilot, Gemini, Cursor, etc.) for step-by-step guidance on creating new slides. The file contains the complete design system, animation patterns, and file map.

## Deployment

### GitHub Pages (automatic)

1. Push to `main`
2. GitHub Actions builds and deploys automatically
3. Make sure `base` in `vite.config.ts` matches your repo name: `'/autodeck/'`

### Vercel / Netlify

Just connect the repo — zero config needed (set `base: '/'` in `vite.config.ts`).

### Manual

```bash
npm run build
# Upload the `dist/` folder to any static host
```

## Configuration

All presentation settings live in `src/config.ts`:

```typescript
{
  title: 'My Presentation',
  languages: [{ id: 'en', label: 'English' }],
  defaultLanguage: 'en',
  background: 'particles',
  branding: 'My Company',
}
```

## Project Structure

```
src/
├── engine/              # Framework core (don't modify)
│   ├── PresentationViewer.tsx
│   ├── BackgroundEffects.tsx
│   ├── ScrollProgressBar.tsx
│   ├── LanguageDropdown.tsx
│   └── types.ts
├── slides/              # Your slides (edit these)
│   ├── slides-en.ts
│   ├── slides-he.ts
│   ├── registry.ts
│   └── components/
├── config.ts
├── App.tsx
└── main.tsx
```

## License

MIT
