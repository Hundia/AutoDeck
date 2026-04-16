# Engine Documentation

The AutoDeck engine lives in `src/engine/`. It provides the core presentation runtime.

## Files

| File | Purpose |
|------|---------|
| `PresentationViewer.tsx` | Main presentation engine: keyboard nav, RTL, progress dots, AnimatePresence |
| `BackgroundEffects.tsx` | 8 animated background registry: particles, circuits, matrix, constellation, hex, waves, gradient, grid |
| `LanguageDropdown.tsx` | Language selector dropdown |
| `ScrollProgressBar.tsx` | Scroll progress bar for scrollable slides |
| `types.ts` | TypeScript interfaces: SlideData, SlideComponentProps, PresentationConfig, Language |

## Usage

```typescript
import PresentationViewer from './engine/PresentationViewer'
import { PresentationConfig } from './engine/types'

const config: PresentationConfig = {
  title: 'My Talk',
  languages: [{ code: 'en', label: 'EN' }],
  defaultBackground: 'particles',
  branding: 'Built with AutoDeck',
}

// In your route:
<PresentationViewer config={config} slides={slides} slideComponents={slideComponents} />
```

## PresentationConfig Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Presentation title |
| `languages` | `LanguageOption[]` | Available language options |
| `defaultLanguage` | `string` | Language shown on first load |
| `background` | `string` | Initial background effect (one of 8 options) |
| `branding` | `string?` | Footer branding text (bottom-left) |
| `brandingUrl` | `string?` | URL to navigate to when branding is clicked (used only when no `creationStory` is present) |
| `keyboardHint` | `Record<string, string>?` | Per-language keyboard navigation hint |

### Sivania Light Theme

Light admin aesthetic — parchment background, Cormorant Garamond display font, sage+terracotta palette.

| Token | Value |
|-------|-------|
| `--theme-bg` | `#f5f3ed` (parchment) |
| `--theme-surface` | `#faf9f5` (cream) |
| `--theme-text-primary` | `#2c1f14` (dark brown) |
| `--theme-accent-primary` | `#698472` (sage green) |
| `--theme-accent-secondary` | `#8e6a59` (terracotta) |
| `--theme-font-display` | Cormorant Garamond, serif |

Note: MockupSlide components use the `.mockup-slide` scoped CSS class to ensure h2/p text is readable on the light background — see `[data-theme="sivania"] .mockup-slide` in index.css

### Branding Block

The branding element in the bottom-left corner has three rendering states, resolved in priority order:

1. **`creationStory` is present** — renders as a `<button>` that opens the Creation Story drawer (`setDrawerOpen(true)`). This takes priority over `brandingUrl`.
2. **`brandingUrl` is set (and no `creationStory`)** — renders as an `<a>` tag with `target="_blank" rel="noopener noreferrer"` linking to the provided URL.
3. **Neither** — renders as a plain `<div>` (no interactivity).

All three states share the same positioning class (`fixed bottom-4 left-4`, or `right-4` in RTL) and base style (`text-xs text-white/30`). The interactive states add `hover:text-white/60 transition-colors`.

## Edit Mode

AutoDeck ships a **Live/Edit Mode** toggle that hides developer controls (theme, background, language, creation story, notes) from shared viewers while giving solo developers a persistent workspace for jotting per-slide notes and exporting them as a markdown blob for LLM batch-application.

See [edit-mode.md](edit-mode.md) for the full feature guide: mode toggle, `editModeEnabled` config flag, `SlideNote` data model, localStorage key naming, export format, `/apply-slide-notes` skill handoff, and known limitations.

## BackgroundEffects

Set `defaultBackground` in `src/config.ts`. Options: `particles`, `circuits`, `matrix`, `constellation`, `hex`, `waves`, `gradient`, `grid`.

## RTL Support

Languages with RTL are auto-detected from `RTL_LANGUAGES` array in `PresentationViewer.tsx`: Hebrew (he), Arabic (ar), Farsi (fa), Urdu (ur). When active, layout mirrors via CSS `dir="rtl"`.

## ShareModal

**File:** `src/engine/ShareModal.tsx`

A Framer Motion scale-in modal that gives every presentation a native share, embed, and social link flow.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `url` | `string` | The full URL to share (typically `window.location.href`) |
| `title` | `string` | Presentation title shown in the modal header |
| `onClose` | `() => void` | Callback invoked when the modal is dismissed |

### Tabs

| Tab | Behaviour |
|-----|-----------|
| **Link** | Copy-to-clipboard button for `url`. Shows a green checkmark for 2 s then resets. `data-testid="share-copy-url"` |
| **Embed** | Read-only `<textarea>` pre-filled with an `<iframe>` snippet. Beneath the textarea: `text-xs text-white/40` note *"Note: Embedding requires the presentation to be deployed on a non-GitHub-Pages host (GitHub Pages restricts iframe embedding)."* `data-testid="share-embed-note"` |
| **Social** | X (Twitter) and LinkedIn share URL buttons — each calls `window.open(...)` |

### Behaviour

- Overlay `bg-black/60`; centered card `bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md`
- Closes on backdrop click **and** `Escape` key
- No new npm dependencies — uses Framer Motion (already a project dependency) and Lucide icons

### Integration in PresentationViewer

`ShareModal` is imported and rendered inside `<AnimatePresence>` in `PresentationViewer.tsx`. A `shareOpen` boolean state gates rendering. The Share button (Lucide `Share2`, size 14) sits as the rightmost control in the top-right control cluster. While `shareOpen` is true, arrow/space key slide advance is suppressed (same guard used for `drawerOpen`).
