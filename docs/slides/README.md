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

## Creating Custom Slide Types

See [SKILL.md](../../SKILL.md) for the complete guide.
