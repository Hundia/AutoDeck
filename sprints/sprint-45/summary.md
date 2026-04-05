# Sprint 45: Image Blocks + autoEdges + Terminal Chrome

**Date:** 2026-04-05  
**Points Delivered:** 32 / 32  
**Status:** ✅ Complete

## What Shipped

### 45.1 + 45.2 — Types
- `MockupBlock` converted to discriminated union; `image` variant added with `src`, `alt` (required), `caption?`, `aspectRatio?`
- `DiagramSlideData.autoEdges?: boolean` added
- `CodeSlideData.outputCommand?: string` added

### 45.3 — MockupSlide image block
- Local type redeclarations removed; now imports from `engine/types`
- `image` case in `renderBlock`: `<figure>` + `<img>` + `<figcaption>`, loading skeleton, error fallback, same stagger animation as other blocks

### 45.4 — DiagramSlide autoEdges
- `deriveEdges()` helper chains nodes left-to-right by column
- `effectiveEdges` computed before render; explicit non-empty `edges` always override autoEdges
- Local type redeclarations removed

### 45.5 — CodeSlide terminal chrome
- "● OUTPUT" header replaced with `$ {outputCommand}` shell prompt line
- Per-line colour logic: ✅→emerald, ❌→red, ⚠→amber, else→slate-300
- `aria-label="Terminal output"` added to output container
- Theme-aware chrome frame using `--theme-surface`/`--theme-surface-border`

### 45.6 — Showcase updates
- LearnFlow diagram slide: `autoEdges: true` (no more manual edges)
- Q2 Review mockup slide: `image` block with picsum placeholder URL
- Both creation stories updated to reflect new capabilities

### 45.7 + 45.8 — Docs
- SKILL.md: MockupSlide block types table (9 types), image auth-URL warning, autoEdges example with callout, `outputCommand` note
- docs/slides/README.md: all three slide types updated

## Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| Discriminated union for MockupBlock | Type-safe: `block.src` only accessible on image branch; no casts needed |
| `alt: string` required (not optional) | WCAG 2.1 Level A compliance; TypeScript enforces it at data layer |
| `autoEdges` defaults off | Backward-compatible; existing slides with explicit edges unaffected |
| Explicit edges win over autoEdges | Intentional authoring beats convenience default |
| Per-line output colour via prefix detection | No new data fields; emoji-native convention (✅/❌/⚠) |

## E2E Results
- 7/7 routes rendered without JS errors
- LearnFlow diagram: SVG path elements confirmed (autoEdges working)
- Q2 Review mockup: `<figure>` + `alt` attribute confirmed
- Ferric code slide: `aria-label="Terminal output"` confirmed

## Retrospective
- **What worked well:** Discriminated union pattern for MockupBlock was clean TypeScript — no casts needed in renderBlock. The `deriveEdges` sort-by-col approach handles the majority of real-world diagram topologies.
- **Follow-on ideas:** `autoEdges: 'hub'` mode (first node connects to all others), image block in non-mockup slides (e.g. content card with image), `outputCommand` auto-populated from `language` field.
