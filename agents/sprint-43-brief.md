# Sprint 43 Agent Brief — Polish + E2E Verification

## Your Mission
Execute tickets 43.1–43.5 (all fixes) and then 43.6–43.7 (E2E verification).
Read this brief fully, then read the referenced source files before writing any code.

---

## Ticket 43.1 — Creation Story pill: always-visible label + attention pulse

**File:** `src/engine/PresentationViewer.tsx`

Current pill code (around line 241–249):
```tsx
{creationStory && (
  <button
    onClick={() => setDrawerOpen(prev => !prev)}
    className={`fixed bottom-20 z-50 flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white/70 hover:text-white text-xs font-medium transition-colors ${isRTL ? 'left-4' : 'right-4'}`}
    aria-label="How This Was Built"
  >
    <BookOpen size={14} />
    <span className="hidden sm:inline">Creation Story</span>
  </button>
)}
```

Fix:
1. Remove `hidden sm:inline` → just `<span>Creation Story</span>` (always visible)
2. Wrap the button in a `motion.div` (or use `motion.button`) from framer-motion with a subtle initial animation:
   ```tsx
   initial={{ opacity: 0, scale: 0.8 }}
   animate={{ opacity: 1, scale: 1 }}
   transition={{ delay: 1.2, duration: 0.4, ease: 'easeOut' }}
   ```
   This way the pill appears ~1.2s after slide load — drawing attention without being annoying.
3. Keep all other classes exactly as-is.

**Verify:** `npm run build` exits 0.

---

## Ticket 43.2 — ClosingSlide commands layout: fix whitespace

**File:** `src/slides/components/ClosingSlide.tsx`

The commands section (lines 50–62) uses `flex items-center justify-between` which spreads code and description far apart when the container is wide.

Current:
```tsx
<div key={idx} className="flex items-center justify-between gap-4 text-left">
  <code className="font-mono bg-black/30 px-3 py-2 rounded" style={{ color: 'var(--theme-accent-primary)' }}>
    {cmd.cmd}
  </code>
  <span className="text-white/60 text-sm">{cmd.desc}</span>
</div>
```

Fix — change to `grid` layout with fixed code column:
```tsx
<div key={idx} className="grid grid-cols-[minmax(0,auto)_1fr] items-center gap-6 text-left">
  <code className="font-mono bg-black/30 px-3 py-2 rounded whitespace-nowrap" style={{ color: 'var(--theme-accent-primary)' }}>
    {cmd.cmd}
  </code>
  <span className="text-white/60 text-sm">{cmd.desc}</span>
</div>
```

**Verify:** `npm run build` exits 0.

---

## Ticket 43.3 — Landing 3-steps Deploy description: shorten to one line

**File:** `src/landing/LandingPage.tsx`

Around line 311–316, the `steps` array has:
```ts
{
  num: '3',
  label: 'Deploy',
  color: 'bg-emerald-500',
  cmd: 'git push',
  desc: 'GitHub Actions deploys to GitHub Pages automatically.',
},
```

Change `desc` to:
```ts
desc: 'GitHub Actions auto-deploys to Pages.',
```

This fits on one line like steps 1 & 2, keeping all three code chips vertically aligned.

**Verify:** `npm run build` exits 0.

---

## Ticket 43.4 — Hero CTA rename: "Build with AI →" → "How to Build with AI →"

**File:** `src/landing/LandingPage.tsx`

Two places to update:

1. **Hero section** (around line 150):
   ```tsx
   Build with AI →
   ```
   Change to:
   ```tsx
   How to Build with AI →
   ```

2. **QuickStart section CTA** (around line 514) — look for any button/link with text "Build with AI" or similar that links to `#/howto` and update its label to match.

Keep all className and href values exactly as-is.

**Verify:** `npm run build` exits 0.

---

## Ticket 43.5 — Backlog + sprint summary

After all fixes:
1. Update `specs/backlog.md`: Set 43.1–43.5 status to ✅ Done (change 🔲 → ✅)
2. Create `sprints/sprint-43/summary.md` with:
   - Sprint 43 heading + date
   - Tickets completed table
   - Key files changed
   - "Ready for E2E verification" note

---

## Ticket 43.6 — E2E Run 1

After fixes are done and build passes:

1. Start preview server: `npm run build && npm run preview &`
2. Wait ~3s for server to start
3. Write and run this Playwright script as `e2e-sprint43-run1.js`:

```js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:4173/AutoDeck';
const OUT = path.join(__dirname, 'e2e-screenshots/run1');
fs.mkdirSync(OUT, { recursive: true });

const PRESENTATIONS = [
  { route: '#/presentation', name: 'acme' },
  { route: '#/techbrief',    name: 'techbrief' },
  { route: '#/uimockup',     name: 'uimockup' },
  { route: '#/howto',        name: 'howto' },
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const errors = [];

  for (const pres of PRESENTATIONS) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/${pres.route}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Screenshot slide 1
    await page.screenshot({ path: `${OUT}/${pres.name}-slide1.png` });

    // Check Creation Story pill
    const pillText = await page.locator('button[aria-label="How This Was Built"]').textContent().catch(() => null);
    const pillVisible = await page.locator('button[aria-label="How This Was Built"]').isVisible().catch(() => false);
    console.log(`[${pres.name}] Creation Story pill visible=${pillVisible}, text="${pillText?.trim()}"`);

    // Click the pill — drawer should open
    if (pillVisible) {
      await page.locator('button[aria-label="How This Was Built"]').click();
      await page.waitForTimeout(600);
      await page.screenshot({ path: `${OUT}/${pres.name}-drawer-open.png` });

      // Verify drawer has content
      const drawerTitle = await page.locator('h3').filter({ hasText: /Prompts|How This Was Built/ }).first().textContent().catch(() => null);
      console.log(`[${pres.name}] Drawer heading: "${drawerTitle}"`);

      // Close drawer
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
    }

    // Navigate to last slide
    const slidesCount = await page.evaluate(() => {
      const dots = document.querySelectorAll('button[aria-label^="Slide "]');
      return dots.length;
    });
    console.log(`[${pres.name}] Total slides: ${slidesCount}`);

    if (slidesCount > 1) {
      await page.locator(`button[aria-label="Slide ${slidesCount}"]`).click();
      await page.waitForTimeout(800);
      await page.screenshot({ path: `${OUT}/${pres.name}-last-slide.png` });
    }

    if (jsErrors.length > 0) {
      errors.push({ pres: pres.name, errors: jsErrors });
    }

    await ctx.close();
  }

  await browser.close();

  console.log('\n=== Summary ===');
  if (errors.length === 0) {
    console.log('PASS: No JS errors in any presentation');
  } else {
    console.log('FAIL: JS errors found:');
    errors.forEach(e => console.log(`  ${e.pres}:`, e.errors));
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
```

Run it: `node e2e-sprint43-run1.js`

Report all console output.

---

## Ticket 43.7 — E2E Run 2

1. Kill preview: `pkill -f "vite preview"` (or `kill $(lsof -ti:4173)`)
2. Rebuild: `npm run build`
3. Start preview again: `npm run preview &` + wait 3s
4. Run: `node e2e-sprint43-run1.js` again (same script, output goes to same folder — that's fine, just verify it passes again)
5. Report results

Update `specs/backlog.md`: 43.6–43.7 → ✅ Done.

---

## Critical Rules
- Do NOT modify any slide data content (titles, text)
- Do NOT add new npm packages
- Do NOT change any CSS classes except what's specified above
- `npm run build` must exit 0 after EACH ticket
- The preview server runs at `localhost:4173` (not 4174 — `npm run preview` uses 4173 by default)
- Playwright is available at `npx playwright` or via `require('playwright')` after `npm install --save-dev playwright` if needed
- Chromium headless shell is at `/root/.cache/ms-playwright/`
