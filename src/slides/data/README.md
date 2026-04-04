# Slide Data Files

Presentation data lives in `src/slides/data/` following the naming convention:

```
{presentation-name}-{lang}.ts
```

**Examples:**
- `slides-techbrief-en.ts` — TechBrief EN
- `slides-techbrief-he.ts` — TechBrief HE
- `slides-uimockup-en.ts` — UIMockup EN
- `slides-uimockup-he.ts` — UIMockup HE

Each file exports an array: `export const slidesTechbriefEN: SlideData[] = [...]`

The Acme deck lives at the root (`src/slides/slides-en.ts`) as the legacy default.
