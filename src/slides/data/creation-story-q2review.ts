import type { CreationStory } from '../../engine/types';

export const q2ReviewCreationStory: CreationStory = {
  totalPrompts: 4,
  totalMinutes: 14,
  prompts: [
    {
      label: 'Initial Brief',
      framework: 'Claude Code',
      prompt:
        "I'm a PM with no coding experience. I read SKILL.md and want to create a 9-slide Q2 business review. Slides should cover: Q2 headline metrics, our three biggest wins, a Q1-vs-Q2 comparison, a Q2 milestones timeline, team retro highlights, a mockup of our Q3 roadmap board, and a closing with Q3 priorities. Can you write the full TypeScript slide data?",
    },
    {
      label: 'Stats + Comparison Slides',
      framework: 'Claude Code',
      prompt:
        "The stats slide needs real leftItems and rightItems — specific Q1 vs Q2 numbers for MRR, NPS, churn, and features. And for the comparison slide, can you fill in the four left items (Q1 limitations) and four right items (Q2 wins) as { icon, text } objects? I want concrete, specific language — not generic bullets.",
    },
    {
      label: 'Mockup Roadmap Board',
      framework: 'Claude Code',
      prompt:
        "Add a browser-mode mockup slide showing our Q3 roadmap board at app.company.io/roadmap. It should have five blocks in order: a navbar labelled 'Q3 Roadmap', a hero banner saying 'Q3 2026 — Ship the Platform Layer', a card-grid for top priorities, a table for the feature backlog, and a text-block for notes and decisions.",
    },
    {
      label: 'Closing Priorities',
      framework: 'Claude Code',
      prompt:
        "For the closing slide, use install: 'q3-roadmap.company.io' and three terminal-style commands representing our Q3 bets: Platform API v1 (to unblock enterprise integrations), Mobile App (iOS + Android, our top Q2 customer request), and AI Assist (in-product writing and data analysis). Link to roadmap.company.io, retro.company.io, and metrics.company.io.",
    },
  ],
  decisions: [
    {
      slide: 2,
      decision:
        'Stats slide first — leadership opens the deck expecting numbers; leading with four hero metrics sets credibility before any narrative.',
    },
    {
      slide: 3,
      decision:
        'Content slide with 3 wins (not 4) — focused storytelling; each win is anchored to a specific, measurable outcome rather than a feature description.',
    },
    {
      slide: 4,
      decision:
        'Comparison placed after the wins slide so the audience already appreciates each improvement before seeing the aggregate Q1-vs-Q2 delta.',
    },
    {
      slide: 5,
      decision:
        'Timeline set to scrollable — 5 milestones with subtitles and outputs are too dense for a fixed-height slide; scrolling keeps all context accessible.',
    },
    {
      slide: 7,
      decision:
        'Mockup in browser mode to show the actual Q3 roadmap tool as a live artifact, rather than reducing it to bullet points on a closing slide.',
    },
  ],
  frameworkNotes: {
    'Claude Code':
      "No coding background at all. Fed SKILL.md directly into Claude as context, described the slides in plain English, got back TypeScript that worked on the first paste. The animated stats counters made my leadership team sit up straight. The mockup slide now uses an image block to embed a real product screenshot via URL — just set type: 'image', provide a public src URL, and the renderer displays it inline between the hero and the feature grid.",
  },
};
