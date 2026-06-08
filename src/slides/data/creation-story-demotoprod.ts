import type { CreationStory } from '../../engine/types';

export const demoToProdCreationStory: CreationStory = {
  totalPrompts: 4,
  totalMinutes: 14,
  prompts: [
    {
      label: 'Initial Brief',
      framework: 'Claude Code',
      prompt:
        'Read the interview transcript with a department head on AI adoption and extract a 12-slide Hebrew RTL editorial presentation — title, quote, content, comparison, timeline, and final slides. Keep the speaker\'s exact words; do not invent metrics.',
    },
    {
      label: 'Slide Map',
      framework: 'Claude Code',
      prompt:
        'Map each answer to a slide type: Q1 → content + comparison, Q2 → quote, Q3 → timeline (scrollable), Q4 → quote + content, Q5 → comparison, Q6 → comparison + content. Write the full slide data in Hebrew.',
    },
    {
      label: 'Creation Story',
      framework: 'Claude Code',
      prompt:
        'Write creation-story-demotoprod.ts matching the CreationStory shape — 3–4 prompts, realistic minutes, honest about source material.',
    },
    {
      label: 'TypeScript Verification',
      framework: 'Claude Code',
      prompt:
        'Run npx tsc --noEmit to confirm both new files have zero TypeScript errors.',
    },
  ],
  decisions: [
    { slide: 1, decision: 'Title slide includes badge attributing the source interview to ground the editorial framing.' },
    { slide: 6, decision: 'Timeline is scrollable — 6 steps describing the transformation arc need vertical space.' },
    { slide: 9, decision: 'Comparison slide for Q5 uses red/green to contrast "illusion of progress" vs real engineering maturity.' },
    { slide: 10, decision: 'Comparison slide for Q6 uses amber/green to distinguish information risk (caution) from learning risk (encourage).' },
    { slide: 12, decision: 'Final slide echoes the deck title as a closing statement — no fabricated metrics, only the speaker\'s thesis.' },
  ],
  frameworkNotes: {
    'Claude Code':
      'All 4 prompts handled end-to-end by Claude Code / AutoDeck SDD workflow. Hebrew RTL is automatic — no layout overrides added. No stats slide and no code slide by design: the source argues against hype-metrics, so fabricated numbers would betray the deck\'s thesis.',
  },
};
