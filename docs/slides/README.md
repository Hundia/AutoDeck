# Slide Types Documentation

All built-in slide types live in `src/slides/components/`. Register new types in `src/slides/registry.ts`.

## Built-in Types

| Type | Component | Key Fields |
|------|-----------|------------|
| `title` | `TitleSlide` | `title`, `subtitle`, `tagline`, `presenter?`, `badge?` |
| `content` | `ContentSlide` | `title`, `subtitle?`, `cards[]`, `metrics?[]` |
| `comparison` | `ComparisonSlide` | `title`, `left`, `right`, `callout?` |
| `stats` | `StatsSlide` | `title`, `stats[]`, `bottomLine?`, `leftItems?`, `rightItems?` |
| `quote` | `QuoteSlide` | `title`, `question`, `points[]` |
| `timeline` | `TimelineSlide` | `title`, `steps[]`, `scrollable?` |
| `closing` | `ClosingSlide` | `title`, `install?`, `commands?[]`, `links?[]`, `tagline` |
| `final` | `FinalSlide` | `title`, `tagline` |
| `code` | `CodeSlide` | `title`, `language`, `code`, `filename?`, `highlights?[]`, `output?[]`, `outputCommand?` |
| `diagram` | `DiagramSlide` | `title`, `mode` (arch/sequence/er), `nodes[]`, `edges[]`, `autoEdges?` |
| `mockup` | `MockupSlide` | `title`, `displayMode` (browser/flow), `blocks[]` or `frames[]` |

## Usage Examples

### diagram

```typescript
{
  type: 'diagram',
  mode: 'arch',           // 'arch' | 'sequence' | 'er'
  title: 'System Architecture',
  subtitle: 'High-level component overview',
  nodes: [
    { id: 'client', label: 'Client',  col: 0, row: 1, color: 'blue' },
    { id: 'api',    label: 'API',     col: 1, row: 0, color: 'violet' },
    { id: 'db',     label: 'Database',col: 1, row: 2, color: 'emerald' },
  ],
  edges: [
    { from: 'client', to: 'api' },
    { from: 'api',    to: 'db' },
  ],
}
```

Modes:
- **arch** — Free-form node/edge graph laid out by `col`/`row` coordinates.
- **sequence** — Vertical lifelines with horizontal message arrows (edges processed in array order).
- **er** — Entity-relationship diagram; `sublabel` becomes a comma-separated field list rendered inside each node rect.

### mockup

```typescript
{
  type: 'mockup',
  title: 'Dashboard Wireframe',
  displayMode: 'browser',   // 'browser' | 'flow'
  url: 'app.example.com/dashboard',
  blocks: [
    { type: 'navbar' },
    { type: 'hero' },
    { type: 'card-grid' },
    { type: 'table' },
  ],
}
```

`displayMode: 'flow'` renders multiple mini browser frames side-by-side with CSS arrow connectors — use `frames[]` instead of `blocks[]`:

```typescript
{
  type: 'mockup',
  title: 'Onboarding Flow',
  displayMode: 'flow',
  frames: [
    { url: 'app/login',     blocks: [{ type: 'form' }] },
    { url: 'app/dashboard', blocks: [{ type: 'navbar' }, { type: 'card-grid' }] },
  ],
}
```

Available block types: `navbar`, `hero`, `card-grid`, `table`, `form`, `chart-bar`, `sidebar`, `text-block`, `image`, `sprint-backlog`, `activity-feed`, `quick-actions`.

| Block type | Renders as |
|-----------|-----------|
| `sprint-backlog` | 2-sprint table with ticket rows, section headers, and status badges (done/in-progress/todo/blocked) |
| `activity-feed` | 5-row activity log with colored dot, action text, and timestamp |
| `quick-actions` | 4 pill buttons: "New Ticket", "Start Sprint", "Export Report", "Archive Sprint" |

The `image` block renders a real image from a URL. Fields: `src` (required), `alt` (required), `caption?`, `aspectRatio?` (`'16/9'` | `'4/3'` | `'square'`).

### DiagramSlide fields

**`autoEdges?: boolean`** — When `true`, nodes are automatically chained left-to-right in column order. Useful for simple sequential flows where you don't want to enumerate every edge manually. Non-empty `edges` always override autoEdges.

### CodeSlide fields

**`outputCommand?: string`** — The shell command displayed in the terminal output header as `$ [command]`. For example, `outputCommand: 'npm test'` renders as `$ npm test` above the output lines.

## Creating Custom Slide Types

See [SKILL.md](../../SKILL.md) for the complete guide.
