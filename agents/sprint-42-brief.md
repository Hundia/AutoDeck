# Sprint 42 Brief — Three Design Systems: Theme Switcher

**Project:** `/opt/autodeck`  
**Goal:** 16-token CSS custom-property theme system with three named themes (Aurora, Sivania, Noir), runtime switcher in PresentationViewer, and migration of all hardcoded colors to semantic tokens.

---

## CRITICAL RULES — READ BEFORE WRITING ANY CODE

1. **SVG fill/stroke rule**: SVG presentation attributes (`fill="rgba(…)"`, `stroke="rgba(…)"`) do NOT inherit CSS custom properties in any browser. All SVG color attrs MUST be converted to React inline `style={{ fill: 'var(--theme-…)' }}`. This affects BackgroundEffects.tsx and DiagramSlide.tsx.

2. **ThemeProvider placement**: Single `<ThemeProvider>` above `<HashRouter>` in App.tsx — NOT inside route elements. No per-route providers.

3. **ScrollProgressBar gradient**: Tailwind gradient utilities (`bg-gradient-to-b`) cannot reference CSS vars. Must use `style={{ background: 'var(--theme-gradient)' }}`.

4. **Landing page**: NO ThemeProvider — LandingPage is intentionally unthemed.

5. **Aurora is default**: `:root` fallback block in index.css PLUS `[data-theme="aurora"]` block. Fresh browser gets Aurora.

6. **Build gate**: `npm run build` must exit 0 after every batch. If it fails, fix before marking tickets done.

---

## CSS Token Reference (all 16 tokens)

```css
/* Aurora */
[data-theme="aurora"] {
  --theme-bg: #0f172a;
  --theme-surface: rgba(255,255,255,0.05);
  --theme-surface-border: rgba(255,255,255,0.1);
  --theme-text-primary: #ffffff;
  --theme-text-secondary: rgba(255,255,255,0.6);
  --theme-accent-primary: #60a5fa;
  --theme-accent-secondary: #a78bfa;
  --theme-accent-glow: rgba(96,165,250,0.4);
  --theme-nav-bg: rgba(255,255,255,0.1);
  --theme-nav-border: rgba(255,255,255,0.06);
  --theme-dot-active: #3b82f6;
  --theme-font-display: 'Inter', sans-serif;
  --theme-font-body: 'Inter', sans-serif;
  --theme-bg-effect-color-1: rgba(96,165,250,0.3);
  --theme-bg-effect-color-2: rgba(139,92,246,0.2);
  --theme-gradient: linear-gradient(to bottom, #60a5fa, #a78bfa);
}

/* Sivania */
[data-theme="sivania"] {
  --theme-bg: #1a1a1a;
  --theme-surface: #252525;
  --theme-surface-border: #333333;
  --theme-text-primary: #f5f0e8;
  --theme-text-secondary: #9a8c7e;
  --theme-accent-primary: #698472;
  --theme-accent-secondary: #8e6a59;
  --theme-accent-glow: rgba(105,132,114,0.3);
  --theme-nav-bg: rgba(105,132,114,0.15);
  --theme-nav-border: rgba(105,132,114,0.2);
  --theme-dot-active: #698472;
  --theme-font-display: 'Cormorant Garamond', serif;
  --theme-font-body: 'Inter', sans-serif;
  --theme-bg-effect-color-1: rgba(105,132,114,0.2);
  --theme-bg-effect-color-2: rgba(142,106,89,0.15);
  --theme-gradient: linear-gradient(to bottom, #698472, #8e6a59);
}

/* Noir */
[data-theme="noir"] {
  --theme-bg: #0a0a0a;
  --theme-surface: #111111;
  --theme-surface-border: #1e1e1e;
  --theme-text-primary: #f0f0f0;
  --theme-text-secondary: #666666;
  --theme-accent-primary: #00d9ff;
  --theme-accent-secondary: #0099b8;
  --theme-accent-glow: rgba(0,217,255,0.3);
  --theme-nav-bg: rgba(0,217,255,0.08);
  --theme-nav-border: rgba(0,217,255,0.15);
  --theme-dot-active: #00d9ff;
  --theme-font-display: 'JetBrains Mono', monospace;
  --theme-font-body: 'JetBrains Mono', monospace;
  --theme-bg-effect-color-1: rgba(0,217,255,0.2);
  --theme-bg-effect-color-2: rgba(0,153,184,0.12);
  --theme-gradient: linear-gradient(to bottom, #00d9ff, #0099b8);
}
```

---

## File Inventory

### Files to CREATE:
- `src/engine/themes.ts`
- `src/engine/ThemeContext.tsx`

### Files to MODIFY:
- `src/index.css` — add Cormorant Garamond `@import` + 3 `[data-theme]` blocks + `:root` Aurora fallback
- `src/App.tsx` — wrap HashRouter in ThemeProvider
- `src/engine/PresentationViewer.tsx` — useTheme(), data-theme attr, remove hardcoded bg, Palette dropdown, dot CSS var
- `src/engine/LanguageDropdown.tsx` — add `previewColors?: string[]` to DropdownOption; render swatches; fix active-dot color
- `src/engine/ScrollProgressBar.tsx` — replace gradient class with inline style
- `src/engine/BackgroundEffects.tsx` — SVG fill/stroke → inline style (CircuitLines, HexGrid, GradientPulse, WaveMesh)
- `src/slides/components/TitleSlide.tsx` — gradient, glow, ambient dots, tagline color
- `src/slides/components/ClosingSlide.tsx` — tagline gradient, command code color
- `src/slides/components/QuoteSlide.tsx` — title color, textShadow, points color
- `src/slides/components/StatsSlide.tsx` — left column bg/border/text
- `src/slides/components/ComparisonSlide.tsx` — title gradient
- `src/slides/components/TimelineSlide.tsx` — connecting line gradient

---

## Ticket Specs

### 42.1 — `src/engine/themes.ts`

```typescript
export type ThemeId = 'aurora' | 'sivania' | 'noir';

export interface Theme {
  id: ThemeId;
  label: string;
  previewColors: string[];  // used by Palette dropdown swatches
}

export const THEMES: Theme[] = [
  { id: 'aurora',  label: 'Aurora',  previewColors: ['#60a5fa', '#a78bfa', '#0f172a'] },
  { id: 'sivania', label: 'Sivania', previewColors: ['#698472', '#8e6a59', '#1a1a1a'] },
  { id: 'noir',    label: 'Noir',    previewColors: ['#00d9ff', '#0099b8', '#0a0a0a'] },
];

export const DEFAULT_THEME: ThemeId = 'aurora';
```

### 42.2 — `src/engine/ThemeContext.tsx`

```typescript
import { createContext, useContext, useState, useEffect } from 'react';
import type { ThemeId } from './themes';
import { DEFAULT_THEME } from './themes';

const STORAGE_KEY = 'autodeck-theme';

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored as ThemeId) ?? DEFAULT_THEME;
  });

  const setTheme = (id: ThemeId) => {
    setThemeState(id);
    localStorage.setItem(STORAGE_KEY, id);
    document.documentElement.dataset.theme = id;
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

### 42.3 — `src/index.css`

Insert after the existing `@import` line (Inter + JetBrains Mono):
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');
```

Then add at the END of the file all three `[data-theme]` blocks (exact token values above) PLUS a `:root` block that copies Aurora's values as fallback.

### 42.4 — `src/App.tsx`

Import ThemeProvider:
```typescript
import { ThemeProvider } from './engine/ThemeContext';
```

Wrap HashRouter:
```tsx
return (
  <ThemeProvider>
    <HashRouter>
      <Routes>…</Routes>
    </HashRouter>
  </ThemeProvider>
);
```

### 42.5 — `src/engine/PresentationViewer.tsx` (bg + dot)

- `import { useTheme } from './ThemeContext';`
- `const { theme, setTheme } = useTheme();`
- On root div: add `data-theme={theme}` + replace `className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 …"` — keep `relative text-white` but replace the bg gradient with `style={{ background: 'var(--theme-bg)' }}`
- Nav dot: replace `bg-blue-500` (active dot) with `style={{ background: 'var(--theme-dot-active)' }}` inline, remove the class

### 42.6 — `src/engine/PresentationViewer.tsx` (Palette dropdown)

After completing 42.5:
- `import { Palette } from 'lucide-react';` (add to existing lucide import)
- `import { THEMES } from './themes';`
- Define THEME_OPTIONS from THEMES (mapped to DropdownOption shape with previewColors)
- Add third `<LanguageDropdown>` as the LEFTMOST item in the top-right cluster:
  ```tsx
  <LanguageDropdown
    value={theme}
    onChange={(id) => setTheme(id as ThemeId)}
    icon={<Palette size={14} />}
    align="right"
    options={THEMES.map(t => ({ id: t.id, label: t.label, previewColors: t.previewColors }))}
  />
  ```

### 42.6b — `src/engine/LanguageDropdown.tsx` (previewColors)

Add `previewColors?: string[]` to `DropdownOption` interface. In the dropdown item render, after `{option.icon && …}` and before `{option.label}`, add:
```tsx
{option.previewColors && option.previewColors.length > 0 && (
  <span className="flex items-center gap-0.5">
    {option.previewColors.map((c, i) => (
      <span
        key={i}
        className="w-2 h-2 rounded-full inline-block"
        style={{ background: c }}
      />
    ))}
  </span>
)}
```

Also fix the active-dot (ticket 42.8 — combine here):
Replace:
```tsx
className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
  isActive ? 'bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.5)]' : 'bg-transparent'
}`}
```
With:
```tsx
className="w-1.5 h-1.5 rounded-full transition-all duration-200"
style={isActive ? {
  background: 'var(--theme-dot-active)',
  boxShadow: '0 0 6px var(--theme-accent-glow)',
} : {}}
```

### 42.7 — `src/engine/ScrollProgressBar.tsx`

Replace the motion.div gradient class:
```tsx
// Before:
className="w-full rounded-full bg-gradient-to-b from-blue-400 via-amber-400 to-green-400"
// After:
className="w-full rounded-full"
style={{ background: 'var(--theme-gradient)', height: `${Math.max(progress * 100, 2)}%` }}
```
Remove the separate `style={{ height: … }}` that was already there, fold it into the new style.

### 42.9 — `src/slides/components/TitleSlide.tsx`

1. Animated background gradient div — keep the radial gradient animation but replace hardcoded rgba colors with CSS var references using template literals in the `background` array:
   - `rgba(59,130,246,…)` → `var(--theme-bg-effect-color-1)` (roughly — use a tinted version)
   - Actually: keep the animated background as-is (it's a subtle texture overlay, not a brand color). Focus on the named elements below.

2. Ambient dots — replace `className="… bg-blue-400/20 …"` with:
   ```tsx
   style={{ 
     left: dot.x, top: dot.y, 
     width: dot.size, height: dot.size,
     background: 'var(--theme-accent-primary)',
     opacity: 0.2
   }}
   ```
   Remove `bg-blue-400/20` from className.

3. Title `style` — replace hardcoded gradient with:
   ```tsx
   style={{
     background: 'linear-gradient(135deg, var(--theme-accent-primary) 0%, var(--theme-accent-secondary) 40%, var(--theme-accent-primary) 80%)',
     WebkitBackgroundClip: 'text',
     WebkitTextFillColor: 'transparent',
     backgroundClip: 'text',
     filter: 'drop-shadow(0 0 30px var(--theme-accent-glow))',
   }}
   ```

4. Tagline words — replace `className="… text-cyan-300"` with:
   ```tsx
   className="text-2xl sm:text-3xl font-semibold"
   style={{ color: 'var(--theme-accent-secondary)' }}
   ```

### 42.10 — `src/slides/components/ClosingSlide.tsx`

1. Tagline `<motion.p>` — replace:
   ```tsx
   className="text-2xl sm:text-3xl text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text font-bold"
   ```
   With:
   ```tsx
   className="text-2xl sm:text-3xl font-bold"
   style={{
     background: 'var(--theme-gradient)',
     WebkitBackgroundClip: 'text',
     WebkitTextFillColor: 'transparent',
     backgroundClip: 'text',
   }}
   ```

2. Command `<code>` — replace `className="text-blue-400 …"` with `style={{ color: 'var(--theme-accent-primary)' }}` + keep other classes.

### 42.11 — QuoteSlide + StatsSlide + ComparisonSlide + TimelineSlide

**QuoteSlide:**
- Title `className="… text-purple-400 …"` → remove `text-purple-400`, add `style={{ color: 'var(--theme-accent-primary)' }}`
- `textShadow: '0 0 40px rgba(168,85,247,0.4)'` → `textShadow: '0 0 40px var(--theme-accent-glow)'`
- Points `className="… text-purple-300/80 …"` → remove `text-purple-300/80`, add `style={{ color: 'var(--theme-accent-secondary)', opacity: 0.8 }}`

**StatsSlide:**
- Left column box: `bg-cyan-500/10 border-cyan-500/30` → `style={{ background: 'var(--theme-surface)', border: '1px solid var(--theme-surface-border)' }}`  + remove the Tailwind bg/border classes
- Left label: `text-cyan-400` → `style={{ color: 'var(--theme-accent-primary)' }}`
- Right column: keep as-is (uses emerald which is a semantic "good" color, not brand)

**ComparisonSlide:**
- Title gradient `bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent` — this is semantic (red=bad, amber=comparison), keep it. No change needed.

**TimelineSlide:**
- Connecting line `bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-green-500/50` → `style={{ background: 'var(--theme-gradient)', opacity: 0.5 }}`, remove the Tailwind gradient classes.

### 42.12 — `src/engine/BackgroundEffects.tsx` (SVG → inline style)

**CircuitLines** (lines + pulse lines + dots):
- `stroke="rgba(100,180,255,0.12)"` → `style={{ stroke: 'var(--theme-bg-effect-color-1)', strokeOpacity: '0.4' }}` (remove stroke attribute)
- `stroke="rgba(100,180,255,0.5)"` on pulse lines → `style={{ stroke: 'var(--theme-bg-effect-color-1)' }}` + keep existing `style` merge
- `fill="rgba(100,180,255,0.25)"` on dots → `style={{ fill: 'var(--theme-bg-effect-color-1)' }}`

**GradientPulse** (div with inline background):
- `rgba(59,130,246,0.15)` → `var(--theme-bg-effect-color-1)` with 0.15 — use `rgba` with CSS var not possible, so replace the 5-stop gradient string with: `'linear-gradient(45deg, var(--theme-bg-effect-color-1), var(--theme-bg-effect-color-2), var(--theme-bg-effect-color-1))'`

**HexGrid** (polygon stroke):
- `stroke="rgba(100,180,255,0.12)"` → `style={{ stroke: 'var(--theme-bg-effect-color-1)', strokeOpacity: '0.4' }}` (add to existing style prop, remove stroke attr)

**WaveMesh** (path fill):
- The `w.color` values are inline objects. Replace the hardcoded wave colors array with:
  ```typescript
  const waves = [
    { color: 'var(--theme-bg-effect-color-1)', yOffset: 40, amplitude: 30, duration: 12 },
    { color: 'var(--theme-bg-effect-color-2)', yOffset: 50, amplitude: 25, duration: 15 },
    { color: 'var(--theme-bg-effect-color-1)', yOffset: 60, amplitude: 35, duration: 18 },
    { color: 'var(--theme-bg-effect-color-2)', yOffset: 70, amplitude: 20, duration: 10 },
  ];
  ```
  The `fill={w.color}` must become `style={{ fill: w.color }}` and REMOVE the `fill` attribute.

**ParticleField** (circles):
- `fill="white"` on `<motion.circle>` — these are white dots, not themed. Keep as-is (white particles are universal).

**Constellation** (lines + circles):
- `stroke="rgba(255,255,255,0.08)"` — keep as-is (white lines are universal).
- `fill="white"` on circles — keep as-is.

### 42.13 — `src/slides/components/DiagramSlide.tsx` (colorMap + SVG)

The `colorMap` uses `fill` and `stroke` string values. All `rect`, `line`, `path` SVG elements that use `fill={colors.fill}` and `stroke={colors.stroke}` as **attributes** must change to **`style` props**:
```tsx
// Before:
<rect fill={colors.fill} stroke={colors.stroke} … />
// After:
<rect style={{ fill: colors.fill, stroke: colors.stroke }} … />
```

Also update the `blue` and `cyan` colorMap entries to reference CSS vars:
```typescript
const colorMap: Record<string, { fill: string; stroke: string }> = {
  blue:    { fill: 'var(--theme-surface)',  stroke: 'var(--theme-accent-primary)' },
  cyan:    { fill: 'var(--theme-surface)',  stroke: 'var(--theme-accent-secondary)' },
  violet:  { fill: '#2d1b4e', stroke: '#8b5cf6' },  // keep semantic purple
  emerald: { fill: '#064e3b', stroke: '#10b981' },  // keep semantic green
  amber:   { fill: '#451a03', stroke: '#f59e0b' },  // keep semantic amber
  slate:   { fill: '#1e293b', stroke: '#475569' },  // keep slate
};
```

Find ALL SVG elements in DiagramSlide that use `fill={…}` or `stroke={…}` as JSX attributes (not in style) and convert them. Also check `fillOpacity` — if on a rect with `fill={…}` attribute, move everything to style.

---

## Verification Checklist

After all tickets done, run:
```bash
cd /opt/autodeck && npm run build
```

Must exit 0, zero TypeScript errors.

Then visual checks:
1. `/presentation` (Aurora default) — blue-violet gradient title, particles visible
2. Switch to Sivania — bg darkens to `#1a1a1a`, title gradient shifts to sage/terracotta, Cormorant Garamond font visible on title
3. Switch to Noir — bg is `#0a0a0a`, cyan `#00d9ff` accents, JetBrains Mono on title
4. Refresh page — same theme persists (localStorage)
5. Navigate between routes — theme persists
6. Landing page — NO theme switcher visible, background stays standard slate

---

## Backlog Update Rule

After completing each ticket, update `specs/backlog.md`: change the ticket's `🔲` to `✅`.
