# Sprint 46 Agent Brief — Presentation Gallery Section

## Mission
Add a Presentation Gallery section to the landing page: a responsive grid of thumbnail cards showing all 7 AutoDeck presentations. Cards have a Playwright-captured screenshot, slide count, title, and "View →" link. Thumbnails are static PNGs in `public/thumbnails/`. All backward-compatible — no slide data or engine changes.

## Critical Rules
- `npm run build` must exit 0 after EACH ticket
- Do NOT add any new npm packages
- Do NOT modify App.tsx, any slide data files, or engine files
- Thumbnail `src` must use `${import.meta.env.BASE_URL}thumbnails/{id}.png` — NEVER hardcode `/AutoDeck/thumbnails/`
- Gallery section is inserted between TestimonialsSection and FooterSection in LandingPage.tsx
- Do NOT modify `src/landing/index.ts`

---

## Ticket 46.1 — galleryConfig.ts

**File:** `src/landing/galleryConfig.ts` (CREATE NEW)

```typescript
export interface GalleryEntry {
  id: string;         // slug, e.g. 'techbrief'
  title: string;      // display name
  slideCount: number; // verified from source
  route: string;      // full hash route, e.g. '#/techbrief'
  thumbnail: string;  // PNG filename, e.g. 'techbrief.png'
}

export const galleryConfig: GalleryEntry[] = [
  { id: 'acme',      title: 'Acme Corp Demo',          slideCount: 9,  route: '#/presentation', thumbnail: 'acme.png' },
  { id: 'techbrief', title: 'AutoSpec TechBrief',       slideCount: 10, route: '#/techbrief',    thumbnail: 'techbrief.png' },
  { id: 'uimockup',  title: 'Dashboard Design System',  slideCount: 10, route: '#/uimockup',     thumbnail: 'uimockup.png' },
  { id: 'howto',     title: 'How to Build with AI',     slideCount: 10, route: '#/howto',        thumbnail: 'howto.png' },
  { id: 'learnflow', title: 'LearnFlow Pitch Deck',     slideCount: 9,  route: '#/learnflow',    thumbnail: 'learnflow.png' },
  { id: 'ferric',    title: 'Ferric CLI v1.0',          slideCount: 9,  route: '#/ferric',       thumbnail: 'ferric.png' },
  { id: 'q2review',  title: 'Q2 2026 Business Review',  slideCount: 15, route: '#/q2review',     thumbnail: 'q2review.png' },
];
```

**Verify slide counts** by reading the actual slide arrays:
- `src/slides/slides-en.ts` → acme
- `src/slides/data/slides-techbrief-en.ts` → techbrief  
- `src/slides/data/slides-uimockup-en.ts` → uimockup (update if count differs from 10)
- `src/slides/data/slides-howto-en.ts` → howto
- `src/slides/data/slides-learnflow-en.ts` → learnflow
- `src/slides/data/slides-ferric-en.ts` → ferric
- `src/slides/data/slides-q2review-en.ts` → q2review (update if count differs from 15)

Run `npm run build`. Fix any TS errors.

---

## Ticket 46.2 — GallerySection.tsx

**File:** `src/landing/GallerySection.tsx` (CREATE NEW)

Read `src/landing/LandingPage.tsx` to understand existing section patterns (FeaturesSection, TestimonialsSection, etc.) and match their style.

### Component requirements:

```tsx
import { motion } from 'framer-motion';
import { galleryConfig } from './galleryConfig';

export default function GallerySection() {
  // Section structure:
  // - <section> wrapper with consistent padding (py-24 px-6)
  // - Section heading area: badge + h2 + subtitle (match TestimonialsSection/FeaturesSection style)
  // - Grid: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto
  // - 7 cards from galleryConfig

  // Card per entry:
  return (
    // Each card is a motion.div with:
    // initial={{ opacity: 0, y: 30 }}
    // whileInView={{ opacity: 1, y: 0 }}
    // viewport={{ once: true }}
    // transition={{ duration: 0.5, delay: index * 0.08 }}
    // whileHover={{ y: -4 }}
    // className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group cursor-pointer"
    
    // Card internals:
    // 1. 16:9 thumbnail area: <div className="aspect-[16/9] bg-slate-800 overflow-hidden relative">
    //    <img
    //      src={`${import.meta.env.BASE_URL}thumbnails/${entry.thumbnail}`}
    //      alt={`${entry.title} — ${entry.slideCount} slides`}
    //      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    //      onError={(e) => {
    //        const img = e.currentTarget;
    //        img.style.display = 'none';
    //        const parent = img.parentElement;
    //        if (parent) {
    //          const placeholder = document.createElement('div');
    //          placeholder.className = 'w-full h-full bg-slate-700 flex items-center justify-center';
    //          const initials = entry.title.split(' ').slice(0, 2).map(w => w[0]).join('');
    //          placeholder.innerHTML = `<span class="text-white/30 text-3xl font-bold">${initials}</span>`;
    //          parent.appendChild(placeholder);
    //        }
    //      }}
    //    />
    // 2. Card body: <div className="p-4">
    //    <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">{entry.title}</h3>
    //    <p className="text-white/40 text-xs mb-3">{entry.slideCount} slides</p>
    //    <a
    //      href={entry.route}
    //      className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
    //    >
    //      View →
    //    </a>
  );
}
```

**Section heading** — match the badge + h2 + subtitle pattern from FeaturesSection or TestimonialsSection in LandingPage.tsx. Use something like:
- Badge: "7 Presentations"
- H2: "See It in Action"
- Subtitle: "Every deck runs live. Click any card to explore."

Run `npm run build`. Fix any TS errors.

---

## Ticket 46.3 — Wire into LandingPage.tsx

**File:** `src/landing/LandingPage.tsx`

1. Add import at the top:
   ```tsx
   import GallerySection from './GallerySection';
   ```

2. Find `<TestimonialsSection />` in the JSX return. Insert `<GallerySection />` immediately BEFORE `<FooterSection />` (which comes after TestimonialsSection). So the order becomes:
   ```tsx
   <TestimonialsSection />
   <GallerySection />
   <FooterSection />
   ```

3. Do NOT modify `src/landing/index.ts`.

Run `npm run build`. Fix any TS errors.

---

## Ticket 46.4 — gallery-capture.js (Playwright script)

**File:** `scripts/gallery-capture.js` (CREATE NEW — also create `scripts/` dir if needed)

Base this on `e2e-sprint44.js` pattern. Key differences:
- Output to `public/thumbnails/` instead of `e2e-screenshots/`
- No assertion logic — capture only
- Viewport: 1440×900

```javascript
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:4173/AutoDeck';
const OUT = path.join(__dirname, '..', 'public', 'thumbnails');
fs.mkdirSync(OUT, { recursive: true });

const PRESENTATIONS = [
  { route: '#/presentation', name: 'acme' },
  { route: '#/techbrief',    name: 'techbrief' },
  { route: '#/uimockup',     name: 'uimockup' },
  { route: '#/howto',        name: 'howto' },
  { route: '#/learnflow',    name: 'learnflow' },
  { route: '#/ferric',       name: 'ferric' },
  { route: '#/q2review',     name: 'q2review' },
];

async function run() {
  const browser = await chromium.launch({ headless: true });

  for (const { route, name } of PRESENTATIONS) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();

    await page.goto(`${BASE}/${route}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: false });
    console.log(`✅ ${name}.png captured`);

    await ctx.close();
  }

  await browser.close();
  console.log(`\n✅ All ${PRESENTATIONS.length} thumbnails captured to public/thumbnails/`);
}

run().catch(e => { console.error(e); process.exit(1); });
```

---

## Ticket 46.5 — Add gallery:capture + run + commit

1. In `package.json`, add to `scripts`:
   ```json
   "gallery:capture": "node scripts/gallery-capture.js"
   ```

2. Run the capture:
   ```bash
   npm run build && npm run preview &
   sleep 4
   npm run gallery:capture
   ```

3. Verify 7 PNGs exist in `public/thumbnails/` and each is > 1KB.

4. **Commit the thumbnails** (they are static assets deployed to GitHub Pages):
   ```bash
   git add public/thumbnails/
   ```
   (Commit happens in ticket 46.9 sprint close)

5. Kill preview:
   ```bash
   pkill -f "vite preview" || true
   ```

6. Run `npm run build` one more time to confirm clean build.

---

## Ticket 46.6 — E2E Playwright Verification

Write `e2e-sprint46.js` (model on `e2e-sprint45.js`).

Key assertions to add beyond standard route checks:

1. **Gallery section present on landing page** — navigate to `http://localhost:4173/AutoDeck/`, assert page has ≥ 7 `<a>` elements linking to gallery routes (href contains `#/presentation`, `#/techbrief`, etc.)

2. **Alt text populated** — all `<img>` elements within the gallery section have non-empty `alt` attributes

3. **Zero JS errors** on landing page load

4. **Mobile viewport test** — set viewport to 390×844, reload landing page, assert gallery section is visible

5. Screenshot `gallery-desktop.png` at 1440×900 and `gallery-mobile.png` at 390×844 to `e2e-screenshots/sprint-46/`

After running, add to `specs/05_qa_lead.md`:
```
| TC-UI-09 | `/` Gallery section | All 7 thumbnail cards render, links resolve, onError fallback present, mobile layout collapses correctly |
```

Run twice. Both must exit 0.

Kill preview after: `pkill -f "vite preview" || true`

---

## Ticket 46.7 — SKILL.md update

In `SKILL.md`, find the landing page section (likely near FeaturesSection or TestimonialsSection docs). Add a new subsection:

```markdown
### GallerySection

The Gallery section shows all showcase presentations as clickable thumbnail cards. It is inserted between `TestimonialsSection` and `FooterSection` in `LandingPage.tsx`.

#### Adding a New Presentation to the Gallery

Update `src/landing/galleryConfig.ts`:

```typescript
{ id: 'mynew', title: 'My New Deck', slideCount: 8, route: '#/mynew', thumbnail: 'mynew.png' }
```

Then regenerate thumbnails:

```bash
npm run build
npm run preview &
sleep 4
npm run gallery:capture
pkill -f "vite preview"
git add public/thumbnails/mynew.png
```

#### Thumbnail Path Convention

Thumbnails are served as static files from `public/thumbnails/`. In the component, always use:

```tsx
// ✅ CORRECT — works on any fork or deployment base
src={`${import.meta.env.BASE_URL}thumbnails/${entry.thumbnail}`}

// ❌ WRONG — breaks any fork that isn't hosted at /AutoDeck/
src={`/AutoDeck/thumbnails/${entry.thumbnail}`}
```

The `import.meta.env.BASE_URL` value is set by the `base` field in `vite.config.ts` and is `/AutoDeck/` for the main deployment.

#### onError Fallback

If a thumbnail fails to load (missing PNG, wrong path), the `onError` handler replaces the broken `<img>` with a placeholder div showing the presentation's initials. This prevents layout shift and broken-image icons.
```

---

## Ticket 46.8 — docs/landing/README.md

Read `docs/landing/README.md` to understand current structure.

Add a `### GallerySection` entry documenting:
- Position: between TestimonialsSection and FooterSection
- Layout: 4-col desktop / 2-col tablet / 1-col mobile grid
- Thumbnail path: `${import.meta.env.BASE_URL}thumbnails/{id}.png`
- onError fallback: placeholder div with title initials
- How to add a card: update `galleryConfig.ts` + run `npm run gallery:capture`

Update the section list/inventory at the top to include GallerySection.

---

## Ticket 46.9 — Sprint Close

1. Commit all changes:
   ```bash
   git add src/landing/galleryConfig.ts src/landing/GallerySection.tsx src/landing/LandingPage.tsx
   git add scripts/gallery-capture.js package.json public/thumbnails/
   git add SKILL.md docs/landing/README.md specs/05_qa_lead.md
   git add specs/backlog.md
   ```

2. Write `sprints/sprint-46/summary.md`:
   - Sprint 46 heading + date
   - What shipped table
   - Key decisions (BASE_URL thumbnail path, onError fallback, gallery placement)
   - E2E results
   - Follow-on ideas (filter by category, animated previews)

3. Update `specs/backlog.md` — change all `46.x` tickets from 🔲 to ✅ Done, update Sprint 46 Status to ✅ Done, update Last Updated date

4. Commit + push

---

## Execution Order

**Batch 1 (sequential):** 46.1 → 46.2 → 46.3 (each depends on previous)
**Batch 2 (sequential):** 46.4 → 46.5 (capture depends on component being wired in)
**Batch 3:** 46.6 (E2E)
**Batch 4 (parallel):** 46.7 + 46.8 (independent docs)
**Batch 5:** 46.9 (sprint close)
