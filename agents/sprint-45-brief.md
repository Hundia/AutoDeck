# Sprint 45 Agent Brief — Image Blocks + autoEdges + Terminal Chrome

## Mission
Three additive enhancements to the slide engine, all backward-compatible. No existing slide data breaks.

## Critical Rules
- `npm run build` must exit 0 after EACH ticket
- Do NOT add any new npm packages
- Do NOT modify any presentation config or App.tsx routing
- All local type redeclarations in MockupSlide/DiagramSlide/CodeSlide must be replaced with imports from `../../engine/types`

---

## Ticket 45.1 + 45.2 — Types (run together, same file)

**File:** `src/engine/types.ts`

### 45.1 — MockupBlock image variant

Current `BlockType` and `MockupBlock`:
```typescript
export type BlockType = 'navbar' | 'hero' | 'card-grid' | 'table' | 'form' | 'chart-bar' | 'sidebar' | 'text-block';
export interface MockupBlock { type: BlockType; label?: string; }
```

Change to a discriminated union:
```typescript
export type BlockType = 'navbar' | 'hero' | 'card-grid' | 'table' | 'form' | 'chart-bar' | 'sidebar' | 'text-block' | 'image';

export type MockupBlock =
  | { type: Exclude<BlockType, 'image'>; label?: string }
  | { type: 'image'; src: string; alt: string; caption?: string; aspectRatio?: '16/9' | '4/3' | 'square' };
```

Note: `alt: string` is REQUIRED (not `alt?: string`). TypeScript must enforce this.

### 45.2 — DiagramSlideData.autoEdges

Add `autoEdges?: boolean` to `DiagramSlideData`:
```typescript
export interface DiagramSlideData extends SlideData {
  type: 'diagram';
  mode: 'arch' | 'sequence' | 'er';
  title: string;
  subtitle?: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  autoEdges?: boolean;  // NEW — when true, auto-generate edges from node grid positions
}
```

Run `npm run build` after both changes.

---

## Ticket 45.3 — MockupSlide image block

**File:** `src/slides/components/MockupSlide.tsx`

### Step 1: Remove local type declarations
Find and DELETE the locally-declared `BlockType`, `MockupBlock`, and `MockupFrame` types at the top of the file. Replace with:
```typescript
import type { MockupBlock, MockupFrame, MockupSlideData } from '../../engine/types';
```

(Note: `MockupSlideData` may or may not already be imported — check and adjust)

### Step 2: Add image case to renderBlock

Find the `renderBlock` function (switch statement). Add a new case:

```tsx
case 'image': {
  return (
    <motion.figure
      key={index}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
      className="w-full m-0"
    >
      <img
        src={block.src}
        alt={block.alt}
        className="w-full object-cover rounded"
        style={{
          maxHeight: block.aspectRatio === '4/3' ? '180px' : block.aspectRatio === 'square' ? '160px' : '160px',
        }}
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            const fallback = document.createElement('div');
            fallback.className = 'w-full h-32 bg-slate-200 rounded flex items-center justify-center';
            fallback.innerHTML = '<span class="text-slate-500 text-xs font-mono">image unavailable</span>';
            parent.appendChild(fallback);
          }
        }}
      />
      {block.caption && (
        <figcaption className="text-xs text-slate-400 text-center mt-1 px-2">
          {block.caption}
        </figcaption>
      )}
    </motion.figure>
  );
}
```

### Step 3: TypeScript narrowing

In the switch statement, the `block` parameter is now a discriminated union. TypeScript will know that inside `case 'image':`, `block.src` and `block.alt` exist. For all other cases, `block.label` exists. This should compile correctly without casts.

Run `npm run build`. Fix any TS errors from the discriminated union narrowing.

---

## Ticket 45.4 — DiagramSlide autoEdges

**File:** `src/slides/components/DiagramSlide.tsx`

### Step 1: Remove local type declarations (if any)
If `DiagramSlide.tsx` declares `DiagramNode`, `DiagramEdge`, or `DiagramSlideData` locally, delete them and import from `../../engine/types`.

### Step 2: Add deriveEdges helper

Add this function BEFORE the component definition:

```typescript
function deriveEdges(nodes: DiagramNode[]): DiagramEdge[] {
  const edges: DiagramEdge[] = [];
  // Sort nodes by col then row
  const sorted = [...nodes].sort((a, b) => a.col !== b.col ? a.col - b.col : a.row - b.row);
  // Connect each node to the next one in sorted order (chain pattern)
  for (let i = 0; i < sorted.length - 1; i++) {
    edges.push({ from: sorted[i].id, to: sorted[i + 1].id });
  }
  return edges;
}
```

### Step 3: Use autoEdges in component

Find where the component reads `data.edges` for rendering. Add this computation BEFORE the edges are used:

```typescript
const effectiveEdges = (data.autoEdges && (!data.edges || data.edges.length === 0))
  ? deriveEdges(data.nodes)
  : (data.edges ?? []);
```

Then replace all references to `data.edges` in the render with `effectiveEdges`.

Run `npm run build`.

---

## Ticket 45.5 — CodeSlide terminal chrome

**File:** `src/slides/components/CodeSlide.tsx`

Read the entire file first to understand the current structure.

### Step 1: Remove local type if present
If `CodeSlideData` is declared locally, check if it matches what's in `types.ts`. If `types.ts` already has it, delete local and import. If not, leave local (don't break things).

### Step 2: Add terminal chrome to the code block container

The code block currently has a header with macOS-style dots (or a simple bar). Read the current structure carefully.

Ensure the top chrome bar includes:
- Three colored dots: red `#ff5f57`, yellow `#febc2e`, green `#28c840` (already likely present)
- The `data.filename` shown as a centered/dimmed label
- The frame uses theme CSS vars: `background: 'var(--theme-surface)'`, `borderColor: 'var(--theme-surface-border)'`

### Step 3: Terminal prompt prefix for terminal/bash language

When `data.language === 'terminal'` or `data.language === 'bash'`:
- Prefix each rendered line with a `$` glyph in a muted color (`text-slate-500` or using `var(--theme-text-secondary)`)
- The `$` should be `aria-hidden="true"` and `select-none`

### Step 4: Output section redesign

The output section currently has a "● OUTPUT" header. Update it:
- Replace "● OUTPUT" header with a shell prompt look: a `$` sigil + `{data.outputCommand ?? 'output'}` in small monospace
- Change separator from existing border to `border-t border-emerald-900/40`
- Per-line colour logic based on line content prefix:
  - Starts with `✅` or `✓` → `text-emerald-400`
  - Starts with `❌` or case-insensitive `error` → `text-red-400`
  - Starts with `⚠` or case-insensitive `warn` → `text-amber-400`
  - Everything else → `text-slate-300`
- Add `aria-label="Terminal output"` to the output container div
- Add `aria-hidden="true"` to the `$` sigil span

The `outputCommand?: string` field should be read from `data.outputCommand`. If types.ts doesn't have it yet, add it there.

Run `npm run build`. This is the most complex ticket — take care with TypeScript.

---

## Ticket 45.6 — Showcase data updates

**Files:** 
- `src/slides/data/slides-learnflow-en.ts`
- `src/slides/data/slides-q2review-en.ts`
- `src/slides/data/creation-story-learnflow.ts`
- `src/slides/data/creation-story-q2review.ts`

### LearnFlow diagram slide
Find the diagram slide in `slides-learnflow-en.ts`. Add `autoEdges: true` to it. You can keep or remove the explicit `edges` array — if you keep it non-empty, explicit edges win (autoEdges ignored). Best: set `autoEdges: true` and also keep `edges: []` or remove edges entirely to let auto-derivation run.

### Q2 Review mockup slide
Find the mockup slide in `slides-q2review-en.ts`. Add an `image` block to its `blocks` array:
```typescript
{ 
  type: 'image' as const, 
  src: 'https://picsum.photos/seed/q2dashboard/800/450', 
  alt: 'Q2 2026 dashboard — active users by region', 
  caption: 'Live dashboard · Q2 review',
  aspectRatio: '16/9' as const
}
```

### Creation stories
Update `creation-story-learnflow.ts` — add a note in `frameworkNotes` or a new prompt mentioning `autoEdges: true` was used to simplify the diagram connections.

Update `creation-story-q2review.ts` — add a note that the `image` block now embeds a real product screenshot via URL.

Run `npm run build`.

---

## Ticket 45.7 — SKILL.md updates

**File:** `SKILL.md`

Make four additions:

### 1. MockupSlide block types table
Find where MockupSlide is documented. Add a new subsection `### MockupSlide Block Types` with a table of all 9 block types including `image`. Include all fields for `image`: `src` (required), `alt` (required — TypeScript enforced), `caption?`, `aspectRatio?`.

### 2. Image block URL warning
Add a warning callout under the image block docs:
> ⚠️ **`src` must be a publicly accessible URL.** Authenticated or private URLs (e.g. signed S3 links, Notion images, SharePoint) will not load in presentation mode. Use:
> - ✅ `https://images.unsplash.com/photo-abc123?w=800` (public CDN)
> - ✅ `/screenshots/dashboard.png` (file in `public/` folder)
> - ❌ `https://company.sharepoint.com/sites/...` (requires auth)

### 3. DiagramSlide autoEdges
Find the diagram slide documentation. Add:
> **`autoEdges?: boolean`** — When `true`, the renderer automatically chains nodes left-to-right in column order. Use this when your diagram is a simple sequential flow and you don't want to write out every edge manually.
> 
> ```typescript
> { type: 'diagram', mode: 'arch', autoEdges: true,
>   nodes: [
>     { id: 'a', label: 'Client',  col: 0, row: 0 },
>     { id: 'b', label: 'API',     col: 1, row: 0 },
>     { id: 'c', label: 'DB',      col: 2, row: 0 },
>   ],
>   edges: [] // or omit — autoEdges fills this in
> }
> ```
> For complex topologies, always specify `edges` explicitly. Non-empty `edges` override autoEdges.

Also add the prominent warning:
> ⚠️ **ALWAYS include both `nodes` AND `edges` arrays.** Empty `edges: []` draws zero connections. Use `autoEdges: true` for simple chains.

### 4. CodeSlide outputCommand
Find the code slide documentation. Add `outputCommand?: string` to the field list with a note: "Sets the shell command shown in the terminal output header (e.g. `'npm test'` renders as `$ npm test`)."

---

## Ticket 45.8 — docs/slides/README.md

**File:** `docs/slides/README.md` (check if this file exists — it may be named differently)

Update the reference documentation for:
- MockupSlide: add `image` block type row with all 4 fields
- DiagramSlide: add `autoEdges?: boolean` field
- CodeSlide: add `outputCommand?: string` field

---

## Ticket 45.9 — E2E Playwright

Start preview: `npm run build && npm run preview &` then `sleep 4`

Write script `e2e-sprint45.js` based on the existing `e2e-sprint44.js` pattern.

Key verifications to add beyond the standard route-load checks:
1. **Q2 Review route** — navigate to the mockup slide with the image block. Assert `document.querySelector('figure img')` is not null and has a non-empty `alt` attribute.
2. **LearnFlow route** — navigate to the diagram slide with `autoEdges: true`. Assert `document.querySelectorAll('path').length > 0` (edges rendered).
3. **Any CodeSlide with output** — assert the output container has `aria-label="Terminal output"`.

Screenshots to `e2e-screenshots/sprint45/`. 

Run twice. Both must exit 0.

Kill preview after: `pkill -f "vite preview" || true`

---

## Ticket 45.10 — Sprint close

1. Update `specs/backlog.md` — change all `45.x` tickets from 🔲 to ✅ Done
2. Update `specs/backlog.md` header — set Last Updated to 2026-04-05
3. Write `sprints/sprint-45/summary.md`
4. Update `specs/backlog.md` Sprint 45 Status from 🔲 Planned → ✅ Done

---

## Parallel Execution Plan

**Batch 1 (sequential, same file):** 45.1 + 45.2 together in one agent
**Batch 2 (parallel):** 45.3 (MockupSlide) + 45.4 (DiagramSlide) + 45.5 (CodeSlide) — different files, no conflicts
**Batch 3:** 45.6 (showcase data — depends on 45.3+45.4+45.5 done)
**Batch 4 (parallel):** 45.7 (SKILL.md) + 45.8 (docs) — independent files
**Batch 5:** 45.9 (E2E) → 45.10 (close)
