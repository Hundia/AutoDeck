# CreationStoryDrawer

The `CreationStoryDrawer` is an opt-in slide-in panel that surfaces the prompts, slide decisions, and framework comparisons used to build a presentation.

## Interfaces

```typescript
// src/engine/types.ts

interface StoryPrompt {
  label: string;       // short name, e.g. "Initial Brief"
  prompt: string;      // full prompt text — displayed in monospace, copyable
  framework?: string;  // "Claude Code" | "Copilot" | "Cursor" | "Gemini"
}

interface SlideDecision {
  slide: number;    // 1-indexed slide number
  decision: string; // one-sentence rationale
}

interface CreationStory {
  totalPrompts: number;
  totalMinutes: number;
  prompts: StoryPrompt[];
  decisions?: SlideDecision[];                   // optional
  frameworkNotes?: Record<string, string>;        // optional
}
```

`creationStory` is a prop on `PresentationViewerProps`, NOT on `PresentationConfig`. This keeps config a pure presentation descriptor — the story is viewer-level authorship metadata.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `I` | Toggle drawer open/closed |
| `Escape` | Close drawer |
| Arrow keys | Suppressed while drawer is open |

## RTL Support

- Panel mounts `right-0` (LTR) or `left-0` (RTL)
- Trigger pill appears `right-4` (LTR) or `left-4` (RTL)
- Spring animation: `x: '100%' → 0` (LTR) or `x: '-100%' → 0` (RTL)

## Sections

The drawer renders up to three sections:

| Section | When shown | Content |
|---------|-----------|---------|
| **Prompts** | Always | One card per `StoryPrompt` — label, optional framework badge, full prompt text, copy button |
| **Slide Decisions** | If `decisions` defined | Collapsible list of "Slide N: decision" rows |
| **Framework Comparison** | If `frameworkNotes` defined | Collapsible table of framework name + note |

## Accordion

Section 2 and 3 use a CSS `max-height` accordion — no new npm dependencies. Toggle state is local to each `Collapsible` component.

## Copy Button

Each prompt card has a copy button using `navigator.clipboard.writeText` with an `execCommand('copy')` fallback for older browsers. Shows a 2-second "Copied!" toast on success.

## Wiring

See [SKILL.md § Creation Story](../../SKILL.md) for the complete wiring guide.
