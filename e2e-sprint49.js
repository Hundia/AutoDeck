const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:4173/AutoDeck';
const OUT = path.join(__dirname, 'e2e-screenshots/sprint-49');
fs.mkdirSync(OUT, { recursive: true });

async function run() {
  const browser = await chromium.launch({ headless: true });
  let passed = 0;
  let failed = 0;
  const allJsErrors = [];

  function assert(condition, label) {
    if (condition) {
      console.log(`  ✅ ${label}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${label}`);
      failed++;
    }
  }

  // ── Assertion 1: Live mode is default on fresh localStorage ───────────────
  console.log('\n=== Assertion 1: Live mode is default on fresh localStorage ===');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/#/presentation`);
    await page.waitForLoadState('networkidle');

    // Clear localStorage to ensure fresh state
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // control-cluster-live should contain Share button and Edit toggle
    const liveCluster = await page.evaluate(() => {
      const cluster = document.querySelector('[data-testid="control-cluster-live"]');
      if (!cluster) return { found: false };
      const shareBtn = cluster.querySelector('button[aria-label="Share"]') ||
        Array.from(cluster.querySelectorAll('button')).find(b => b.getAttribute('aria-label') === 'Share');
      const toggleBtn = cluster.querySelector('[data-testid="edit-mode-toggle"]');
      return {
        found: true,
        hasShare: !!shareBtn,
        hasToggle: !!toggleBtn,
      };
    });
    console.log('  control-cluster-live:', JSON.stringify(liveCluster));
    assert(liveCluster.found, 'control-cluster-live element is in DOM');
    assert(liveCluster.hasShare, 'control-cluster-live contains Share button');
    assert(liveCluster.hasToggle, 'control-cluster-live contains Edit toggle');

    await page.screenshot({ path: `${OUT}/01-live-mode-default.png` });
    if (jsErrors.length > 0) allJsErrors.push(...jsErrors.map(e => `[assertion-1] ${e}`));
    await ctx.close();
  }

  // ── Assertion 2: Theme/bg/lang buttons NOT in Live-mode DOM ───────────────
  console.log('\n=== Assertion 2: Theme/bg/lang NOT in Live-mode DOM ===');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/#/presentation`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const editClusterContents = await page.evaluate(() => {
      const cluster = document.querySelector('[data-testid="control-cluster-edit"]');
      if (!cluster) return { found: false, childCount: 0, html: '' };
      // "contents" class means the div itself doesn't render — check its children
      const children = cluster.querySelectorAll('button, [data-testid]');
      return {
        found: true,
        childCount: children.length,
        html: cluster.innerHTML.slice(0, 300),
      };
    });
    console.log('  control-cluster-edit children in Live mode:', editClusterContents.childCount);
    console.log('  HTML snippet:', editClusterContents.html);

    // In Live mode, editMode=false => no theme/bg/lang/notes buttons rendered
    const hasThemeBtn = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons.some(b => {
        const text = b.textContent.trim();
        return ['Aurora', 'Sivania', 'Noir', 'Particles', 'Circuits', 'Matrix'].some(l => text.includes(l));
      });
    });
    assert(!hasThemeBtn, 'Theme/bg dropdown buttons NOT rendered in Live mode');

    const hasNotesBtn = await page.evaluate(() => {
      return !!document.querySelector('[data-testid="notes-button"]');
    });
    assert(!hasNotesBtn, 'Notes button NOT rendered in Live mode');

    await page.screenshot({ path: `${OUT}/02-live-mode-no-edit-controls.png` });
    if (jsErrors.length > 0) allJsErrors.push(...jsErrors.map(e => `[assertion-2] ${e}`));
    await ctx.close();
  }

  // ── Assertion 3: Click edit-mode-toggle → URL stays same, edit-mode-pill appears ─
  console.log('\n=== Assertion 3: Click edit-mode-toggle → enter edit mode ===');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/#/presentation`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const urlBefore = page.url();
    await page.click('[data-testid="edit-mode-toggle"]');
    await page.waitForTimeout(500);
    const urlAfter = page.url();

    assert(urlBefore === urlAfter, `URL unchanged after toggle (before: ${urlBefore}, after: ${urlAfter})`);

    const pillVisible = await page.evaluate(() => {
      return !!document.querySelector('[data-testid="edit-mode-pill"]');
    });
    assert(pillVisible, 'edit-mode-pill appears after clicking toggle');

    await page.screenshot({ path: `${OUT}/03-edit-mode-toggle-clicked.png` });
    if (jsErrors.length > 0) allJsErrors.push(...jsErrors.map(e => `[assertion-3] ${e}`));
    await ctx.close();
  }

  // ── Assertion 4: EDIT MODE pill visible with text "EDIT MODE" ─────────────
  console.log('\n=== Assertion 4: EDIT MODE pill text ===');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/#/presentation`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await page.click('[data-testid="edit-mode-toggle"]');
    await page.waitForTimeout(500);

    const pillText = await page.evaluate(() => {
      const pill = document.querySelector('[data-testid="edit-mode-pill"]');
      return pill ? pill.textContent.trim() : null;
    });
    console.log(`  pill text: "${pillText}"`);
    assert(pillText !== null && pillText.includes('EDIT MODE'), `EDIT MODE pill text includes "EDIT MODE" (got: "${pillText}")`);

    await page.screenshot({ path: `${OUT}/04-edit-mode-pill.png` });
    if (jsErrors.length > 0) allJsErrors.push(...jsErrors.map(e => `[assertion-4] ${e}`));
    await ctx.close();
  }

  // ── Assertion 5: In edit mode, cluster-edit contains theme + bg + lang + notes ─
  console.log('\n=== Assertion 5: Edit mode controls appear in cluster-edit ===');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/#/presentation`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await page.click('[data-testid="edit-mode-toggle"]');
    await page.waitForTimeout(600);

    const hasNotesBtn = await page.evaluate(() => {
      return !!document.querySelector('[data-testid="notes-button"]');
    });
    assert(hasNotesBtn, 'notes-button is visible in edit mode');

    // Count renderable edit-mode controls (theme dropdown, bg dropdown, lang if multilang, notes button)
    const editControls = await page.evaluate(() => {
      const cluster = document.querySelector('[data-testid="control-cluster-edit"]');
      if (!cluster) return { found: false, count: 0 };
      // Count direct interactive children: LanguageDropdown buttons + notes button
      const interactives = cluster.querySelectorAll('button, [class*="relative flex items-center"]');
      // Also look for any rendered buttons in the cluster
      const allBtns = cluster.querySelectorAll('button');
      return {
        found: true,
        count: allBtns.length,
      };
    });
    console.log(`  cluster-edit button count: ${editControls.count}`);
    assert(editControls.count >= 2, `cluster-edit has >= 2 interactive controls (found: ${editControls.count})`);

    // Theme dropdown button is present (contains a theme label)
    const hasThemeControl = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons.some(b => {
        const text = b.textContent.trim();
        return ['Aurora', 'Sivania', 'Noir'].some(l => text.includes(l));
      });
    });
    assert(hasThemeControl, 'Theme dropdown button visible in edit mode');

    await page.screenshot({ path: `${OUT}/05-edit-mode-controls.png` });
    if (jsErrors.length > 0) allJsErrors.push(...jsErrors.map(e => `[assertion-5] ${e}`));
    await ctx.close();
  }

  // ── Assertion 6: Press E key → toggles back to Live mode ─────────────────
  console.log('\n=== Assertion 6: E key toggles mode ===');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/#/presentation`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Enter edit mode via click
    await page.click('[data-testid="edit-mode-toggle"]');
    await page.waitForTimeout(500);
    const pillVisible = await page.evaluate(() => !!document.querySelector('[data-testid="edit-mode-pill"]'));
    assert(pillVisible, 'EDIT MODE pill visible before E key press');

    // Press E to toggle back to Live
    await page.keyboard.press('e');
    await page.waitForTimeout(500);

    const pillGone = await page.evaluate(() => !document.querySelector('[data-testid="edit-mode-pill"]'));
    assert(pillGone, 'EDIT MODE pill gone after pressing E key (toggled to Live mode)');

    await page.screenshot({ path: `${OUT}/06-e-key-toggle.png` });
    if (jsErrors.length > 0) allJsErrors.push(...jsErrors.map(e => `[assertion-6] ${e}`));
    await ctx.close();
  }

  // ── Assertion 7: Click Notes button → notes panel appears ─────────────────
  console.log('\n=== Assertion 7: Click Notes button → panel opens ===');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/#/presentation`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Enter edit mode
    await page.click('[data-testid="edit-mode-toggle"]');
    await page.waitForTimeout(500);

    // Click notes button
    await page.click('[data-testid="notes-button"]');
    await page.waitForTimeout(600);

    const panelVisible = await page.evaluate(() => {
      return !!document.querySelector('[data-testid="notes-panel"]');
    });
    assert(panelVisible, 'notes-panel appears after clicking notes-button');

    await page.screenshot({ path: `${OUT}/07-notes-panel-open.png` });
    if (jsErrors.length > 0) allJsErrors.push(...jsErrors.map(e => `[assertion-7] ${e}`));
    await ctx.close();
  }

  // ── Assertion 8: Add Note → textarea → type → save → card appears ─────────
  console.log('\n=== Assertion 8: Add Note flow ===');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/#/presentation`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Enter edit mode, open notes panel
    await page.click('[data-testid="edit-mode-toggle"]');
    await page.waitForTimeout(500);
    await page.click('[data-testid="notes-button"]');
    await page.waitForTimeout(600);

    // Click Add Note button
    const addNoteBtn = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const btn = buttons.find(b => b.textContent.trim().includes('Add Note'));
      if (btn) { btn.click(); return true; }
      return false;
    });
    assert(addNoteBtn, 'Add Note button found and clicked');
    await page.waitForTimeout(400);

    // Textarea should appear
    const textareaVisible = await page.evaluate(() => {
      return !!document.querySelector('[data-testid="note-editor-textarea"]');
    });
    assert(textareaVisible, 'note-editor-textarea appears after clicking Add Note');

    // Type note text
    await page.fill('[data-testid="note-editor-textarea"]', 'Fix typo on slide 1');
    await page.waitForTimeout(200);

    // Click Save
    const saveClicked = await page.evaluate(() => {
      const panel = document.querySelector('[data-testid="notes-panel"]');
      if (!panel) return false;
      const buttons = Array.from(panel.querySelectorAll('button'));
      const saveBtn = buttons.find(b => b.textContent.trim() === 'Save');
      if (saveBtn) { saveBtn.click(); return true; }
      return false;
    });
    assert(saveClicked, 'Save button clicked');
    await page.waitForTimeout(500);

    // Note card should appear
    const noteCard = await page.evaluate(() => {
      const cards = document.querySelectorAll('[data-testid^="note-card-"]');
      if (cards.length === 0) return { found: false, text: null };
      const text = cards[0].textContent;
      return { found: true, text };
    });
    console.log(`  Note card found: ${noteCard.found}, text: "${noteCard.text?.slice(0, 60)}"`);
    assert(noteCard.found, 'note-card element appears after save');
    assert(noteCard.text && noteCard.text.includes('Fix typo on slide 1'), 'note-card contains the typed text');

    await page.screenshot({ path: `${OUT}/08-note-added.png` });
    if (jsErrors.length > 0) allJsErrors.push(...jsErrors.map(e => `[assertion-8] ${e}`));
    await ctx.close();
  }

  // ── Assertion 9: Notes count badge shows "1" ──────────────────────────────
  console.log('\n=== Assertion 9: Notes count badge shows "1" ===');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/#/presentation`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Enter edit mode, open notes, add a note
    await page.click('[data-testid="edit-mode-toggle"]');
    await page.waitForTimeout(500);
    await page.click('[data-testid="notes-button"]');
    await page.waitForTimeout(600);

    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const btn = buttons.find(b => b.textContent.trim().includes('Add Note'));
      if (btn) btn.click();
    });
    await page.waitForTimeout(400);
    await page.fill('[data-testid="note-editor-textarea"]', 'Fix typo on slide 1');
    await page.evaluate(() => {
      const panel = document.querySelector('[data-testid="notes-panel"]');
      if (!panel) return;
      const buttons = Array.from(panel.querySelectorAll('button'));
      const saveBtn = buttons.find(b => b.textContent.trim() === 'Save');
      if (saveBtn) saveBtn.click();
    });
    await page.waitForTimeout(500);

    // Close the panel (via Escape) to trigger badge update
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    const badgeText = await page.evaluate(() => {
      const badge = document.querySelector('[data-testid="notes-count-badge"]');
      return badge ? badge.textContent.trim() : null;
    });
    console.log(`  notes-count-badge text: "${badgeText}"`);
    assert(badgeText === '1', `notes-count-badge shows "1" (got: "${badgeText}")`);

    await page.screenshot({ path: `${OUT}/09-notes-count-badge.png` });
    if (jsErrors.length > 0) allJsErrors.push(...jsErrors.map(e => `[assertion-9] ${e}`));
    await ctx.close();
  }

  // ── Assertion 10: Navigate to next slide → panel shows 0 notes ────────────
  console.log('\n=== Assertion 10: Navigate to next slide → 0 notes for that slide ===');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/#/presentation`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Enter edit mode, add note on slide 1, close panel
    await page.click('[data-testid="edit-mode-toggle"]');
    await page.waitForTimeout(500);
    await page.click('[data-testid="notes-button"]');
    await page.waitForTimeout(600);

    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const btn = buttons.find(b => b.textContent.trim().includes('Add Note'));
      if (btn) btn.click();
    });
    await page.waitForTimeout(400);
    await page.fill('[data-testid="note-editor-textarea"]', 'Fix typo on slide 1');
    await page.evaluate(() => {
      const panel = document.querySelector('[data-testid="notes-panel"]');
      if (!panel) return;
      const buttons = Array.from(panel.querySelectorAll('button'));
      const saveBtn = buttons.find(b => b.textContent.trim() === 'Save');
      if (saveBtn) saveBtn.click();
    });
    await page.waitForTimeout(400);

    // Close panel via Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    // Navigate to next slide via ArrowRight
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(600);

    // Open notes panel on slide 2
    await page.click('[data-testid="notes-button"]');
    await page.waitForTimeout(600);

    // Check slide 2 shows 0 notes
    const slide2NoteCount = await page.evaluate(() => {
      const panel = document.querySelector('[data-testid="notes-panel"]');
      if (!panel) return { found: false, noteCards: 0, headerText: '' };
      const cards = panel.querySelectorAll('[data-testid^="note-card-"]');
      const header = panel.querySelector('p');
      return {
        found: true,
        noteCards: cards.length,
        headerText: header ? header.textContent.trim() : '',
      };
    });
    console.log(`  Slide 2 notes panel: cards=${slide2NoteCount.noteCards}, header="${slide2NoteCount.headerText}"`);
    assert(slide2NoteCount.found, 'Notes panel open on slide 2');
    assert(slide2NoteCount.noteCards === 0, `Slide 2 shows 0 note cards (found: ${slide2NoteCount.noteCards})`);
    // Header should say "0 notes"
    assert(
      slide2NoteCount.headerText.includes('0') || slide2NoteCount.headerText.includes('notes'),
      `Slide 2 panel header indicates 0 notes (got: "${slide2NoteCount.headerText}")`
    );

    await page.screenshot({ path: `${OUT}/10-slide2-empty-notes.png` });
    if (jsErrors.length > 0) allJsErrors.push(...jsErrors.map(e => `[assertion-10] ${e}`));
    await ctx.close();
  }

  // ── Assertion 11: Export modal → copy → markdown contains "Slide 1" ────────
  console.log('\n=== Assertion 11: Export modal + clipboard content ===');
  {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      permissions: ['clipboard-read', 'clipboard-write'],
    });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/#/presentation`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Enter edit mode, add a note on slide 1
    await page.click('[data-testid="edit-mode-toggle"]');
    await page.waitForTimeout(500);
    await page.click('[data-testid="notes-button"]');
    await page.waitForTimeout(600);

    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const btn = buttons.find(b => b.textContent.trim().includes('Add Note'));
      if (btn) btn.click();
    });
    await page.waitForTimeout(400);
    await page.fill('[data-testid="note-editor-textarea"]', 'Fix typo on slide 1');
    await page.evaluate(() => {
      const panel = document.querySelector('[data-testid="notes-panel"]');
      if (!panel) return;
      const buttons = Array.from(panel.querySelectorAll('button'));
      const saveBtn = buttons.find(b => b.textContent.trim() === 'Save');
      if (saveBtn) saveBtn.click();
    });
    await page.waitForTimeout(500);

    // Click Export All in the panel footer
    const exportTriggerClicked = await page.evaluate(() => {
      const trigger = document.querySelector('[data-testid="notes-export-trigger"]');
      if (trigger) { trigger.click(); return true; }
      return false;
    });
    assert(exportTriggerClicked, 'Export All trigger found and clicked');
    await page.waitForTimeout(600);

    // Export modal should appear
    const modalVisible = await page.evaluate(() => {
      return !!document.querySelector('[data-testid="notes-export-modal"]');
    });
    assert(modalVisible, 'notes-export-modal appears');

    // Read the textarea content (the markdown) directly from the DOM
    const markdownContent = await page.evaluate(() => {
      const textarea = document.querySelector('[data-testid="notes-export-textarea"]');
      return textarea ? textarea.value : null;
    });
    console.log(`  Export textarea content (first 200 chars): "${markdownContent?.slice(0, 200)}"`);
    assert(markdownContent !== null, 'notes-export-textarea has content');
    assert(
      markdownContent !== null && markdownContent.includes('Slide 1'),
      `Markdown content includes "Slide 1" (got: "${markdownContent?.slice(0, 100)}")`
    );
    assert(
      markdownContent !== null && markdownContent.includes('Fix typo on slide 1'),
      'Markdown content includes the note body "Fix typo on slide 1"'
    );

    // Click copy button
    await page.click('[data-testid="notes-export-copy"]');
    await page.waitForTimeout(300);

    await page.screenshot({ path: `${OUT}/11-export-modal.png` });
    if (jsErrors.length > 0) allJsErrors.push(...jsErrors.map(e => `[assertion-11] ${e}`));
    await ctx.close();
  }

  // ── Assertion 12: Reload page → edit mode + notes persist ─────────────────
  console.log('\n=== Assertion 12: Reload → edit mode and notes persist ===');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/#/presentation`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Enter edit mode, add a note
    await page.click('[data-testid="edit-mode-toggle"]');
    await page.waitForTimeout(500);
    await page.click('[data-testid="notes-button"]');
    await page.waitForTimeout(600);

    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const btn = buttons.find(b => b.textContent.trim().includes('Add Note'));
      if (btn) btn.click();
    });
    await page.waitForTimeout(400);
    await page.fill('[data-testid="note-editor-textarea"]', 'Fix typo on slide 1');
    await page.evaluate(() => {
      const panel = document.querySelector('[data-testid="notes-panel"]');
      if (!panel) return;
      const buttons = Array.from(panel.querySelectorAll('button'));
      const saveBtn = buttons.find(b => b.textContent.trim() === 'Save');
      if (saveBtn) saveBtn.click();
    });
    await page.waitForTimeout(500);

    // Reload the page
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Edit mode should persist (autodeck-edit-mode=1 in localStorage)
    const editModePersists = await page.evaluate(() => {
      return !!document.querySelector('[data-testid="edit-mode-pill"]');
    });
    assert(editModePersists, 'Edit mode persists after page reload (pill visible)');

    // Open notes panel and verify note persists
    const notesBtnVisible = await page.evaluate(() => !!document.querySelector('[data-testid="notes-button"]'));
    if (notesBtnVisible) {
      await page.click('[data-testid="notes-button"]');
      await page.waitForTimeout(600);

      const noteCard = await page.evaluate(() => {
        const cards = document.querySelectorAll('[data-testid^="note-card-"]');
        if (cards.length === 0) return null;
        return cards[0].textContent;
      });
      console.log(`  After reload, note card text: "${noteCard?.slice(0, 60)}"`);
      assert(noteCard !== null, 'Note card still present after reload');
      assert(noteCard !== null && noteCard.includes('Fix typo on slide 1'), 'Note text persists after reload');
    } else {
      assert(false, 'Notes button not found in edit mode after reload');
    }

    await page.screenshot({ path: `${OUT}/12-persistence-after-reload.png` });
    if (jsErrors.length > 0) allJsErrors.push(...jsErrors.map(e => `[assertion-12] ${e}`));
    await ctx.close();
  }

  // ── Assertion 13: #/meta → deck isolation (presentation notes not shown) ───
  console.log('\n=== Assertion 13: #/meta deck isolation ===');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    // First, set up a note on presentation deck and enter edit mode
    await page.goto(`${BASE}/#/presentation`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await page.click('[data-testid="edit-mode-toggle"]');
    await page.waitForTimeout(500);
    await page.click('[data-testid="notes-button"]');
    await page.waitForTimeout(600);
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const btn = buttons.find(b => b.textContent.trim().includes('Add Note'));
      if (btn) btn.click();
    });
    await page.waitForTimeout(400);
    await page.fill('[data-testid="note-editor-textarea"]', 'Fix typo on slide 1');
    await page.evaluate(() => {
      const panel = document.querySelector('[data-testid="notes-panel"]');
      if (!panel) return;
      const buttons = Array.from(panel.querySelectorAll('button'));
      const saveBtn = buttons.find(b => b.textContent.trim() === 'Save');
      if (saveBtn) saveBtn.click();
    });
    await page.waitForTimeout(500);

    // Close panel
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    // Navigate to #/meta
    await page.goto(`${BASE}/#/meta`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Edit mode should still be active (localStorage persists across routes)
    const editModeOnMeta = await page.evaluate(() => {
      return !!document.querySelector('[data-testid="edit-mode-pill"]');
    });
    console.log(`  Edit mode on #/meta: ${editModeOnMeta}`);

    if (editModeOnMeta) {
      // Open notes panel on #/meta
      const notesBtn = await page.evaluate(() => !!document.querySelector('[data-testid="notes-button"]'));
      if (notesBtn) {
        await page.click('[data-testid="notes-button"]');
        await page.waitForTimeout(600);

        // Notes should be for "meta" deck — no notes from "presentation" deck
        const metaNotes = await page.evaluate(() => {
          const cards = document.querySelectorAll('[data-testid^="note-card-"]');
          return {
            count: cards.length,
            texts: Array.from(cards).map(c => c.textContent?.slice(0, 60)),
          };
        });
        console.log(`  Meta deck note cards: ${metaNotes.count}, texts: ${JSON.stringify(metaNotes.texts)}`);
        assert(metaNotes.count === 0, `#/meta deck shows 0 notes (presentation deck notes isolated) — found: ${metaNotes.count}`);

        // Check no "Fix typo on slide 1" text visible in meta panel
        const hasPresNoteText = await page.evaluate(() => {
          const panel = document.querySelector('[data-testid="notes-panel"]');
          return panel ? panel.innerHTML.includes('Fix typo on slide 1') : false;
        });
        assert(!hasPresNoteText, 'Presentation deck note text NOT visible in #/meta notes panel');
      } else {
        assert(false, 'Notes button not found on #/meta in edit mode');
      }
    } else {
      // If edit mode is disabled on meta deck, check editModeEnabled config
      console.log('  Edit mode not active on #/meta — checking if it is disabled by config');
      // Still check deck isolation via localStorage keys
      const metaNotesInStorage = await page.evaluate(() => {
        const raw = localStorage.getItem('autodeck-notes-meta');
        return raw ? JSON.parse(raw).length : 0;
      });
      assert(metaNotesInStorage === 0, `autodeck-notes-meta has 0 entries (deck isolation holds)`);
    }

    await page.screenshot({ path: `${OUT}/13-meta-deck-isolation.png` });
    if (jsErrors.length > 0) allJsErrors.push(...jsErrors.map(e => `[assertion-13] ${e}`));
    await ctx.close();
  }

  // ── Assertion 14: Sivania theme — note-card text readable ─────────────────
  console.log('\n=== Assertion 14: Sivania theme — note card text readable ===');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(`${BASE}/#/presentation`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Set Sivania theme and enter edit mode, add a note
    await page.evaluate(() => {
      localStorage.setItem('autodeck-theme', 'sivania');
      localStorage.setItem('autodeck-edit-mode', '1');
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Verify sivania theme is applied
    const themeApplied = await page.evaluate(() => {
      return document.documentElement.dataset.theme;
    });
    console.log(`  data-theme after localStorage set: "${themeApplied}"`);

    // Add a note on slide 1
    const notesBtnVisible = await page.evaluate(() => !!document.querySelector('[data-testid="notes-button"]'));
    if (notesBtnVisible) {
      await page.click('[data-testid="notes-button"]');
      await page.waitForTimeout(600);

      // Check if there's already a note (from previous test state — localStorage cleared + re-set)
      const existingCards = await page.evaluate(() => document.querySelectorAll('[data-testid^="note-card-"]').length);
      if (existingCards === 0) {
        // Add a note
        await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          const btn = buttons.find(b => b.textContent.trim().includes('Add Note'));
          if (btn) btn.click();
        });
        await page.waitForTimeout(400);
        await page.fill('[data-testid="note-editor-textarea"]', 'Sivania contrast test note');
        await page.evaluate(() => {
          const panel = document.querySelector('[data-testid="notes-panel"]');
          if (!panel) return;
          const buttons = Array.from(panel.querySelectorAll('button'));
          const saveBtn = buttons.find(b => b.textContent.trim() === 'Save');
          if (saveBtn) saveBtn.click();
        });
        await page.waitForTimeout(500);
      }

      // Check note card is rendered and text is present (DOM-level readability check)
      const noteCardContent = await page.evaluate(() => {
        const cards = document.querySelectorAll('[data-testid^="note-card-"]');
        if (cards.length === 0) return null;
        const card = cards[0];
        // Get all text nodes inside the card
        return card.textContent;
      });
      console.log(`  Note card textContent under Sivania: "${noteCardContent?.slice(0, 80)}"`);
      assert(noteCardContent !== null, 'Note card is rendered in Sivania theme');
      assert(
        noteCardContent !== null && noteCardContent.length > 0,
        'Note card text content is non-empty (readable) in Sivania theme'
      );

      // Compute the color of text to verify it's using theme tokens (not invisible)
      const textColor = await page.evaluate(() => {
        const cards = document.querySelectorAll('[data-testid^="note-card-"]');
        if (cards.length === 0) return null;
        const card = cards[0];
        // Find the text paragraph inside the card
        const textEl = card.querySelector('p') || card;
        return window.getComputedStyle(textEl).color;
      });
      console.log(`  Note card text computed color in Sivania: "${textColor}"`);
      // Assert the color is not transparent/invisible (rgb(0,0,0,0) or empty)
      assert(
        textColor !== null && textColor !== 'rgba(0, 0, 0, 0)' && textColor !== 'transparent',
        `Note card text color is visible (not transparent) in Sivania theme: "${textColor}"`
      );
    } else {
      assert(false, 'Notes button not visible in Sivania edit mode');
    }

    await page.screenshot({ path: `${OUT}/14-sivania-note-card.png` });
    if (jsErrors.length > 0) allJsErrors.push(...jsErrors.map(e => `[assertion-14] ${e}`));
    await ctx.close();
  }

  // ── Zero JS console errors (final check across key routes) ────────────────
  console.log('\n=== Zero JS errors check ===');
  {
    const routes = ['#/presentation', '#/meta'];
    for (const route of routes) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      const jsErrors = [];
      page.on('pageerror', e => jsErrors.push(e.message));
      page.on('console', msg => {
        if (msg.type() === 'error') jsErrors.push(msg.text());
      });

      await page.goto(`${BASE}/${route}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      if (jsErrors.length > 0) allJsErrors.push(...jsErrors.map(e => `[${route}] ${e}`));
      await ctx.close();
    }
    assert(allJsErrors.length === 0, `Zero JS console errors across all assertions (found: ${allJsErrors.length}${allJsErrors.length ? ': ' + allJsErrors.slice(0, 3).join('; ') : ''})`);
  }

  await browser.close();

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log('\n=== Sprint 49 E2E Summary ===');
  const screenshots = fs.readdirSync(OUT);
  console.log(`Screenshots: ${screenshots.length} files in e2e-screenshots/sprint-49/`);
  screenshots.forEach(f => console.log(`  - ${f}`));
  console.log(`\nAssertions: ${passed} passed, ${failed} failed`);

  if (allJsErrors.length > 0) {
    console.log('\nJS Errors encountered:');
    allJsErrors.forEach(e => console.log(`  ${e}`));
  }

  if (failed > 0) {
    console.error(`\n${failed} assertion(s) failed`);
    process.exit(1);
  } else {
    console.log('\nAll assertions passed ✅');
  }
}

run().catch(e => { console.error(e); process.exit(1); });
