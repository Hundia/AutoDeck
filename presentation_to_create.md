# The Governed Agent — Presentation Design Spec

**Working title:** "The Governed Agent: From Vibe Coding to Agentic SDLC"  
**Audience:** Enterprise engineering leaders, senior developers, architects, product managers  
**Duration:** 25–35 minutes  
**Engine:** AutoDeck (this repo) — React + Framer Motion  
**Branch:** `claude/agentic-sdlc-presentation-tzcizz`

---

## Source Material Synthesized

This spec draws on three research streams:

1. **The Enterprise Agentic SDLC Playbook** (uploaded) — "The Spec is the Truth, the Harness is the Guardrail, the Human is the Judge." 6-stage framework, role evolution, Bolt cadence.
2. **AutoSpec Presentation** (hundia.github.io/autospec/#/presentation) — The three eras of AI development, Context Poisoning, Reverse Engineering Tax, Agentic Tech Debt thesis, SDD three pillars, the orchestrator pattern.
3. **Industry Research 2025–2026** — METR RCT (−19% productivity), DORA "amplifier" thesis, CSA vibe coding security crisis (65% vuln rate), CodeRabbit 1.7× defect rate, Gartner predictions, McKinsey governance findings, Atlassian Rovo 30.8% PR speedup.

---

## Meta Configuration

```typescript
// src/config.ts
{
  title: "The Governed Agent",
  languages: [{ id: 'en', label: 'English' }],
  defaultLanguage: 'en',
  background: 'circuits',           // evokes the Harness metaphor — structured flow
  branding: "The Governed Agent · Agentic SDLC · 2026",
  keyboardHint: { en: "← → navigate · Space scrolls scrollable slides" },
}
```

**Theme:** `aurora` (dark slate, blue-violet accents) — professional enterprise tone.  
**Background:** `circuits` — PCB grid metaphor mirrors the "Harness as structured constraint" theme. Consider `constellation` as an alternative for the "network of governed agents" framing.

---

## Narrative Arc

```
Act 1 — The Hook        Slides  1–3   The Paradox: AI is everywhere. Results are missing.
Act 2 — The Crisis      Slides  4–7   The Three Eras → Context Poisoning → Hangover → Debt Taxonomy
Act 3 — The Governed    Slides  8–12  The Three Principles → Pipeline → Harness → Spec artifact → Roles
Act 4 — In Practice     Slides 13–16  Orchestrator → Tooling → ROI
Act 5 — The Future      Slides 17–18  Roadmap → 2027 Horizon
Coda                    Slides 19–20  Manifesto + Final
```

The narrative is a **paradox resolved**: Everyone uses AI (Slide 2) → measured results are negative (Slide 2) → the cause is structural, not the technology (Slide 3) → here is the structural failure in detail (Slides 4–7) → here is the governed alternative (Slides 8–12) → here is how it works in practice (Slides 13–16) → here is how you get there (Slides 17–18) → here is the principle (Slides 19–20).

The **unifying thesis** (from Google DORA 2025): *AI is an amplifier, not a fix. It magnifies whatever process you already have.* Govern the process, govern the output.

---

## Slide Specifications

---

### Slide 1 — TITLE

```typescript
{
  type: 'title',
  title: "The Governed Agent",
  subtitle: "From Vibe Coding to Agentic SDLC",
  tagline: "AI is an amplifier. Govern what you amplify.",
  badge: "Enterprise Playbook · 2026",
}
```

**Narrative purpose:** The tagline is the thesis of the entire presentation in one line. "Amplifier" primes the audience for Slide 3. The badge signals this is a practical enterprise guide, not a hype deck.

---

### Slide 2 — STATS: The AI Productivity Paradox

```typescript
{
  type: 'stats',
  title: "The AI Productivity Paradox",
  subtitle: "Everyone is using AI tools. Almost no one is measuring results correctly.",
  stats: [
    { value: "84%",  label: "of developers use AI coding tools daily (Stack Overflow 2025 Developer Survey)" },
    { value: "−19%", label: "actual measured productivity change in METR randomized controlled trial, July 2025" },
    { value: "29%",  label: "of developers trust AI accuracy — down from 40% just 12 months prior" },
    { value: "66%",  label: "cite 'almost right, but not quite' as their #1 frustration with AI tools" },
  ],
  bottomLine: "The METR RCT finding: developers predicted 24% faster. Felt 20% faster. Were actually 19% slower on their own mature codebases. The gap between perception and measurement IS the whole problem. Source: arxiv.org/pdf/2507.09089",
}
```

**Design note:** The `−19%` stat should visually stand apart — it is the shock moment that earns the audience's attention. The `bottomLine` delivers the punchline: it's not that AI doesn't work, it's that *perception outruns reality when governance is absent*.

---

### Slide 3 — CONTENT: AI is an Amplifier, Not a Fix

```typescript
{
  type: 'content',
  title: "AI is an Amplifier, Not a Fix",
  subtitle: "Google DORA 2025 (5,000+ respondents): AI magnifies whatever process you already have.",
  cards: [
    {
      icon: "📡",
      title: "The DORA Finding",
      description: "AI positively predicts throughput and product performance — but negatively predicts delivery stability when governance is absent. 7.2% drop in stability among heavy AI users without automated testing and fast feedback loops.",
    },
    {
      icon: "⚡",
      title: "Governed Process → Amplified Quality",
      description: "Structured specs + mechanical harness + HITL checkpoints = agents amplifying disciplined processes into 2–4× delivery speed with quality maintained. The McKinsey top-performer outcome.",
    },
    {
      icon: "💣",
      title: "Unstructured Prompting → Amplified Chaos",
      description: "Open-ended prompting amplifies ambiguity into context drift, spec rot, 10× security findings, 30–60% rework within 6 months, and 73% project abandonment rates. The Vibe Coding outcome.",
    },
    {
      icon: "🎯",
      title: "The Right Question",
      description: "The question is not 'Should we use AI?' The question is: 'What are we amplifying?' Governance is not bureaucracy — it is the leverage point that separates the 230% ROI orgs from the ones that cancel.",
    },
  ],
}
```

---

### Slide 4 — TIMELINE (SCROLLABLE): The Three Eras and the Drift

> **Creative Direction — First major non-linear moment.**
>
> This is a single continuous scroll that tells two connected stories without a slide break: (1) the optimistic evolution through AI eras, and (2) the inevitable degradation once agentic AI runs without persistent memory. The user starts scrolling through history and doesn't realize they've crossed into the crisis until Turn 25. The effect is cinematic — hopeful beginning, gradual horror, hard landing.
>
> The `time` badge on each step shows the era label or turn number. The `output` line shows the concrete artifact or symptom. By Turn 100, the output is a stack trace. By Step 8, the output is the cost in hours.

```typescript
{
  type: 'timeline',
  scrollable: true,
  title: "The Three Eras — and What Went Wrong",
  subtitle: "Scroll to follow the evolution. Watch the exact moment it breaks.",
  steps: [
    {
      number: 1,
      title: "Traditional Era (pre-2022)",
      subtitle: "Slow but predictable. Every decision was documented because humans wrote it and needed it six months later. Architecture was stable. Knowledge was preserved. Onboarding was painful but possible.",
      time: "Months / feature",
      output: "✅ Docs written · Architecture stable · Institutional memory preserved · Onboarding: 2 weeks",
    },
    {
      number: 2,
      title: "Code Assistant Era (2022–2024)",
      subtitle: "AI helped you type faster, not think better. GitHub Copilot, Tabnine, Kite. 3× faster boilerplate. Design decisions and architecture: still 100% human. No change to persistent memory. No context drift.",
      time: "Weeks / feature",
      output: "✅ 3× faster boilerplate · ✅ Decision authority: Human · ✅ Architecture decisions: documented",
    },
    {
      number: 3,
      title: "Agentic Era (2025–now)",
      subtitle: "Revolutionary autonomy. Full modules from one prompt. Cross-stack changes (FE + BE + DB). Autonomous implementation decisions. But: every session starts from zero. The agent has no memory of what was decided yesterday.",
      time: "Hours / feature",
      output: "⚡ Maximum power · ⚠ Zero persistent memory · ⚠ Every session: blank slate",
    },
    {
      number: 4,
      title: "Chat Turn 1 — Clean Context",
      subtitle: "New session. You spend 20 minutes explaining the architecture. The agent finally understands. You move fast. Everything aligns.",
      time: "Turn 1",
      output: "✅ Stack: PostgreSQL + Prisma ORM. Auth: JWT 15min/7d rotation. Pattern: CQRS. Stack is locked.",
    },
    {
      number: 5,
      title: "Chat Turn 25 — First Drift",
      subtitle: "The conversation is getting long. The earlier context is fading. The agent's suggestions begin to shift subtly — not wrong enough to catch immediately, but no longer grounded in the original decisions.",
      time: "Turn 25",
      output: "⚠ MongoDB might actually be simpler for this use case given the document structure…",
    },
    {
      number: 6,
      title: "Chat Turn 50 — Contradiction",
      subtitle: "The agent has now contradicted its own earlier recommendations. It does not know it did. You have two competing architectural patterns in the same codebase and the agent treats both as valid.",
      time: "Turn 50",
      output: "❌ Are we using Prisma or Mongoose here? I see both imported in auth.service.ts.",
    },
    {
      number: 7,
      title: "Chat Turn 100 — Context Poisoning",
      subtitle: "The session is now toxic. Every new prompt is answered in the context of accumulated contradictions. The code reflects every flip and contradiction in the conversation.",
      time: "Turn 100",
      output: "💥 TypeError: Cannot read properties of undefined reading 'findMany' (prisma.user is undefined)",
    },
    {
      number: 8,
      title: "Day 60 — The Reverse Engineering Tax",
      subtitle: "New agent session. All context is gone. Chat logs are deleted or stale. You are reverse-engineering your own codebase to explain it to the agent — again, from scratch, for the fourth time this quarter.",
      time: "New session",
      output: "⏱ 40 hours/quarter lost to context reconstruction · 73% of AI projects abandoned within 6 months · $0 value of chat logs after session ends",
    },
  ],
}
```

**Design note:** The transition between Step 3 and Step 4 is the invisible boundary between "era overview" and "crisis in progress." The audience realizes they've crossed it only around Turn 25. This produces the emotional resonance that a static comparison slide never could.

---

### Slide 5 — STATS: The Vibe Coding Hangover

```typescript
{
  type: 'stats',
  title: "The Vibe Coding Hangover",
  subtitle: "Fast to prototype. Dangerous to run. Expensive to maintain.",
  stats: [
    { value: "65%",    label: "of vibe-coded production apps had security vulnerabilities (1,400 apps scanned — Escape.tech / CSA 2026)" },
    { value: "10×",    label: "more security findings in AI-assisted Fortune 50 teams vs manual development" },
    { value: "322%",   label: "rise in privilege-escalation vulnerabilities in AI-heavy codebases" },
    { value: "30–60%", label: "rework increase within 6 months of heavy unstructured AI adoption" },
  ],
  leftItems: [
    "58% of apps had at least one critical vulnerability",
    "Every app tested: missing CSRF protection and security headers",
    "400+ exposed secrets across 1,400 scanned apps",
    "AI commits expose secrets at 2× the rate of human commits (3.2% vs 1.5%)",
  ],
  leftLabel: "Security Failures",
  rightItems: [
    "73% of AI projects abandoned within 6 months",
    "~1.7× more issues per PR in AI-generated code (CodeRabbit Dec 2025)",
    "PRs/author up 20% YoY — incidents per PR up 23.5% YoY",
    "DORA: more AI use → 7.2% drop in delivery stability without governance",
  ],
  rightLabel: "Sustainability Failures",
  bottomLine: "'Vibe coding' (Karpathy, Feb 2025) is a valid solo-prototyping technique. At enterprise scale, without governance, it becomes a liability factory. The hangover is real — and measurable.",
}
```

---

### Slide 6 — CONTENT: The Agentic Tech Debt Taxonomy

```typescript
{
  type: 'content',
  title: "Agentic Tech Debt: The New Liability Class",
  subtitle: "Unlike classic technical debt — which is static — agentic debt compounds invisibly every session.",
  cards: [
    {
      icon: "📜",
      title: "Spec Drift",
      description: "Agents rebuild foundational architecture decisions from scratch each session, subtly drifting from original choices. Without a spec, there is no anchor. A new agent session is a reboot of the entire decision tree.",
    },
    {
      icon: "🔄",
      title: "Prompt Rot",
      description: "Undocumented quick-fix prompts accumulate layer by layer. Cascaded local instructions ('be polite, respond in JSON, never use async…') until the system prompt is a landmine no one dares edit.",
    },
    {
      icon: "📦",
      title: "Hallucinated Dependencies",
      description: "'Slopsquatting': agents import packages that don't exist; attackers register fake names to intercept those imports. AI-assisted commits introduce malicious package names at measurably higher rates.",
    },
    {
      icon: "🔭",
      title: "Evaluation Debt",
      description: "No evals = no regression detection. Every model update, policy shift, or vendor change silently breaks agent behavior with no tripwire. You discover the regression in production.",
    },
  ],
  metrics: [
    { label: "Debt classes", value: "8" },
    { label: "Visibility",   value: "Near zero" },
    { label: "Compounds",    value: "Per session" },
    { label: "Crisis year",  value: "2027 (Gartner)" },
  ],
}
```

**Extended taxonomy (for speaker notes / follow-up slides if time allows):**  
The full 8-class taxonomy includes: Spec Drift, Prompt Rot, Prompt Cascades, Hallucinated Dependencies, Dependency Drift (agent behavior breaks when the underlying model/vendor updates), Retrieval Debt (degraded RAG data), Evaluation Debt, Governance Gaps (distributed AI ownership with no clear accountability when an error surfaces in production).

---

### Slide 7 — QUOTE: The Manifesto Moment

```typescript
{
  type: 'quote',
  title: "The Core Thesis",
  question: "Agentic development without structure is technical debt at AI speed.",
  points: [
    "Every session that starts without a spec reinvents and drifts from prior decisions.",
    "Every agent error not encoded as a test can and will recur — infinitely.",
    "Every decision not written down is a decision the next agent will silently unmake.",
  ],
}
```

**Design note:** The typewriter effect on the question lands the thesis before the three consequences appear. This is the emotional pivot point of the presentation — the audience now understands why the problem exists and is ready to receive the solution.

---

### Slide 8 — COMPARISON: Vibe Coding vs. Governed SDLC

```typescript
{
  type: 'comparison',
  title: "Two Approaches. One Outcome Each.",
  subtitle: "The difference is not the AI model. It is the governance wrapping it.",
  left: {
    label: "Vibe Coding",
    color: "red",
    items: [
      { icon: "💬", text: "Intent lives in chat logs — gone when the session ends" },
      { icon: "🎲", text: "Architecture decisions made ad-hoc, per-session, from zero context" },
      { icon: "🐛", text: "Same bugs recur: agent errors never encoded as permanent tests" },
      { icon: "🏃", text: "Humans rubber-stamp outputs — HITL becomes theater, not governance" },
      { icon: "📉", text: "73% abandoned within 6 months · 65% have critical security vulnerabilities" },
    ],
  },
  right: {
    label: "Governed SDLC",
    color: "green",
    items: [
      { icon: "📄", text: "Intent lives in spec.md — version-controlled, session-permanent, inheritable" },
      { icon: "⚖️", text: "Architecture defined once in constitution.md, enforced mechanically by the harness" },
      { icon: "✅", text: "Every agent error → permanent harness test. It cannot recur by design." },
      { icon: "🧑‍⚖️", text: "Humans govern at structured checkpoints with real authority and accountability" },
      { icon: "📈", text: "2–4× delivery speed · 230% 3-year ROI · 30.8% faster PR cycles (Atlassian)" },
    ],
  },
  callout: "Both use the same AI models. The governed approach wraps them in specs, harnesses, and human checkpoints. That wrapper is the product.",
}
```

---

### Slide 9 — CONTENT: The Three Governing Principles

```typescript
{
  type: 'content',
  title: "The Three Governing Principles",
  subtitle: "Derived independently from two frameworks that converged on the same answer.",
  cards: [
    {
      icon: "📄",
      title: "The Spec is the Truth",
      description: "No code is written before the spec is approved. spec.md is version-controlled and updated BEFORE any code changes. It is the persistent memory AI was never given — and the sole anchor against session drift. Specifications are what separate agentic development from vibe coding.",
    },
    {
      icon: "⚙️",
      title: "The Harness is the Guardrail",
      description: "Every team builds a mechanical Harness: tests, linters, type systems, and constraints agents cannot violate. Every agent error is encoded as a permanent test case — it cannot recur. The harness is institutional memory made executable. It improves every sprint.",
    },
    {
      icon: "🧑‍⚖️",
      title: "The Human is the Judge",
      description: "HITL is not a rubber stamp — it is a mandatory governance checkpoint with real authority. Humans approve specs, interrogate agent plans, and review outputs at every gate. The value of engineering shifts from writing code to verifying it against intent.",
    },
    {
      icon: "⚡",
      title: "The Bolt is the Unit of Work",
      description: "Move from multi-week Sprints to high-intensity Bolts — feature cycles measured in hours or days. Bolts are achievable only when specs are precise, tasks are independently testable, the harness runs automatically, and the human is a governor, not a typist.",
    },
  ],
}
```

---

### Slide 10 — TIMELINE (SCROLLABLE): The 6-Stage Governed SDLC Pipeline

> **Creative Direction — The centerpiece of the presentation.**
>
> This is the second and climactic scrollable slide — the direct equivalent of AutoSpec's pipeline slide (Slide 16). The audience scrolls through the entire governed SDLC lifecycle as a single connected journey. Each stage reveals: who owns it (the `time` badge), what concrete artifact it produces (the `output` line), and why it exists.
>
> Visual target: full-height container with a gradient connecting line running down the left margin (blue → violet → cyan → amber → teal → green) — one color per stage, echoing the theme gradient. Each step appears via `whileInView` as the user scrolls to it, building the feeling of watching a governed pipeline come alive.
>
> Custom visualization components (see "Potential Enhancements" section) can replace the generic timeline for maximum impact. The fallback `timeline` + `scrollable: true` still delivers the narrative.

```typescript
{
  type: 'timeline',
  scrollable: true,
  title: "The 6-Stage Governed SDLC",
  subtitle: "Scroll the complete pipeline — from human intent to governed production. Every stage produces a durable artifact.",
  steps: [
    {
      number: 1,
      title: "Stage 1 — Intent & Discovery",
      subtitle: "The Product Owner captures 'the problem only' — not implementation details — in spec.md. GenAI turns unstructured inputs (Jira tickets, conversations, PRDs) into a high-fidelity, version-controlled specification. No agent may begin implementation until the PO formally approves the spec. Coding is mechanically blocked.",
      time: "Owner: Product Owner",
      output: "📄 spec.md approved → Coding gate opens · ⛔ spec-kit: 'Coding blocked until spec.approved = true'",
    },
    {
      number: 2,
      title: "Stage 2 — Alignment & Constraints",
      subtitle: "The Architect defines the project's laws before any work begins: tech stack, security protocols, performance requirements, SSDLC compliance, and architectural standards. This becomes constitution.md — the immutable base layer of the Harness. Decisions here are the most expensive to change. Invest the time.",
      time: "Owner: Architect",
      output: "⚖️ constitution.md · 14 constraints injected into harness · Tech stack locked · Security bounds enforced",
    },
    {
      number: 3,
      title: "Stage 3 — Design & Planning",
      subtitle: "Agents analyze the approved spec to produce plan.md (technical strategy) and tasks.md (granular, independently-testable units of work). Senior engineers interrogate the plan — not write it — focusing on legacy constraints, blast radius, and security. The Team Lead approves the implementation map before any code is written.",
      time: "Owner: Architect + Dev Lead",
      output: "🗺️ plan.md + tasks.md · Each task: independently testable (required for Bolts) · Team Lead approval required",
    },
    {
      number: 4,
      title: "Stage 4 — Execution (Bolts)",
      subtitle: "Agents implement tasks in small, testable Bolts — hours, not weeks. TDD is mechanically enforced: agents cannot write implementation code before a failing test exists that satisfies the task. The Developer is the Quality Orchestrator: reviewing agent PRs, handling complex edge cases, and growing the harness. Every agent error → permanent test case.",
      time: "Owner: Developer (HITL)",
      output: "⚡ PR per Bolt · ⛔ No implementation before failing test · ✅ Agent error → permanent harness test (never recurs)",
    },
    {
      number: 5,
      title: "Stage 5 — Testing & QA",
      subtitle: "Agents implement test cases aligned with specification acceptance criteria. The QA Developer reviews agent test PRs, handles edge cases the agent missed, and verifies the harness grows stronger every sprint. All agent code execution happens in secure, isolated sandbox environments — never directly in production infrastructure.",
      time: "Owner: QA Developer (HITL)",
      output: "🧪 Spec-linked test suite · Sandboxed execution · QA HITL approval required · Harness: permanently stronger",
    },
    {
      number: 6,
      title: "Stage 6 — Continuous Steering",
      subtitle: "Agents monitor real-time telemetry against the spec's intended behavior. Drift triggers alerts or an automatic self-correction Bolt. SRE agents proactively open GitHub issues when anomalies are detected. All agent communications and decisions are logged — full audit trails. The loop that never ends.",
      time: "Owner: SRE / DevOps",
      output: "📡 Telemetry vs spec baseline · Auto-issue on anomaly · Full audit log · sprint-N/summary.md → next session inherits full context",
    },
  ],
}
```

**Speaker note for the transition out of this slide:**  
*"Every stage produces a durable artifact — spec.md, constitution.md, plan.md, tasks.md, tests, summaries. The next agent session that touches this code inherits all of it. That's the compounding advantage. The longer you run the governed SDLC, the less it costs."*

---

### Slide 11 — DIAGRAM: The Harness Architecture

```typescript
{
  type: 'diagram',
  mode: 'arch',
  title: "The Harness: Governing Agent Execution",
  subtitle: "Every node constrains what the agent can do. Nothing reaches production without passing all gates.",
  nodes: [
    { id: 'spec',         label: 'spec.md',         sublabel: 'Source of Truth',        col: 0, row: 0, color: 'blue' },
    { id: 'constitution', label: 'constitution.md',  sublabel: 'Architectural Bounds',   col: 0, row: 1, color: 'violet' },
    { id: 'harness',      label: 'Harness',          sublabel: 'Tests · Types · Linters', col: 2, row: 0, color: 'cyan' },
    { id: 'agent',        label: 'AI Agent',         sublabel: 'Bounded Execution',      col: 2, row: 1, color: 'amber' },
    { id: 'hitl',         label: 'HITL Review',      sublabel: 'Human Checkpoint',       col: 4, row: 0, color: 'emerald' },
    { id: 'prod',         label: 'Production',       sublabel: 'Governed Output',        col: 4, row: 1, color: 'slate' },
  ],
  edges: [
    { from: 'spec',         to: 'harness', label: 'defines tests' },
    { from: 'constitution', to: 'harness', label: 'defines bounds' },
    { from: 'harness',      to: 'agent',   label: 'enforces constraints' },
    { from: 'spec',         to: 'agent',   label: 'guides intent',    dashed: true },
    { from: 'agent',        to: 'hitl',    label: 'submits PR' },
    { from: 'harness',      to: 'hitl',    label: 'CI gates must pass' },
    { from: 'hitl',         to: 'prod',    label: 'approved' },
  ],
}
```

**Key insight to deliver:** The agent is constrained by the harness *mechanically* — not by trust, not by prompting, not by hoping. The spec and constitution flow *into* the harness. The harness flows *into* the agent's execution environment. The agent cannot violate the harness without failing CI. The human checkpoint is for judgment, not enforcement — enforcement is automated.

---

### Slide 12 — CODE: The Spec as Persistent Memory

```typescript
{
  type: 'code',
  title: "What a Governed Agent Actually Reads",
  subtitle: "The spec is the memory AI was never given — version-controlled, permanent across all sessions.",
  filename: "specs/auth-service.md",
  language: "markdown",
  lines: [
    "# Auth Service — spec.md",
    "## Status: APPROVED (PO sign-off: 2026-06-01)",
    "",
    "## Problem Statement",
    "Users lose sessions across devices. No SSO. Support ticket volume: +340% MoM.",
    "",
    "## Constraints (enforced by constitution.md)",
    "- Stack: PostgreSQL + Prisma ORM  ← NOT MongoDB (decided Sprint 3)",
    "- Auth: JWT, 15-min access / 7-day refresh with rotation",
    "- Security: OWASP Top 10 compliance required before merge",
    "",
    "## Acceptance Criteria",
    "- AC1: POST /auth/login returns { access_token, refresh_token }",
    "- AC2: POST /auth/refresh rotates both tokens (anti-replay enforced)",
    "- AC3: Any endpoint rejects expired access_token with 401 + WWW-Authenticate",
    "",
    "## Out of Scope",
    "- OAuth provider integration → Sprint 12",
  ],
  highlights: [1, 2, 7, 8, 9, 10],
  outputCommand: "Any new agent session",
  output: [
    "✅ Full architecture context loaded — zero reverse-engineering required",
    "✅ Stack constraints enforced by harness — drift is impossible",
    "✅ Acceptance criteria ready for TDD — agent writes the failing test first",
    "✅ Scope boundary explicit — agent cannot hallucinate scope creep",
  ],
}
```

**Contrast to make during presentation:** Compare this with opening a chat window and typing "now let's add auth." One gives the agent a grounded, bounded, session-permanent context. The other starts a new drift cycle.

---

### Slide 13 — COMPARISON: The Role Evolution

```typescript
{
  type: 'comparison',
  title: "The Role Evolution is Already Underway",
  subtitle: "65% of developers expect their role to be redefined in 2026. (WEF / industry surveys)",
  left: {
    label: "The Legacy Role",
    color: "amber",
    items: [
      { icon: "⌨️", text: "Developer: writes every line, measured by output volume" },
      { icon: "📋", text: "PM: transcribes stakeholder wishes into tickets" },
      { icon: "🏛️", text: "Architect: designs in isolation, documents once at the start" },
      { icon: "🔬", text: "QA: manually tests after development is 'done'" },
      { icon: "🚒", text: "DevOps: reactive — fights production fires after they start" },
    ],
  },
  right: {
    label: "The Governed Role",
    color: "cyan",
    items: [
      { icon: "🎼", text: "Dev Orchestrator: governs agent output, owns the harness, approves PRs" },
      { icon: "📄", text: "Outcome Owner: writes specs that constrain agents, approves the plan" },
      { icon: "⚖️", text: "Governance Owner: defines the constitution, interrogates agent plans" },
      { icon: "🧑‍⚖️", text: "Quality Orchestrator: verifies spec compliance, grows the harness each sprint" },
      { icon: "🔭", text: "Infrastructure Guardian: governs self-healing, agentic observability pipelines" },
    ],
  },
  callout: "Value shifts from writing code to verifying it against intent. The core skill becomes intent — not syntax. This is not a threat to engineering; it is an elevation of it.",
}
```

---

### Slide 14 — DIAGRAM: The Orchestrator Pattern

```typescript
{
  type: 'diagram',
  mode: 'sequence',
  title: "The Orchestrator Pattern",
  subtitle: "One governing model directs multiple parallel agents. The economics are striking: ~60% cost reduction.",
  nodes: [
    { id: 'po',       label: 'Product Owner',     col: 0, row: 0, color: 'blue' },
    { id: 'opus',     label: 'Opus Orchestrator', sublabel: 'PM Role · Plans & reviews', col: 1, row: 0, color: 'violet' },
    { id: 'agent_a',  label: 'Sonnet Agent A',    sublabel: 'Backend',                  col: 2, row: 0, color: 'amber' },
    { id: 'agent_b',  label: 'Sonnet Agent B',    sublabel: 'Frontend',                 col: 3, row: 0, color: 'emerald' },
    { id: 'agent_c',  label: 'Sonnet Agent C',    sublabel: 'QA + Docs',                col: 4, row: 0, color: 'cyan' },
    { id: 'main',     label: 'Main Branch',       sublabel: 'Protected · HITL required', col: 5, row: 0, color: 'slate' },
  ],
  edges: [
    { from: 'po',      to: 'opus',    label: 'Approves spec.md' },
    { from: 'opus',    to: 'agent_a', label: 'Sprint brief (worktree-a)' },
    { from: 'opus',    to: 'agent_b', label: 'Sprint brief (worktree-b)' },
    { from: 'opus',    to: 'agent_c', label: 'Sprint brief (worktree-c)' },
    { from: 'agent_a', to: 'main',    label: 'PR → HITL' },
    { from: 'agent_b', to: 'main',    label: 'PR → HITL' },
    { from: 'agent_c', to: 'main',    label: 'PR → HITL' },
    { from: 'opus',    to: 'main',    label: 'Reviews + merges', dashed: true },
  ],
}
```

**Model economics to deliver (speaker notes):**

| Model Tier | % of Work | Tasks | Cost |
|---|---|---|---|
| Haiku 4.5 | 40% | Migrations, CRUD, configs, boilerplate | Minimal |
| Sonnet 4.6 | 45% | Services, components, tests, reviews | Balanced |
| Opus | 15% | Architecture planning, sprint orchestration | Premium |

Result: ~60% cost reduction vs all-Opus. Spec quality is what removes the need for expensive models — when context is complete, cheaper models perform at senior-engineer level.

---

### Slide 15 — CONTENT: Tooling the Governed SDLC

```typescript
{
  type: 'content',
  title: "The Governed SDLC Tooling Ecosystem",
  subtitle: "The industry has converged on spec-first, harness-governed delivery. The standard is emerging.",
  cards: [
    {
      icon: "📄",
      title: "Spec-Kit / AGENTS.md Standard",
      description: "The de-facto open standard for repo-level agent context. Now adopted by GitHub, OpenAI, Anthropic, Cursor, Sourcegraph, Jules, Factory. A project-level constitution every agent action respects. Includes spec.md → constitution.md → plan.md → tasks.md workflow with mechanical coding gates.",
    },
    {
      icon: "⚙️",
      title: "Harness Enforcement (Superpowers)",
      description: "Agents are mechanically prohibited from writing implementation code before a failing test exists. Every CI gate is a harness node. TDD is not a practice — it is a constraint. Every agent error is encoded permanently. The same mistake cannot happen twice.",
    },
    {
      icon: "🔗",
      title: "Context Hubs (Jira + Confluence)",
      description: "Jira transforms from a manual tracking tool into an auto-syncing Context Hub — spec.md updates trigger automatic Epic status changes, no manual reporting. Confluence provides the long-term memory layer: architecture docs are injected as bounded agent context before each session.",
    },
    {
      icon: "🤖",
      title: "Rovo Dev / GitHub Agent HQ",
      description: "Atlassian Rovo Dev cut PR cycle time by 30.8% (empirical study, ICSE 2026). GitHub is moving 'beyond assistance to a control center for agentic development' with Agent HQ. The industry is not planning the governed SDLC — it is shipping it.",
    },
  ],
  metrics: [
    { label: "Rovo PR speed",       value: "30.8%" },
    { label: "Model cost savings",  value: "~60%" },
    { label: "Enterprise adoption", value: "90% Fortune 100" },
    { label: "Emerging standard",   value: "AGENTS.md" },
  ],
}
```

---

### Slide 16 — STATS: The Business Case for Governance

```typescript
{
  type: 'stats',
  title: "The Business Case for Governance",
  subtitle: "The gap between top and bottom performers is not the AI model. It is the governance discipline.",
  stats: [
    { value: "230%",  label: "3-year ROI with governed AI development — payback under 6 months (Forrester TEI, Atlassian 2026)" },
    { value: "2–4×",  label: "delivery speed increase — but only with specs + harness + HITL, not open-ended prompting" },
    { value: "38.7%", label: "of AI code review comments drive real fixes when humans govern the review loop (Atlassian Rovo, 2026)" },
    { value: "~60%",  label: "AI cost reduction via model-tier optimization — Haiku 40% / Sonnet 45% / Opus 15% of tasks" },
  ],
  leftItems: [
    "McKinsey: 16–30% productivity gains with governance + training",
    "McKinsey: 31–45% software quality improvements with structured workflow",
    "~6 hours/week saved on routine tasks across >90% of teams surveyed",
    "Daily AI users: 2.3 PRs/week vs 1.4 for non-users (DX Research)",
  ],
  leftLabel: "With Governance",
  rightItems: [
    "Gartner: >40% of agentic projects will be cancelled by 2027",
    "MIT (2025): 95% of AI projects fail to reach production value",
    "S&P Global: 42% of firms scrapped most AI initiatives in 2025",
    "Fortune 50 study: 10× security findings, 322% privilege escalation paths",
  ],
  rightLabel: "Without Governance",
  bottomLine: "Top performers embed AI governance into performance reviews (80%), invest in hands-on training (57% vs 20%), and link AI goals to both PM and developer reviews. The governance investment gap between leaders and laggards is widening quarterly.",
}
```

---

### Slide 17 — TIMELINE: The Adoption Roadmap

```typescript
{
  type: 'timeline',
  title: "The Adoption Roadmap",
  subtitle: "Three phases. Each one builds on the last. The foundation phase cannot be skipped.",
  steps: [
    {
      number: 1,
      title: "Phase 1 — Foundation (Months 1–3)",
      subtitle: "Stand up the harness: secure API gateways, telemetry pipelines, and isolated sandbox environments where agents operate without production impact. Pilot Spec-Kit on one non-critical team to establish the spec-first discipline. Build your initial constitution.md. Measure baseline: defect rate, cycle time, developer satisfaction.",
      output: "✅ Harness live · ✅ spec.md discipline · ✅ Pilot team running · 📊 Baseline metrics captured",
    },
    {
      number: 2,
      title: "Phase 2 — Expand (Months 4–9)",
      subtitle: "Roll out AI code review to all teams. Measure defect escape rates before/after. Integrate Jira and Confluence as Context Hubs — eliminate manual status reporting. Enable observability agents for proactive production issue detection. Train developers in prompt engineering, AI monitoring, and verification — the skill shift is as critical as the tooling shift.",
      output: "✅ AI review: all teams · ✅ Context Hubs integrated · ⚠ Skill training: non-negotiable investment",
    },
    {
      number: 3,
      title: "Phase 3 — Optimize (Months 10+)",
      subtitle: "Full Bolt cadence: feature cycles in hours for bounded, well-specified tasks. Continuously evolve the harness — each sprint, each agent error becomes a permanent test. Measure ROI across four dimensions: delivery speed, defect escape rate, time-to-market, infrastructure cost delta. Mature teams ('Pioneers') achieve compounding returns.",
      output: "🚀 Bolt cadence · 📊 ROI across 4 dimensions · 🔄 Harness compounding · 🏆 Pioneer tier achieved",
    },
  ],
}
```

---

### Slide 18 — CONTENT: The 2027 Horizon

```typescript
{
  type: 'content',
  title: "The 2027 Horizon",
  subtitle: "The market is bifurcating. The gap between governed and ungoverned orgs will not close.",
  cards: [
    {
      icon: "🚀",
      title: "Planning-First Development",
      description: "The future allocation: 50% specification and planning, 20% implementation (agents), 30% verification. When specs are precise and the harness is complete, even smaller models deliver senior-engineer results. Planning replaces expensive model compute.",
    },
    {
      icon: "🏛️",
      title: "The Monolith Renaissance",
      description: "Microservices were designed for human teams. For agents with 200K token context windows, a monolith is a superpower: entire codebase visible, refactoring atomic, no API contract ambiguity, cross-stack changes without inference. The architecture pendulum swings back.",
    },
    {
      icon: "📐",
      title: "Governance as Competitive Moat",
      description: "Gartner: 40% of enterprise apps will embed task-specific agents by end of 2026. IDC: AI copilots in 80% of enterprise apps by 2026. But Gartner also: >40% of agentic projects cancelled by 2027. The survivors are the ones that governed. The moat is the methodology.",
    },
    {
      icon: "🌐",
      title: "The $127B Market by 2029",
      description: "Agentic AI: $28B in 2024 → $127B projected by 2029. The governance layer — specs, harnesses, HITL tooling, orchestration — is the infrastructure investment that captures this value. Orgs that build governance now are positioned for the entire decade.",
    },
  ],
}
```

---

### Slide 19 — QUOTE: The Final Manifesto

```typescript
{
  type: 'quote',
  title: "The Governed SDLC",
  question: "The Spec is the Truth. The Harness is the Guardrail. The Human is the Judge.",
  points: [
    "In this paradigm, value shifts from writing code to verifying and validating it — against intent, against spec, against the harness.",
    "The core skill becomes less about syntax and more about intent: defining what software must do, then confirming it does exactly that.",
    "Every agent error not encoded as a test is a regression waiting to recur. Every spec not written is context waiting to drift.",
  ],
}
```

---

### Slide 20 — FINAL

```typescript
{
  type: 'final',
  title: "The Governed Agent",
  tagline: "Spec first. Human always. Ship at AI speed.",
}
```

---

## Creative & Interactive Direction

### Non-Linear Architecture

The presentation has **two structural departures** from standard left-to-right slide navigation:

**Departure 1 — Slide 4 (The Drift)**  
A single scroll reveals two connected stories: the hopeful era evolution (Steps 1–3) and the inevitable degradation (Steps 4–8). There is no visual boundary between them — the audience crosses from "era overview" to "crisis in progress" around Turn 25, only realizing the shift in retrospect. This produces the emotional resonance that a static before/after comparison cannot.

**Departure 2 — Slide 10 (The Pipeline)**  
The climax scroll. This is the equivalent of AutoSpec's Slide 16. The full 6-stage governed SDLC is a single connected journey scrolled from top to bottom. Each stage appears via `whileInView` animation as the audience reaches it. Target: 60+ seconds of continuous scrolling through the governed pipeline — feeling participatory, not passive.

### Visual Atmosphere Transitions

A sophisticated implementation could use per-slide backgrounds to underscore the narrative:

| Slides | Background | Narrative Meaning |
|--------|------------|-------------------|
| 1 | `circuits` | Structure from the opening |
| 2–3 | `gradient` | Soft opening — promising but unsettled |
| 4–7 | `matrix` | Crisis / chaos — the falling green rain signals danger |
| 8 | `circuits` | The pivot: structure returning |
| 9–20 | `circuits` | Governed, structured, reliable |

This requires adding per-slide `background` overrides to the engine config (potential Sprint enhancement).

### Potential Custom Enhancement Components

These go beyond standard AutoDeck types for maximum visual impact. Implement as custom slide components following the existing `src/slides/components/*.tsx` pattern:

**1. Slide 4 — Context Health Bar**  
A depleting progress bar (`🟢🟢🟢🟢 → 🟡🟡⬜⬜ → 🔴⬜⬜⬜ → 💀`) that visually degrades as the scroll progresses through the chat turns. The audience watches the "context health" collapse in real time.

**2. Slide 3 — The Amplifier Diagram**  
Two parallel signal paths rendered as SVG:
- Top path: Clean signal (sine wave, smooth) → AI Agent → Amplified clean output
- Bottom path: Noisy signal (jagged, irregular) → AI Agent → Amplified chaos

This makes the DORA "amplifier" thesis instantly visual without a word of explanation.

**3. Slide 10 — Stage Visualization Components**  
Each pipeline stage has a mini embedded visualization (inspired by AutoSpec's PipelineSlide.tsx custom components):

| Stage | Mini-visualization |
|-------|-------------------|
| 1. Intent | Terminal: `spec-kit gen spec --from PROJ-421` → `⛔ Coding blocked until spec.approved = true` |
| 2. Constraints | Tree diagram: `constitution.md → [stack, security, perf, SSDLC]` |
| 3. Planning | Kanban: `To Do → In Progress → Done` with task cards |
| 4. Execution (Bolt) | TDD cycle: `🔴 Write test → 🟢 Run → ✅ Implement → 🔄 Refactor` |
| 5. Testing | Test runner: `23 tests: 22 ✅ passed · 1 ❌ TC-12 Waitlist promotion on cancel` |
| 6. Observability | Telemetry panel: flat baseline → spike → `⚠ Anomaly: auth p99 +340ms → Auto-issue created` |

**4. Slide 11 — Animated Harness**  
The arch diagram gains a visual data-flow animation: glowing dots travel along the edges (spec → harness → agent → HITL → production), showing the flow of constraints and approvals.

---

## Implementation Checklist

```
[ ] Create src/slides/slides-en.ts with the 20-slide array (TypeScript, slide schemas above)
[ ] Update src/config.ts (title, background: 'circuits', branding)
[ ] Verify all slides build: npm run build
[ ] Test scrollable slides (Slides 4 and 10) — Space bar scrolls, arrows navigate
[ ] Verify stats slides with long labels render without overflow on mobile
[ ] Verify code slide line highlights display correctly
[ ] Verify diagram slides render edges with correct labels
[ ] Test on Aurora theme (default)
[ ] Smoke-test keyboard navigation: all 20 slides reachable
[ ] Commit and push to claude/agentic-sdlc-presentation-tzcizz
```

---

## Key Statistics — Verify Before Presenting

| Stat | Source | URL |
|------|--------|-----|
| −19% productivity (METR RCT) | METR, July 2025 | arxiv.org/pdf/2507.09089 |
| DORA amplifier thesis | Google DORA 2025 | dora.dev/dora-report-2025 |
| 84% developer adoption | Stack Overflow 2025 | stackoverflow.com/survey |
| ~1.7× AI defect rate | CodeRabbit, Dec 2025 | coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report |
| 65% vibe-coded apps vulnerable | CSA / Escape.tech, 2026 | labs.cloudsecurityalliance.org |
| 10× security findings Fortune 50 | CSA empirical study, 2026 | labs.cloudsecurityalliance.org |
| 30.8% PR cycle speedup | Atlassian / ICSE 2026 | atlassian.com/blog/artificial-intelligence/developer-productivity-improved-with-rovo-dev |
| 230% ROI Forrester TEI | Forrester, 2026 | forrester.com |
| >40% projects cancelled by 2027 | Gartner, 2026 | gartner.com |
| $28B → $127B market (2024→2029) | Analyst consensus | Multiple sources |
| 65% developers expect role redefinition | WEF 2026 | weforum.org |
| 73% AI projects abandoned in 6 months | Multiple sources | Cross-validated |

---

## Slide Count Summary

| Act | Slides | Type Distribution |
|-----|--------|-------------------|
| Act 1 — Hook | 1–3 | title, stats, content |
| Act 2 — Crisis | 4–7 | timeline (scrollable), stats, content, quote |
| Act 3 — Governed | 8–12 | comparison, content, timeline (scrollable), diagram, code |
| Act 4 — In Practice | 13–16 | comparison, diagram, content, stats |
| Act 5 — Future | 17–18 | timeline, content |
| Coda | 19–20 | quote, final |
| **Total** | **20** | **7 types used across 20 slides** |

**Two scrollable slides** (4 and 10) provide the non-linear depth moments. All others are standard single-screen slides. Estimated presentation time at 90 sec/slide: 30 minutes with the scrollable slides adding 2–3 minutes each = **~35 minutes total**.
