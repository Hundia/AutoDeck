const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:4173/AutoDeck';
const OUT = path.join(__dirname, '..', 'public', 'thumbnails');
fs.mkdirSync(OUT, { recursive: true });

const PRESENTATIONS = [
  { route: '#/meta',         name: 'meta' },
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

  for (const { route, name } of PRESENTATIONS) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();

    await page.goto(`${BASE}/${route}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: false });
    console.log(`✅ ${name}.png captured`);

    await ctx.close();
  }

  await browser.close();
  console.log(`\n✅ All ${PRESENTATIONS.length} thumbnails captured to public/thumbnails/`);
}

run().catch(e => { console.error(e); process.exit(1); });
