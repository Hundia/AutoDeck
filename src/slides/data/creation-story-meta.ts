import type { CreationStory } from '../../engine/types';

export const metaCreationStory: CreationStory = {
  totalPrompts: 6,
  totalMinutes: 18,
  prompts: [
    {
      label: 'Initial Brief',
      framework: 'Claude Code',
      prompt:
        'Design an 8-slide pitch deck for AutoDeck itself — the React presentation framework',
    },
    {
      label: 'Stats Slide',
      framework: 'Claude Code',
      prompt:
        'What numbers best represent AutoDeck\'s scale and investment?',
    },
    {
      label: 'Architecture Diagram',
      framework: 'Claude Code',
      prompt:
        'Create an architecture diagram showing how AutoDeck works: SKILL.md → Claude → Slide Data → PresentationViewer → GitHub Pages',
    },
    {
      label: 'Code Slide',
      framework: 'Claude Code',
      prompt:
        'Show a minimal TypeScript example of defining two slides',
    },
    {
      label: 'Comparison Slide',
      framework: 'Claude Code',
      prompt:
        'Frame the comparison between AutoDeck and traditional tools like PowerPoint',
    },
    {
      label: 'Closing Slide',
      framework: 'Claude Code',
      prompt:
        'Write the closing slide with GitHub clone commands and links',
    },
  ],
  frameworkNotes: {
    'Claude Code':
      'This is the meta-presentation — AutoDeck presenting itself. The autoEdges diagram mode automatically connects linear node chains. The code slide highlights lines 1-3 to draw attention to the type annotation. The comparison slide uses emoji icons for visual scanning.',
  },
};
