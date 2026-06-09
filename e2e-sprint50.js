/**
 * e2e-sprint50.js — Sprint 50 Visual + RTL QA
 *
 * Test cases covered:
 *   TC-UI-16  build passes (precondition — dist/ exists)
 *   TC-UI-17  RTL visual: dir="rtl" on slide root for Hebrew deck
 *   TC-UI-18  RTL keyboard nav: ArrowLeft advances slides in Hebrew deck
 *   TC-UI-19  Content fidelity: expected Hebrew headlines render on each slide
 *
 * The script spawns `vite preview` to serve dist/, navigates to
 * http://localhost:4173/AutoDeck/#/demo-to-prod, screenshots all 19 slides,
 * then kills the server in a finally block.
 *
 * Animation timing notes:
 *   QuoteSlide typewriter: 0.5 + chars*0.03s per char → ~2s for 50 chars;
 *     bullet points start after last char → up to 3.5s total for 4 bullets.
 *   FinalSlide word-by-word: 0.4 + words*0.15s → ~2s for 8 words.
 *   We wait up to 5s for expected text to appear (waitForFunction with timeout).
 *
 * Note on scrollWidth check: the root div is overflow-x-hidden so this check
 * is a coarse gate (it won't catch mis-aligned text or bad wrapping inside
 * fixed-width cards). Visual inspection of the PNG files is the primary
 * defect detector for those issues.
 */

const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:4173/AutoDeck';
const OUT = path.join(__dirname, 'e2e-screenshots/sprint-50');
fs.mkdirSync(OUT, { recursive: true });

// Expected Hebrew headlines per slide (index 0-based), 19-slide deck.
// Used to assert content fidelity (TC-UI-19) and disambiguate nav (TC-UI-18).
// Slide 19 is the FinalSlide: tagline words render in separate inline-block spans,
// so innerText concatenates them WITHOUT spaces. We check unique word "הנדסית".
const EXPECTED_HEADLINES = [
  'מהדמו לפרודקשן',                      // 01 — title
  'פתיח אישי',                           // 02 — quote (intro)
  'מי אני ומה הובלתי',                    // 03 — content↓ (Q1 identity + axes)
  'הציר השני — מוצר',                     // 04 — content↓ (Q1 product axis)
  'AI במוצר = הנדסת תוכנה',              // 05 — diagram (Q1 model→engineering→customer)
  'האתגר הניהולי הגדול ביותר',           // 06 — quote (Q2)
  'מאזור הנוחות — בלי פאניקה',           // 07 — content↓ (Q2)
  'פריצת הדרך — המסע',                   // 08 — timeline↓ (Q3)
  'ואז קרו שלושה דברים',                 // 09 — content↓ (Q3)
  'העצה הניהולית החשובה ביותר',          // 10 — quote (Q4)
  'השאלות הקשות שמנהל חייב לשאול',        // 11 — content↓ (Q4)
  'AI הזיז את מרכז הכובד',               // 12 — content↓ (Q4 example)
  'מה העובדים מבינים כשהמנהל באמת באירוע', // 13 — content↓ (Q4)
  'ממה להימנע',                          // 14 — content↓ (Q5)
  'אשליית ההתקדמות',                     // 15 — comparison (Q5)
  'מה הייתי עושה אחרת',                  // 16 — content↓ (Q6)
  'סיכון מידע מול סיכון למידה',          // 17 — comparison (Q6)
  'בפועל — מה הייתי עושה אחרת',          // 18 — content↓ (Q6)
  'הנדסית',                              // 19 — final tagline (unique word)
];

// For QuoteSlides (0-based indices 1, 5, 9 → slides 02, 06, 10).
// Typewriter + bullet stagger; we wait for the last bullet before screenshotting.
const QUOTE_LAST_BULLETS = {
  1: 'ובאופן שבו מהנדסים מבינים את המקצוע שלהם',  // slide 02
  5: 'מה הערך שלי כמהנדס',                         // slide 06
  9: 'אל תעשו outsourcing להבנה שלכם',             // slide 10
};

function startServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('npx', ['vite', 'preview', '--port', '4173'], {
      cwd: __dirname,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let ready = false;
    const onData = (data) => {
      const text = data.toString();
      if (!ready && (text.includes('4173') || text.includes('Local:'))) {
        ready = true;
        resolve(server);
      }
    };
    server.stdout.on('data', onData);
    server.stderr.on('data', onData);
    server.on('error', reject);
    server.on('exit', (code) => {
      if (!ready) reject(new Error(`Server exited with code ${code} before becoming ready`));
    });
    // Safety timeout — assume ready after 3s
    setTimeout(() => {
      if (!ready) {
        ready = true;
        resolve(server);
      }
    }, 3000);
  });
}

// Wait for text to appear in the page body, with a generous timeout for animations
async function waitForText(page, text, timeoutMs = 5000) {
  try {
    await page.waitForFunction(
      (t) => document.body.innerText.includes(t),
      text,
      { timeout: timeoutMs }
    );
    return true;
  } catch {
    return false;
  }
}

async function run() {
  let server;
  let passed = 0;
  let failed = 0;
  const failures = [];

  function assert(condition, label) {
    if (condition) {
      console.log(`  PASS: ${label}`);
      passed++;
    } else {
      console.error(`  FAIL: ${label}`);
      failures.push(label);
      failed++;
    }
  }

  try {
    // ── Start vite preview server ─────────────────────────────────────────────
    console.log('\nStarting vite preview server on port 4173...');
    server = await startServer();
    // Give it a moment to fully bind
    await new Promise(r => setTimeout(r, 1500));
    console.log('Server ready.');

    const browser = await chromium.launch({ headless: true });

    // ── Main RTL visual + keyboard navigation test ────────────────────────────
    console.log('\n=== RTL Visual + Keyboard Navigation (TC-UI-17, TC-UI-18, TC-UI-19) ===');
    {
      const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        locale: 'he-IL',
      });
      const page = await ctx.newPage();
      const jsErrors = [];
      page.on('pageerror', e => jsErrors.push(e.message));

      await page.goto(`${BASE}/#/demo-to-prod`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000); // let initial animations settle

      // ── TC-UI-17: dir="rtl" on slide root ──────────────────────────────────
      console.log('\n--- TC-UI-17: dir="rtl" on slide root ---');
      const rootDir = await page.evaluate(() => {
        const root = document.querySelector('[dir]');
        return root ? root.getAttribute('dir') : null;
      });
      console.log(`  Root dir attribute: "${rootDir}"`);
      assert(rootDir === 'rtl', `TC-UI-17: Slide root has dir="rtl" (got: "${rootDir}")`);

      // ── TC-UI-18 + TC-UI-19: Navigate through all 19 slides ────────────────
      console.log('\n--- TC-UI-18 + TC-UI-19: Per-slide screenshots + headline + nav ---');

      for (let i = 0; i < 19; i++) {
        const slideNum = String(i + 1).padStart(2, '0');
        const expectedText = EXPECTED_HEADLINES[i];
        const screenshotPath = `${OUT}/slide-${slideNum}.png`;

        // Wait for the expected text to appear (handles animation delays)
        const textAppeared = await waitForText(page, expectedText, 5000);
        if (!textAppeared) {
          // Take screenshot even on failure for visual diagnosis
          await page.screenshot({ path: screenshotPath });
        }

        // TC-UI-19: Check expected headline is present in the DOM
        const headlineFound = await page.evaluate((text) => {
          return document.body.innerText.includes(text);
        }, expectedText);
        assert(headlineFound, `TC-UI-19: Slide ${slideNum} headline visible: "${expectedText}"`);

        // Wait for ALL Framer Motion animations to complete before screenshotting:
        // - QuoteSlide typewriter: 0.5 + chars*0.03s per char + staggered bullets ≈ 3.5s total
        // - FinalSlide word-by-word: ≈ 2s total
        // - Other slides: card stagger + slide entry ≈ 1s total
        // We use a fixed wait per slide type rather than waitForFunction (characters are in DOM
        // from the start but opacity=0, so innerText finds them immediately regardless of animation).
        if (QUOTE_LAST_BULLETS[i]) {
          // QuoteSlide: wait for full typewriter + bullet animation cycle
          await page.waitForTimeout(4000);
        } else if (i === 18) {
          // FinalSlide: word-by-word animation
          await page.waitForTimeout(2500);
        } else {
          // Other slides: slide entry + content stagger.
          // ComparisonSlide last item: delay 0.5 + 0.15 + 0.3 = 0.95s + ~0.3s duration = 1.25s.
          // Callout: delay 1.0 + ~0.3s = 1.3s.
          // ContentSlide 4 cards: delay 0.3+3*0.15=0.75s + 0.5s duration = 1.25s.
          // Use 2000ms to ensure all staggered items are fully visible in screenshots.
          await page.waitForTimeout(2000);
        }

        // Coarse overflow check on root element (overflow-x-hidden so this is
        // a gate against catastrophic overflow only; visual inspection covers
        // text misalignment and wrapping issues)
        const overflowOk = await page.evaluate(() => {
          const root = document.querySelector('[dir]');
          if (!root) return true;
          return root.scrollWidth <= root.clientWidth + 20; // 20px tolerance
        });
        assert(overflowOk, `TC-UI-17: Slide ${slideNum} no catastrophic horizontal overflow (scrollWidth <= clientWidth+20)`);

        // Headline bounding box check — must be within viewport bounds
        const headlineBounds = await page.evaluate((text) => {
          const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
          let node;
          while ((node = walker.nextNode())) {
            if (node.textContent && node.textContent.includes(text)) {
              const el = node.parentElement;
              if (!el) continue;
              const rect = el.getBoundingClientRect();
              if (rect.width < 5 || rect.height < 5) continue;
              return {
                left: rect.left,
                right: rect.right,
                top: rect.top,
                bottom: rect.bottom,
                visible: rect.right > 0 && rect.left < window.innerWidth,
              };
            }
          }
          return null;
        }, expectedText);

        if (headlineBounds) {
          assert(
            headlineBounds.visible,
            `TC-UI-17: Slide ${slideNum} headline is within viewport bounds (left=${headlineBounds.left.toFixed(0)}, right=${headlineBounds.right.toFixed(0)})`
          );
        }

        // Screenshot
        await page.screenshot({ path: screenshotPath });
        console.log(`  Screenshot: slide-${slideNum}.png`);

        // TC-UI-18: Advance to next slide using RTL key (ArrowLeft = next in RTL)
        // But don't press after the last slide
        if (i < 18) {
          await page.keyboard.press('ArrowLeft');
          // Allow slide transition animation to complete
          await page.waitForTimeout(500);
        }
      }

      // ── TC-UI-18: Dedicated keyboard nav assertion ─────────────────────────
      // Open a fresh context (not reusing the post-loop page which is at slide 19)
      // to guarantee we start at slide 1 with clean state.
      console.log('\n--- TC-UI-18: Dedicated ArrowLeft RTL nav assertion ---');
      await ctx.close(); // close the loop context cleanly

      const navCtx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'he-IL' });
      const navPage = await navCtx.newPage();
      await navPage.goto(`${BASE}/#/demo-to-prod`);
      await navPage.waitForLoadState('networkidle');
      await navPage.waitForTimeout(2000); // let React mount and register keyboard listeners

      // Confirm we start at slide 1 via counter (unique: shows "/ 1" or "1 /")
      const slideCounterText = await navPage.evaluate(() => {
        const counter = Array.from(document.querySelectorAll('.fixed')).find(
          el => el.textContent.trim().match(/^\d+ \/ \d+$/)
        );
        return counter ? counter.textContent.trim() : null;
      });
      console.log(`  Slide counter: "${slideCounterText}"`);
      // Counter format is "currentSlide / total" e.g. "1 / 19"
      assert(slideCounterText === '1 / 19', `TC-UI-18: After fresh load, counter shows "1 / 19" (got: "${slideCounterText}")`);

      // Also verify title-specific text only on slide 1: presenter name
      const presenterVisible = await navPage.evaluate(() => document.body.innerText.includes('אלי חונדיא'));
      assert(presenterVisible, 'TC-UI-18: Slide 1 presenter name "אלי חונדיא" visible (confirms slide 1)');

      await navPage.keyboard.press('ArrowLeft');
      // Slide 2 is a QuoteSlide — title appears at 0.5s delay
      const slide2TitleFound = await waitForText(navPage, 'פתיח אישי', 4000);
      assert(slide2TitleFound, 'TC-UI-18: ArrowLeft advanced to slide 2 (פתיח אישי visible)');

      // Also confirm ArrowRight goes back (prev in RTL)
      await navPage.keyboard.press('ArrowRight');
      // Back to slide 1 — presenter name is unique to slide 1
      await navPage.waitForTimeout(1000);
      const backPresenter = await navPage.evaluate(() => document.body.innerText.includes('אלי חונדיא'));
      assert(backPresenter, 'TC-UI-18: ArrowRight in RTL goes back to slide 1 (presenter name visible)');

      // ── JS error check ─────────────────────────────────────────────────────
      // jsErrors was collected from the main loop context (ctx) before it was closed
      assert(jsErrors.length === 0, `Zero JS errors on #/demo-to-prod (found: ${jsErrors.length}${jsErrors.length ? ': ' + jsErrors.slice(0, 2).join('; ') : ''})`);

      await navCtx.close();
    }

    // ── Slide 8 (Timeline, scrollable): extra scroll screenshot ──────────────
    console.log('\n=== Slide 8 Timeline scroll coverage ===');
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'he-IL' });
      const page = await ctx.newPage();
      await page.goto(`${BASE}/#/demo-to-prod`);
      await page.waitForLoadState('networkidle');
      await waitForText(page, 'מהדמו לפרודקשן', 3000);
      await page.waitForTimeout(500);

      // Navigate to slide 8 (7 ArrowLeft presses from slide 1)
      for (let i = 0; i < 7; i++) {
        await page.keyboard.press('ArrowLeft');
        await page.waitForTimeout(500);
      }
      // Wait for timeline headline
      await waitForText(page, 'פריצת הדרך', 3000);
      await page.waitForTimeout(500);

      const timelineHeadline = await page.evaluate(() => document.body.innerText.includes('פריצת הדרך'));
      assert(timelineHeadline, 'Slide 08 timeline headline visible before scroll');
      await page.screenshot({ path: `${OUT}/slide-08-timeline-top.png` });

      // Scroll down in the root scroll container (scrollable slide)
      await page.evaluate(() => {
        const root = document.querySelector('[dir]');
        if (root) root.scrollTop = 600;
      });
      await page.waitForTimeout(500);
      await page.screenshot({ path: `${OUT}/slide-08-timeline-scrolled.png` });
      console.log('  Timeline scroll screenshots captured (slide-08-timeline-top.png, slide-08-timeline-scrolled.png)');

      await ctx.close();
    }

    await browser.close();

  } finally {
    if (server) {
      server.kill('SIGTERM');
      console.log('\nPreview server stopped.');
    }
  }

  // ── Summary ─────────────────────────────────────────────────────────────────
  console.log('\n=== Sprint 50 E2E Summary ===');
  const screenshots = fs.readdirSync(OUT).sort();
  console.log(`Screenshots: ${screenshots.length} files in e2e-screenshots/sprint-50/`);
  screenshots.forEach(f => console.log(`  - ${f}`));
  console.log(`\nAssertions: ${passed} passed, ${failed} failed`);

  if (failures.length > 0) {
    console.log('\nFailed assertions:');
    failures.forEach(f => console.log(`  FAIL: ${f}`));
    console.error(`\n${failed} assertion(s) failed`);
    process.exit(1);
  } else {
    console.log('\nAll assertions passed');
  }
}

run().catch(e => { console.error(e); process.exit(1); });
