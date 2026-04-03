import type { SlideData } from '../engine/types';

export const slidesEN: SlideData[] = [
  // ── 1. TITLE ────────────────────────────────────────────────────────────────
  {
    type: 'title',
    title: 'Acme',
    subtitle: 'Building the Future of Developer Tools',
    tagline: 'Ship faster. Break less. Sleep more.',
    presenter: 'Jane Smith',
    badge: 'Live Demo',
  },

  // ── 2. QUOTE ────────────────────────────────────────────────────────────────
  {
    type: 'quote',
    title: 'The Problem',
    question: 'Why do great engineers spend half their week babysitting deployments?',
    points: [
      '⏳  Average deploy takes 47 minutes — 38 of them waiting',
      '🔥  1-in-4 production incidents caused by manual config drift',
      '😴  On-call fatigue is the #1 reason engineers quit',
    ],
  },

  // ── 3. CONTENT ──────────────────────────────────────────────────────────────
  {
    type: 'content',
    title: 'Key Features',
    subtitle: 'Everything you need to ship with confidence',
    cards: [
      {
        icon: '⚡',
        title: 'Lightning Fast',
        description: 'Built on a modern stack with sub-100ms response times and zero cold starts.',
      },
      {
        icon: '🔐',
        title: 'Secure by Default',
        description: 'End-to-end encryption, SOC2 compliance, and automatic vulnerability scanning.',
      },
      {
        icon: '🌍',
        title: 'Global Scale',
        description: 'Deploy to 42 regions worldwide with automatic failover and edge caching.',
      },
      {
        icon: '🧩',
        title: 'Extensible',
        description: 'Plugin architecture with 200+ integrations. Build custom extensions in minutes.',
      },
    ],
    metrics: [
      { label: 'Uptime', value: '99.99%' },
      { label: 'Response', value: '<50ms' },
      { label: 'Regions', value: '42' },
      { label: 'Plugins', value: '200+' },
    ],
  },

  // ── 4. CODE ─────────────────────────────────────────────────────────────────
  {
    type: 'code',
    title: 'Deploy in 3 Lines',
    subtitle: 'The entire Acme deployment API — no YAML required',
    filename: 'deploy.ts',
    language: 'TypeScript',
    lines: [
      "import { Acme } from '@acme/sdk'",
      '',
      'const acme = new Acme({ token: process.env.ACME_TOKEN })',
      '',
      '// Deploy with automatic rollback on failure',
      'const deploy = await acme.deploy({',
      "  app: 'my-api',",
      "  image: 'ghcr.io/acme/my-api:latest',",
      '  replicas: 3,',
      "  strategy: 'rolling',",
      '  healthCheck: { path: \'/health\', timeout: 5000 },',
      '})',
      '',
      'console.log(`✅ Live at ${deploy.url} in ${deploy.duration}ms`)',
    ],
    highlights: [6, 7, 8, 9, 10, 11, 12],
    output: [
      '▶  Building image... done (12.3s)',
      '▶  Running health checks... passed (3/3)',
      '▶  Shifting traffic 0% → 100%... done',
      '✅ Live at https://my-api.acme.app in 18400ms',
    ],
  },

  // ── 5. COMPARISON ───────────────────────────────────────────────────────────
  {
    type: 'comparison',
    title: 'Before vs After',
    subtitle: 'See the difference Acme makes in your workflow',
    left: {
      label: 'Without Acme',
      color: 'red',
      items: [
        { icon: '🔥', text: 'Manual deployments taking hours' },
        { icon: '💥', text: 'Breaking changes in production' },
        { icon: '😴', text: 'On-call nightmares every sprint' },
        { icon: '📉', text: 'Slow iteration cycles' },
      ],
    },
    right: {
      label: 'With Acme',
      color: 'green',
      items: [
        { icon: '🚀', text: 'One-click deploys in seconds' },
        { icon: '🛡️', text: 'Automated rollback on errors' },
        { icon: '😌', text: 'Proactive alerts before incidents' },
        { icon: '⚡', text: '10x faster shipping velocity' },
      ],
    },
    callout: 'Teams using Acme ship 10x faster with 90% fewer incidents',
  },

  // ── 6. TIMELINE (scrollable) ─────────────────────────────────────────────────
  {
    type: 'timeline',
    scrollable: true,
    title: 'The Deploy Pipeline',
    subtitle: 'Zero-touch from git push to global traffic — under 30 seconds',
    steps: [
      {
        number: 1,
        title: 'Git Push',
        subtitle: 'Webhook triggers Acme build queue instantly',
        time: '0.1s',
        output: 'POST /webhooks/github → 202 Accepted',
      },
      {
        number: 2,
        title: 'Build & Lint',
        subtitle: 'Parallel: npm ci, TypeScript check, ESLint, unit tests',
        time: '12s',
        output: '✓ 247 tests passed  ✓ 0 lint errors  ✓ types OK',
      },
      {
        number: 3,
        title: 'Container Build',
        subtitle: 'Layer-cached Docker build pushed to Acme registry',
        time: '8s',
        output: 'sha256:a3f9...  pushed to registry.acme.app',
      },
      {
        number: 4,
        title: 'Rolling Deploy',
        subtitle: 'New replicas up, health checks pass, traffic shifted',
        time: '6s',
        output: 'Replicas: 3/3 healthy  Traffic: 0% → 100%',
      },
      {
        number: 5,
        title: 'Live + Monitored',
        subtitle: 'Metrics, logs and error tracking active across all regions',
        time: '0s',
        output: '✅ https://my-api.acme.app  p99: 34ms  errors: 0',
      },
    ],
  },

  // ── 7. STATS ────────────────────────────────────────────────────────────────
  {
    type: 'stats',
    title: 'By the Numbers',
    subtitle: 'Trusted by teams worldwide',
    stats: [
      { value: '10,000+', label: 'Active Teams' },
      { value: '99.99%', label: 'Uptime SLA' },
      { value: '2M+', label: 'Deploys/Month' },
      { value: '<50ms', label: 'Avg Response' },
    ],
    leftLabel: 'Before Acme',
    rightLabel: 'After Acme',
    leftItems: ['47 min avg deploy', '1-in-4 incidents', '3 hr mean recovery', '1 release/week'],
    rightItems: ['28 sec avg deploy', '90% fewer incidents', '4 min mean recovery', '12 releases/week'],
    bottomLine: 'From startup to enterprise — Acme scales with you',
  },

  // ── 8. CLOSING ──────────────────────────────────────────────────────────────
  {
    type: 'closing',
    title: 'Get Started Today',
    install: 'npm install @acme/sdk',
    commands: [
      { cmd: 'acme init', desc: 'Connect your repo in 60 seconds' },
      { cmd: 'acme deploy', desc: 'First deploy with zero config' },
      { cmd: 'acme logs --tail', desc: 'Live logs across all regions' },
    ],
    links: [
      { url: 'https://acme.dev/docs', label: 'Docs' },
      { url: 'https://acme.dev/pricing', label: 'Pricing' },
      { url: 'https://github.com/acme', label: 'GitHub' },
    ],
    tagline: 'Your next deploy is one command away.',
  },

  // ── 9. FINAL ────────────────────────────────────────────────────────────────
  {
    type: 'final',
    title: 'ACME',
    tagline: 'The future of development starts here.',
  },
];
