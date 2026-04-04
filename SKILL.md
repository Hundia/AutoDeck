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
| `code` | Syntax-highlighted code block | `title`, `language`, `code`, `filename?`, `highlights?[]` |
| `diagram` | Architecture/sequence/ER diagrams | `mode`, `nodes[]`, `edges[]` |
| `mockup` | Browser wireframe (block system) | `displayMode`, `blocks[]` or `frames[]` |

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

## Generation Recipes

Use these verbatim prompt templates to generate complete presentations from existing project artifacts.

### Recipe 1: TechBrief (from codebase + spec)

**When to use:** You have a codebase, git log, and/or spec doc and want a 10-slide technical presentation.

**Prompt template:**
```
Generate a 10-slide TechBrief presentation for AutoDeck about $PROJECT_NAME.

Context:
- Git log (last 20 commits): $GIT_LOG
- Spec summary: $SPEC_SUMMARY
- Test stats: $TEST_STATS

Follow the TechBrief structure:
1. title — project name + sprint badge
2. quote — the core problem your project solves
3. content — 4 deliverable cards + 4 success metrics
4. timeline (scrollable) — 5 execution steps
5. diagram (arch) — key architecture nodes and connections
6. diagram (sequence) — primary actor flow
7. diagram (er) — data model entities
8. code — representative config or API code
9. stats — before/after comparison metrics
10. closing — slash commands or install commands + links

Output: a valid src/slides/data/slides-$PROJECT_NAME-en.ts file.
```

**Slide mapping table:**
| Source artifact | Maps to |
|----------------|---------|
| `git log` feat: commits | Slide 3 content cards |
| Spec goal statement | Slide 2 quote question |
| Test pass/fail stats | Slide 9 stats values |
| ✅ Done tickets | Slide 9 rightItems (After) |
| 🔲 Open tickets | Slide 10 closing commands |
| Key components/modules | Slide 5 diagram nodes |
| API call sequence | Slide 6 sequence actors |
| DB schema | Slide 7 ER entities |

**Error recovery:**
| Problem | Fix |
|---------|-----|
| Context too large | Summarize spec to 200 words first, then prompt |
| Spec too vague | Infer slide content from git log + file names |
| Build error after generation | Paste error to Claude: "Fix this TypeScript error in my slide data file" |

---

### Recipe 2: UIMockup (from design brief + screens)

**When to use:** You have screen descriptions or a design brief and want a mockup presentation.

**Prompt template:**
```
Generate a 10-slide UIMockup presentation for AutoDeck about $DESIGN_BRIEF.

Context:
- Component inventory: $COMPONENT_LIST
- Screen descriptions: $SCREEN_DESCRIPTIONS

Follow the UIMockup structure:
1. title — product/DS name + version badge
2. quote — the design consistency problem
3. content — 4 design system pillars + token/component counts
4. stats — key metrics + before/after
5. timeline (scrollable) — design-to-code workflow steps
6. mockup (browser) — primary screen wireframe
7. mockup (browser) — secondary screen wireframe
8. mockup (flow) — 3-frame user journey
9. comparison — manual design vs design system
10. final — tagline

Available block types for mockup slides:
navbar, hero, card-grid, table, form, chart-bar, sidebar, text-block

Output: a valid src/slides/data/slides-$DESIGN_BRIEF-en.ts file.
```

**Slide mapping table:**
| Source artifact | Maps to |
|----------------|---------|
| Screen names/routes | Mockup slide `url` fields |
| Component inventory | Slide 3 content card-grid blocks |
| User journey steps | Slide 5 timeline steps |
| Before/after design metrics | Slide 4 stats leftItems/rightItems |
| Design decisions | Slide 9 comparison items |

**Error recovery:**
| Problem | Fix |
|---------|-----|
| Screen descriptions vague | List 3 UI actions per screen, Claude infers blocks |
| Too many screens | Focus on 2 primary + 1 flow diagram |
| Build error | Check BlockType spelling: must be exact from the union |

---

### Iteration Prompts

Use these after generating a first draft:

1. **Add Hebrew translation:** "Translate the presentation to Hebrew. Keep code, filenames, and node labels in English. Export as slides-$NAME-he.ts."
2. **Sharpen the quote slide:** "Rewrite the quote slide question to be more provocative. Keep points ≤ 12 words each."
3. **Expand stats:** "Add two more stat cards and flesh out the leftItems/rightItems with real-feeling numbers."
4. **Adjust diagram:** "In slide 5, add a node for $NEW_COMPONENT at col 3, row 1, color amber, and connect it from $EXISTING_NODE."

---

### Quality Bars

| Presentation type | Minimum requirements |
|------------------|---------------------|
| TechBrief | ≥1 diagram slide, ≥1 code slide, 8–12 slides, `npm run build` exits 0 |
| UIMockup | ≥1 mockup (browser) slide, ≥1 mockup (flow) slide, 8–12 slides, `npm run build` exits 0 |

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
