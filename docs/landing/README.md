# Landing Page Documentation

`src/landing/LandingPage.tsx` — single-file landing page composed of six sections.

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
