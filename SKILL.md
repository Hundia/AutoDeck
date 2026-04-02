# AutoDeck — AI Slide Planning Guide

Feed this file to any AI coding assistant (Claude, Copilot, Gemini, Cursor, etc.) to get guided help creating new slides.

## How to Add a Slide

### Step 1: Define the data

Add a new entry to `src/slides/slides-en.ts` (and other language files):

```typescript
{
  type: 'content',        // Must match a key in registry.ts
  title: 'My Slide Title',
  subtitle: 'Optional subtitle',
  // ... slide-type-specific fields (see Built-in Types below)
}
```

### Step 2: Use a built-in type OR create a custom component

**Using built-in types:** Just add the data entry — no component needed.

**Custom component:** Create `src/slides/components/MyCustomSlide.tsx`:

```typescript
import { motion } from 'framer-motion';
import type { SlideComponentProps } from '../../engine/types';

interface MyCustomSlideData {
  type: 'myCustom';
  title: string;
  // your fields...
}

export default function MyCustomSlide({ data, lang }: SlideComponentProps<MyCustomSlideData>) {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-8 text-white"
      >
        {data.title}
      </motion.h2>
      {/* Your content */}
    </div>
  );
}
```

### Step 3: Register it

Add to `src/slides/registry.ts`:

```typescript
import MyCustomSlide from './components/MyCustomSlide';

export const slideComponents = {
  // ... existing types
  myCustom: MyCustomSlide,
};
```

## Built-in Slide Types

| Type | Purpose | Key Fields |
|------|---------|------------|
| `title` | Hero/opening slide | `title`, `subtitle`, `tagline`, `presenter?`, `badge?` |
| `content` | Cards + metrics grid | `title`, `subtitle?`, `cards[]`, `metrics?[]` |
| `comparison` | Side-by-side panels | `title`, `left`, `right` (each: `label`, `color`, `items[]`), `callout?` |
| `stats` | Stats dashboard | `title`, `stats[]` (`value`+`label`), `bottomLine?`, optional `leftItems`/`rightItems` |
| `quote` | Typewriter question | `title`, `question` (typewriter), `points[]` |
| `timeline` | Vertical step timeline | `title`, `steps[]` (`number`, `title`, `subtitle?`, `time?`, `output?`), `scrollable?` |
| `closing` | CTA with terminal | `title`, `install?`, `commands?[]`, `links?[]`, `tagline` |
| `final` | Final tagline | `title`, `tagline` (word-by-word reveal) |

### Available colors for comparison panels

`red`, `green`, `blue`, `amber`, `purple`, `cyan`

## Design System

- **Background:** Dark slate gradient (`from-slate-900 via-slate-800 to-slate-900`)
- **Text:** White with opacity variants (`text-white`, `text-white/60`, `text-white/40`)
- **Accent colors:** Tailwind palette (blue, violet, emerald, cyan, amber, indigo, green)
- **Cards:** `bg-white/5 border border-{color}-500/20 rounded-xl`
- **Terminal chrome:** 3 dots (red/yellow/green) + dark background
- **Fonts:** Inter (body), JetBrains Mono (code)

## Animation Patterns

### Static slides (default)
Use `initial` + `animate` with staggered `delay`:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.5 }}
/>
```

### Scrollable slides (`scrollable: true`)
Use `whileInView` + `viewport`:
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
/>
```

**Rules:**
- Never add new npm dependencies — use framer-motion + Tailwind + inline SVG
- Prefer `opacity` and `transform` for performance
- Keep animations subtle — the content should be the star

## Available Backgrounds

Set in `src/config.ts` → `background`:

| ID | Name | Style |
|----|------|-------|
| `none` | None | No background effect |
| `grid` | Floating Grid | Dot grid with slow drift |
| `particles` | Particle Field | Floating white particles |
| `circuits` | Circuit Lines | PCB-like lines with pulses |
| `gradient` | Gradient Pulse | Slow color gradient shift |
| `matrix` | Matrix Rain | Falling 0s and 1s |
| `constellation` | Constellation | Connected star nodes |
| `waves` | Wave Mesh | Layered wave fills |
| `hex` | Hex Grid | Pulsing hexagonal grid |

## Multi-Language Support

1. Create a new slide data file: `src/slides/slides-fr.ts`
2. Add the language to `src/config.ts`:
   ```typescript
   languages: [
     { id: 'en', label: 'English' },
     { id: 'fr', label: 'Français' },
   ],
   ```
3. Import and register in `src/App.tsx`:
   ```typescript
   import { slidesFR } from './slides/slides-fr';
   const slides = { en: slidesEN, fr: slidesFR };
   ```

RTL languages (Hebrew, Arabic, Farsi, Urdu) are automatically detected and the layout flips accordingly.

## Quality Checklist

Before shipping, verify:
- [ ] `npm run build` exits 0
- [ ] All slides render correctly
- [ ] Arrow key navigation works (Left/Right)
- [ ] Progress dots show correct position
- [ ] If scrollable: scroll progress bar visible, Space key scrolls naturally
- [ ] If multi-language: language toggle works, RTL flips correctly
- [ ] No console errors
- [ ] Mobile viewport renders acceptably

## File Map

| What you're doing | Files to touch |
|-------------------|----------------|
| Add a new slide | `slides/slides-en.ts` + other langs |
| Create custom slide type | `slides/components/New.tsx` + `slides/registry.ts` |
| Change language options | `src/config.ts` + `src/App.tsx` |
| Change background | `src/config.ts` → `background` field |
| Change branding | `src/config.ts` → `branding` field |
| Deploy to GitHub Pages | `.github/workflows/deploy.yml` + `vite.config.ts` base |

## SDD Development with AutoDeck

AutoDeck is developed using Spec-Driven Development. If you're contributing or extending the framework:

### Running a Sprint

In Claude Code:
```
/sprint-run [sprint_number]
```

This executes the sprint from `specs/backlog.md` end-to-end: plan → implement → QA → docs → close.

### Adding a New Slide Type (Framework Contribution)

1. Create `src/slides/components/MyNewSlide.tsx`
2. Add the interface to `src/engine/types.ts` (extend `SlideData`)
3. Register in `src/slides/registry.ts`
4. Add demo data to `src/slides/slides-en.ts` + `slides-he.ts`
5. Document in `docs/slides/` with usage examples
6. Update this SKILL.md with the new type table entry

### Updating the Landing Page

Landing page components live in `src/landing/LandingPage.tsx`. Sections:
- `HeroSection` — tagline + CTAs
- `FeaturesSection` — 3-column feature grid
- `HowItWorksSection` — 3-step guide
- `SlideTypesSection` — slide type showcase
- `AIAssistedSection` — AI workflow
- `FooterSection` — links

### Deployment Changes

See `docs/deployment/` for GitHub Pages, Vercel, and Netlify guides.
