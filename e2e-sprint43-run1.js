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
