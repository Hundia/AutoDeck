# Edit Mode & Slide Notes

## Overview

AutoDeck's **Edit Mode** splits the `PresentationViewer` into two distinct experiences:

- **Live Mode** (default) — a clean, viewer-safe presentation surface. Theme, background, language, and creation-story controls are absent from the DOM. Only the Share button and the Edit toggle are visible.
- **Edit Mode** — a developer workspace. All controls (theme, background, language, creation-story) appear in the top-right cluster alongside a new **Notes** button. A fixed bottom-left "EDIT MODE" pill provides a persistent visual signal that the developer-only layer is active.

**Slide Notes** are freeform text annotations attached to individual slides, persisted in `localStorage`. They are designed as a structured LLM handoff mechanism: when a developer spots a typo, wants a structural change, or has layout feedback while reviewing a deck, they can capture it in a Note without context-switching to Claude Code. At the end of the review session, all notes are exported as a single markdown blob and pasted into `/apply-slide-notes` for batch-application.

Notes never appear in Live Mode — they are absent from the DOM, not merely hidden.

---

## Mode Toggle

### UI Controls

| Control | Location | Behavior |
|---------|----------|----------|
| Eye/Pencil pill button | Top-right control cluster (rightmost) | Toggles between Live and Edit mode |
| `E` key | Global keyboard shortcut | Same as clicking the toggle; suppressed inside textareas/inputs |
| "EDIT MODE" pill | Fixed bottom-left (`bottom-4 left-4`) | Visible only in Edit Mode; accent-colored border and text |

The toggle uses `data-testid="edit-mode-toggle"`. The bottom pill uses `data-testid="edit-mode-pill"`.

### `editModeEnabled` Config Flag

The `PresentationConfig` interface has an optional `editModeEnabled?: boolean` field (defaults to `true`). Set it to `false` on a shared or production deck to remove the Edit toggle entirely:

```typescript
// src/config.ts — shared production deck, no edit controls
const config: PresentationConfig = {
  title: 'Q3 Investor Deck',
  languages: [{ id: 'en', label: 'English' }],
  defaultLanguage: 'en',
  background: 'gradient',
  editModeEnabled: false,   // Edit toggle hidden from all viewers
}
```

When `editModeEnabled` is `false`, the `useEditMode` hook forces `editMode = false` and makes `setEditMode`/`toggle` no-ops, so even a direct `localStorage` write cannot activate Edit Mode in that session.

---

## Controls Visibility

| Control | Live Mode | Edit Mode |
|---------|-----------|-----------|
| Share button | Visible | Visible |
| Edit Mode toggle | Visible | Visible |
| Theme dropdown | Not in DOM | Visible |
| Background dropdown | Not in DOM | Visible |
| Language dropdown | Not in DOM | Visible |
| Creation Story pill | Not in DOM | Visible |
| Notes button + badge | Not in DOM | Visible |
| "EDIT MODE" pill | Not in DOM | Fixed bottom-left |

The `data-testid="control-cluster-live"` wrapper contains only Share + Edit toggle. The `data-testid="control-cluster-edit"` wrapper holds the edit-only controls. E2E tests assert Live mode cluster has exactly the expected elements.

---

## Slide Notes

### Data Model

```typescript
// src/engine/types.ts
export interface SlideNote {
  id: string;           // UUID from crypto.randomUUID()
  slideIndex: number;   // 0-indexed position of the slide
  text: string;         // Freeform annotation (500-char soft limit in UI)
  createdAt: string;    // ISO 8601 timestamp
  status: 'open' | 'applied' | 'dismissed';
}
```

**Status lifecycle:**
- `open` — default on creation; note is active and should be reviewed
- `applied` — developer has confirmed the edit was made (set via NoteCard status picker)
- `dismissed` — note was reviewed and intentionally skipped

### localStorage Keys

| Key | Scope | Content |
|-----|-------|---------|
| `autodeck-edit-mode` | Global (all decks) | `'1'` (edit) or `'0'` (live) |
| `autodeck-notes-{deckId}` | Per-deck | JSON array of `SlideNote` objects |

`deckId` is derived from the first route segment after `/#/` — e.g. for `/#/presentation` the deckId is `presentation`, for `/#/meta` it is `meta`. This keeps notes isolated between decks in the same browser tab.

UUIDs are generated via `crypto.randomUUID()` (no npm dependency added).

### UI Components

- **NotesPanel** (`SlideNotesPanel.tsx`) — right-side Framer Motion drawer (RTL: slides from left). Width 320px, full height, `z-50`. Shows notes for the current slide only. Header displays `Slide N of Total • M notes`. Opened via the Notes button (`data-testid="notes-button"`).
- **NoteEditor** (`NoteEditor.tsx`) — textarea with 500-char soft limit. Counter turns amber at 400 chars, red at 500 (does not block saving). Auto-focuses on mount. `Cmd/Ctrl+Enter` saves; `Escape` cancels. `data-testid="note-editor"`.
- **NoteCard** (`NoteCard.tsx`) — renders a single note. Shows text (whitespace-pre-wrap, 6-line scroll), status pill (amber=open, sage=applied, slate=dismissed), relative timestamp, and a delete button (`Trash2`). `data-testid="note-card-{id}"`.

---

## Export Format

`exportAsMarkdown(deckId, slides)` in `notes.ts` produces a self-contained markdown blob suitable for pasting into `/apply-slide-notes`. Format:

```markdown
# Slide Notes Export

**Deck:** presentation
**Generated:** 2026-04-17T09:15:32.000Z
**Total notes:** 3

---

## Slide 1: AutoDeck

- [open] Change tagline to "Build decks at the speed of thought"
- [dismissed] The badge color is fine, ignore

## Slide 3: Key Features

- [open] Swap the third card — replace "8 backgrounds" with "10 slide types"
```

Each slide section header is `## Slide {1-indexed}: {slide.title}`. Notes without a slide title fall back to `{slide.type}` then `Untitled`. Only slides that have at least one note appear in the export.

---

## LLM Handoff

The recommended workflow for applying notes:

1. In Edit Mode, add notes on individual slides as you review the deck.
2. Open the Notes panel and click **Export Notes for LLM** to open the export modal.
3. Click **Copy to Clipboard** (or **Download as slide-notes.md**).
4. In Claude Code, run `/apply-slide-notes` and paste the markdown blob when prompted.
5. The skill parses each `## Slide N: Title` section, locates the correct slide data file, proposes an `Edit` per note, and asks for confirmation before writing.
6. After applying, set note statuses to `applied` in the Notes panel (or clear the deck's notes via "Clear All for this Deck").

For manual copy-paste without the skill, the markdown blob is human-readable and can be pasted directly into a Claude conversation.

---

## Keyboard Shortcuts

| Key | Action | Suppression Rules |
|-----|--------|-------------------|
| `E` | Toggle Edit / Live mode | Suppressed when focus is inside `<textarea>`, `<input>`, or `contenteditable`; also suppressed when Share modal, Notes panel, or Creation Story drawer is open |
| `Escape` | Close Notes panel or Export modal | Standard; also closes NoteEditor inline (cancel) |
| `Cmd/Ctrl+Enter` | Save note in NoteEditor | Active only when NoteEditor textarea has focus |

The `E` key guard uses the same pattern as the existing arrow/space advance guard in `PresentationViewer.tsx`: check `e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement` before acting.

---

## Known Limitations

- **Notes keyed by `slideIndex`, not `slideId`** — If slides are reordered between review sessions, notes may become misaligned with different slides. Migrating to a stable `slideId` field is deferred; this is acceptable for solo-developer workflows where reordering between sessions is rare.
- **localStorage is per-browser-per-origin** — Notes do not sync across devices or browsers. A note added in Chrome on one machine is invisible in Firefox or on another computer.
- **No server sync** — By design. Notes are a local scratch pad; they are not committed to the repository and do not touch any remote service.
- **`/apply-slide-notes` proposes edits; no auto-apply** — The skill performs a diff-review flow and requires human confirmation for each proposed change. It never writes to disk without explicit user approval.

---

## Files

| File | Purpose |
|------|---------|
| `src/engine/editMode/notes.ts` | localStorage CRUD (`getNotes`, `addNote`, `deleteNote`, `updateNote`, `clearAllNotes`, `exportAsMarkdown`) |
| `src/engine/editMode/useEditMode.ts` | React hook — reads/writes `autodeck-edit-mode`; respects `editModeEnabled` opt-out |
| `src/engine/editMode/strings.ts` | i18n map for Edit Mode UI strings (`en` + `he`); 12 keys |
| `src/engine/editMode/EditModeToggle.tsx` | Eye/Pencil pill button for the top-right cluster |
| `src/engine/editMode/NoteCard.tsx` | Single-note render with status pill, relative timestamp, delete action |
| `src/engine/editMode/NoteEditor.tsx` | Textarea with char-count, Cmd+Enter save, Escape cancel |
| `src/engine/editMode/SlideNotesPanel.tsx` | Right-side drawer; lists notes for current slide; Add/Export/Clear actions |
| `src/engine/editMode/NotesExportModal.tsx` | Markdown export modal; Copy to Clipboard + Download as .md |
