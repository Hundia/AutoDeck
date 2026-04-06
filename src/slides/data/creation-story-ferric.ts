import type { CreationStory } from '../../engine/types';

export const ferricCreationStory: CreationStory = {
  totalPrompts: 5,
  totalMinutes: 22,
  prompts: [
    {
      label: 'Initial Brief',
      framework: 'Claude Code',
      prompt:
        'Read SKILL.md and create a 9-slide release announcement for Ferric, a Rust CLI for Git workflows. Slides: title, why-now (question format), Rust code example of the API chain, sequence diagram (developer → CLI → git → crates.io), roadmap timeline (alpha to LTS), benchmarks vs cargo-release, features/differentiators, install CTA, and final. Persona: Marcus Webb, open source maintainer. Version badge: v1.0 RC.',
    },
    {
      label: 'Rust Code Slide',
      framework: 'Claude Code',
      prompt:
        'Add a code slide in rust (lowercase) showing the Ferric API chain: FerricConfig::from_workspace(), then Ferric::new(config).commit().tag().publish(Registry::CratesIo).await?. Filename main.rs. Set highlights to [1, 7, 8, 9, 10] to draw attention to the use statement and the four chained method calls. Include an output array with the three success lines.',
    },
    {
      label: 'Sequence Diagram',
      framework: 'Cursor',
      prompt:
        'Create a sequence-mode diagram with four participants: Developer (col 0), Ferric CLI colored amber (col 1), Git colored blue (col 2), crates.io colored emerald (col 3). All row 0. Edges: Developer→CLI (ferric release), CLI→Git (commit + tag), CLI→crates.io (cargo publish), crates.io→CLI dashed (published ✅), CLI→Developer dashed (done in 2.1s).',
    },
    {
      label: 'Roadmap Timeline',
      framework: 'Claude Code',
      prompt:
        'Add a scrollable timeline slide with 5 milestones: Alpha (Feb 2026, 12 contributors), Beta with workspace support (Mar 2026, 3 OSS projects), RC (Apr 2026, "you are here"), v1.0 Stable (May 2026), v1.1 LTS (Q3 2026, security audit). Each step needs number, title, subtitle, time, and output fields.',
    },
    {
      label: 'Benchmarks Stats',
      framework: 'Claude Code',
      prompt:
        'Stats slide comparing Ferric vs cargo-release. Four metrics: 2.1× faster, 0 runtime deps, 4 core CLI commands, 12ms cold-start. leftLabel = "cargo-release", rightLabel = "Ferric". Four left pain points (Python runtime, no workspace ordering, subprocess on Windows, 180ms+ cold-start). Four right advantages (pure Rust, topological sort, libgit2 bindings, 12ms cold-start). bottomLine: "No subprocess spawning. No hidden platform differences."',
    },
  ],
  decisions: [
    {
      slide: 2,
      decision:
        'Question format chosen to surface the developer pain point before showing the solution — engineers need to recognise the problem before they care about the fix.',
    },
    {
      slide: 3,
      decision:
        'Code slide third — show the API before explaining how it works internally. The method chain communicates the value proposition faster than any diagram could.',
    },
    {
      slide: 4,
      decision:
        'Sequence mode diagram over arch — this is a workflow tool, sequence shows the value better. Arch mode would imply a microservices story; sequence makes the happy path legible.',
    },
    {
      slide: 5,
      decision:
        'Roadmap timeline after the diagram — "here\'s where we are" is more credible after the audience has seen how it works. Credibility before claims.',
    },
    {
      slide: 6,
      decision:
        'Benchmarks after roadmap — anchors credibility with hard numbers before listing features. Numbers prime the audience to believe the feature claims that follow.',
    },
    {
      slide: 7,
      decision:
        'Features last before the CTA — by slide 7 the audience has seen the pain point, the API, the internals, the roadmap, and the numbers. They now have full context to evaluate the feature list.',
    },
  ],
  frameworkNotes: {
    'Claude Code':
      'Handled the full deck including Rust syntax tokenization. The highlights array on the code slide correctly drew attention to the method chain. The scrollable timeline rendered all five milestones cleanly without truncation.',
    Cursor:
      "Used for the sequence diagram — Cursor's multi-file context helped it understand Ferric's architecture from my codebase before generating the nodes. One thing I wished for: a way to show actual terminal output inline with the code block rather than in a separate output array.",
  },
};
