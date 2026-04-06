import type { SlideData } from '../../engine/types';

export const slidesMetaEN: SlideData[] = [
  // 1. TITLE
  {
    type: 'title',
    title: 'AutoDeck',
    subtitle: 'AI-generated. Framework-ready. Open source.',
    tagline: 'Build your next deck in 5 minutes',
    badge: '11 Sprints',
  },

  // 2. STATS
  {
    type: 'stats',
    stats: [
      { value: '10', label: 'Slide Types' },
      { value: '7', label: 'Showcase Decks' },
      { value: '3', label: 'Themes' },
      { value: '443', label: 'Points Invested' },
    ],
  },

  // 3. CONTENT — four pillars
  {
    type: 'content',
    title: 'Built on Four Pillars',
    cards: [
      {
        title: 'Framer Motion',
        items: ['Smooth transitions', 'Stagger animations', 'whileInView reveals'],
      },
      {
        title: 'Theme System',
        items: ['Aurora, Sivania, Noir', '16 CSS tokens', 'localStorage persistence'],
      },
      {
        title: 'Creation Story',
        items: ['Prompt history', 'Slide decisions', 'Framework notes'],
      },
      {
        title: 'Zero Backend',
        items: ['GitHub Pages', 'Vite + React 18', 'One git push'],
      },
    ],
  },

  // 4. DIAGRAM — architecture
  {
    type: 'diagram',
    title: 'How It Works',
    mode: 'arch',
    autoEdges: true,
    nodes: [
      { id: 'skill', label: 'SKILL.md', row: 0, col: 0 },
      { id: 'claude', label: 'Claude / AI', row: 0, col: 1 },
      { id: 'data', label: 'Slide Data', row: 0, col: 2 },
      { id: 'viewer', label: 'PresentationViewer', row: 0, col: 3 },
      { id: 'pages', label: 'GitHub Pages', row: 0, col: 4 },
    ],
    edges: [],
  },

  // 5. CODE — TypeScript example
  {
    type: 'code',
    title: 'One Slide. Pure TypeScript.',
    language: 'typescript',
    filename: 'slides-en.ts',
    code: `import type { SlideData } from '../engine/types';

export const slidesEN: SlideData[] = [
  {
    type: 'title',
    title: 'My Presentation',
    subtitle: 'Built with AutoDeck',
    tagline: 'Ship it today',
  },
  {
    type: 'stats',
    stats: [
      { value: '10x', label: 'Faster' },
      { value: '0', label: 'Backend' },
    ],
  },
];`,
    highlights: [1, 2, 3],
  },

  // 6. COMPARISON — AutoDeck vs alternatives
  {
    type: 'comparison',
    title: 'AutoDeck vs The Alternatives',
    left: {
      title: 'Traditional Tools',
      items: [
        { icon: '⏱', text: 'Hours of manual formatting' },
        { icon: '🔒', text: 'Vendor lock-in' },
        { icon: '💸', text: 'Monthly subscription' },
        { icon: '🚫', text: 'No version control' },
      ],
    },
    right: {
      title: 'AutoDeck',
      items: [
        { icon: '⚡', text: 'AI-generated in minutes' },
        { icon: '🔓', text: 'Open source, fork it' },
        { icon: '🆓', text: 'Free forever' },
        { icon: '✅', text: 'Git-native, diff your slides' },
      ],
    },
  },

  // 7. TIMELINE — the journey
  {
    type: 'timeline',
    title: 'The Journey',
    steps: [
      {
        year: 'Apr 2025',
        title: 'AutoSpec Sprint 10',
        description: 'First presentation engine extracted from AutoSpec',
      },
      {
        year: 'Oct 2025',
        title: 'Sprint 39 — AutoDeck Launch',
        description: 'Standalone GitHub Pages deploy, SDD bootstrap',
      },
      {
        year: 'Jan 2026',
        title: 'Sprint 40-42 — Engine Maturity',
        description: '10 slide types, 3 themes, Creation Story drawer',
      },
      {
        year: 'Mar 2026',
        title: 'Sprint 44-45 — Community Personas',
        description: '3 persona presentations, image blocks, autoEdges',
      },
      {
        year: 'Apr 2026',
        title: 'Sprint 46-47 — Viral Growth',
        description: 'Gallery, share modal, OG image, deploy buttons',
      },
    ],
  },

  // 8. CLOSING
  {
    type: 'closing',
    title: 'Start Building',
    commands: [
      { label: 'Clone', cmd: 'git clone https://github.com/Hundia/AutoDeck' },
      { label: 'Install', cmd: 'npm install' },
      { label: 'Dev', cmd: 'npm run dev' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/Hundia/AutoDeck' },
      { label: 'Live Demo', url: 'https://hundia.github.io/AutoDeck/' },
    ],
  },
];
