const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:4173/AutoDeck';
const OUT = path.join(__dirname, 'e2e-screenshots/sprint-48');
fs.mkdirSync(OUT, { recursive: true });

const ALL_ROUTES = [
  '#/uimockup',
  '#/presentation',
  '#/meta',
  '#/ferric',
  '/',
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  let passed = 0;
  let failed = 0;
  const allErrors = [];

  function assert(condition, label) {
    if (condition) {
      console.log(`  ✅ ${label}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${label}`);
      failed++;
    }
  }

  // ── Assertion 1: #/uimockup loads, slide counter "1 / 10" (10 slides) ─────
  console.log('\n=== Assertion 1: #/uimockup loads, slide counter "1 / 10" ===');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/#/uimockup`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    const counterText = await page.evaluate(() => {
      const el = document.querySelector('.fixed.top-4.left-1\\/2');
      return el ? el.textContent.trim() : null;
    });
    console.log(`  Slide counter text: "${counterText}"`);
    assert(counterText === '1 / 10', `Slide counter shows "1 / 10" (got: "${counterText}")`);

    if (jsErrors.length > 0) allErrors.push({ name: 'uimockup-load', errors: jsErrors });
    await ctx.close();
  }

  // ── Assertions 2-4: Scroll invite arrow (slide 6 = Dashboard) ─────────────
  console.log('\n=== Assertions 2–4: Scroll invite arrow on slide 6 ===');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/#/uimockup`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Navigate to slide 6 (index 5, Dashboard — scrollable mockup)
    // Click the slide 6 dot (index 5)
    await page.evaluate(() => {
      const dots = document.querySelectorAll('button[aria-label]');
      const slide6 = Array.from(dots).find(b => b.getAttribute('aria-label') === 'Slide 6');
      if (slide6) slide6.click();
    });
    // Wait for animation + 1.2s delay on scroll arrow
    await page.waitForTimeout(2000);

    // Assertion 2: scroll-invite-arrow is visible in DOM
    const arrowVisible = await page.evaluate(() => {
      const el = document.querySelector('[data-testid="scroll-invite-arrow"]');
      return el !== null;
    });
    assert(arrowVisible, 'Slide 6 (Dashboard): [data-testid="scroll-invite-arrow"] is in DOM');

    // Screenshot before scroll
    await page.screenshot({ path: `${OUT}/slide6-scroll-arrow.png` });
    console.log(`  Screenshot: e2e-screenshots/sprint-48/slide6-scroll-arrow.png`);

    // Assertion 3: scroll down, arrow disappears (AnimatePresence exit)
    // The inner browser frame (bg-slate-50 rounded-b-xl overflow-y-auto) is what scrolls.
    // The PresentationViewer listens on this inner div via useEffect.
    await page.evaluate(() => {
      const inner = document.querySelector('.bg-slate-50.rounded-b-xl');
      if (inner) {
        inner.scrollTop = 150;
        inner.dispatchEvent(new Event('scroll'));
      }
    });
    // Wait for: React re-render + AnimatePresence exit animation (delay:1.2 + duration:0.6 = 1.8s) + buffer
    await page.waitForTimeout(2500);

    const arrowGone = await page.evaluate(() => {
      const el = document.querySelector('[data-testid="scroll-invite-arrow"]');
      return el === null;
    });
    assert(arrowGone, 'After scrolling 200px: scroll-invite-arrow is NO LONGER in DOM (AnimatePresence exit)');

    // Assertion 4: Navigate away and back — arrow reappears (hasScrolled reset)
    // Go to slide 7
    await page.evaluate(() => {
      const dots = document.querySelectorAll('button[aria-label]');
      const slide7 = Array.from(dots).find(b => b.getAttribute('aria-label') === 'Slide 7');
      if (slide7) slide7.click();
    });
    await page.waitForTimeout(800);

    // Go back to slide 6
    await page.evaluate(() => {
      const dots = document.querySelectorAll('button[aria-label]');
      const slide6 = Array.from(dots).find(b => b.getAttribute('aria-label') === 'Slide 6');
      if (slide6) slide6.click();
    });
    // Wait for animation + 1.2s delay
    await page.waitForTimeout(2000);

    const arrowReappeared = await page.evaluate(() => {
      const el = document.querySelector('[data-testid="scroll-invite-arrow"]');
      return el !== null;
    });
    assert(arrowReappeared, 'After navigating away and back to slide 6: scroll-invite-arrow is visible again (hasScrolled reset)');

    if (jsErrors.length > 0) allErrors.push({ name: 'scroll-arrow', errors: jsErrors });
    await ctx.close();
  }

  // ── Assertions 5-6: Slide 7 (Backlog) — sprint-backlog block ──────────────
  console.log('\n=== Assertions 5–6: Slide 7 (Backlog) — sprint-backlog block ===');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/#/uimockup`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Navigate to slide 7 (Backlog)
    await page.evaluate(() => {
      const dots = document.querySelectorAll('button[aria-label]');
      const slide7 = Array.from(dots).find(b => b.getAttribute('aria-label') === 'Slide 7');
      if (slide7) slide7.click();
    });
    await page.waitForTimeout(1500);

    // Assertion 5: "AD-471" ticket ID is in the DOM
    const hasAD471 = await page.evaluate(() => {
      return document.body.innerHTML.includes('AD-471');
    });
    assert(hasAD471, 'Slide 7 (Backlog): text "AD-471" is in DOM (sprint-backlog block rendered)');

    // Screenshot of backlog slide
    await page.screenshot({ path: `${OUT}/slide7-backlog.png` });
    console.log(`  Screenshot: e2e-screenshots/sprint-48/slide7-backlog.png`);

    // Assertion 6: element with bg-green-100 and text "done" exists (done badge)
    const hasDoneBadge = await page.evaluate(() => {
      const allEls = Array.from(document.querySelectorAll('.bg-green-100'));
      return allEls.some(el => el.textContent.trim().toLowerCase() === 'done');
    });
    assert(hasDoneBadge, 'Slide 7 (Backlog): element with class bg-green-100 and text "done" exists (done badge)');

    if (jsErrors.length > 0) allErrors.push({ name: 'backlog-slide', errors: jsErrors });
    await ctx.close();
  }

  // ── Assertions 7-9: Sivania Light theme switch ─────────────────────────────
  console.log('\n=== Assertions 7–9: Sivania Light theme switch ===');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/#/uimockup`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // Assertion 7: Switch to Sivania theme — find palette dropdown button
    // The theme picker is the LanguageDropdown with Palette icon — it shows the current theme label
    // First, find and click the button that shows the current theme label (Aurora/Sivania/Noir)
    const themePickerOpened = await page.evaluate(() => {
      // Find button in top-right fixed cluster that shows a theme label
      const themeLabels = ['Aurora', 'Sivania', 'Sivania Light', 'Noir'];
      const buttons = Array.from(document.querySelectorAll('button'));
      const themeBtn = buttons.find(btn => {
        const text = btn.textContent.trim();
        return themeLabels.some(label => text.includes(label));
      });
      if (themeBtn) {
        themeBtn.click();
        return true;
      }
      return false;
    });
    console.log(`  Theme picker button found and clicked: ${themePickerOpened}`);
    assert(themePickerOpened, 'Theme picker button (shows Aurora/Sivania/Noir label) was found and clicked');

    await page.waitForTimeout(400);

    // Click "Sivania Light" option in the dropdown
    const sivaniaBtnClicked = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const sivBtn = buttons.find(btn => btn.textContent.trim().includes('Sivania Light'));
      if (sivBtn) {
        sivBtn.click();
        return true;
      }
      return false;
    });
    console.log(`  "Sivania Light" option clicked: ${sivaniaBtnClicked}`);
    assert(sivaniaBtnClicked, '"Sivania Light" option was found in dropdown and clicked');

    await page.waitForTimeout(600);

    // Screenshot after theme switch
    await page.screenshot({ path: `${OUT}/sivania-light-theme.png` });
    console.log(`  Screenshot: e2e-screenshots/sprint-48/sivania-light-theme.png`);

    // Assertion 8: document.documentElement.dataset.theme === 'sivania'
    const themeApplied = await page.evaluate(() => {
      return document.documentElement.dataset.theme;
    });
    console.log(`  document.documentElement.dataset.theme = "${themeApplied}"`);
    assert(themeApplied === 'sivania', `After theme switch: data-theme="sivania" on <html> (got: "${themeApplied}")`);

    // Assertion 9: page background is NOT near-black (Sivania has light bg)
    const bgColor = await page.evaluate(() => {
      // Get the computed background color of the presentation container
      const container = document.querySelector('[data-theme]');
      if (container) {
        return window.getComputedStyle(container).backgroundColor;
      }
      return window.getComputedStyle(document.documentElement).backgroundColor;
    });
    console.log(`  Root element backgroundColor: "${bgColor}"`);
    // rgb(26, 26, 26) is the near-black aurora background
    // Sivania bg is #f5f3ed which is rgb(245, 243, 237) — light parchment
    const isNotNearBlack = bgColor !== 'rgb(26, 26, 26)' && bgColor !== 'rgb(15, 23, 42)';
    assert(isNotNearBlack, `Page background is NOT near-black (Sivania Light should be parchment). Got: "${bgColor}"`);

    if (jsErrors.length > 0) allErrors.push({ name: 'sivania-theme', errors: jsErrors });
    await ctx.close();
  }

  // ── Assertion 10: Slide 6, scroll down — activity-feed "AD-471 moved to Done" ──
  console.log('\n=== Assertion 10: Slide 6 activity-feed — "AD-471 moved to Done" ===');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/#/uimockup`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Navigate to slide 6 (Dashboard — has activity-feed)
    await page.evaluate(() => {
      const dots = document.querySelectorAll('button[aria-label]');
      const slide6 = Array.from(dots).find(b => b.getAttribute('aria-label') === 'Slide 6');
      if (slide6) slide6.click();
    });
    await page.waitForTimeout(1500);

    // Scroll down in the inner browser frame to reveal activity-feed
    await page.evaluate(() => {
      const inner = document.querySelector('.bg-slate-50.rounded-b-xl');
      if (inner) {
        inner.scrollTop = 300;
        inner.dispatchEvent(new Event('scroll'));
      }
    });
    await page.waitForTimeout(1000);

    // Check activity-feed text "AD-471 moved to Done"
    const hasActivityText = await page.evaluate(() => {
      return document.body.innerHTML.includes('AD-471 moved to Done');
    });
    assert(hasActivityText, 'Slide 6 (Dashboard): "AD-471 moved to Done" text exists in activity-feed after scroll');

    // Screenshot of activity feed
    await page.screenshot({ path: `${OUT}/slide6-activity-feed.png` });
    console.log(`  Screenshot: e2e-screenshots/sprint-48/slide6-activity-feed.png`);

    if (jsErrors.length > 0) allErrors.push({ name: 'activity-feed', errors: jsErrors });
    await ctx.close();
  }

  // ── Assertion 11: Zero JS console errors on all 5 routes ──────────────────
  console.log('\n=== Assertion 11: Zero JS errors on all routes ===');
  {
    for (const route of ALL_ROUTES) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      const jsErrors = [];
      page.on('pageerror', e => jsErrors.push(e.message));

      await page.goto(`${BASE}/${route}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1200);

      assert(
        jsErrors.length === 0,
        `[${route}] zero JS console errors (found: ${jsErrors.length}${jsErrors.length ? ': ' + jsErrors.slice(0, 2).join('; ') : ''})`
      );

      if (jsErrors.length > 0) allErrors.push({ name: route, errors: jsErrors });
      await ctx.close();
    }
  }

  await browser.close();

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log('\n=== Sprint 48 E2E Summary ===');
  const screenshots = fs.readdirSync(OUT);
  console.log(`Screenshots: ${screenshots.length} files in e2e-screenshots/sprint-48/`);
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
