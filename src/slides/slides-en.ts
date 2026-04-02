import type { SlideData } from '../engine/types';

export const slidesEN: SlideData[] = [
  {
    type: 'title',
    title: 'Acme',
    subtitle: 'Building the Future of Developer Tools',
    tagline: 'Ship faster. Break less. Sleep more.',
    presenter: 'Jane Smith',
    badge: 'Live Demo',
  },
  {
    type: 'content',
    title: 'Key Features',
    subtitle: 'Everything you need to ship with confidence',
    cards: [
      {
        icon: '\u26A1',
        title: 'Lightning Fast',
        description: 'Built on a modern stack with sub-100ms response times and zero cold starts.',
      },
      {
        icon: '\uD83D\uDD12',
        title: 'Secure by Default',
        description: 'End-to-end encryption, SOC2 compliance, and automatic vulnerability scanning.',
      },
      {
        icon: '\uD83C\uDF0D',
        title: 'Global Scale',
        description: 'Deploy to 40+ regions worldwide with automatic failover and edge caching.',
      },
      {
        icon: '\uD83E\uDDE9',
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
  {
    type: 'comparison',
    title: 'Before vs After',
    subtitle: 'See the difference Acme makes in your workflow',
    left: {
      label: 'Without Acme',
      color: 'red',
      items: [
        { icon: '\uD83D\uDD25', text: 'Manual deployments taking hours' },
        { icon: '\uD83D\uDCA5', text: 'Breaking changes in production' },
        { icon: '\uD83D\uDE34', text: 'On-call nightmares every sprint' },
        { icon: '\uD83D\uDCC9', text: 'Slow iteration cycles' },
      ],
    },
    right: {
      label: 'With Acme',
      color: 'green',
      items: [
        { icon: '\uD83D\uDE80', text: 'One-click deploys in seconds' },
        { icon: '\uD83D\uDEE1\uFE0F', text: 'Automated rollback on errors' },
        { icon: '\uD83D\uDE0C', text: 'Proactive alerts before incidents' },
        { icon: '\u26A1', text: '10x faster shipping velocity' },
      ],
    },
    callout: 'Teams using Acme ship 10x faster with 90% fewer incidents',
  },
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
    bottomLine: 'From startup to enterprise \u2014 Acme scales with you',
  },
  {
    type: 'final',
    title: 'ACME',
    tagline: 'The future of development starts here.',
  },
];
