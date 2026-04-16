# Apply Slide Notes

Parse a pasted slide-notes markdown blob (from AutoDeck's Edit Mode → Export Notes) and propose edits to the relevant `src/slides/data/slides-*.ts` files.

## Usage

```
/apply-slide-notes
```

Then paste the markdown blob when prompted (or pass as an argument if the harness supports it).

## Expected Input Format

The blob is produced by `NotesExportModal` in `src/engine/editMode/NotesExportModal.tsx` via `exportAsMarkdown()` in `src/engine/editMode/notes.ts`. Shape:

```
# Slide Notes Export

**Deck:** {deckId}
**Generated:** {ISO date}
**Total notes:** {count}

---

## Slide {N}: {title}

- [open] Note body 1
- [applied] Note body 2
```

`{deckId}` is the first pathname segment after `/#/` — for example `presentation`, `meta`, `techbrief`.

## Skill Workflow

### Phase 1: Parse

1. Read the pasted markdown blob (from argument or prompt).
2. Extract `**Deck:**` → `deckId`.
3. Extract each `## Slide {N}: {title}` section. For each, collect bullet lines of the form `- [status] {body}`. Skip `[dismissed]` notes unless the user explicitly opts in.
4. Normalize into a list: `{ slideIndex: N - 1, title, status, body }[]`.

### Phase 2: Locate the deck file

Try candidate paths in order:

1. `src/slides/data/slides-{deckId}-en.ts`
2. `src/slides/data/slides-{deckId}.ts`
3. `src/slides/slides-en.ts` (legacy root fallback for the default `presentation` deck)

If no file matches, ask the user to name the deck file before continuing.

### Phase 3: Propose edits

For each note (skipping `[applied]` and `[dismissed]`):

- Read the target slide object at the resolved `slideIndex`.
- Translate the note body into a concrete edit proposal using these heuristics:
  - `"Fix typo: X → Y"` → `Edit` with `old_string="X"`, `new_string="Y"`.
  - `"Change title to X"` → replace the slide's `title` field value.
  - `"Add metric: X"` → append an entry to the slide's `metrics` array.
  - `"Add card: ..."` → append an entry to the slide's `cards` array.
  - Free-form notes that don't match a mechanical pattern → present as a decision prompt: _"This note doesn't map to a mechanical edit. Apply manually or skip?"_
- Show a unified diff preview for each proposed edit.
- Ask confirmation per edit: `y` = apply, `n` = skip, `skip-all` = skip remaining.

**MVP scope: the skill proposes and explains edits; it does NOT auto-apply without confirmation.** Each approved edit is executed one at a time via the `Edit` tool.

### Phase 4: Status reminder

After applying, the developer should flip note status in the browser UI (Edit Mode → NoteCard → status pill) from `open` → `applied`. The skill prints a reminder listing which note bodies were applied so the developer knows what to mark.

Future versions may write back a modified export blob automatically; MVP does not.

## Limitations

- **Slide identity by index:** notes reference `slideIndex`. If slide order changes between export and apply, edits may target the wrong slide. Always verify the slide title in the diff preview matches the one in the blob.
- **Free-form notes:** notes that don't match a mechanical pattern require developer judgment.
- **One deck at a time:** blobs are deck-scoped; run the skill twice for two decks.
- **Language files:** the skill targets `-en.ts` by default. For other languages pass the path explicitly or answer the file-location prompt.

## Related

- `src/engine/editMode/NotesExportModal.tsx` — where the blob is generated.
- `src/engine/editMode/notes.ts` — `exportAsMarkdown()` format definition.
- `src/slides/data/` — deck source files the skill edits.
