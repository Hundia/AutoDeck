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

## BackgroundEffects

Set `defaultBackground` in `src/config.ts`. Options: `particles`, `circuits`, `matrix`, `constellation`, `hex`, `waves`, `gradient`, `grid`.

## RTL Support

Languages with RTL are auto-detected from `RTL_LANGUAGES` array in `PresentationViewer.tsx`: Hebrew (he), Arabic (ar), Farsi (fa), Urdu (ur). When active, layout mirrors via CSS `dir="rtl"`.
