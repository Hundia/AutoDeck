import type { SlideData } from '../../engine/types';

export const slidesUimockupEN: SlideData[] = [
  // 1. TITLE
  {
    type: 'title',
    title: 'AutoDeck Dashboard',
    subtitle: 'Design System v2.0',
    tagline: 'One token. Every screen. Zero drift.',
    presenter: 'AutoDeck Design Team',
    badge: 'v2.0 Preview',
  },

  // 2. QUOTE
  {
    type: 'quote',
    title: 'The Problem',
    question: 'Why does every new screen feel like it was built by a different team?',
    points: [
      '🎨  Average product has 47 shades of blue — none intentional',
      '🔧  Component drift causes 30% of UI bugs and design rework',
      '📐  Designers and developers speak different languages by default',
    ],
  },

  // 3. CONTENT — 4 DS pillars + token counts
  {
    type: 'content',
    title: 'Design System Pillars',
    subtitle: 'Built once, consistent everywhere',
    cards: [
      { icon: '🎨', title: 'Design Tokens', description: '180 semantic tokens for color, spacing, and typography — single source of truth.' },
      { icon: '🧱', title: 'Component Library', description: '64 battle-tested components, each with variants, states, and a11y baked in.' },
      { icon: '📐', title: 'Layout Grid', description: '12-column adaptive grid, 8-point spacing system, responsive breakpoints at 4 sizes.' },
      { icon: '✏️', title: 'Motion Language', description: 'Consistent timing curves and durations — every interaction feels intentional.' },
    ],
    metrics: [
      { label: 'Tokens', value: '180' },
      { label: 'Components', value: '64' },
      { label: 'Screens', value: '12' },
      { label: 'Coverage', value: '100%' },
    ],
  },

  // 4. STATS
  {
    type: 'stats',
    title: 'Design System ROI',
    subtitle: 'Before and after adopting the AutoDeck DS',
    stats: [
      { value: '180', label: 'Design Tokens' },
      { value: '64', label: 'Components' },
      { value: '70%', label: 'Faster Screens' },
      { value: '0', label: 'Drift Issues' },
    ],
    leftLabel: 'Without DS',
    rightLabel: 'With AutoDeck DS',
    leftItems: ['47 ad-hoc color values', '3–5 days per new screen', '30% UI bugs from drift', 'Figma ≠ code always'],
    rightItems: ['180 semantic tokens', '0.5 days per new screen', '0% drift issues', 'Figma = code always'],
    bottomLine: 'One design language — zero translation cost',
  },

  // 5. TIMELINE — 5-step design-to-code
  {
    type: 'timeline',
    scrollable: true,
    title: 'Design → Code Workflow',
    subtitle: 'From concept to deployed screen — one unified flow',
    steps: [
      { number: 1, title: 'Token Sync', subtitle: 'Design tokens exported from Figma Tokens plugin as JSON', time: '1min', output: 'tokens.json → src/design-tokens.ts auto-generated' },
      { number: 2, title: 'Component Spec', subtitle: 'Each component specced with variants, props, and a11y requirements', time: '30min', output: 'components/Button.spec.md with acceptance criteria' },
      { number: 3, title: 'Code Generation', subtitle: 'AutoSpec AI agent implements component from spec + token values', time: '5min', output: 'src/components/Button.tsx + Storybook story' },
      { number: 4, title: 'Visual QA', subtitle: 'Storybook screenshot diff + a11y audit + mobile viewport check', time: '2min', output: 'All stories pass — 0 a11y violations' },
      { number: 5, title: 'Deploy + Publish', subtitle: 'Component pushed to npm package + Storybook docs updated', time: '1min', output: '@autodeck/ds v2.0.1 published — 64 components' },
    ],
  },

  // 6. MOCKUP — Dashboard wireframe
  {
    type: 'mockup',
    title: 'Dashboard Screen',
    subtitle: 'The main analytics view — navbar, hero metrics, and card grid',
    displayMode: 'browser',
    url: 'app.autodeck.io/dashboard',
    blocks: [
      { type: 'navbar', label: 'Navigation' },
      { type: 'hero', label: 'Metrics Hero' },
      { type: 'card-grid', label: 'KPI Cards' },
      { type: 'chart-bar', label: 'Deployment Chart' },
    ],
  },

  // 7. MOCKUP — Backlog screen
  {
    type: 'mockup',
    title: 'Backlog Screen',
    subtitle: 'Sprint management view — sidebar navigation and ticket table',
    displayMode: 'browser',
    url: 'app.autodeck.io/backlog',
    blocks: [
      { type: 'navbar', label: 'Navigation' },
      { type: 'sidebar', label: 'Sprint Sidebar' },
      { type: 'table', label: 'Ticket Table' },
    ],
  },

  // 8. MOCKUP — flow mode, 3 mini-frames
  {
    type: 'mockup',
    title: 'User Onboarding Flow',
    subtitle: 'Three-step flow from signup to first presentation',
    displayMode: 'flow',
    frames: [
      {
        url: 'autodeck.io/signup',
        blocks: [{ type: 'hero' }, { type: 'form' }],
      },
      {
        url: 'autodeck.io/setup',
        blocks: [{ type: 'navbar' }, { type: 'card-grid' }],
      },
      {
        url: 'autodeck.io/dashboard',
        blocks: [{ type: 'navbar' }, { type: 'chart-bar' }],
      },
    ],
  },

  // 9. COMPARISON
  {
    type: 'comparison',
    title: 'Manual Design vs Design System',
    subtitle: 'The real cost of building without a system',
    left: {
      label: 'Manual Design',
      color: 'red',
      items: [
        { icon: '🎨', text: 'New color picked every sprint' },
        { icon: '🔧', text: '30% of PRs need design rework' },
        { icon: '📐', text: 'Figma and code always diverge' },
        { icon: '🐛', text: 'Drift causes untraceable UI bugs' },
      ],
    },
    right: {
      label: 'AutoDeck Design System',
      color: 'purple',
      items: [
        { icon: '🎯', text: '180 tokens — zero ad-hoc values' },
        { icon: '✅', text: "Components spec'd before code" },
        { icon: '🔗', text: 'Figma tokens sync to code in 1min' },
        { icon: '⚡', text: '70% faster new screen delivery' },
      ],
    },
    callout: 'Teams on the AutoDeck DS ship new screens 70% faster with zero drift issues',
  },

  // 10. FINAL
  {
    type: 'final',
    title: 'AUTODECK DS',
    tagline: 'One design language. Every screen. Forever consistent.',
  },
];
