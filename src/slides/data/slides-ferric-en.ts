import type { SlideData } from '../../engine/types';

export const slidesFerricEN: SlideData[] = [
  // 1. TITLE
  {
    type: 'title',
    title: 'Ferric',
    subtitle: 'The Rust CLI That Git Deserved',
    tagline: 'Fast. Safe. Composable.',
    presenter: 'Marcus Webb · Open Source',
    badge: 'v1.0 RC',
  },

  // 2. QUOTE — why another CLI?
  {
    type: 'quote',
    title: 'Why Another CLI?',
    question: 'Why do Rust developers keep rewriting the same Git workflow boilerplate in every project?',
    points: [
      '📦  No registry integration out of the box — every team rolls their own crates.io publish script',
      '🗂️  Missing first-class Cargo workspace support — multi-crate publish order is a manual puzzle',
      '🐚  Subprocess spawning leaks platform differences — the same script breaks on Windows, CI, and macOS',
    ],
  },

  // 3. CODE — Ferric API chain
  {
    type: 'code',
    title: 'Ferric API',
    subtitle: 'Three lines to wire your release pipeline',
    filename: 'main.rs',
    language: 'rust',
    lines: [
      'use ferric::prelude::*;',
      '',
      '#[tokio::main]',
      'async fn main() -> ferric::Result<()> {',
      '    let config = FerricConfig::from_workspace()?;',
      '',
      '    Ferric::new(config)',
      '        .commit("chore: release v1.0")',
      '        .tag("v1.0.0")',
      '        .publish(Registry::CratesIo)',
      '        .await?;',
      '',
      '    Ok(())',
      '}',
    ],
    highlights: [1, 7, 8, 9, 10],
    output: [
      '✅  Committed: chore: release v1.0',
      '✅  Tagged: v1.0.0',
      '🚀  Published to crates.io in 2.1s',
    ],
  },

  // 4. DIAGRAM — sequence mode, CLI flow
  {
    type: 'diagram',
    mode: 'sequence',
    title: 'How Ferric Works',
    subtitle: 'From CLI command to published crate',
    nodes: [
      { id: 'user', label: 'Developer', sublabel: 'ferric release', col: 0, row: 0 },
      { id: 'cli', label: 'Ferric CLI', sublabel: 'workspace parser', col: 1, row: 0, color: 'amber' },
      { id: 'git', label: 'Git', sublabel: 'local repo', col: 2, row: 0, color: 'blue' },
      { id: 'registry', label: 'crates.io', sublabel: 'registry API', col: 3, row: 0, color: 'emerald' },
    ],
    edges: [
      { from: 'user', to: 'cli', label: 'ferric release' },
      { from: 'cli', to: 'git', label: 'commit + tag' },
      { from: 'cli', to: 'registry', label: 'cargo publish' },
      { from: 'registry', to: 'cli', label: 'published ✅', dashed: true },
      { from: 'cli', to: 'user', label: 'done in 2.1s', dashed: true },
    ],
  },

  // 5. TIMELINE — v1.0 roadmap (scrollable)
  {
    type: 'timeline',
    scrollable: true,
    title: 'v1.0 Roadmap',
    steps: [
      {
        number: '1',
        title: 'Alpha Release',
        subtitle: 'Core commit/tag workflow, Cargo.toml parsing',
        time: 'Feb 2026',
        output: 'Alpha tested by 12 contributors',
      },
      {
        number: '2',
        title: 'Beta — Workspace Support',
        subtitle: 'Multi-crate workspace publish ordering, semver detection',
        time: 'Mar 2026',
        output: 'Beta used by 3 OSS projects',
      },
      {
        number: '3',
        title: 'Release Candidate',
        subtitle: 'Performance pass, edge-case hardening, docs complete',
        time: 'Apr 2026',
        output: 'RC — you are here',
      },
      {
        number: '4',
        title: 'v1.0 Stable',
        subtitle: 'Semver guarantee, MSRV policy, crates.io publish',
        time: 'May 2026',
        output: 'Stable release',
      },
      {
        number: '5',
        title: 'v1.1 — LTS',
        subtitle: 'Long-term support branch, security audit',
        time: 'Q3 2026',
        output: 'Production-ready LTS',
      },
    ],
  },

  // 6. STATS — Ferric vs cargo-release
  {
    type: 'stats',
    title: 'Ferric vs the Field',
    stats: [
      { value: '2.1×', label: 'Faster Than cargo-release' },
      { value: '0', label: 'Runtime Dependencies' },
      { value: '4', label: 'Core CLI Commands' },
      { value: '12ms', label: 'Cold-Start Time' },
    ],
    leftLabel: 'cargo-release',
    rightLabel: 'Ferric',
    leftItems: [
      'Python runtime required for some hooks',
      'No workspace publish-order resolution',
      'Subprocess spawning breaks on Windows',
      '180ms+ cold-start from heavy dep tree',
    ],
    rightItems: [
      'Pure Rust — zero runtime dependencies',
      'Automatic workspace topological sort',
      'libgit2 bindings — no subprocess at all',
      '12ms cold-start from single static binary',
    ],
    bottomLine: 'No subprocess spawning. No hidden platform differences.',
  },

  // 7. CONTENT — four differentiators + metrics
  {
    type: 'content',
    title: 'What Makes Ferric Different',
    subtitle: "Built on Rust's zero-cost philosophy",
    cards: [
      {
        icon: 'PackageX',
        title: 'Zero Runtime Deps',
        description: 'No Python, no Node. Pure Rust — one binary, ships everywhere',
      },
      {
        icon: 'Layers',
        title: 'Workspace-Aware',
        description: 'Automatically resolves publish order for multi-crate workspaces',
      },
      {
        icon: 'GitBranch',
        title: 'Git-Native',
        description: 'Direct libgit2 bindings — no subprocess, no shell injection risk',
      },
      {
        icon: 'Upload',
        title: 'Registry-First',
        description: 'First-class crates.io integration with retry and rate-limit handling',
      },
    ],
    metrics: [
      { label: 'Contributors', value: '24' },
      { label: 'GitHub Stars', value: '1.2k' },
      { label: 'Downloads', value: '8,400' },
      { label: 'OSS Projects Using', value: '47' },
    ],
  },

  // 8. CLOSING — install + commands + links
  {
    type: 'closing',
    title: 'Get Ferric',
    install: 'cargo install ferric',
    commands: [
      { cmd: 'ferric commit', desc: 'Stage and commit with conventional format' },
      { cmd: 'ferric tag', desc: 'Create and push semver tag' },
      { cmd: 'ferric release', desc: 'Full pipeline: commit → tag → publish' },
    ],
    links: [
      { url: 'https://github.com/marcuswebb/ferric', label: 'GitHub' },
      { url: 'https://crates.io/crates/ferric', label: 'crates.io' },
      { url: 'https://ferric.rs/docs', label: 'Docs' },
    ],
    tagline: 'Ship Rust. Not ceremony.',
  },

  // 9. FINAL
  {
    type: 'final',
    title: 'Ferric',
    tagline: 'Rust releases without the ritual.',
  },
];
