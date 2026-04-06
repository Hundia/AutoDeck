import type { CreationStory } from '../../engine/types';

export const acmeCreationStory: CreationStory = {
  totalPrompts: 6,
  totalMinutes: 22,
  prompts: [
    {
      label: 'Initial Brief',
      prompt: 'Read SKILL.md and create a 9-slide deck for Acme Corp Q2 launch. Include a title slide, feature highlights, stats with before/after metrics, a timeline of the rollout, and a closing slide with install commands.',
      framework: 'Claude Code',
    },
    {
      label: 'Content Cards',
      prompt: 'For the content slide, generate 4 feature cards with icons: real-time sync (Zap), multi-tenant (Shield), API-first (Code), and observability (BarChart). Keep descriptions under 15 words.',
      framework: 'Claude Code',
    },
    {
      label: 'Stats Slide',
      prompt: 'Add a stats slide: 3 hero metrics (99.9% uptime, <50ms p99, 10k TPS) plus two comparison lists — before migration vs after. Use emerald for "after" items.',
      framework: 'Claude Code',
    },
    {
      label: 'Timeline',
      prompt: 'Create a scrollable timeline slide with 5 steps: Discovery (Jan), Design (Feb), Alpha (Mar), Beta (Apr), GA (May). Mark Discovery–Beta as completed.',
      framework: 'Copilot',
    },
    {
      label: 'Hebrew Translation',
      prompt: 'Translate the full deck to Hebrew. Mirror all layout — RTL is auto-detected, so just provide correct Hebrew text for each field.',
      framework: 'Claude Code',
    },
    {
      label: 'Closing Slide',
      prompt: 'Add a closing slide with: install command `npm install @acme/sdk`, two CLI commands (acme init, acme deploy), and links to docs and GitHub.',
      framework: 'Claude Code',
    },
  ],
  decisions: [
    { slide: 1, decision: 'Title slide uses badge "Q2 2026" + animated tagline to set tone before features.' },
    { slide: 2, decision: 'Content slide with 4 icon cards chosen over a bullet list — visual scanning is faster.' },
    { slide: 3, decision: 'Stats slide leads with 3 hero numbers for immediate impact before the comparison lists.' },
    { slide: 4, decision: 'Comparison slide (before/after) placed after stats to reinforce the improvement narrative.' },
    { slide: 5, decision: 'Quote slide surfaces the key question ("Why rebuild?") with typewriter effect for drama.' },
    { slide: 6, decision: 'Scrollable timeline for the roadmap — 5 steps needed more vertical space than a fixed slide.' },
    { slide: 7, decision: 'Code slide shows the SDK initialization snippet — most developers want to see the API first.' },
    { slide: 8, decision: 'Closing slide groups install + commands + links in a macOS terminal aesthetic for developer appeal.' },
    { slide: 9, decision: 'Final slide repeats the hero tagline word-by-word for a memorable ending.' },
  ],
  frameworkNotes: {
    'Claude Code': 'Generated 5 of 6 prompts end-to-end including RTL Hebrew translation. Understood SKILL.md type system on first read — zero hallucinated fields.',
    'Copilot': 'Used for the timeline step objects (prompt 4). Required an explicit reminder to use the `timeline` type and include `scrollable: true`.',
  },
};
