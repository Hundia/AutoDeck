import type { CreationStory } from '../../engine/types';

export const howToCreationStory: CreationStory = {
  totalPrompts: 4,
  totalMinutes: 14,
  prompts: [
    {
      label: 'Initial Brief',
      prompt: 'Read SKILL.md and create a 10-slide "How to Build Presentations with AutoDeck" guide deck. Cover: what AutoDeck is, the 3-step workflow, the slide type system, AI assistant tips, and a final call to action. Use hex background.',
      framework: 'Claude Code',
    },
    {
      label: 'Step-by-Step Timeline',
      prompt: 'Add a scrollable timeline slide with the 5 AutoDeck creation steps: 1) Clone repo, 2) Read SKILL.md, 3) Prompt your AI, 4) Paste generated TypeScript, 5) Push to deploy. Mark all steps with completion indicators.',
      framework: 'Claude Code',
    },
    {
      label: 'The Magic Prompt',
      prompt: 'Create a code slide showing the recommended AI prompt template in plain text. Use language "text" and filename "prompt-template.txt". Highlight lines 1–2 (the SKILL.md reference line).',
      framework: 'Claude Code',
    },
    {
      label: 'Architecture Diagram',
      prompt: 'Add an arch-mode diagram showing how AutoDeck works: User (col 0 row 1) → AI Assistant (col 1 row 0) and SKILL.md (col 1 row 2) → TypeScript Slides (col 2 row 1) → Vite Build (col 3 row 0) and GitHub Pages (col 3 row 2). Color AI=violet, SKILL.md=amber, output=emerald.',
      framework: 'Claude Code',
    },
  ],
  decisions: [
    { slide: 1, decision: 'Title slide uses the "How to" framing over "Getting Started" — more action-oriented for the how-to genre.' },
    { slide: 2, decision: 'Content slide with 4 cards (What, Why, How, Who) chosen as a quick orientation before the deep dive.' },
    { slide: 3, decision: 'Stats slide (10 types, 8 effects, <30s setup) anchors the value proposition with concrete numbers.' },
    { slide: 4, decision: 'Architecture diagram placed fourth — viewer needs context before seeing the system topology.' },
    { slide: 5, decision: 'Timeline of creation steps is scrollable — 5 steps need vertical space to show detail without crowding.' },
    { slide: 6, decision: 'Code slide shows the prompt template — the most actionable thing a user can take away immediately.' },
    { slide: 7, decision: 'Comparison slide (traditional vs AutoDeck workflow) reframes the value for skeptical audiences.' },
    { slide: 8, decision: 'Quote slide asks "What would you build with one hour?" — invites the viewer to imagine their own deck.' },
    { slide: 9, decision: 'Closing slide has minimal commands (just git clone) to lower the activation energy to try it.' },
    { slide: 10, decision: 'Final slide ends on the AutoDeck tagline — brand reinforcement after the instructional content.' },
  ],
  // No frameworkNotes — this deck was created entirely with Claude Code
};
