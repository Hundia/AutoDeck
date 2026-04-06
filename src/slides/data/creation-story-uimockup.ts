import type { CreationStory } from '../../engine/types';

export const uiMockupCreationStory: CreationStory = {
  totalPrompts: 6,
  totalMinutes: 27,
  prompts: [
    {
      label: 'Design Brief',
      prompt: 'Read SKILL.md and create a 10-slide UIMockup deck for the AutoDeck Dashboard design system. Show wireframes for the main dashboard, backlog screen, and a user flow. Use constellation background.',
      framework: 'Claude Code',
    },
    {
      label: 'Dashboard Mockup',
      prompt: 'Create a browser-mode mockup slide for the main dashboard. Blocks: navbar (AutoDeck brand), hero (Sprint 40 in progress), card-grid (4 stat cards), chart-bar (velocity chart), sidebar (navigation). URL: app.autodeck.io/dashboard.',
      framework: 'Claude Code',
    },
    {
      label: 'Backlog Screen',
      prompt: 'Add a browser-mode mockup for the backlog page. Blocks: navbar, hero (Sprint Backlog title), table (ticket list), form (new ticket form). URL: app.autodeck.io/backlog.',
      framework: 'Claude Code',
    },
    {
      label: 'User Flow Mockup',
      prompt: 'Create a flow-mode mockup with 3 frames showing the slide creation flow: Frame 1 (SKILL.md prompt input), Frame 2 (generated TypeScript preview), Frame 3 (live preview with deploy button). Each frame should use relevant block types.',
      framework: 'Cursor',
    },
    {
      label: 'Design Token Stats',
      prompt: 'Add a stats slide: 8 background effects, 11 slide types, 3 supported languages, 0 design tool dependencies. Comparison: left = "Old workflow" (Figma export, manual HTML), right = "AutoDeck" (TypeScript, auto-animated, deploy on push).',
      framework: 'Claude Code',
    },
    {
      label: 'Hebrew Translation',
      prompt: 'Translate the narrative slides to Hebrew. Keep URL and block label fields in English — those are interface strings, not translated content.',
      framework: 'Claude Code',
    },
  ],
  decisions: [
    { slide: 1, decision: 'Title badge "Design System" scopes the deck — audience is designers and frontend leads.' },
    { slide: 2, decision: 'Dashboard mockup first — establishes the visual product before explaining the workflow.' },
    { slide: 3, decision: 'browser-mode chosen over flow-mode for dashboard/backlog screens — mimics real browser chrome.' },
    { slide: 4, decision: 'Backlog screen included to show the data model side of the product, not just the presentation view.' },
    { slide: 5, decision: 'flow-mode for the slide creation flow — 3-step funnel fits the frame layout perfectly.' },
    { slide: 6, decision: 'Stats slide placed mid-deck to re-anchor after wireframes — numbers give context to the visuals.' },
    { slide: 7, decision: 'Comparison slide (old vs AutoDeck) placed right after stats to translate numbers into workflow change.' },
    { slide: 8, decision: 'Quote slide asks "What if design tokens were just TypeScript?" — challenges the Figma-first assumption.' },
    { slide: 9, decision: 'Timeline shows the DS sprint history — connects the mockup to the underlying SDD process.' },
    { slide: 10, decision: 'Closing with link to SKILL.md — the call to action is to fork and build your own design deck.' },
  ],
  frameworkNotes: {
    'Claude Code': 'Generated all browser-mode mockups correctly with appropriate block types. Required explicit instruction to keep URL fields in English during Hebrew translation.',
    'Cursor': 'Used for the flow-mode mockup (prompt 4). Cursor\'s multi-file context helped it understand the MockupFrame type without referencing SKILL.md explicitly.',
  },
};
