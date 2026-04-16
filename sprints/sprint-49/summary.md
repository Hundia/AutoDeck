# Sprint 49: Edit Mode + LLM Notes — Summary

**Date:** April 2026
**Theme:** Split the PresentationViewer into a Live Mode (clean, viewer-safe) and an Edit Mode (developer workspace) with per-slide Notes that export as a markdown blob for LLM batch-application via `/apply-slide-notes`.
**Points shipped:** 49 pts across 19 tickets
**Completed:** 2026-04-17

---

## What Shipped

| ID | Ticket | Description |
|----|--------|-------------|
| 49.1 | `types.ts` — `SlideNote` + `editModeEnabled` | Added `SlideNote` interface (id, slideIndex, text, createdAt, status) and `editModeEnabled?: boolean` to `PresentationConfig`. |
| 49.2 | `editMode/notes.ts` — localStorage CRUD | Pure functions: `getNotes`, `getNotesForSlide`, `addNote`, `updateNote`, `deleteNote`, `clearAllNotes`, `exportAsMarkdown`. Key: `autodeck-notes-{deckId}`. UUIDs via `crypto.randomUUID()`. |
| 49.3 | `useEditMode` hook | Reads/writes `autodeck-edit-mode`; respects `config.editModeEnabled === false` opt-out; syncs across tabs via `StorageEvent`. |
| 49.4 | Derive `deckId` from route | `useLocation().pathname` first segment; memoized; fallback `'default'`. |
| 49.5 | `EditModeToggle.tsx` | Eye (Live) / Pencil (Edit) pill button; accent border + glow when active; `data-testid="edit-mode-toggle"`. |
| 49.6 | Wire toggle into `PresentationViewer` | Imported `useEditMode` + `EditModeToggle`; placed rightmost in top cluster; hidden when `editModeEnabled === false`; `notesPanelOpen` state stub added. |
| 49.7 | "EDIT MODE" pill + `E` keybinding | Fixed bottom-left pill (`data-testid="edit-mode-pill"`); `E` key toggles mode, guarded against input/textarea focus and open modals. |
| 49.8 | Gate controls behind `editMode` | Wrapped theme, background, language, and creation-story in `{editMode && (...)}`. Share + toggle remain in Live Mode. |
| 49.9 | Live/Edit cluster testids + Share note | Added `data-testid="control-cluster-live"` / `"control-cluster-edit"`; added "Shared links always open in Live Mode." note to ShareModal. |
| 49.10 | `NoteCard.tsx` | Note text, status pill (amber/sage/slate), relative timestamp, Trash2 delete; theme tokens; `data-testid="note-card-{id}"`. |
| 49.11 | `NoteEditor.tsx` | Textarea with 500-char soft limit; amber at 400, red at 500; auto-focus; Cmd/Ctrl+Enter save; Escape cancel. |
| 49.12 | `SlideNotesPanel.tsx` | Right-side Framer Motion drawer (RTL flips to left); per-slide note list; Add/Export/Clear actions; Escape closes. |
| 49.13 | Wire Notes button into `PresentationViewer` | `StickyNote` button in edit-mode cluster; amber count badge when notes > 0; `AnimatePresence` gate; arrow/space/E suppressed while panel open. |
| 49.14 | `NotesExportModal.tsx` | Read-only monospace textarea pre-loaded with `exportAsMarkdown`; Copy to Clipboard + Download as `slide-notes.md`; friendly empty state. |
| 49.15 | `/apply-slide-notes` skill skeleton | `.claude/commands/apply-slide-notes.md`; parse → locate → propose edit → confirm workflow; added to `/help` listing. |
| 49.16 | E2E Playwright `e2e-sprint49.js` | 14 scenarios / 37 assertions across `#/presentation` and `#/meta`; zero JS errors; Sivania-themed note-card pass. Screenshots to `e2e-screenshots/sprint-49/`. |
| 49.17 | Sivania contrast hardening | Assertion 14 passed on first run — `rgb(44,31,20)` on parchment `#f5f3ed` legible without override. No `src/index.css` change. |
| 49.18 | i18n keys (en + he) | `editModeStrings` map in `src/engine/editMode/strings.ts`; 12 keys; `getEditModeStrings(lang)` selector; components updated. |
| 49.19 | Docs + sprint close | `docs/engine/edit-mode.md`, `docs/engine/README.md` update, `CLAUDE.md` update, TC-UI-14/15 appended, this summary. |

---

## Files Created

| File | Notes |
|------|-------|
| `src/engine/editMode/notes.ts` | localStorage CRUD + markdown export |
| `src/engine/editMode/useEditMode.ts` | Mode hook with config opt-out |
| `src/engine/editMode/strings.ts` | i18n (en + he), 12 keys |
| `src/engine/editMode/EditModeToggle.tsx` | Live/Edit pill component |
| `src/engine/editMode/NoteCard.tsx` | Single note render |
| `src/engine/editMode/NoteEditor.tsx` | Textarea + save/cancel |
| `src/engine/editMode/SlideNotesPanel.tsx` | Right-side drawer |
| `src/engine/editMode/NotesExportModal.tsx` | Markdown export modal |
| `.claude/commands/apply-slide-notes.md` | New skill skeleton |
| `docs/engine/edit-mode.md` | Feature guide (this sprint's doc) |
| `agents/sprint-49-brief.md` | Orchestrator brief |
| `sprints/sprint-49/summary.md` | This file |
| `e2e-sprint49.js` | 14-scenario Playwright E2E |

## Files Modified

| File | Change |
|------|--------|
| `src/engine/types.ts` | Added `SlideNote` interface + `editModeEnabled` to `PresentationConfig` |
| `src/engine/PresentationViewer.tsx` | `deckId` derivation, Edit toggle, mode pill, E key, gated controls, Notes button + panel, testid wrappers |
| `src/engine/ShareModal.tsx` | "Shared links always open in Live Mode." note in modal body |
| `.claude/commands/help.md` | Added `/apply-slide-notes` to skill listing |
| `docs/engine/README.md` | Added Edit Mode subsection with link |
| `CLAUDE.md` | Updated Current Sprint to Sprint 49 |
| `specs/05_qa_lead.md` | Appended TC-UI-14 and TC-UI-15 |
| `specs/backlog.md` | All 49.x Done; header updated; Last Updated bumped |

---

## E2E Results

- **Test file:** `e2e-sprint49.js`
- **Scenarios:** 14
- **Assertions:** 37
- **JS errors:** Zero across `#/presentation` and `#/meta`
- **Routes covered:** `#/presentation` (primary), `#/meta` (deck isolation), Sivania-themed (note-card contrast)
- **Screenshots:** Saved to `e2e-screenshots/sprint-49/`

---

## Notable Decisions

1. **`slideIndex` not `slideId` for note keying** — Slides have no stable `id` field in the current data model. Migrating to `slideId` is deferred; for solo-developer review workflows, reordering slides between sessions is rare enough that index-based keying is acceptable.

2. **No server sync — by design** — Notes are a local scratch pad. They live in `localStorage` only. This keeps the architecture zero-dependency and eliminates privacy concerns around note content leaving the browser.

3. **`editModeEnabled: false` hard opt-out** — Production decks can disable the Edit toggle entirely via `PresentationConfig`. The hook enforces this — even a direct `localStorage` write cannot activate Edit Mode in that session. This ensures shared viewers never accidentally expose the developer UI layer.

4. **i18n via standalone strings file** — AutoDeck uses per-language slide data files, not a global string catalog. A compact `editModeStrings` map in `strings.ts` handles the 12 UI strings needed for Edit Mode. Simple, self-contained, and consistent with the project's no-new-deps rule.

---

## Out of Scope / Deferred

- **Multi-user / server-sync notes** — Out of scope by design.
- **JSON round-trip import** — Markdown export is one-way (for LLM consumption). Importing JSON across devices was not required.
- **Auto-apply** — `/apply-slide-notes` proposes edits and requires human confirmation; it never writes to disk without user approval. Full auto-apply is deferred.
- **`slideId` migration** — Deferred to a future sprint if slide reordering between sessions becomes a pain point.

---

## Retrospective

**Went well:** The Framer Motion drawer pattern from `CreationStoryDrawer` transferred cleanly to `SlideNotesPanel`, cutting implementation time. The `editModeEnabled` config guard made the E2E deck-isolation test trivial to write. Sivania contrast passed on first E2E run — no rework cycle needed.

**Tight:** Wiring the `E` key guard across all four open-state flags (share, panel, drawer, export) required careful reading of the existing PresentationViewer keyhandler to avoid regressions on existing arrow/space navigation.

**Next sprint candidate:** Stable `slideId` field on `SlideData` — unlocks note persistence through slide reorder and lays the foundation for a future `/apply-slide-notes` auto-apply path.
