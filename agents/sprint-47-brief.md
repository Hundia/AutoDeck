# Sprint 47 Agent Brief — Make AutoDeck Go Viral

## Mission
Add viral growth mechanics to AutoDeck: a meta-presentation about the framework itself, an interactive branding link in the presentation engine, a Share modal, GitHub star counter, deploy buttons, OG image, and a README revamp.

## Critical Rules
- `npm run build` must exit 0 after EVERY ticket
- Do NOT add new runtime npm dependencies (devDeps for scripts are OK)
- Do NOT modify slide engine types without reading `src/engine/types.ts` first
- Do NOT modify PresentationViewer without reading it fully first
- All new components must use existing Tailwind classes + Framer Motion patterns

## Repo Root
`/opt/autodeck/`

## Key Files to Read Before Implementing
- `src/engine/types.ts` — PresentationConfig interface
- `src/engine/PresentationViewer.tsx` — full viewer structure
- `src/App.tsx` — all 7 existing routes and config objects
- `src/config.ts` — main presentationConfig
- `src/landing/LandingPage.tsx` — current sections order
- `src/landing/galleryConfig.ts` — GalleryEntry interface + 7 entries
- `src/landing/GallerySection.tsx` — how cards are rendered
- `src/slides/data/slides-ferric-en.ts` — example of a complete slide data file (reference format)
- `src/slides/data/creation-story-ferric.ts` — example creation story format
- `docs/engine/README.md` — engine docs
- `docs/landing/README.md` — landing page docs

## Slide Type Reference (exact field names)
```typescript
// title slide
{ type: 'title', title: string, subtitle?: string, tagline?: string, badge?: string }

// stats slide
{ type: 'stats', stats: Array<{ value: string, label: string, icon?: string }>, leftItems?: string[], rightItems?: string[] }

// content slide
{ type: 'content', title: string, cards: Array<{ title: string, items: string[], color?: string }>, metrics?: Array<{ value: string, label: string }> }

// diagram slide
{ type: 'diagram', title: string, mode: 'arch' | 'sequence' | 'er', nodes: Array<{ id: string, label: string, row: number, col: number, color?: string }>, edges: Array<{ from: string, to: string, label?: string }>, autoEdges?: boolean }

// code slide
{ type: 'code', title: string, language: string, code: string, filename?: string, highlights?: number[] }

// comparison slide
{ type: 'comparison', title?: string, left: { title: string, items: Array<{ icon: string, text: string }> }, right: { title: string, items: Array<{ icon: string, text: string }> }, callout?: string }

// timeline slide
{ type: 'timeline', title?: string, steps: Array<{ year: string, title: string, description: string }>, scrollable?: boolean }

// closing slide
{ type: 'closing', title?: string, install?: string, commands?: Array<{ label: string, cmd: string }>, links?: Array<{ label: string, url: string }> }
```

## Ticket 47.1 — slides-meta-en.ts

**File:** `src/slides/data/slides-meta-en.ts` (CREATE NEW)

Read `src/slides/data/slides-ferric-en.ts` for the exact export pattern.

Create an 8-slide AutoDeck pitch deck. Export as `export const slidesMetaEN: SlideData[]`.

Import type from `../../engine/types` — check the exact import path used in existing slide files.

Slides:
1. **title** — title: "AutoDeck", subtitle: "AI-generated. Framework-ready. Open source.", tagline: "Build your next deck in 5 minutes", badge: "11 Sprints"
2. **stats** — stats: [{ value: "10", label: "Slide Types" }, { value: "7", label: "Showcase Decks" }, { value: "3", label: "Themes" }, { value: "443", label: "Points Invested" }]
3. **content** — title: "Built on Four Pillars", cards: [{ title: "Framer Motion", items: ["Smooth transitions", "Stagger animations", "whileInView reveals"] }, { title: "Theme System", items: ["Aurora, Sivania, Noir", "16 CSS tokens", "localStorage persistence"] }, { title: "Creation Story", items: ["Prompt history", "Slide decisions", "Framework notes"] }, { title: "Zero Backend", items: ["GitHub Pages", "Vite + React 18", "One git push"] }]
4. **diagram** — title: "How It Works", mode: 'arch', autoEdges: true, nodes: [{ id: "skill", label: "SKILL.md", row: 0, col: 0 }, { id: "claude", label: "Claude / AI", row: 0, col: 1 }, { id: "data", label: "Slide Data", row: 0, col: 2 }, { id: "viewer", label: "PresentationViewer", row: 0, col: 3 }, { id: "pages", label: "GitHub Pages", row: 0, col: 4 }], edges: []
5. **code** — title: "One Slide. Pure TypeScript.", language: "typescript", filename: "slides-en.ts", code: a short 12-line example showing a title slide definition and a stats slide definition, highlights: [1, 2, 3]
6. **comparison** — title: "AutoDeck vs The Alternatives", left: { title: "Traditional Tools", items: [{ icon: "⏱", text: "Hours of manual formatting" }, { icon: "🔒", text: "Vendor lock-in" }, { icon: "💸", text: "Monthly subscription" }, { icon: "🚫", text: "No version control" }] }, right: { title: "AutoDeck", items: [{ icon: "⚡", text: "AI-generated in minutes" }, { icon: "🔓", text: "Open source, fork it" }, { icon: "🆓", text: "Free forever" }, { icon: "✅", text: "Git-native, diff your slides" }] }
7. **timeline** — title: "The Journey", steps: [{ year: "Apr 2025", title: "AutoSpec Sprint 10", description: "First presentation engine extracted from AutoSpec" }, { year: "Oct 2025", title: "Sprint 39 — AutoDeck Launch", description: "Standalone GitHub Pages deploy, SDD bootstrap" }, { year: "Jan 2026", title: "Sprint 40-42 — Engine Maturity", description: "10 slide types, 3 themes, Creation Story drawer" }, { year: "Mar 2026", title: "Sprint 44-45 — Community Personas", description: "3 persona presentations, image blocks, autoEdges" }, { year: "Apr 2026", title: "Sprint 46-47 — Viral Growth", description: "Gallery, share modal, OG image, deploy buttons" }]
8. **closing** — title: "Start Building", commands: [{ label: "Clone", cmd: "git clone https://github.com/Hundia/AutoDeck" }, { label: "Install", cmd: "npm install" }, { label: "Dev", cmd: "npm run dev" }], links: [{ label: "GitHub", url: "https://github.com/Hundia/AutoDeck" }, { label: "Live Demo", url: "https://hundia.github.io/AutoDeck/" }]

Run `npm run build`. Fix any TS errors.

---

## Ticket 47.4 — Interactive Branding + brandingUrl

**Files to read FIRST:** `src/engine/types.ts`, `src/engine/PresentationViewer.tsx`

### Step 1: types.ts
Add `brandingUrl?: string` to `PresentationConfig` interface, immediately after `branding?: string`.

### Step 2: PresentationViewer.tsx
Find the branding block (search for `config.branding`). It currently renders as a `<div>`. Replace with:

```tsx
{config.branding && (
  config.creationStory ? (
    <button
      onClick={() => setDrawerOpen(true)}
      className={`fixed bottom-4 text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer ${isRTL ? 'right-4' : 'left-4'}`}
    >
      {config.branding}
    </button>
  ) : config.brandingUrl ? (
    <a
      href={config.brandingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-4 text-xs text-white/30 hover:text-white/60 transition-colors ${isRTL ? 'right-4' : 'left-4'}`}
    >
      {config.branding}
    </a>
  ) : (
    <div className={`fixed bottom-4 text-xs text-white/30 ${isRTL ? 'right-4' : 'left-4'}`}>
      {config.branding}
    </div>
  )
)}
```

Note: `creationStory` may be passed as a prop called `creationStory` — read PresentationViewer to find the exact prop name and how it's used.

### Step 3: docs/engine/README.md
Add `brandingUrl?: string` to the PresentationConfig fields table. Add a "### Branding Block" section explaining the three-state rendering.

Run `npm run build`. Fix any TS errors.

---

## Ticket 47.6 — ShareModal.tsx

**File:** `src/engine/ShareModal.tsx` (CREATE NEW)

```typescript
interface ShareModalProps {
  url: string;
  title: string;
  onClose: () => void;
}
```

Component structure:
- Overlay: `fixed inset-0 bg-black/60 backdrop-blur-sm z-50` (click closes)
- Card: centered `max-w-md w-full bg-slate-900 border border-white/10 rounded-2xl p-6`
- Framer Motion: `initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}`
- Title: "Share this presentation"
- Three tab buttons: "Link", "Embed", "Social"
- Active tab: `bg-white/10 text-white`, inactive: `text-white/50`

**Link tab:**
- Shows the URL in a truncated `text-xs text-white/40` block
- "Copy Link" button: calls `navigator.clipboard.writeText(url)`, shows "Copied ✓" for 2s then resets
- `data-testid="share-copy-url"`

**Embed tab:**
- `<textarea readOnly>` containing:
  ```html
  <iframe src="{url}" width="1280" height="720" frameborder="0" allowfullscreen></iframe>
  ```
- "Copy Embed" button with same copy pattern
- Below textarea: `<p className="text-xs text-white/40 mt-2">Note: Embedding requires the presentation to be deployed on a non-GitHub-Pages host (GitHub Pages restricts iframe embedding).</p>`
- `data-testid="share-embed-note"`

**Social tab:**
- "Share on X" button: `window.open(\`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Check out "' + title + '" — built with AutoDeck')}\`)`
- "Share on LinkedIn" button: `window.open(\`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}\`)`
- Lucide icons: `Twitter` (or `X`) and `Linkedin`

**Escape key:** `useEffect` listening for `Escape` → calls `onClose()`

Run `npm run build`. Fix TS errors. No new npm deps.

---

## Ticket 47.9 — GitHubStarCounter.tsx

**File:** `src/landing/GitHubStarCounter.tsx` (CREATE NEW)

```typescript
export default function GitHubStarCounter() {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const CACHE_KEY = 'autodeck-gh-stars';
    const TTL = 3_600_000; // 1 hour

    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { count, ts } = JSON.parse(cached);
        if (Date.now() - ts < TTL) {
          setStars(count);
          setLoading(false);
          return;
        }
      }
    } catch {}

    fetch('https://api.github.com/repos/Hundia/AutoDeck')
      .then(r => r.json())
      .then(data => {
        const count = data.stargazers_count ?? 0;
        localStorage.setItem(CACHE_KEY, JSON.stringify({ count, ts: Date.now() }));
        setStars(count);
      })
      .catch(() => setStars(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <span className="inline-block w-8 h-4 bg-white/10 rounded animate-pulse" />;
  if (stars === null) return <span>—</span>;
  return (
    <span className="flex items-center gap-1">
      <Star size={14} className="text-yellow-400" />
      {stars.toLocaleString()}
    </span>
  );
}
```

Import `Star` from `lucide-react` (already installed). Import `useState`, `useEffect` from `react`.

Run `npm run build`.

---

## Ticket 47.11 — DeployButtonsSection

**File to modify:** `src/landing/LandingPage.tsx`

Read the full file first to understand:
1. Where `HowItWorksSection` and `QuickStartSection` are in the JSX return
2. The section styling pattern (look at FeaturesSection or TestimonialsSection for reference)

Add a new function `DeployButtonsSection()` inside `LandingPage.tsx` (before the main export):

```tsx
function DeployButtonsSection() {
  const buttons = [
    { label: 'Deploy to Vercel', href: 'https://vercel.com/new/clone?repository-url=https://github.com/Hundia/AutoDeck', icon: '▲' },
    { label: 'Deploy to Netlify', href: 'https://app.netlify.com/start/deploy?repository=https://github.com/Hundia/AutoDeck', icon: '◆' },
    { label: 'Open in Stackblitz', href: 'https://stackblitz.com/github/Hundia/AutoDeck', icon: '⚡' },
    { label: 'Open in Codespaces', href: 'https://github.com/codespaces/new?repo=Hundia/AutoDeck', icon: '⎔' },
  ];

  return (
    <section className="py-20 px-6 bg-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold text-white mb-3">One Click to Your Own AutoDeck</h2>
          <p className="text-white/50 mb-10">Fork and deploy in under 60 seconds. No config needed.</p>
          <div className="flex flex-wrap justify-center gap-4" data-testid="deploy-buttons-section">
            {buttons.map((b, i) => (
              <motion.a
                key={b.label}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -2 }}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                <span>{b.icon}</span>
                {b.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

Insert `<DeployButtonsSection />` between `<HowItWorksSection />` and `<QuickStartSection />` in the JSX return.

Run `npm run build`.
