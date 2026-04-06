const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:4173/AutoDeck';
const OUT = path.join(__dirname, 'e2e-screenshots/sprint44');
fs.mkdirSync(OUT, { recursive: true });

const PRESENTATIONS = [
  { route: '#/presentation', name: 'acme',      midSlide: 4 },
  { route: '#/techbrief',    name: 'techbrief',  midSlide: 5 },
  { route: '#/uimockup',     name: 'uimockup',   midSlide: 5 },
  { route: '#/howto',        name: 'howto',      midSlide: 4 },
  { route: '#/learnflow',    name: 'learnflow',  midSlide: 5 },
  { route: '#/ferric',       name: 'ferric',     midSlide: 5 },
  { route: '#/q2review',     name: 'q2review',   midSlide: 5 },
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const allErrors = [];
  let pillVisibleCount = 0;

  for (const pres of PRESENTATIONS) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/${pres.route}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Slide 1 screenshot
    await page.screenshot({ path: `${OUT}/${pres.name}-slide1.png` });

    // Get total slide count
    const totalSlides = await page.evaluate(() =>
      document.querySelectorAll('button[aria-label^="Slide "]').length
    );
    console.log(`[${pres.name}] slides: ${totalSlides}`);

    // Mid slide
    if (totalSlides >= pres.midSlide) {
      await page.locator(`button[aria-label="Slide ${pres.midSlide}"]`).click();
      await page.waitForTimeout(700);
      await page.screenshot({ path: `${OUT}/${pres.name}-mid.png` });
    }

    // Creation Story pill
    const pill = page.locator('button[aria-label="How This Was Built"]');
    const pillVisible = await pill.isVisible().catch(() => false);
    if (pillVisible) {
      pillVisibleCount++;
      await pill.click();
      await page.waitForTimeout(700);
      await page.screenshot({ path: `${OUT}/${pres.name}-drawer.png` });
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
    } else {
      console.warn(`[${pres.name}] ⚠ Creation Story pill NOT visible`);
    }

    // Last slide
    if (totalSlides > 0) {
      await page.locator(`button[aria-label="Slide ${totalSlides}"]`).click();
      await page.waitForTimeout(700);
      await page.screenshot({ path: `${OUT}/${pres.name}-last.png` });
    }

    if (jsErrors.length > 0) allErrors.push({ name: pres.name, errors: jsErrors });
    await ctx.close();
  }

  await browser.close();

  const files = fs.readdirSync(OUT);
  console.log(`\n=== Sprint 44 E2E Summary ===`);
  console.log(`Presentations: ${PRESENTATIONS.length}/7`);
  console.log(`Creation Story pills: ${pillVisibleCount}/7`);
  console.log(`Screenshots: ${files.length} files in e2e-screenshots/sprint44/`);
  if (allErrors.length === 0) {
    console.log('JS Errors: 0 ✅');
  } else {
    console.log('JS Errors:');
    allErrors.forEach(e => console.log(`  ${e.name}:`, e.errors));
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
