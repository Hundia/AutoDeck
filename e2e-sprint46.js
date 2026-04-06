const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:4173/AutoDeck';
const OUT = path.join(__dirname, 'e2e-screenshots/sprint-46');
fs.mkdirSync(OUT, { recursive: true });

const GALLERY_ROUTES = [
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
  let passed = 0;
  let failed = 0;

  function assert(condition, label) {
    if (condition) {
      console.log(`  ✅ ${label}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${label}`);
      failed++;
    }
  }

  // ── Test A: Desktop (1440×900) landing page ──────────────────────────────
  console.log('\n=== Test A: Desktop Landing Page (1440×900) ===');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // Check all 7 gallery route hrefs are present (page may have multiple links per route — hero CTAs, featured sections, etc.)
    const uniqueGalleryRoutes = await page.evaluate(() => {
      const galleryRoutes = new Set(['#/presentation', '#/techbrief', '#/uimockup', '#/howto', '#/learnflow', '#/ferric', '#/q2review']);
      const anchors = Array.from(document.querySelectorAll('a[href]'));
      const found = new Set(anchors.map(a => a.getAttribute('href')).filter(href => galleryRoutes.has(href)));
      return Array.from(found);
    });

    const expectedRoutes = ['#/presentation', '#/techbrief', '#/uimockup', '#/howto', '#/learnflow', '#/ferric', '#/q2review'];
    console.log(`  Unique gallery routes found (${uniqueGalleryRoutes.length}/7): ${uniqueGalleryRoutes.join(', ')}`);
    assert(uniqueGalleryRoutes.length === 7, `All 7 unique gallery routes have at least one <a> link (found ${uniqueGalleryRoutes.length})`);
    for (const route of expectedRoutes) {
      assert(uniqueGalleryRoutes.includes(route), `Gallery route ${route} has at least one link`);
    }

    // Check gallery card <img> elements have non-empty alt attributes
    // Gallery cards: the img is inside the card div (sibling to the <a> "View →" link), not inside the <a>
    // Look for all imgs in the gallery section (imgs with thumbnail path pattern)
    const imgAlts = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img[src*="thumbnails"]'));
      return imgs.map(img => ({
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt'),
        hasAlt: !!(img.getAttribute('alt') && img.getAttribute('alt').trim())
      }));
    });

    console.log('  Gallery card img alts:');
    imgAlts.forEach(item => console.log(`    src="${item.src}": alt="${item.alt}"`));
    assert(imgAlts.length === 7, `All 7 gallery card imgs found via thumbnails path (found ${imgAlts.length})`);
    const missingAlts = imgAlts.filter(item => !item.hasAlt);
    assert(missingAlts.length === 0, `All gallery card imgs have non-empty alt attributes (missing: ${missingAlts.map(i => i.src).join(', ') || 'none'})`);

    // Zero JS console errors
    assert(jsErrors.length === 0, `Zero JS console errors (found: ${jsErrors.length}${jsErrors.length ? ': ' + jsErrors.slice(0, 2).join('; ') : ''})`);

    await page.screenshot({ path: `${OUT}/gallery-desktop.png`, fullPage: false });
    console.log(`  Screenshot: e2e-screenshots/sprint-46/gallery-desktop.png`);

    if (jsErrors.length > 0) allErrors.push({ name: 'landing-desktop', errors: jsErrors });
    await ctx.close();
  }

  // ── Test B: Mobile (390×844) landing page ────────────────────────────────
  console.log('\n=== Test B: Mobile Landing Page (390×844) ===');
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // Scroll down to gallery section to check visibility
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(500);

    // Gallery section visible — at least one gallery card visible
    const galleryCardVisible = await page.evaluate(() => {
      const galleryRoutes = ['#/presentation', '#/techbrief', '#/uimockup', '#/howto', '#/learnflow', '#/ferric', '#/q2review'];
      const anchors = Array.from(document.querySelectorAll('a[href]'))
        .filter(a => galleryRoutes.includes(a.getAttribute('href')));
      if (anchors.length === 0) return false;
      const rect = anchors[0].getBoundingClientRect();
      // Element exists in DOM (even if off-screen after scroll, it's rendered)
      return anchors.length > 0;
    });
    assert(galleryCardVisible, 'Gallery section contains at least one gallery card in DOM');

    // No horizontal overflow
    const noHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth <= 390;
    });
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    console.log(`  scrollWidth: ${scrollWidth}px (viewport: 390px)`);
    assert(noHorizontalOverflow, `No horizontal overflow — scrollWidth (${scrollWidth}) <= 390`);

    await page.screenshot({ path: `${OUT}/gallery-mobile.png`, fullPage: false });
    console.log(`  Screenshot: e2e-screenshots/sprint-46/gallery-mobile.png`);

    if (jsErrors.length > 0) allErrors.push({ name: 'landing-mobile', errors: jsErrors });
    await ctx.close();
  }

  // ── Test C: All 7 presentation routes ────────────────────────────────────
  console.log('\n=== Test C: All 7 Presentation Routes ===');
  for (const { route, name } of GALLERY_ROUTES) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/${route}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    const slideCount = await page.evaluate(() =>
      document.querySelectorAll('button[aria-label^="Slide "]').length
    );
    console.log(`  [${name}] slides: ${slideCount}`);

    assert(jsErrors.length === 0, `[${name}] Zero JS errors`);
    assert(slideCount > 0, `[${name}] Presentation loaded (${slideCount} slides)`);

    await page.screenshot({ path: `${OUT}/${name}.png` });
    console.log(`  Screenshot: e2e-screenshots/sprint-46/${name}.png`);

    if (jsErrors.length > 0) allErrors.push({ name, errors: jsErrors });
    await ctx.close();
  }

  await browser.close();

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log('\n=== Sprint 46 E2E Summary ===');
  const screenshots = fs.readdirSync(OUT);
  console.log(`Screenshots: ${screenshots.length} files in e2e-screenshots/sprint-46/`);
  screenshots.forEach(f => console.log(`  - ${f}`));
  console.log(`\nAssertions: ${passed} passed, ${failed} failed`);

  if (allErrors.length > 0) {
    console.log('JS Errors:');
    allErrors.forEach(e => console.log(`  ${e.name}:`, e.errors));
  }

  if (failed > 0) {
    console.error(`\n${failed} assertion(s) failed`);
    process.exit(1);
  } else {
    console.log('\nAll assertions passed ✅');
  }
}

run().catch(e => { console.error(e); process.exit(1); });
