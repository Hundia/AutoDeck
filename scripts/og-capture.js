const { chromium } = require('playwright');
const path = require('path');

const BASE = 'http://localhost:4173/AutoDeck';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 } });
  const page = await ctx.newPage();

  await page.goto(`${BASE}/#/meta`);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  const out = path.join(__dirname, '..', 'public', 'og-image.png');
  await page.screenshot({ path: out, fullPage: false });
  console.log('✅ og-image.png captured to public/');

  await browser.close();
}

run().catch(e => { console.error(e); process.exit(1); });
