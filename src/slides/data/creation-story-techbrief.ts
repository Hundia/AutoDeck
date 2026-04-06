import type { CreationStory } from '../../engine/types';

export const techBriefCreationStory: CreationStory = {
  totalPrompts: 7,
  totalMinutes: 31,
  prompts: [
    {
      label: 'Initial Brief',
      prompt: 'Read SKILL.md and create a 10-slide TechBrief for AutoSpec. Cover: title, architecture diagram, sequence diagram, ER diagram, a code slide, stats, and closing. Focus on the spec-driven development angle.',
      framework: 'Claude Code',
    },
    {
      label: 'Architecture Diagram',
      prompt: 'Create an arch-mode diagram with 6 nodes: CLI (col 0 row 1), Orchestrator (col 1 row 1), Sonnet Agent (col 2 row 0), Haiku Agent (col 2 row 2), Backlog (col 3 row 0), GitHub Pages (col 3 row 2). Color CLI=blue, Orchestrator=violet, agents=emerald, outputs=amber.',
      framework: 'Claude Code',
    },
    {
      label: 'Sequence Diagram',
      prompt: 'Add a sequence-mode diagram showing the SDD loop: User → CLI → Orchestrator → Agent (parallel) → Backlog → QA → Deploy. Use dashed edges for async steps.',
      framework: 'Claude Code',
    },
    {
      label: 'ER Diagram',
      prompt: 'Create an er-mode diagram with entities: Sprint (id, name, pts), Ticket (id, sprint_id, status, pts), Agent (id, ticket_id, model). Edges: Sprint has-many Tickets, Ticket assigned-to Agent.',
      framework: 'Cursor',
    },
    {
      label: 'Code Slide',
      prompt: 'Add a TypeScript code slide showing a PresentationConfig object. Highlight lines 3–7 (the languages array). Use filename "src/config.ts".',
      framework: 'Claude Code',
    },
    {
      label: 'Stats + Comparison',
      prompt: 'Stats slide: 443 story points delivered, 11 sprints, 3 AI models used. Comparison: left = "Before SDD" (ad-hoc commits, no backlog, no docs), right = "After SDD" (spec-first, 100% tracked, living docs).',
      framework: 'Claude Code',
    },
    {
      label: 'Hebrew Translation',
      prompt: 'Translate the full TechBrief to Hebrew. Diagrams stay in English (node labels are technical identifiers). Translate only narrative text fields: title, subtitle, desc, points, etc.',
      framework: 'Claude Code',
    },
  ],
  decisions: [
    { slide: 1, decision: 'Title badge "Sprint-Driven" over "AI-Powered" — the audience is engineers who care about methodology.' },
    { slide: 2, decision: 'Architecture diagram placed second to orient the viewer before the process slides.' },
    { slide: 3, decision: 'Sequence diagram for the SDD loop — shows temporal flow better than a box diagram.' },
    { slide: 4, decision: 'ER diagram makes the data model concrete — important for the database-heavy AutoSpec context.' },
    { slide: 5, decision: 'Stats slide (443 pts, 11 sprints) before code — numbers create credibility before the API details.' },
    { slide: 6, decision: 'Comparison slide contrasts before/after SDD to highlight the methodology value.' },
    { slide: 7, decision: 'Code slide shows PresentationConfig — the type system is the core abstraction, worth showcasing.' },
    { slide: 8, decision: 'Quote slide ("Does AI replace the engineer?") addresses the elephant in the room directly.' },
    { slide: 9, decision: 'Timeline of AutoSpec sprints shows consistent velocity — builds trust in the process.' },
    { slide: 10, decision: 'Closing slide links to GitHub and SKILL.md — the call to action is "fork it and run it".' },
  ],
  frameworkNotes: {
    'Claude Code': 'Primary framework for all 7 prompts. Handled diagram node coordinates correctly on first attempt. RTL Hebrew translation required only one prompt with clear field-scoping instructions.',
    'Cursor': 'Used for the ER diagram (prompt 4). Cursor\'s autocomplete helped fill in the edge labels but needed an explicit reminder about the `er` mode value.',
    'Copilot': 'Tested as an alternative for diagram generation. Required 2–3 correction rounds to get node col/row layout right — likely due to less exposure to the AutoDeck type system.',
    'Gemini': 'Generated a valid code slide in one shot when given the SKILL.md code type reference. Competitive with Claude on structured data generation tasks.',
  },
};
