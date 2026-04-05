const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:4173/AutoDeck';
const OUT = path.join(__dirname, 'e2e-screenshots/sprint45');
fs.mkdirSync(OUT, { recursive: true });

const ROUTES = [
  { route: '#/presentation', name: 'acme' },
  { route: '#/techbrief',    name: 'techbrief' },
  { route: '#/uimockup',     name: 'uimockup' },
  { route: '#/howto',        name: 'howto' },
  { route: '#/learnflow',    name: 'learnflow' },
  { route: '#/ferric',       name: 'ferric' },
  { route: '#/q2review',     name: 'q2review' },
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const allErrors = [];

  for (const { route, name } of ROUTES) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/${route}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Slide 1 screenshot
    await page.screenshot({ path: `${OUT}/${name}-slide1.png` });

    const slideCount = await page.evaluate(() =>
      document.querySelectorAll('button[aria-label^="Slide "]').length
    );
    console.log(`[${name}] slides: ${slideCount}`);

    // --- Specific checks ---

    // LearnFlow: navigate to diagram slide (slide 7), check autoEdges rendered paths
    if (name === 'learnflow') {
      // Navigate through slides to find the diagram (slide 7)
      for (let i = 1; i < 7; i++) {
        await page.locator('button[aria-label="Next"]').click();
        await page.waitForTimeout(400);
      }
      await page.waitForTimeout(800);
      const pathCount = await page.evaluate(() =>
        document.querySelectorAll('svg path').length
      );
      console.log(`[learnflow] diagram path elements: ${pathCount}`);
      await page.screenshot({ path: `${OUT}/learnflow-diagram-autedges.png` });
    }

    // Q2 Review: navigate to mockup slide (slide 7), check image block
    if (name === 'q2review') {
      for (let i = 1; i < 7; i++) {
        await page.locator('button[aria-label="Next"]').click();
        await page.waitForTimeout(400);
      }
      await page.waitForTimeout(800);
      const figureCount = await page.evaluate(() =>
        document.querySelectorAll('figure').length
      );
      const imgAlt = await page.evaluate(() => {
        const img = document.querySelector('figure img');
        return img ? img.getAttribute('alt') : null;
      });
      console.log(`[q2review] figure elements: ${figureCount}, img alt: "${imgAlt}"`);
      await page.screenshot({ path: `${OUT}/q2review-mockup-image.png` });
    }

    // Check terminal output aria-label on any slide with code
    if (name === 'ferric' || name === 'howto' || name === 'techbrief') {
      // Navigate to code slide (slide 3 for ferric)
      if (name === 'ferric') {
        for (let i = 1; i < 3; i++) {
          await page.locator('button[aria-label="Next"]').click();
          await page.waitForTimeout(400);
        }
        await page.waitForTimeout(600);
        const terminalLabel = await page.evaluate(() => {
          const el = document.querySelector('[aria-label="Terminal output"]');
          return el ? el.getAttribute('aria-label') : null;
        });
        console.log(`[ferric] terminal output aria-label: ${terminalLabel}`);
        await page.screenshot({ path: `${OUT}/ferric-code-slide.png` });
      }
    }

    // Last slide screenshot
    if (slideCount > 1) {
      await page.goto(`${BASE}/${route}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1500);
      await page.locator(`button[aria-label="Slide ${slideCount}"]`).click();
      await page.waitForTimeout(700);
      await page.screenshot({ path: `${OUT}/${name}-last.png` });
    }

    if (jsErrors.length > 0) allErrors.push({ name, errors: jsErrors });
    await ctx.close();
  }

  await browser.close();

  console.log('\n=== Sprint 45 E2E Summary ===');
  console.log(`Routes tested: ${ROUTES.length}/7`);
  if (allErrors.length === 0) {
    console.log('JS Errors: 0 ✅');
  } else {
    console.log('JS Errors:');
    allErrors.forEach(e => console.log(`  ${e.name}:`, e.errors));
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
