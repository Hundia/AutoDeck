import type { SlideData } from '../../engine/types';

export const slidesQ2ReviewEN: SlideData[] = [
  // 1. TITLE
  {
    type: 'title',
    title: 'Q2 2026',
    subtitle: 'Business Review — Product & Engineering',
    tagline: 'Shipped more. Churned less. NPS spiked.',
    presenter: 'Sarah Kim · Product',
    badge: 'Q2 2026 · Confidential',
  },

  // 2. STATS — Q2 key metrics
  {
    type: 'stats',
    title: 'Q2 Key Metrics',
    stats: [
      { value: '$2.4M', label: 'Monthly Recurring Revenue' },
      { value: '72', label: 'Net Promoter Score' },
      { value: '1.2%', label: 'Monthly Churn Rate' },
      { value: '14', label: 'Features Shipped' },
    ],
    leftLabel: 'Q1 2026',
    rightLabel: 'Q2 2026',
    leftItems: [
      '$1.9M MRR — 20% below Q2 target',
      'NPS of 61 — below industry median',
      '2.1% monthly churn — retention risk flagged',
      '9 features shipped — roadmap slipping',
    ],
    rightItems: [
      '$2.4M MRR — record high, 26% QoQ growth',
      'NPS of 72 — 11-point jump, above industry median',
      '1.2% monthly churn — 43% improvement',
      '14 features shipped — 56% more than Q1',
    ],
    bottomLine: 'Best quarter in company history across all four metrics.',
  },

  // 3. CONTENT — three major wins
  {
    type: 'content',
    title: 'Three Major Wins',
    subtitle: 'The features that moved the needle',
    cards: [
      {
        icon: 'Users',
        title: 'Real-Time Collaboration',
        description: 'Multi-cursor editing across 12 content types — shipped 2 weeks early',
      },
      {
        icon: 'Rocket',
        title: 'Self-Serve Onboarding',
        description: 'Time-to-first-value dropped from 4 days to 18 minutes',
      },
      {
        icon: 'BarChart2',
        title: 'Analytics v2',
        description: 'Cohort retention and funnel visualisation — top requested feature for 3 quarters',
      },
    ],
    metrics: [
      { label: 'Features Shipped', value: '14' },
      { label: 'Bugs Fixed', value: '83' },
      { label: 'Uptime', value: '99.97%' },
      { label: 'Avg Response Time', value: '62ms' },
    ],
  },

  // 4. COMPARISON — Q1 vs Q2
  {
    type: 'comparison',
    title: 'Q1 vs Q2: What Changed',
    left: {
      label: 'Q1 Shipped',
      color: 'amber',
      items: [
        { icon: '🔶', text: 'Single-user editing only — collaboration blocked on infra work' },
        { icon: '🔶', text: 'Manual onboarding with 4-day time-to-value and high drop-off' },
        { icon: '🔶', text: 'Basic analytics — page views and signups, no cohort depth' },
        { icon: '🔶', text: 'Monthly releases — long feedback loops slowed iteration' },
      ],
    },
    right: {
      label: 'Q2 Shipped',
      color: 'emerald',
      items: [
        { icon: '✅', text: 'Real-time multi-cursor across 12 content types — shipped 2 weeks early' },
        { icon: '✅', text: 'Self-serve onboarding — time-to-value 4 days → 18 minutes' },
        { icon: '✅', text: 'Analytics v2 with cohort retention and funnel visualisation' },
        { icon: '✅', text: 'Weekly releases — faster feedback, 56% more features shipped' },
      ],
    },
    callout: "Q2 shipped 14 features vs Q1's 9 — a 56% increase with 8% fewer engineers.",
  },

  // 5. TIMELINE — Q2 milestones (scrollable)
  {
    type: 'timeline',
    scrollable: true,
    title: 'Q2 Milestones',
    steps: [
      {
        number: '1',
        title: 'Q2 Kickoff',
        subtitle: 'OKRs locked, roadmap published, team aligned on NPS target of 70+',
        time: 'Apr 1',
        output: 'Roadmap published',
      },
      {
        number: '2',
        title: 'Collaboration Beta',
        subtitle: '200 design partners in private beta — 94% satisfaction rating',
        time: 'Apr 15',
        output: 'Beta feedback incorporated',
      },
      {
        number: '3',
        title: 'Self-Serve GA',
        subtitle: 'Onboarding flow redesigned, activation rate jumped 3.1×',
        time: 'May 1',
        output: 'Time-to-value: 18 min',
      },
      {
        number: '4',
        title: 'Analytics v2 Launch',
        subtitle: 'Cohort analytics shipped — NPS immediately jumped 11 points',
        time: 'Jun 1',
        output: 'NPS: 72 (was 61)',
      },
      {
        number: '5',
        title: 'Quarter Close',
        subtitle: 'All four OKRs green. Board presentation delivered.',
        time: 'Jun 30',
        output: 'Record quarter',
      },
    ],
  },

  // 6. QUOTE — team retrospective
  {
    type: 'quote',
    title: 'Team Retrospective',
    question: 'What made Q2 different from every quarter before it?',
    points: [
      '🚀  We shipped in smaller increments — weekly releases instead of monthly meant problems surfaced in days, not at quarter-end',
      '🤖  AI-assisted planning cut spec-writing time in half — engineers spent more time building, less time clarifying requirements',
      '🤝  Design and engineering paired from day one — no handoffs, no rework, faster decision-making at every milestone',
    ],
  },

  // 7. MOCKUP — Q3 roadmap board (browser mode)
  {
    type: 'mockup',
    title: 'Q3 Roadmap Board',
    subtitle: 'Prioritised by impact score · updated weekly',
    displayMode: 'browser',
    url: 'app.company.io/roadmap',
    blocks: [
      { type: 'navbar', label: 'Q3 Roadmap' },
      { type: 'hero', label: 'Q3 2026 — Ship the Platform Layer' },
      {
        type: 'image' as const,
        src: 'https://picsum.photos/seed/q2dashboard/800/450',
        alt: 'Q2 2026 dashboard — active users by region',
        caption: 'Live dashboard · Q2 review',
        aspectRatio: '16/9' as const,
      },
      { type: 'card-grid', label: 'Top Priorities' },
      { type: 'table', label: 'Feature Backlog' },
      { type: 'text-block', label: 'Notes & Decisions' },
    ],
  },

  // 8. CLOSING — Q3 priorities
  {
    type: 'closing',
    title: 'Q3 Priorities',
    install: 'q3-roadmap.company.io',
    commands: [
      { cmd: 'Platform API v1', desc: 'Unblock 12 enterprise integrations' },
      { cmd: 'Mobile App', desc: "iOS + Android — Q2's top customer request" },
      { cmd: 'AI Assist', desc: 'In-product AI writing and data analysis' },
    ],
    links: [
      { url: 'https://roadmap.company.io', label: 'Roadmap' },
      { url: 'https://retro.company.io', label: 'Q2 Retro' },
      { url: 'https://metrics.company.io', label: 'Metrics' },
    ],
    tagline: 'One quarter at a time.',
  },

  // 9. FINAL
  {
    type: 'final',
    title: 'Q2 2026',
    tagline: 'Keep shipping. Keep listening.',
  },
];
