# Sprint 40 Agent Brief
**AutoDeck — DiagramSlide + MockupSlide + Two Flagship Presentations**

---

## Project Context

AutoDeck is a React + Framer Motion presentation framework at `/opt/autodeck/`.
- Build: `npm run build` (Vite, base `/AutoDeck/`)
- Stack: React 18, TypeScript, Tailwind CSS, Framer Motion — NO other UI libraries
- Slide engine: data-driven; each slide type = TypeScript interface + React component + registry entry
- Currently has 9 slide types: title, content, comparison, stats, quote, timeline, closing, final, code

**MANDATORY rules:**
1. Every ticket must update `specs/backlog.md` status (🔲→🔄→✅)
2. Every new component must update `docs/slides/README.md`
3. `npm run build` must exit 0 after every ticket
4. No new npm packages — pure Tailwind + Framer Motion only

---

## Critical Files — READ THESE BEFORE WRITING CODE

| File | Purpose |
|------|---------|
| `src/slides/components/CodeSlide.tsx` | Browser/macOS chrome pattern — MockupSlide title bar must be identical |
| `src/slides/components/TimelineSlide.tsx` | `whileInView` animation pattern for scrollable slides |
| `src/engine/types.ts` | Extend with new interfaces (currently has SlideData, SlideComponentProps, PresentationConfig) |
| `src/slides/registry.ts` | Register new types here |
| `src/App.tsx` | HashRouter with `/presentation` route — add `/techbrief` + `/uimockup` in ticket 40.11 |
| `src/slides/slides-en.ts` | Acme 9-slide EN deck — reference for slide data format |
| `SKILL.md` | AI guide — add Generation Recipes section in ticket 40.12 |
| `CLAUDE.md` | Update slide count 8→10 in ticket 40.6 |

---

## Ticket 40.1 — DiagramSlide Component

**File to create:** `src/slides/components/DiagramSlide.tsx`

### Data Interface (implement inside the component file)

```typescript
interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  col: number;   // layout column (0-based)
  row: number;   // layout row (0-based)
  color?: 'blue' | 'violet' | 'emerald' | 'amber' | 'cyan' | 'slate';
}

interface DiagramEdge {
  from: string;  // node id
  to: string;    // node id
  label?: string;
  dashed?: boolean;
}

interface DiagramSlideData {
  type: 'diagram';
  mode: 'arch' | 'sequence' | 'er';
  title: string;
  subtitle?: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}
```

### Layout Math

```
NODE_W = 140, NODE_H = 50
x_center = node.col * 200 + 80 + NODE_W/2   → anchor for edges
y_center = node.row * 120 + 60 + NODE_H/2
rect x = node.col * 200 + 80
rect y = node.row * 120 + 60
```

### SVG Structure

```
viewBox="0 0 800 500"
  <defs> — arrowhead marker </defs>
  {nodes.map → <g key={node.id}>
    <rect rx=8 fill={colorMap[node.color ?? 'slate']} stroke={...} />
    <text> label </text>
    <text> sublabel (smaller) </text>
  </g>}
  {edges.map → <motion.path
    d={cubicBezierBetween(from_node, to_node)}
    strokeDasharray={dashed ? '6 3' : undefined}
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
    markerEnd="url(#arrow)"
  />}
```

**Color map for node fill (bg-opacity-20 equivalent in SVG hex):**
- blue: fill `#1e3a5f` stroke `#3b82f6`
- violet: fill `#2d1b4e` stroke `#8b5cf6`
- emerald: fill `#064e3b` stroke `#10b981`
- amber: fill `#451a03` stroke `#f59e0b`
- cyan: fill `#0c3344` stroke `#06b6d4`
- slate: fill `#1e293b` stroke `#475569`

**Arrowhead marker:**
```svg
<defs>
  <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
    <path d="M0,0 L0,6 L8,3 z" fill="#64748b" />
  </marker>
</defs>
```

### Mode-specific additions

**sequence mode:**
- Draw vertical dashed lifelines from each node downward (height 400px)
- Message arrows are horizontal (same y, different x) — y = step_index * 80 + 100
- Edge `from`/`to` still references node ids; treat as sequence steps in order of edges array

**er mode:**
- Node rect is taller (NODE_H = 80) with a header bar + field list area
- sublabel becomes comma-separated fields, render each on its own line inside rect
- Edge label renders at midpoint of path

### Wrapper

```tsx
<div className="max-w-5xl mx-auto w-full">
  <motion.h2 ...> {data.title} </motion.h2>
  {data.subtitle && <motion.p ...> {data.subtitle} </motion.p>}
  {/* Mode badge top-right of SVG container */}
  <div className="relative">
    <span className="absolute top-2 right-2 text-xs font-mono bg-slate-800/80 border border-slate-700 px-2 py-1 rounded text-slate-400 uppercase z-10">
      {data.mode}
    </span>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
      className="bg-slate-900/80 rounded-xl border border-slate-700/60 overflow-hidden">
      <svg viewBox="0 0 800 500" className="w-full h-auto">
        ...
      </svg>
    </motion.div>
  </div>
</div>
```

---

## Ticket 40.2 — DiagramSlide Register

After 40.1 is done:

1. **`src/engine/types.ts`** — Add at the bottom:
```typescript
export interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  col: number;
  row: number;
  color?: 'blue' | 'violet' | 'emerald' | 'amber' | 'cyan' | 'slate';
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
}

export interface DiagramSlideData extends SlideData {
  type: 'diagram';
  mode: 'arch' | 'sequence' | 'er';
  title: string;
  subtitle?: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}
```

2. **`src/slides/registry.ts`** — Add:
```typescript
import DiagramSlide from './components/DiagramSlide';
// in slideComponents object:
diagram: DiagramSlide,
```

3. Run `npm run build` — must exit 0.

---

## Ticket 40.3 — MockupSlide Component

**File to create:** `src/slides/components/MockupSlide.tsx`

### Data Interface

```typescript
type BlockType = 'navbar' | 'hero' | 'card-grid' | 'table' | 'form' | 'chart-bar' | 'sidebar' | 'text-block';

interface MockupBlock {
  type: BlockType;
  label?: string;  // optional heading for the block
}

interface MockupFrame {
  url?: string;
  blocks: MockupBlock[];
}

interface MockupSlideData {
  type: 'mockup';
  title: string;
  subtitle?: string;
  displayMode: 'browser' | 'flow';
  // browser mode: single frame
  url?: string;
  blocks?: MockupBlock[];
  // flow mode: multiple frames
  frames?: MockupFrame[];
}
```

### Browser Chrome (IDENTICAL to CodeSlide — copy exactly)

```tsx
{/* Title bar */}
<div className="bg-slate-800 px-4 py-3 flex items-center gap-3 border-b border-slate-700/60">
  <div className="flex items-center gap-1.5">
    <div className="w-3 h-3 rounded-full bg-red-500/80" />
    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
    <div className="w-3 h-3 rounded-full bg-green-500/80" />
  </div>
  <div className="flex-1 flex items-center justify-center">
    <span className="text-xs text-slate-400 font-mono bg-slate-700/50 px-3 py-1 rounded">
      {url ?? 'app.example.com'}
    </span>
  </div>
</div>
{/* Content area */}
<div className="bg-slate-50 rounded-b-xl overflow-hidden">
  {/* blocks render here */}
</div>
```

### 8 Block Renderers

Each block is a motion.div with stagger delay: `delay: 0.3 + index * 0.1`

```
navbar:    white bar h-10, flex items-center gap-4 px-4
           logo: "▦ App" in text-slate-800 font-bold
           nav links: 3 gray rounded pills text-xs
           
hero:      gradient bg-gradient-to-r from-blue-500 to-violet-500 h-20
           headline: white text-lg font-bold
           CTA button: white bg px-3 py-1 rounded text-blue-600 text-xs
           
card-grid: grid grid-cols-3 gap-2 p-3
           3 cards: bg-white border border-slate-200 rounded-lg p-2
           each: gray line stubs (2 lines of bg-slate-200 h-2 rounded)
           
table:     full-width table text-xs
           header row: bg-slate-100 4 cols (Name, Status, Date, Action)
           3 data rows: alternating bg-white/bg-slate-50
           cells: bg-slate-200 rounded h-2 (stub lines)
           
form:      p-3 space-y-2
           2 label+input pairs: label=text-xs text-slate-500, input=border border-slate-300 rounded px-2 py-1 w-full bg-white text-xs
           submit button: bg-blue-500 text-white text-xs px-4 py-1.5 rounded
           
chart-bar: flex items-end gap-1.5 h-16 px-3 pb-2 border-b border-slate-200
           5 bars: bg-blue-400 rounded-t w-8, varying heights: [60%, 80%, 40%, 90%, 65%]
           
sidebar:   flex h-full
           left rail w-24 bg-slate-100 border-r border-slate-200
           4 nav items: text-xs py-1.5 px-2 rounded text-slate-600
           right content: flex-1 p-2 space-y-1 (3 bg-slate-200 h-2 rounded stubs)
           
text-block: p-3 space-y-1.5
            4 lines: bg-slate-200 rounded h-2 (last line: w-3/4)
```

### flow mode (displayMode === 'flow')

**CRITICAL: CSS-only connectors — NO getBoundingClientRect, NO SVG overlay, NO refs**

```tsx
{/* 3 mini-frames side by side */}
<div className="flex items-start gap-0">
  {frames.map((frame, i) => (
    <React.Fragment key={i}>
      {/* Mini browser frame */}
      <div className="flex-1 rounded-xl overflow-hidden border border-slate-700/60 ...">
        {/* chrome + blocks */}
      </div>
      {/* CSS arrow connector (between frames, not after last) */}
      {i < frames.length - 1 && (
        <div className="flex items-center self-center px-1">
          <div className="w-6 h-0.5 bg-blue-500/60" />
          <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-t-transparent border-b-transparent border-l-blue-500/60" />
        </div>
      )}
    </React.Fragment>
  ))}
</div>
```

### Wrapper

```tsx
<div className="max-w-5xl mx-auto w-full">
  <motion.h2 .../> {/* title */}
  {subtitle && <motion.p .../>}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="rounded-xl overflow-hidden border border-slate-700/60 shadow-2xl shadow-black/40"
  >
    {renderBrowserChrome()}
    {displayMode === 'browser' ? renderBlocks(blocks) : renderFlowFrames(frames)}
  </motion.div>
</div>
```

---

## Ticket 40.4 — MockupSlide Register

After 40.3 is done:

1. **`src/engine/types.ts`** — Add:
```typescript
export type BlockType = 'navbar' | 'hero' | 'card-grid' | 'table' | 'form' | 'chart-bar' | 'sidebar' | 'text-block';

export interface MockupBlock {
  type: BlockType;
  label?: string;
}

export interface MockupFrame {
  url?: string;
  blocks: MockupBlock[];
}

export interface MockupSlideData extends SlideData {
  type: 'mockup';
  title: string;
  subtitle?: string;
  displayMode: 'browser' | 'flow';
  url?: string;
  blocks?: MockupBlock[];
  frames?: MockupFrame[];
}
```

2. **`src/slides/registry.ts`** — Add:
```typescript
import MockupSlide from './components/MockupSlide';
// in slideComponents:
mockup: MockupSlide,
```

3. Run `npm run build` — must exit 0.

---

## Ticket 40.5 — Build Gate (Phase 1)

Add these two temp slides to `src/slides/slides-en.ts` (append before the final slide, index 8):

```typescript
// TEMP: diagram build gate
{
  type: 'diagram',
  mode: 'arch',
  title: 'Architecture Overview',
  nodes: [
    { id: 'cli', label: 'CLI', col: 0, row: 1, color: 'blue' },
    { id: 'api', label: 'API', col: 1, row: 0, color: 'violet' },
    { id: 'db', label: 'Database', col: 1, row: 2, color: 'emerald' },
    { id: 'cdn', label: 'CDN', col: 2, row: 1, color: 'amber' },
  ],
  edges: [
    { from: 'cli', to: 'api' },
    { from: 'api', to: 'db' },
    { from: 'api', to: 'cdn' },
  ],
},
// TEMP: mockup build gate
{
  type: 'mockup',
  title: 'Dashboard Wireframe',
  displayMode: 'browser',
  url: 'app.example.com/dashboard',
  blocks: [
    { type: 'navbar' },
    { type: 'hero' },
    { type: 'card-grid' },
  ],
},
```

Run `npm run build` — must exit 0.
Navigate to `/#/presentation` — confirm both slides render visually (no blank screens or crashes).
Then REMOVE both temp slides from `slides-en.ts`.
Run `npm run build` again — must exit 0.

---

## Ticket 40.6 — Docs: New Types

### `docs/slides/README.md` — Add two rows to the Built-in Types table:

```markdown
| `diagram` | `DiagramSlide` | `title`, `mode` (arch/sequence/er), `nodes[]`, `edges[]` |
| `mockup` | `MockupSlide` | `title`, `displayMode` (browser/flow), `blocks[]` or `frames[]` |
```

Also add a brief usage example section for each type.

### `src/slides/data/README.md` — Create new file:

```markdown
# Slide Data Files

Presentation data lives in `src/slides/data/` following the naming convention:

```
{presentation-name}-{lang}.ts
```

**Examples:**
- `slides-techbrief-en.ts` — TechBrief EN
- `slides-techbrief-he.ts` — TechBrief HE
- `slides-uimockup-en.ts` — UIMockup EN
- `slides-uimockup-he.ts` — UIMockup HE

Each file exports an array: `export const slidesTechbriefEN: SlideData[] = [...]`

The Acme deck lives at the root (`src/slides/slides-en.ts`) as the legacy default.
```

### `CLAUDE.md` — Update two places:
1. In the slide types table: add `code`, `diagram`, `mockup` (count is now 10)
2. In the "8 built-in slide types" comment/note → "10 built-in slide types"

### `SKILL.md` — Add two rows to the Built-in Slide Types table:
```markdown
| `diagram` | Architecture/sequence/ER diagrams | `mode`, `nodes[]`, `edges[]` |
| `mockup` | Browser wireframe (block system) | `displayMode`, `blocks[]` or `frames[]` |
```

---

## Ticket 40.7 — TechBrief EN Data

**File:** `src/slides/data/slides-techbrief-en.ts`

10 slides themed around "AutoSpec" — a spec-driven development framework.

```typescript
import type { SlideData } from '../../engine/types';

export const slidesTechbriefEN: SlideData[] = [
  // 1. TITLE
  {
    type: 'title',
    title: 'AutoSpec',
    subtitle: 'Spec-Driven Development at Scale',
    tagline: 'Ship faster. Break less. Sleep more.',
    presenter: 'AutoDeck Team',
    badge: 'Sprint 40',
  },

  // 2. QUOTE — spec drift problem
  {
    type: 'quote',
    title: 'The Problem',
    question: 'Why do great engineers ship features that nobody specced?',
    points: [
      '📋  60% of bugs originate from ambiguous or missing requirements',
      '🔄  Spec-to-code drift averages 3 major deviations per sprint',
      '⏰  Teams spend 40% of sprint time on clarifications instead of building',
    ],
  },

  // 3. CONTENT — 4 deliverables + 4 metrics
  {
    type: 'content',
    title: 'What AutoSpec Delivers',
    subtitle: 'Four pillars of spec-driven confidence',
    cards: [
      { icon: '📐', title: 'Living Specs', description: 'Specs that evolve with your code — never stale, always authoritative.' },
      { icon: '🤖', title: 'AI Orchestration', description: 'Claude-powered agents plan, implement, and QA each ticket in sequence.' },
      { icon: '🔁', title: 'Closed-Loop QA', description: 'Every ticket runs build gate → test → docs before marking ✅ Done.' },
      { icon: '📊', title: 'Sprint Analytics', description: 'Velocity tracking, burndown, and retrospective data generated automatically.' },
    ],
    metrics: [
      { label: 'Sprints', value: '40+' },
      { label: 'Pts Delivered', value: '443' },
      { label: 'Ticket Hit Rate', value: '97%' },
      { label: 'Avg Sprint Pts', value: '38' },
    ],
  },

  // 4. TIMELINE — 5 sprint execution steps (scrollable)
  {
    type: 'timeline',
    scrollable: true,
    title: 'Sprint Execution Flow',
    subtitle: 'From backlog to deployed — repeatable every sprint',
    steps: [
      { number: 1, title: 'Backlog Grooming', subtitle: 'PM writes tickets with owner, model, pts, deps — no ambiguity allowed', time: '15min', output: 'specs/backlog.md updated with 🔲 tickets' },
      { number: 2, title: 'Orchestrator Brief', subtitle: 'Opus writes agents/sprint-N-brief.md — context package for all Sonnet agents', time: '5min', output: 'agents/sprint-N-brief.md created with file paths + conventions' },
      { number: 3, title: 'Parallel Execution', subtitle: 'Independent tickets spawn as parallel Sonnet agents — no idle time', time: 'N×parallel', output: 'Each agent commits code + updates backlog 🔄→🧪' },
      { number: 4, title: 'QA + Build Gate', subtitle: 'npm run build exits 0; smoke tests pass; no console errors', time: '2min', output: 'All tests green; visual check complete' },
      { number: 5, title: 'Sprint Close', subtitle: 'Summary written, backlog ✅, git tag created, push to GitHub Pages', time: '10min', output: 'sprints/sprint-N/summary.md + git tag sprint-N-complete' },
    ],
  },

  // 5. DIAGRAM — arch mode, 5 nodes
  {
    type: 'diagram',
    mode: 'arch',
    title: 'AutoSpec Architecture',
    subtitle: 'How orchestrator, agents, and backlog connect',
    nodes: [
      { id: 'cli', label: 'Developer', sublabel: '/sprint-run', col: 0, row: 1, color: 'blue' },
      { id: 'orch', label: 'Orchestrator', sublabel: 'Claude Opus', col: 1, row: 1, color: 'violet' },
      { id: 'agentA', label: 'Agent A', sublabel: 'Sonnet', col: 2, row: 0, color: 'cyan' },
      { id: 'agentB', label: 'Agent B', sublabel: 'Sonnet', col: 2, row: 2, color: 'cyan' },
      { id: 'backlog', label: 'Backlog', sublabel: 'specs/backlog.md', col: 3, row: 1, color: 'emerald' },
    ],
    edges: [
      { from: 'cli', to: 'orch', label: 'invoke' },
      { from: 'orch', to: 'agentA', label: 'spawn' },
      { from: 'orch', to: 'agentB', label: 'spawn' },
      { from: 'agentA', to: 'backlog', label: '✅' },
      { from: 'agentB', to: 'backlog', label: '✅' },
    ],
  },

  // 6. DIAGRAM — sequence mode, 4 actors
  {
    type: 'diagram',
    mode: 'sequence',
    title: 'Ticket Lifecycle',
    subtitle: 'From creation to close — the AutoSpec flow',
    nodes: [
      { id: 'pm', label: 'PM', col: 0, row: 0, color: 'blue' },
      { id: 'orch', label: 'Orchestrator', col: 1, row: 0, color: 'violet' },
      { id: 'dev', label: 'Dev Agent', col: 2, row: 0, color: 'cyan' },
      { id: 'bl', label: 'Backlog', col: 3, row: 0, color: 'emerald' },
    ],
    edges: [
      { from: 'pm', to: 'orch', label: 'write ticket' },
      { from: 'orch', to: 'dev', label: 'spawn agent' },
      { from: 'dev', to: 'bl', label: '🔄 in progress' },
      { from: 'dev', to: 'bl', label: '✅ done' },
    ],
  },

  // 7. DIAGRAM — er mode, 3 entities
  {
    type: 'diagram',
    mode: 'er',
    title: 'Data Model',
    subtitle: 'Sprint, Ticket, and Output — the AutoSpec schema',
    nodes: [
      { id: 'sprint', label: 'Sprint', sublabel: 'id, name, points, status', col: 0, row: 1, color: 'violet' },
      { id: 'ticket', label: 'Ticket', sublabel: 'id, owner, model, pts, deps', col: 1, row: 0, color: 'blue' },
      { id: 'output', label: 'Output', sublabel: 'file, type, ticket_id', col: 2, row: 1, color: 'emerald' },
    ],
    edges: [
      { from: 'sprint', to: 'ticket', label: 'has many' },
      { from: 'ticket', to: 'output', label: 'produces' },
    ],
  },

  // 8. CODE — YAML sprint config
  {
    type: 'code',
    title: 'Sprint Config as Code',
    subtitle: 'Every sprint defined in structured YAML — no ambiguity',
    filename: 'sprint-40.yaml',
    language: 'YAML',
    lines: [
      'sprint: 40',
      'name: DiagramSlide + MockupSlide',
      'points: 53',
      'background: circuits',
      '',
      'tickets:',
      '  - id: 40.1',
      '    title: DiagramSlide component',
      '    owner: Frontend',
      '    model: sonnet',
      '    pts: 8',
      '    deps: []',
      '  - id: 40.2',
      '    title: DiagramSlide register',
      '    deps: [40.1]',
    ],
    highlights: [6, 7, 8, 9, 10, 11, 12],
    output: [
      '▶  Validating sprint config... OK',
      '▶  Resolving dependency graph... 8 batches',
      '✅ Sprint 40 ready — 14 tickets, 3 phases',
    ],
  },

  // 9. STATS
  {
    type: 'stats',
    title: 'AutoSpec by the Numbers',
    subtitle: 'Four years of spec-driven development',
    stats: [
      { value: '443', label: 'Points Delivered' },
      { value: '97%', label: 'Ticket Hit Rate' },
      { value: '40+', label: 'Sprints Completed' },
      { value: '<2min', label: 'Build Time' },
    ],
    leftLabel: 'Without AutoSpec',
    rightLabel: 'With AutoSpec',
    leftItems: ['40% sprint on clarifications', '3 spec deviations/sprint', 'Manual QA every ticket', '1 deployment/sprint'],
    rightItems: ['5% sprint on clarifications', '0.1 spec deviations/sprint', 'Automated build gate', '12+ deployments/sprint'],
    bottomLine: 'From solo hackers to enterprise teams — AutoSpec scales with you',
  },

  // 10. CLOSING
  {
    type: 'closing',
    title: 'Start Your First Spec-Driven Sprint',
    install: 'npx autospec init',
    commands: [
      { cmd: '/plan-sprint', desc: 'AI plans your next sprint from backlog' },
      { cmd: '/sprint-run 1', desc: 'Execute sprint end-to-end, zero config' },
      { cmd: '/sprint-close 1', desc: 'Close, summarize, tag, and push' },
    ],
    links: [
      { url: 'https://github.com/Hundia/AutoDeck', label: 'GitHub' },
      { url: 'https://hundia.github.io/AutoDeck/', label: 'Live Demo' },
    ],
    tagline: 'Your next sprint starts with a spec.',
  },
];
```

---

## Ticket 40.8 — TechBrief HE Translation

**File:** `src/slides/data/slides-techbrief-he.ts`

Translate all prose fields to Hebrew. Keep code/YAML content and node labels in English.
Export name: `slidesTechbriefHE`

Translation guide (key strings):
- "Spec-Driven Development at Scale" → "פיתוח מונחה-מפרט בקנה מידה גדול"
- "Ship faster. Break less. Sleep more." → "שלחו מהר. שברו פחות. ישנו יותר."
- "The Problem" → "הבעיה"
- "Why do great engineers ship features that nobody specced?" → "למה מהנדסים מעולים מספקים פיצ'רים שאף אחד לא מפרט?"
- "What AutoSpec Delivers" → "מה AutoSpec מספק"
- "Sprint Execution Flow" → "תהליך הרצת הספרינט"
- "AutoSpec Architecture" → "ארכיטקטורת AutoSpec"
- "Ticket Lifecycle" → "מחזור חיי הטיקט"
- "Data Model" → "מודל הנתונים"
- "Sprint Config as Code" → "קונפיגורציית ספרינט כקוד"
- "AutoSpec by the Numbers" → "AutoSpec במספרים"
- "Start Your First Spec-Driven Sprint" → "התחילו את הספרינט המונחה-מפרט הראשון שלכם"

---

## Ticket 40.9 — UIMockup EN Data

**File:** `src/slides/data/slides-uimockup-en.ts`

10 slides themed around "AutoDeck Dashboard Design System v2.0".

```typescript
import type { SlideData } from '../../engine/types';

export const slidesUimockupEN: SlideData[] = [
  // 1. TITLE
  {
    type: 'title',
    title: 'AutoDeck Dashboard',
    subtitle: 'Design System v2.0',
    tagline: 'One token. Every screen. Zero drift.',
    presenter: 'AutoDeck Design Team',
    badge: 'v2.0 Preview',
  },

  // 2. QUOTE
  {
    type: 'quote',
    title: 'The Problem',
    question: 'Why does every new screen feel like it was built by a different team?',
    points: [
      '🎨  Average product has 47 shades of blue — none intentional',
      '🔧  Component drift causes 30% of UI bugs and design rework',
      '📐  Designers and developers speak different languages by default',
    ],
  },

  // 3. CONTENT — 4 DS pillars + token counts
  {
    type: 'content',
    title: 'Design System Pillars',
    subtitle: 'Built once, consistent everywhere',
    cards: [
      { icon: '🎨', title: 'Design Tokens', description: '180 semantic tokens for color, spacing, and typography — single source of truth.' },
      { icon: '🧱', title: 'Component Library', description: '64 battle-tested components, each with variants, states, and a11y baked in.' },
      { icon: '📐', title: 'Layout Grid', description: '12-column adaptive grid, 8-point spacing system, responsive breakpoints at 4 sizes.' },
      { icon: '✏️', title: 'Motion Language', description: 'Consistent timing curves and durations — every interaction feels intentional.' },
    ],
    metrics: [
      { label: 'Tokens', value: '180' },
      { label: 'Components', value: '64' },
      { label: 'Screens', value: '12' },
      { label: 'Coverage', value: '100%' },
    ],
  },

  // 4. STATS
  {
    type: 'stats',
    title: 'Design System ROI',
    subtitle: 'Before and after adopting the AutoDeck DS',
    stats: [
      { value: '180', label: 'Design Tokens' },
      { value: '64', label: 'Components' },
      { value: '70%', label: 'Faster Screens' },
      { value: '0', label: 'Drift Issues' },
    ],
    leftLabel: 'Without DS',
    rightLabel: 'With AutoDeck DS',
    leftItems: ['47 ad-hoc color values', '3–5 days per new screen', '30% UI bugs from drift', 'Figma ≠ code always'],
    rightItems: ['180 semantic tokens', '0.5 days per new screen', '0% drift issues', 'Figma = code always'],
    bottomLine: 'One design language — zero translation cost',
  },

  // 5. TIMELINE — 5-step design-to-code
  {
    type: 'timeline',
    scrollable: true,
    title: 'Design → Code Workflow',
    subtitle: 'From concept to deployed screen — one unified flow',
    steps: [
      { number: 1, title: 'Token Sync', subtitle: 'Design tokens exported from Figma Tokens plugin as JSON', time: '1min', output: 'tokens.json → src/design-tokens.ts auto-generated' },
      { number: 2, title: 'Component Spec', subtitle: 'Each component specced with variants, props, and a11y requirements', time: '30min', output: 'components/Button.spec.md with acceptance criteria' },
      { number: 3, title: 'Code Generation', subtitle: 'AutoSpec AI agent implements component from spec + token values', time: '5min', output: 'src/components/Button.tsx + Storybook story' },
      { number: 4, title: 'Visual QA', subtitle: 'Storybook screenshot diff + a11y audit + mobile viewport check', time: '2min', output: 'All stories pass — 0 a11y violations' },
      { number: 5, title: 'Deploy + Publish', subtitle: 'Component pushed to npm package + Storybook docs updated', time: '1min', output: '@autodeck/ds v2.0.1 published — 64 components' },
    ],
  },

  // 6. MOCKUP — Dashboard wireframe
  {
    type: 'mockup',
    title: 'Dashboard Screen',
    subtitle: 'The main analytics view — navbar, hero metrics, and card grid',
    displayMode: 'browser',
    url: 'app.autodeck.io/dashboard',
    blocks: [
      { type: 'navbar', label: 'Navigation' },
      { type: 'hero', label: 'Metrics Hero' },
      { type: 'card-grid', label: 'KPI Cards' },
      { type: 'chart-bar', label: 'Deployment Chart' },
    ],
  },

  // 7. MOCKUP — Backlog screen
  {
    type: 'mockup',
    title: 'Backlog Screen',
    subtitle: 'Sprint management view — sidebar navigation and ticket table',
    displayMode: 'browser',
    url: 'app.autodeck.io/backlog',
    blocks: [
      { type: 'navbar', label: 'Navigation' },
      { type: 'sidebar', label: 'Sprint Sidebar' },
      { type: 'table', label: 'Ticket Table' },
    ],
  },

  // 8. MOCKUP — flow mode, 3 mini-frames
  {
    type: 'mockup',
    title: 'User Onboarding Flow',
    subtitle: 'Three-step flow from signup to first presentation',
    displayMode: 'flow',
    frames: [
      {
        url: 'autodeck.io/signup',
        blocks: [{ type: 'hero' }, { type: 'form' }],
      },
      {
        url: 'autodeck.io/setup',
        blocks: [{ type: 'navbar' }, { type: 'card-grid' }],
      },
      {
        url: 'autodeck.io/dashboard',
        blocks: [{ type: 'navbar' }, { type: 'chart-bar' }],
      },
    ],
  },

  // 9. COMPARISON
  {
    type: 'comparison',
    title: 'Manual Design vs Design System',
    subtitle: 'The real cost of building without a system',
    left: {
      label: 'Manual Design',
      color: 'red',
      items: [
        { icon: '🎨', text: 'New color picked every sprint' },
        { icon: '🔧', text: '30% of PRs need design rework' },
        { icon: '📐', text: 'Figma and code always diverge' },
        { icon: '🐛', text: 'Drift causes untraceable UI bugs' },
      ],
    },
    right: {
      label: 'AutoDeck Design System',
      color: 'purple',
      items: [
        { icon: '🎯', text: '180 tokens — zero ad-hoc values' },
        { icon: '✅', text: 'Components spec\'d before code' },
        { icon: '🔗', text: 'Figma tokens sync to code in 1min' },
        { icon: '⚡', text: '70% faster new screen delivery' },
      ],
    },
    callout: 'Teams on the AutoDeck DS ship new screens 70% faster with zero drift issues',
  },

  // 10. FINAL
  {
    type: 'final',
    title: 'AUTODECK DS',
    tagline: 'One design language. Every screen. Forever consistent.',
  },
];
```

---

## Ticket 40.10 — UIMockup HE Translation

**File:** `src/slides/data/slides-uimockup-he.ts`

Export name: `slidesUimockupHE`

Translation guide:
- "Design System v2.0" → "מערכת עיצוב v2.0"
- "One token. Every screen. Zero drift." → "טוקן אחד. כל מסך. אפס סטייה."
- "Why does every new screen feel like it was built by a different team?" → "למה כל מסך חדש מרגיש כאילו נבנה על ידי צוות אחר?"
- "Design System Pillars" → "עמודי מערכת העיצוב"
- "Design System ROI" → "החזר השקעה — מערכת עיצוב"
- "Design → Code Workflow" → "תהליך עיצוב ← קוד"
- "Dashboard Screen" → "מסך הדשבורד"
- "Backlog Screen" → "מסך הבאקלוג"
- "User Onboarding Flow" → "זרימת הצטרפות משתמש"
- "Manual Design vs Design System" → "עיצוב ידני מול מערכת עיצוב"
- "One design language. Every screen. Forever consistent." → "שפת עיצוב אחת. כל מסך. עקיבות לנצח."

---

## Ticket 40.11 — Wire Routes in App.tsx

**File:** `src/App.tsx`

Add two new routes. Keep existing Acme `/presentation` route untouched.

```typescript
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './landing';
import PresentationViewer from './engine/PresentationViewer';
import { presentationConfig } from './config';
import { slidesEN } from './slides/slides-en';
import { slidesHE } from './slides/slides-he';
import { slidesTechbriefEN } from './slides/data/slides-techbrief-en';
import { slidesTechbriefHE } from './slides/data/slides-techbrief-he';
import { slidesUimockupEN } from './slides/data/slides-uimockup-en';
import { slidesUimockupHE } from './slides/data/slides-uimockup-he';
import { slideComponents } from './slides/registry';
import type { PresentationConfig } from './engine/types';

const techBriefConfig: PresentationConfig = {
  title: 'AutoSpec TechBrief',
  languages: [{ id: 'en', label: 'English' }, { id: 'he', label: 'עברית' }],
  defaultLanguage: 'en',
  background: 'circuits',
  branding: 'Built with AutoDeck',
};

const uiMockupConfig: PresentationConfig = {
  title: 'AutoDeck Dashboard DS',
  languages: [{ id: 'en', label: 'English' }, { id: 'he', label: 'עברית' }],
  defaultLanguage: 'en',
  background: 'constellation',
  branding: 'Built with AutoDeck',
};

export default function App() {
  const acmeSlides = { en: slidesEN, he: slidesHE };
  const techBriefSlides = { en: slidesTechbriefEN, he: slidesTechbriefHE };
  const uiMockupSlides = { en: slidesUimockupEN, he: slidesUimockupHE };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/presentation"
          element={<PresentationViewer config={presentationConfig} slides={acmeSlides} slideComponents={slideComponents} />}
        />
        <Route
          path="/techbrief"
          element={<PresentationViewer config={techBriefConfig} slides={techBriefSlides} slideComponents={slideComponents} />}
        />
        <Route
          path="/uimockup"
          element={<PresentationViewer config={uiMockupConfig} slides={uiMockupSlides} slideComponents={slideComponents} />}
        />
      </Routes>
    </HashRouter>
  );
}
```

Run `npm run build` — must exit 0.

---

## Ticket 40.12 — SKILL.md Generation Recipes

Insert a new `## Generation Recipes` section in `SKILL.md` between `## File Map` and `## SDD Development with AutoDeck` (or at end if those sections don't exist).

Section structure:

```markdown
## Generation Recipes

Use these verbatim prompt templates to generate complete presentations from existing project artifacts.

### Recipe 1: TechBrief (from codebase + spec)

**When to use:** You have a codebase, git log, and/or spec doc and want a 10-slide technical presentation.

**Prompt template:**
\`\`\`
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
\`\`\`

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
\`\`\`
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
\`\`\`

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
```

---

## Ticket 40.13 — Landing Page Updates

**File:** `src/landing/LandingPage.tsx`

Read the file first, then make these 4 targeted changes:

1. **SlideTypesSection heading:** `"8 Built-In Slide Types"` → `"10 Built-In Slide Types"`
2. **SlideTypesSection cards:** Add two new cards for `diagram` and `mockup` in the same style as existing cards.
3. **FeaturesSection (if present):** Any "8 slide types" text → "10 slide types"
4. **AIAssistedSection or new section:** Add TechBrief + UIMockup example links alongside existing Acme link.
   - TechBrief: links to `#/techbrief`, badge "TechBrief"
   - UIMockup: links to `#/uimockup`, badge "UIMockup"
   - Match existing Acme card style exactly.

Run `npm run build` — must exit 0.
Update `docs/landing/` to reflect new sections.

---

## Ticket 40.14 — Sprint Close

1. Verify `/#/presentation`, `/#/techbrief`, `/#/uimockup` all load.
2. Verify `circuits` background on TechBrief, `constellation` on UIMockup, `particles` on Acme (check `src/config.ts`).
3. Check Hebrew language toggle works on all three.
4. `npm run build` exits 0 — no TypeScript errors.
5. Write `sprints/sprint-40/summary.md` (completed tickets table, key files, QA results, retro).
6. Update `specs/backlog.md` — all 40.x tickets → ✅ Done, Sprint 40 status → ✅ Done.
7. Git commit: `feat(sprint-40): DiagramSlide + MockupSlide + TechBrief + UIMockup`
8. Git push to `origin/main`.

---

## Backlog Update Protocol

After completing each ticket, update `specs/backlog.md`:
- `🔲` → `🔄` when starting
- `🔄` → `✅` when done (build passes, docs updated)

---

## Design System Reminder

- Dark slate background: `from-slate-900 via-slate-800 to-slate-900`
- Cards: `bg-white/5 border border-{color}-500/20 rounded-xl`
- No shadcn/ui, no @radix-ui — raw Tailwind + Framer Motion ONLY
- Fonts: Inter (body), JetBrains Mono (code/terminal)
