# Landing Page Documentation

`src/landing/LandingPage.tsx` — single-file landing page composed of nine sections.

---

## Sections

### HeroSection
Full-viewport hero with animated gradient title, subtitle, and CTA buttons.
- Primary CTA: `#/presentation` (Acme demo)
- Secondary CTA: GitHub repo link
- **Example links row** (Sprint 40): TechBrief (`#/techbrief`) and UIMockup (`#/uimockup`) shown beneath the main CTAs in matching ghost-button style.

### FeaturesSection
Six feature cards in a 3-column grid. Each card uses a Lucide icon, color-matched border, and short description.
- Card titles and descriptions should match the actual slide count — currently **10 Slide Types**.

### HowItWorksSection
Three-step pipeline: Clone → Edit → Deploy. Each step has a numbered circle, description, and inline code chip.

### SlideTypesSection
Grid of all built-in slide type cards (currently **10**). Each card shows the type name in JetBrains Mono and a short description.

**Slide type cards (as of Sprint 40):**

| Type | Color | Description |
|------|-------|-------------|
| `title` | blue | Gradient hero with animated tagline |
| `content` | violet | Icon cards grid + optional metrics bar |
| `comparison` | amber | Two colored panels side-by-side |
| `stats` | emerald | Animated counters + comparison lists |
| `quote` | cyan | Typewriter question + staggered bullets |
| `timeline` | indigo | Vertical step pipeline with scroll |
| `closing` | pink | macOS terminal + CTA links |
| `final` | rose | Word-by-word tagline reveal |
| `diagram` | teal | Architecture, sequence, and ER diagrams via pure SVG — no libraries needed. |
| `mockup` | sky | Browser-chrome wireframes with 8 block types — no Figma exports required. |

To add a card: append an entry to the `slideTypes` array and add its color key to `colorMap`.

### AIAssistedSection
Prompt-card demo showing how to use SKILL.md with Claude/Copilot/Cursor/Gemini.

### TestimonialsSection
Social proof quote cards from hypothetical users.

### GallerySection
Responsive thumbnail grid of all available presentations, driven by `src/landing/galleryConfig.ts`.

**Position:** After TestimonialsSection, before FooterSection.

**Layout:** 4-column desktop (`lg:grid-cols-4`) / 2-column tablet (`sm:grid-cols-2`) / 1-column mobile.

**Thumbnail path:** Thumbnails are resolved using `import.meta.env.BASE_URL` so that forks with a different repo name work without code changes:
```tsx
src={`${import.meta.env.BASE_URL}thumbnails/${entry.thumbnail}`}
```
`BASE_URL` is set by the `base` field in `vite.config.ts` (currently `/AutoDeck/`).

**onError fallback:** If a thumbnail fails to load, `onError` replaces the `<img>` with a placeholder `<div>` showing the presentation title's initials. No layout shift occurs because the placeholder occupies the same fixed dimensions as the image.

**Config file:** `src/landing/galleryConfig.ts` — exports a `GalleryEntry` interface and the `galleryConfig` array:
```typescript
export interface GalleryEntry {
  id: string;         // slug, e.g. 'techbrief'
  title: string;      // display name
  slideCount: number; // verified from source
  route: string;      // full hash route, e.g. '#/techbrief'
  thumbnail: string;  // PNG filename, e.g. 'techbrief.png'
}
```

**How to add a card:**
1. Add a new `GalleryEntry` to `galleryConfig` in `src/landing/galleryConfig.ts`
2. Regenerate the thumbnail:
   ```bash
   npm run build
   npm run preview &
   sleep 4
   npm run gallery:capture
   pkill -f "vite preview"
   git add public/thumbnails/{id}.png
   ```

### ByTheNumbersSection
Social proof stats section immediately after `GallerySection`.

- **Position:** Between `GallerySection` and `FooterSection`
- **Layout:** 2×2 grid on mobile (`grid-cols-2`) → 4-column on medium+ (`md:grid-cols-4`)
- **Tiles (left to right):**
  1. **GitHub Stars** — live count via `<GitHubStarCounter />` (animated spring counter, yellow star icon, skeleton pulse while loading, `'—'` on error)
  2. **7 Showcase Decks** — static tile
  3. **10 Slide Types** — static tile
  4. **443 Sprint Points** — static tile
- **Animation:** Framer Motion `whileInView` entrance on each card
- **Component:** Defined as `ByTheNumbersSection` function inside `src/landing/LandingPage.tsx`
- **Import:** `GitHubStarCounter` imported from `./GitHubStarCounter`

### DeployButtonsSection
One-click deploy buttons section positioned before `QuickStartSection`.

- **Position:** Between `HowItWorksSection` and `QuickStartSection`
- **Content:** Four deploy buttons — Vercel, Netlify, Stackblitz, Codespaces
- **data-testid:** `"deploy-buttons-section"`
- **Button targets:**
  | Platform | URL |
  |----------|-----|
  | Vercel | `https://vercel.com/new/clone?repository-url=https://github.com/Hundia/AutoDeck` |
  | Netlify | `https://app.netlify.com/start/deploy?repository=https://github.com/Hundia/AutoDeck` |
  | Stackblitz | `https://stackblitz.com/github/Hundia/AutoDeck` |
  | Codespaces | `https://github.com/codespaces/new?repo=Hundia/AutoDeck` |
- **Button style:** `motion.a` with `whileHover={{ y: -2 }}`, `border border-white/10`, `rounded-xl`; each shows platform name and a Lucide icon
- **Component:** Defined as `DeployButtonsSection` function inside `src/landing/LandingPage.tsx`

### FooterSection
Brand mark, external doc links (GitHub, SKILL.md, CLAUDE.md, Issues), and copyright.

---

## Adding Example Presentation Links

Example links live in the Hero CTAs block. Each link is a ghost button (`bg-white/5 border border-white/10`) with an inline description span. To add a new one, replicate the TechBrief or UIMockup anchor in the "Example presentations" `<motion.div>`.

**Current examples:**
- `#/presentation` — Acme Corp demo (9-slide, all 8 original types)
- `#/techbrief` — Spec-driven project story · 10 slides (Sprint 40)
- `#/uimockup` — Design system wireframes · 10 slides (Sprint 40)

---

## Design Tokens

| Element | Class pattern |
|---------|--------------|
| Section bg | `bg-slate-900`, `bg-slate-800`, gradient variants |
| Card | `bg-white/5 border border-{color}-500/20 rounded-xl p-6` |
| Heading | `text-4xl sm:text-5xl font-bold text-white` |
| Sub-text | `text-white/50 text-lg` |
| Primary button | `bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl` |
| Ghost button | `bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl` |
