# Theme System

AutoDeck's theme system uses CSS custom properties (CSS variables) to enable runtime theme switching across three named themes.

## Themes

| Theme | Background | Accent | Font |
|-------|-----------|--------|------|
| Aurora (default) | `#0f172a` | `#60a5fa` / `#a78bfa` | Inter |
| Sivania | `#1a1a1a` | `#698472` / `#8e6a59` | Cormorant Garamond / Inter |
| Noir | `#0a0a0a` | `#00d9ff` / `#0099b8` | JetBrains Mono |

## Architecture

```
ThemeProvider (App.tsx, above HashRouter)
  └─ reads localStorage("autodeck-theme") on mount
  └─ sets document.documentElement.dataset.theme on change
  └─ exposes useTheme() → { theme: ThemeId, setTheme: (id) => void }
       └─ PresentationViewer
            └─ data-theme={theme} on root div
            └─ Palette <LanguageDropdown> → calls setTheme
```

## Files

| File | Purpose |
|------|---------|
| `src/engine/themes.ts` | ThemeId type, THEMES array, DEFAULT_THEME |
| `src/engine/ThemeContext.tsx` | ThemeProvider + useTheme hook |
| `src/index.css` | `[data-theme]` CSS blocks (16 tokens × 3 themes) |

## Token Application

Tokens are consumed via inline `style` props where Tailwind can't reference CSS vars:

```tsx
// Background
style={{ background: 'var(--theme-bg)' }}

// Gradients (Tailwind can't interpolate CSS vars in gradient utilities)
style={{ background: 'var(--theme-gradient)' }}

// Text gradient
style={{
  background: 'var(--theme-gradient)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}}
```

## SVG Rule

SVG attributes do NOT inherit CSS custom properties. Use inline `style`:
```tsx
// Wrong: <rect fill="var(--theme-accent-primary)" />
// Right: <rect style={{ fill: 'var(--theme-accent-primary)' }} />
```

## localStorage Key

`autodeck-theme` — persists across page loads and browser sessions.
