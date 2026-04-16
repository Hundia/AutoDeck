# QA Lead Spec — AutoSpec Testing

## Test Stack
- **CLI:** Vitest (unit tests on generators/parsers)
- **Viewer:** Vitest + React Testing Library (component tests)
- **E2E:** Playwright TC-01→TC-08 (viewer pages render correctly)

## Coverage Target
- CLI generators/parsers: 80%+
- Viewer components: 60%+
- E2E: all 7 routes smoke-tested

## CLI Test Cases
| TC | What | Expected |
|----|------|----------|
| TC-CLI-01 | `autospec init my-app` | Creates correct file structure |
| TC-CLI-02 | backlog.parser — parses sprint 0 tickets | Returns 8 tickets, all statuses correct |
| TC-CLI-03 | spec.generator — generates 01_product_manager.md | File exists, contains Vision section |
| TC-CLI-04 | claude-md.generator — generates CLAUDE.md | Contains backlog-first rule |
| TC-CLI-05 | viewer-prompt.generator — warm palette | Contains parchment/sage/terracotta hex values |

## Viewer E2E Test Cases
| TC | Route | Expected |
|----|-------|----------|
| TC-UI-01 | `/` | DashboardPage renders, parchment background visible |
| TC-UI-02 | `/docs/methodology/01_philosophy` | Markdown renders, no "undefined" text |
| TC-UI-03 | `/specs/01_product_manager` | Spec card renders with correct title |
| TC-UI-04 | `/backlog` | Kanban board shows 5 columns |
| TC-UI-05 | `/skills/sprint-run` | Skill card renders phase diagram |
| TC-UI-06 | `/environments` | 6×10 matrix renders |
| TC-UI-07 | `/design-system` | Button/Card/Badge components visible |
| TC-UI-08 | Build output | `npm run build` exits 0, no TS errors |
| TC-UI-09 | `/` Gallery section | All 7 thumbnail cards render, links resolve, onError fallback present, mobile layout collapses correctly |
| TC-UI-10 | #/meta | Meta presentation loads 8 slides, branding renders as button (opens Creation Story drawer), Share button present |
| TC-UI-11 | Share modal | Share button visible on all routes, modal opens with Link/Embed/Social tabs, iframe note present in Embed tab (data-testid="share-embed-note") |
| TC-UI-12 | / ByTheNumbers + Deploy | 4 stat tiles present (GitHub Stars, Showcase Decks, Slide Types, Sprint Points), Deploy to Vercel link present, GitHubStarCounter renders or shows dash |
| TC-UI-13 | #/uimockup slides 6-7 + Sivania Light | scroll-invite arrow present then hidden after scroll; sprint-backlog renders ticket rows with status badges; Sivania Light bg is parchment not near-black; h2 color readable on parchment; activity-feed and quick-actions visible after scroll |
| TC-UI-14 | Edit Mode | Toggle hides/reveals theme+bg+lang+creation-story, EDIT MODE pill visible, E key works outside textareas |
| TC-UI-15 | Slide Notes | Add/delete note persists in localStorage, count badge accurate, Export copies markdown with slide headers, deck isolation holds across routes |

## QA Rules
- No ticket is ✅ Done without relevant test passing
- Bug fixes: reproduce the bug first, then verify fix
- New routes: TC-UI-XX added before marking done
