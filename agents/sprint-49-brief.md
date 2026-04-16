# Sprint 49 Agent Brief — Edit Mode + LLM Notes

## Mission

Split the PresentationViewer into a clean **Live Mode** (default, shared-viewer-safe) and a developer-only **Edit Mode** that reveals theme/background/language/creation-story controls plus a NEW per-slide **Notes** feature. Notes are freeform text persisted in `localStorage`, exportable as markdown for a future `/apply-slide-notes` LLM skill.

## Critical Rules

- `npm run build` must exit 0 after every ticket
- Do NOT add new runtime npm dependencies
- Do NOT introduce shadcn/ui or @radix-ui (see `CLAUDE.md` — forbidden stack)
- All new UI components MUST use theme tokens (`var(--theme-surface)`, `var(--theme-text-primary)`, `var(--theme-accent-primary)`, etc.) so Aurora/Sivania/Noir all look correct — see `src/index.css` for the 16-token set
- No emojis in code
- No comments explaining the current task or ticket — per-ticket notes belong in commit messages / sprint summaries
- All new interactive elements MUST have `data-testid` attributes as specified in the ticket body
- RTL: Hebrew is supported; panels sliding in from the right in LTR must flip to the left in RTL (`dir="rtl"` is set on the root — use Tailwind logical properties or conditional classes)
- Notes UI MUST NOT render at all in Live mode (not `hidden`, not disabled — absent from DOM) to keep shared decks clean

## Repo Root

`/opt/autodeck/`

## Authoritative Source

Each ticket body in `specs/backlog.md` (line 871 — Sprint 49 block) is the contract. It names exact file paths, props, classes, testids, and `npm run build` gates. Read the ticket body verbatim before implementing.

## Key Files to Read Before Implementing

- `CLAUDE.md` — design system, theme token reference, "MANDATORY Development Workflow" (Rules 1–4)
- `specs/backlog.md` (Sprint 49 block) — the contract
- `src/engine/PresentationViewer.tsx` — where every mode toggle / notes button / pill gets wired. Read it in full before modifying.
- `src/engine/types.ts` — `PresentationConfig` interface
- `src/engine/ShareModal.tsx` — reference pattern for modals (`AnimatePresence`, backdrop, Escape key, scale-in spring)
- `src/engine/CreationStoryDrawer.tsx` — reference pattern for the right-side drawer (this is the template `SlideNotesPanel.tsx` should mirror — same spring config, same RTL handling, same close semantics)
- `src/engine/themes.ts` + `src/index.css` — theme token catalog
- `src/engine/LanguageDropdown.tsx` — existing dropdown pattern in the top cluster
- `docs/engine/README.md` — engine docs (update after implementing)

## Conventions

- **Pill/button base classes in the top cluster:** `bg-white/5 border border-white/10 rounded-full px-3 py-1.5` + optional hover `hover:bg-white/10`
- **Icons:** Lucide React only (`lucide-react`), `size={14}` by default
- **Animation library:** Framer Motion (`motion.div`, `AnimatePresence`). Spring for drawer = `{ type: 'spring', stiffness: 300, damping: 30 }`
- **`data-testid`:** kebab-case, namespaced (e.g. `edit-mode-toggle`, `note-card-{id}`)
- **`localStorage` key naming:** `autodeck-edit-mode`, `autodeck-notes-{deckId}`
- **`deckId`:** first pathname segment after `/#/` — derive with `useLocation().pathname` + `split('/')[1] || 'default'`, memoized
- **UUIDs:** `crypto.randomUUID()` — no new npm dep
- **No `console.log`** left behind

## Theme-Token Usage for New Components

```tsx
// Card / surface
className="bg-[var(--theme-surface)] border border-[var(--theme-surface-border)]"

// Primary text
className="text-[var(--theme-text-primary)]"

// Accent (pill border when edit mode is active, EDIT MODE pill, glows)
className="border-[var(--theme-accent-primary)] text-[var(--theme-accent-primary)]"

// SVG/Lucide icons: inline style for theme vars (SVG attrs don't inherit CSS vars)
<Pencil style={{ color: 'var(--theme-accent-primary)' }} />
```

## File Tree to Create

```
src/engine/editMode/
├── notes.ts                    # 49.2 — localStorage CRUD + markdown export
├── useEditMode.ts              # 49.3 — mode hook with config opt-out
├── strings.ts                  # 49.18 — en + he i18n for Edit Mode UI
├── EditModeToggle.tsx          # 49.5 — Live/Edit pill
├── NoteCard.tsx                # 49.10 — single note render
├── NoteEditor.tsx              # 49.11 — textarea + save/cancel
├── SlideNotesPanel.tsx         # 49.12 — right-side drawer
└── NotesExportModal.tsx        # 49.14 — markdown export modal
```

Plus:
- `.claude/commands/apply-slide-notes.md` — 49.15, new skill skeleton
- `docs/engine/edit-mode.md` — 49.19, feature guide
- `e2e-sprint49.js` — 49.16, 14 Playwright assertions
- `sprints/sprint-49/summary.md` — 49.19, closure doc

## Execution Protocol (per ticket)

1. **Claim:** Find the ticket row in `specs/backlog.md`. Change `🔲` → `🔄`.
2. **Read:** All referenced file paths in the ticket body + the conventions above.
3. **Implement:** Exact file paths, props, classes, testids from the ticket. Do not invent new fields.
4. **Verify:** `cd /opt/autodeck && npm run build` exits 0 and reports no new TypeScript errors. For components that render, sanity-check by reading the built output if feasible.
5. **Mark done:** `🔄` → `✅` in `specs/backlog.md` for that ticket row.
6. **Do NOT commit** — the orchestrator handles git at sprint close.
7. **Do NOT update the Sprint 49 header's `Status:` field** — that happens in 49.19 only when all tickets are ✅.

## Status Symbols in Backlog

- 🔲 = Planned (not started)
- 🔄 = In Progress (claimed by an agent)
- 🧪 = QA (feature complete, awaiting verification) — used sparingly; we typically go 🔄→✅
- ✅ = Done
- ❌ = Blocked / rejected

## DAG Summary (for the orchestrator — individual agents need not worry about this)

```
Wave 1 (parallel):  49.1   49.4   49.11
Wave 2 (parallel):  49.2   49.3
Wave 3 (parallel):  49.5   49.10
Wave 4:             49.6
Wave 5 (parallel):  [49.7 → 49.8 same agent]   49.12
Wave 6 (parallel):  [49.9 → 49.13 same agent]   49.14   49.18
Wave 7:             49.15
Wave 8:             49.16
Wave 9:             49.17 (conditional)
Wave 10:            49.19 (close)
```

`PresentationViewer.tsx` is modified by 49.4, 49.6, 49.7, 49.8, 49.9, 49.13 — same-wave tickets that touch this file are intentionally grouped into a single agent to avoid collisions.

## Known Risks

- **Theme contrast on Sivania Light** — NoteCard uses `var(--theme-text-primary)` which in Sivania is `#2c1f14` on parchment `#f5f3ed` (~4.5:1 contrast — borderline). Ticket 49.17 exists conditionally to add a scoped override if the E2E flags a contrast issue.
- **`E` keybinding** — must be guarded against firing when focus is inside a `<textarea>`, `<input>`, or any contenteditable; also suppressed when `shareOpen || notesPanelOpen || drawerOpen || notesExportOpen`. This is the same guard pattern used for arrow/space in `PresentationViewer.tsx` — read it before writing the handler.
- **localStorage keying** — notes are namespaced per deck (`autodeck-notes-{deckId}`), the mode flag is global (`autodeck-edit-mode`). Don't confuse these.
- **Share while in Edit mode** — the share link always opens the deck in Live mode (no `?edit=1` param). The ShareModal gets a small note confirming this (49.9).

## Out of Scope

- Migrating slide identity from `slideIndex` → `slideId`
- Multi-user / server-sync notes
- JSON import/export across devices
- Auto-applying notes to source files without human diff review
