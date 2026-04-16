# Backlog Hierarchy — Plan

> Authored 2026-04-17 as a parallel planning artifact during Sprint 49 kickoff. Not a spec; not to be executed until approved.

## A. Current State Audit

`/opt/autodeck/specs/backlog.md`: **1014 lines, 107 KB, 14 H2 sections, 84 H3 sections.**

Sprint blocks present in the file (line offsets):
| Sprint | Status | Lines | Approx KB |
|---|---|---|---|
| Sprint History table | ref | L10–32 (23 lines) | ~2 KB |
| 39 Launch | ✅ Done | L34–73 (40) | ~3 KB |
| 40 Diagram/Mockup | ✅ Done | L75–181 (107) | ~12 KB |
| Bug Backlog | empty | L183–187 (5) | <1 KB |
| Future Sprint Ideas | ref | L189–204 (16) | ~1 KB |
| 41 Creation Story | ✅ (mis-marked 🔲) | L206–319 (114) | ~12 KB |
| 42 Themes | ✅ | L322–459 (138) | ~16 KB — **longest block** |
| 43 Polish/E2E | 🔄 In Progress | L462–487 (26) | ~3 KB |
| 44 Personas | ✅ Done | L489–518 (30) | ~3 KB |
| 45 Image/autoEdges | ✅ Done | L521–606 (86) | ~14 KB |
| 46 Gallery | ✅ Done | L609–686 (78) | ~9 KB |
| 47 Viral | ✅ Done | L689–807 (119) | ~14 KB |
| 48 UIMockup Depth | ✅ Done | L810–869 (60) | ~7 KB |
| 49 Edit Mode | 🔲 Planned | L871–1013 (143) | ~17 KB — newest |

Repeating subsections per sprint (all H3): `Goal/Theme + Status + Date`, `Problem Statement`, `User Stories`, `Technical Decisions`, `Phase 1..N`, `QA Plan`, `Docs Impact`, `Total: X points, Y tickets`.

**Hot zones** (changed in last 14 days, will be re-edited): Sprints 43, 48, 49. **Archival zones** (zero-edit since closure): Sprints 39, 40, 41, 42, 44, 45, 46, 47 — 8 sprints, **701 of 1014 lines (69%)**.

Also notable: Sprint 41 status header still reads `🔲 Planned` (L210) but every ticket is `✅` — file is already drifting because nobody scrolls down to fix the header.

## B. Pain Points (file:line evidence)

1. **25K-token Read tripwire.** `Read /opt/autodeck/specs/backlog.md` without offset/limit will exceed the per-call token cap. Every skill that says "Read `specs/backlog.md`" (sprint-run.md:21, sprint-status.md:21, execute-ticket.md:20, plan-sprint.md:34, qa-review.md:25, update-backlog.md:38, sprint-close.md:18) is one good sprint away from breaking.
2. **`/execute-ticket 49.1` reads ~17 KB just to find one row.** execute-ticket.md L20–34 demands "find the ticket by number" then "Edit `specs/backlog.md` with the status change" — a single-row edit forces loading the entire 1014-line file into context.
3. **`/plan-sprint` next-sprint detection is cheap, but its append step is dangerous.** plan-sprint.md L261 instructs "Append final sprint plan to `specs/backlog.md` (before Bug Backlog section if one exists)". Bug Backlog is at L183 — *above* eight sprints. A literal read of this rule would inject the new sprint between Sprint 40 and Sprint 41.
4. **Status drift.** Sprint 41 header says `🔲 Planned` (L210); all 17 tickets are `✅`. The header is 109 lines away from the last ticket — humans never scroll back up.
5. **Merge contention.** Two parallel agents both editing `specs/backlog.md` (sprint-run.md L62, agent worktree at `.claude/worktrees/agent-aae04d3b/specs/backlog.md`) collide on every ticket flip. Per-sprint files give merge isolation.
6. **Closed-sprint duplication of `summary.md` content.** Each closed sprint already has `sprints/sprint-XX/summary.md` (sprint-39 through sprint-48 all exist). The QA Plan + Docs Impact tables in `backlog.md` are essentially second copies.
7. **`Last Updated` semantics ambiguous.** L6 is touched by sprint-close.md and per-sprint tickets ("update header `Last Updated`"), but nothing tells you *whose* update — whole-file or single-sprint.

## C. Proposed Hierarchy: **Hybrid** (active flat + archived per-sprint)

Evaluated all five options. By area loses ticket-number contiguity (Sprint 49 alone spans engine + types + skills — would shred). Per-sprint-always is operationally cleanest but forces every skill call to do `ls` + multi-file open even for the active sprint (95% case). Time/state is close to ideal; hybrid is the refinement: the *index file is itself the active backlog*, no extra hop.

### Layout

```
specs/
├── backlog.md                       # INDEX + active/planned sprints + Bug Backlog + Future Ideas
└── backlog/
    └── archive/
        ├── sprint-39.md             # Full closed-sprint block
        ├── sprint-40.md
        ├── sprint-41.md
        ├── sprint-42.md
        ├── sprint-44.md             # Sprint 43 stays in backlog.md until it closes
        ├── sprint-45.md
        ├── sprint-46.md
        ├── sprint-47.md
        └── sprint-48.md
```

One file per closed sprint. **No `active.md`** — the root file `backlog.md` *is* the active surface. Naming: `sprint-XX.md` (no zero-pad, matching existing `/opt/autodeck/sprints/sprint-39/` … `sprint-48/` convention).

### `backlog.md` (new shape, ~250 lines target)

```
# AutoDeck Backlog
**Last Updated:** YYYY-MM-DD     ← whole-file metadata only

## Sprint Index
| Sprint | Theme | Status | Pts | Date | File |
|--------|-------|--------|-----|------|------|
| 10–38 (AutoSpec) | (legacy) | ✅ Archived | 443 | – | (history table below) |
| 39 | AutoDeck Launch | ✅ Done | 48 | 2026-04-02 | backlog/archive/sprint-39.md |
| 40 | Diagram + Mockup | ✅ Done | 53 | 2026-04-04 | backlog/archive/sprint-40.md |
| 41 | Creation Story | ✅ Done | 44 | – | backlog/archive/sprint-41.md |
| 42 | Three Themes | ✅ Done | 49 | – | backlog/archive/sprint-42.md |
| 43 | Polish + E2E | 🔄 In Progress | 18 | 2026-04-04 | (below) |
| 44 | Personas + Testimonials | ✅ Done | 30 | 2026-04-05 | backlog/archive/sprint-44.md |
| 45 | Image/autoEdges/Term | ✅ Done | 32 | 2026-04-05 | backlog/archive/sprint-45.md |
| 46 | Gallery | ✅ Done | 25 | 2026-04-05 | backlog/archive/sprint-46.md |
| 47 | Viral | ✅ Done | 48 | 2026-04-06 | backlog/archive/sprint-47.md |
| 48 | UIMockup + Sivania | ✅ Done | 35 | 2026-04-07 | backlog/archive/sprint-48.md |
| 49 | Edit Mode + Notes | 🔲 Planned | 49 | 2026-04-16 | (below) |

## Sprint History (AutoSpec 10–38)
[unchanged 23-line table]

## Sprint 43: Polish + E2E Verification          ← FULL block (in progress)
…
## Sprint 49: Edit Mode + LLM Notes              ← FULL block (planned/next)
…

## Bug Backlog
…

## Future Sprint Ideas
…
```

### Each `backlog/archive/sprint-XX.md`

```
# Sprint XX: [Theme]
**Status:** ✅ Done
**Date:** YYYY-MM-DD
**Points:** N
**Closed via:** sprints/sprint-XX/summary.md

[verbatim copy of the Goal/Problem/User Stories/Phases/QA Plan/Docs Impact/Total
 block as it existed in backlog.md at sprint-close time]
```

### Active rule

A sprint lives in `backlog.md` from the moment `/plan-sprint` writes it through `/sprint-close`. At sprint close, the ENTIRE sprint block is *moved* (not copied) to `backlog/archive/sprint-XX.md`, and the index row's "File" column updates to point there.

### Bug Backlog

Stays in `backlog.md`. Bugs are inherently active and cross-sprint; archiving them per-sprint loses cross-cutting visibility.

### Last Updated

- `backlog.md` `**Last Updated:**` = touch-stamp for the index OR any active sprint OR the Bug Backlog.
- Each `backlog/archive/sprint-XX.md` has its own `**Closed:** YYYY-MM-DD` and is then frozen.

## D. Skill / Tool Impact

| Skill | Line | Current | Required change |
|---|---|---|---|
| sprint-run.md | 21 | Reads whole file | If target is in index `(below)` → read backlog.md only. Else → read `backlog/archive/sprint-N.md`. Add a 2-line "lookup-via-index" preamble. |
| sprint-run.md | 62 | Whole-file writes | While active → write `backlog.md`. At close (Phase 5), close step moves the block to archive. |
| sprint-run.md | 150 | Mark all ✅ | Same target (still active at this point). |
| sprint-status.md | 21 | Whole-file read | Resolve via index. If "all" → read index table only. |
| update-backlog.md | 38, 70 | Single file | Status/note/docs: if active → `backlog.md`; if archive → warn "you are editing a closed sprint". `bug` → always `backlog.md`. `add` to closed sprint → refuse. |
| execute-ticket.md | 20, 34 | Whole-file load | Resolve ticket `X.Y` via index → grep only that file. Closed sprint → refuse. |
| plan-sprint.md | 34 | Greps backlog.md | Grep only the index table. |
| plan-sprint.md | 261 | Appends before Bug Backlog (buggy now) | Insert before Bug Backlog in new structure (which is below active sprints). Add new index row simultaneously. |
| qa-review.md | 25 | Whole-file | `🧪` lives only in active. `backlog.md` is sufficient. |
| sprint-close.md | 18 | Verify ✅ | Add Phase 1.5 "Archive sprint block": cut `## Sprint N: …` from backlog.md → write to `backlog/archive/sprint-N.md` → update index row's File column. |
| help.md | 47 | Wording | Update: "Sprint index + active/planned sprints + Bug Backlog. Closed sprints under `specs/backlog/archive/sprint-XX.md`." |
| create-sprint-docs.md | 18 | Whole-file | Same resolve-via-index logic. |

`docs/methodology/04_backlog_management.md` etc. all assume single-file. Add an addendum at the top: *"AutoDeck splits closed sprints into `backlog/archive/sprint-XX.md`; the methodology file describes the conceptual single-file model — physical layout differs."* No structural rewrite needed.

## E. Migration Plan

Each step ≈ one git commit. Steps 1–2 are reversible without touching skills.

1. **Add `backlog/archive/` directory + `.gitkeep`.** Scaffolding.
2. **Generate 8 archive files mechanically** from current line ranges. Each file gets a `Closed:` field. Verify line totals match. DO NOT yet remove from `backlog.md`. **Rollback:** `rm -r specs/backlog/`.
3. **Author new `backlog.md`** with: header, Sprint Index, Sprint History, Sprint 43 block (full), Sprint 49 block (full), Bug Backlog, Future Sprint Ideas. Replace current file in one commit. Verify: `grep -c '^## Sprint ' backlog.md` == `2` (43, 49). **Rollback:** `git revert`.
4. **Update 8 skill files** per §D. One commit: `chore(skills): teach SDD skills the backlog index`. **Rollback:** `git revert`.
5. **Add `docs/methodology/` addendum** describing the physical split. One commit.
6. **Smoke-test verification** (see §F). If any fail, revert step 4 first, then step 3.

## F. Verification Checklist

1. `wc -l specs/backlog.md` → ~250 lines (down from 1014).
2. `ls specs/backlog/archive/ | wc -l` → 9 (sprint-39 through sprint-48 minus 43).
3. `grep -c '^## Sprint ' specs/backlog.md` → `2` (Sprint 43, Sprint 49).
4. `grep -c '^| 4[0-9] ' specs/backlog.md` → `>= 11` (index rows for sprints 39–49).
5. **Dry-run `/sprint-status 49`** → opens `backlog.md`, reports `0% (0/19 complete), 49 pts planned`.
6. **Dry-run `/sprint-status 47`** → reads index → opens `archive/sprint-47.md` → reports `100% (17/17), 48 pts`.
7. **Dry-run `/plan-sprint …`** → reads only the index table to determine next sprint = `50`.
8. **Dry-run `/execute-ticket 49.1`** → resolves via index → opens `backlog.md` → finds `| 49.1 |` row → flips 🔲 → 🔄.
9. **Dry-run `/execute-ticket 47.5`** (closed) → refuses: "Sprint 47 is closed. Use `/update-backlog` if you really need to amend it."
10. **Roundtrip dry-run `/sprint-close 43`** → verifies all ✅ → moves block to archive → updates index row.
11. **Token-budget check**: `Read specs/backlog.md` (no offset) succeeds.

## G. Open Questions (yes/no or A/B)

1. **Keep "Future Sprint Ideas" in `backlog.md`, or split to `backlog/ideas.md`?** (recommend: keep — referenced when planning next sprint.)
2. **Should the Bug Backlog grow into its own `backlog/bugs.md` once it actually has bugs?** (A: split now, B: split when it crosses 10 bugs.)
3. **Zero-padding (`sprint-039.md`) for archive filenames?** Existing `sprints/sprint-39/` is unpadded — recommend **no padding**.
4. **At sprint close, move the block (recommended) or copy + leave a stub `[archived → archive/sprint-XX.md]` line?** Stub costs ~1 line per sprint forever; clean move keeps `backlog.md` minimal.
5. **Should `Sprint History (10–38)` table also move to archive?** (Only 23 lines — recommend keep in root.)

## H. Non-Goals

- **Not moving** `sprints/sprint-XX/summary.md` — those already exist and serve a different audience (release notes / closure narrative). The archive files are the *backlog rows*, not the summaries.
- **Not changing ticket ID format** (`X.Y`, `B.X` for bugs). Stable IDs are essential to skill compatibility.
- **Not introducing YAML frontmatter**. Plain markdown tables.
- **Not refactoring agent-brief files** under `agents/`.
- **Not touching `docs/methodology/04_backlog_management.md`'s conceptual model** — methodology stays single-file in spirit; only physical implementation splits.
- **Not splitting per-area**. Sprint 49 alone touches engine + types + skills.

---

### Critical Files for Implementation

- `/opt/autodeck/specs/backlog.md`
- `/opt/autodeck/.claude/commands/sprint-run.md`
- `/opt/autodeck/.claude/commands/sprint-close.md`
- `/opt/autodeck/.claude/commands/execute-ticket.md`
- `/opt/autodeck/.claude/commands/plan-sprint.md`

Secondary: `sprint-status.md`, `update-backlog.md`, `qa-review.md`, `create-sprint-docs.md`, `help.md`, `docs/methodology/04_backlog_management.md`.
