import type { SlideData } from '../../engine/types';

export const slidesTechbriefEN: SlideData[] = [
  // 1. TITLE
  {
    type: 'title',
    title: 'AutoSpec',
    subtitle: 'Spec-Driven Development at Scale',
    tagline: 'Ship faster. Break less. Sleep more.',
    presenter: 'AutoDeck Team',
    badge: 'Sprint 40',
  },

  // 2. QUOTE — spec drift problem
  {
    type: 'quote',
    title: 'The Problem',
    question: 'Why do great engineers ship features that nobody specced?',
    points: [
      '📋  60% of bugs originate from ambiguous or missing requirements',
      '🔄  Spec-to-code drift averages 3 major deviations per sprint',
      '⏰  Teams spend 40% of sprint time on clarifications instead of building',
    ],
  },

  // 3. CONTENT — 4 deliverables + 4 metrics
  {
    type: 'content',
    title: 'What AutoSpec Delivers',
    subtitle: 'Four pillars of spec-driven confidence',
    cards: [
      { icon: '📐', title: 'Living Specs', description: 'Specs that evolve with your code — never stale, always authoritative.' },
      { icon: '🤖', title: 'AI Orchestration', description: 'Claude-powered agents plan, implement, and QA each ticket in sequence.' },
      { icon: '🔁', title: 'Closed-Loop QA', description: 'Every ticket runs build gate → test → docs before marking ✅ Done.' },
      { icon: '📊', title: 'Sprint Analytics', description: 'Velocity tracking, burndown, and retrospective data generated automatically.' },
    ],
    metrics: [
      { label: 'Sprints', value: '40+' },
      { label: 'Pts Delivered', value: '443' },
      { label: 'Ticket Hit Rate', value: '97%' },
      { label: 'Avg Sprint Pts', value: '38' },
    ],
  },

  // 4. TIMELINE — 5 sprint execution steps (scrollable)
  {
    type: 'timeline',
    scrollable: true,
    title: 'Sprint Execution Flow',
    subtitle: 'From backlog to deployed — repeatable every sprint',
    steps: [
      { number: 1, title: 'Backlog Grooming', subtitle: 'PM writes tickets with owner, model, pts, deps — no ambiguity allowed', time: '15min', output: 'specs/backlog.md updated with 🔲 tickets' },
      { number: 2, title: 'Orchestrator Brief', subtitle: 'Opus writes agents/sprint-N-brief.md — context package for all Sonnet agents', time: '5min', output: 'agents/sprint-N-brief.md created with file paths + conventions' },
      { number: 3, title: 'Parallel Execution', subtitle: 'Independent tickets spawn as parallel Sonnet agents — no idle time', time: 'N×parallel', output: 'Each agent commits code + updates backlog 🔄→🧪' },
      { number: 4, title: 'QA + Build Gate', subtitle: 'npm run build exits 0; smoke tests pass; no console errors', time: '2min', output: 'All tests green; visual check complete' },
      { number: 5, title: 'Sprint Close', subtitle: 'Summary written, backlog ✅, git tag created, push to GitHub Pages', time: '10min', output: 'sprints/sprint-N/summary.md + git tag sprint-N-complete' },
    ],
  },

  // 5. DIAGRAM — arch mode, 5 nodes
  {
    type: 'diagram',
    mode: 'arch',
    title: 'AutoSpec Architecture',
    subtitle: 'How orchestrator, agents, and backlog connect',
    nodes: [
      { id: 'cli', label: 'Developer', sublabel: '/sprint-run', col: 0, row: 1, color: 'blue' },
      { id: 'orch', label: 'Orchestrator', sublabel: 'Claude Opus', col: 1, row: 1, color: 'violet' },
      { id: 'agentA', label: 'Agent A', sublabel: 'Sonnet', col: 2, row: 0, color: 'cyan' },
      { id: 'agentB', label: 'Agent B', sublabel: 'Sonnet', col: 2, row: 2, color: 'cyan' },
      { id: 'backlog', label: 'Backlog', sublabel: 'specs/backlog.md', col: 3, row: 1, color: 'emerald' },
    ],
    edges: [
      { from: 'cli', to: 'orch', label: 'invoke' },
      { from: 'orch', to: 'agentA', label: 'spawn' },
      { from: 'orch', to: 'agentB', label: 'spawn' },
      { from: 'agentA', to: 'backlog', label: '✅' },
      { from: 'agentB', to: 'backlog', label: '✅' },
    ],
  },

  // 6. DIAGRAM — sequence mode, 4 actors
  {
    type: 'diagram',
    mode: 'sequence',
    title: 'Ticket Lifecycle',
    subtitle: 'From creation to close — the AutoSpec flow',
    nodes: [
      { id: 'pm', label: 'PM', col: 0, row: 0, color: 'blue' },
      { id: 'orch', label: 'Orchestrator', col: 1, row: 0, color: 'violet' },
      { id: 'dev', label: 'Dev Agent', col: 2, row: 0, color: 'cyan' },
      { id: 'bl', label: 'Backlog', col: 3, row: 0, color: 'emerald' },
    ],
    edges: [
      { from: 'pm', to: 'orch', label: 'write ticket' },
      { from: 'orch', to: 'dev', label: 'spawn agent' },
      { from: 'dev', to: 'bl', label: '🔄 in progress' },
      { from: 'dev', to: 'bl', label: '✅ done' },
    ],
  },

  // 7. DIAGRAM — er mode, 3 entities
  {
    type: 'diagram',
    mode: 'er',
    title: 'Data Model',
    subtitle: 'Sprint, Ticket, and Output — the AutoSpec schema',
    nodes: [
      { id: 'sprint', label: 'Sprint', sublabel: 'id, name, points, status', col: 0, row: 1, color: 'violet' },
      { id: 'ticket', label: 'Ticket', sublabel: 'id, owner, model, pts, deps', col: 1, row: 0, color: 'blue' },
      { id: 'output', label: 'Output', sublabel: 'file, type, ticket_id', col: 2, row: 1, color: 'emerald' },
    ],
    edges: [
      { from: 'sprint', to: 'ticket', label: 'has many' },
      { from: 'ticket', to: 'output', label: 'produces' },
    ],
  },

  // 8. CODE — YAML sprint config
  {
    type: 'code',
    title: 'Sprint Config as Code',
    subtitle: 'Every sprint defined in structured YAML — no ambiguity',
    filename: 'sprint-40.yaml',
    language: 'YAML',
    lines: [
      'sprint: 40',
      'name: DiagramSlide + MockupSlide',
      'points: 53',
      'background: circuits',
      '',
      'tickets:',
      '  - id: 40.1',
      '    title: DiagramSlide component',
      '    owner: Frontend',
      '    model: sonnet',
      '    pts: 8',
      '    deps: []',
      '  - id: 40.2',
      '    title: DiagramSlide register',
      '    deps: [40.1]',
    ],
    highlights: [6, 7, 8, 9, 10, 11, 12],
    output: [
      '▶  Validating sprint config... OK',
      '▶  Resolving dependency graph... 8 batches',
      '✅ Sprint 40 ready — 14 tickets, 3 phases',
    ],
  },

  // 9. STATS
  {
    type: 'stats',
    title: 'AutoSpec by the Numbers',
    subtitle: 'Four years of spec-driven development',
    stats: [
      { value: '443', label: 'Points Delivered' },
      { value: '97%', label: 'Ticket Hit Rate' },
      { value: '40+', label: 'Sprints Completed' },
      { value: '<2min', label: 'Build Time' },
    ],
    leftLabel: 'Without AutoSpec',
    rightLabel: 'With AutoSpec',
    leftItems: ['40% sprint on clarifications', '3 spec deviations/sprint', 'Manual QA every ticket', '1 deployment/sprint'],
    rightItems: ['5% sprint on clarifications', '0.1 spec deviations/sprint', 'Automated build gate', '12+ deployments/sprint'],
    bottomLine: 'From solo hackers to enterprise teams — AutoSpec scales with you',
  },

  // 10. CLOSING
  {
    type: 'closing',
    title: 'Start Your First Spec-Driven Sprint',
    install: 'npx autospec init',
    commands: [
      { cmd: '/plan-sprint', desc: 'AI plans your next sprint from backlog' },
      { cmd: '/sprint-run 1', desc: 'Execute sprint end-to-end, zero config' },
      { cmd: '/sprint-close 1', desc: 'Close, summarize, tag, and push' },
    ],
    links: [
      { url: 'https://github.com/Hundia/AutoDeck', label: 'GitHub' },
      { url: 'https://hundia.github.io/AutoDeck/', label: 'Live Demo' },
    ],
    tagline: 'Your next sprint starts with a spec.',
  },
];
