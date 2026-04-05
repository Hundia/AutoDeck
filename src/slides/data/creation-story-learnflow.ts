import type { CreationStory } from '../../engine/types';

export const learnflowCreationStory: CreationStory = {
  totalPrompts: 5,
  totalMinutes: 18,
  prompts: [
    {
      label: 'Initial Brief',
      framework: 'Claude Code',
      prompt:
        'Read SKILL.md and create a 9-slide EdTech pitch deck for LearnFlow, an adaptive learning platform.\n\nCover these topics in order:\n1. Title slide — brand and tagline\n2. The learning problem — why students drop out (forgetting curve, passive video, one-size pacing)\n3. Stats slide — 4 hero metrics showing LearnFlow vs traditional LMS\n4. Platform features — 3 core pillars (AI Tutor, Spaced Repetition, Progress Tracker)\n5. Student onboarding journey — 5-step scrollable timeline from Day 1 to Week 4\n6. Comparison slide — LearnFlow vs traditional classroom, 4 items each side\n7. Platform architecture diagram — arch mode, Student → Mobile/Web → AI Tutor → LMS + Analytics\n8. Closing / beta CTA — sign-up link, 3 action commands\n9. Final slide — brand sign-off\n\nPresenter: Noa Ben-David, LearnFlow. Badge: Beta 2026. Use constellation background.',
    },
    {
      label: 'Stats Slide',
      framework: 'Claude Code',
      prompt:
        'For the stats slide (slide 3), I want 4 hero metrics: 92% Course Completion Rate, 3.2× Faster Concept Mastery, 68% Dropout Reduction, 4.8 Average NPS Score.\n\nAlso add leftLabel "Traditional LMS" and rightLabel "LearnFlow" with 4 before/after comparison strings each — one sentence per item describing the pain point on the left and the LearnFlow fix on the right. Add a bottomLine: "Students who finish actually remember what they learned."',
    },
    {
      label: 'Comparison Slide',
      framework: 'Claude Code',
      prompt:
        'For the comparison slide (slide 6), use left color "red" and right color "emerald". Each side needs exactly 4 items as objects with icon and text fields — use ❌ icons on the left (Traditional) and ✅ icons on the right (LearnFlow).\n\nLeft items should cover: fixed pace, delayed feedback, no teacher visibility, silent struggling students.\nRight items should cover: AI-personalised path, instant micro-feedback, live mastery dashboard, early-warning alerts.\n\nAdd callout: "Students learn 3× faster with real-time feedback loops."',
    },
    {
      label: 'Diagram Connections',
      framework: 'Claude Code',
      prompt:
        'The diagram nodes look right but I need to add the edges connecting Student → Mobile App → AI Tutor Engine → LMS Backend, and Web App → AI Tutor Engine → Analytics. Can you add the edges array?',
    },
    {
      label: 'Hebrew Investor Version',
      framework: 'Claude Code',
      prompt:
        'Create a parallel Hebrew version of all 9 slides in a new file slides-learnflow-he.ts. Translate all titles, subtitles, taglines, card descriptions, stats labels, timeline steps, comparison items, and CTA text into Hebrew. The presenter name stays as "נועה בן-דוד, LearnFlow".\n\nNote: RTL layout is auto-detected for Hebrew — no layout changes needed on my end. The investor audience reads right-to-left so the comparison slide especially needs to feel natural in Hebrew.',
    },
  ],
  decisions: [
    {
      slide: 2,
      decision:
        'Chose question format ("Why do 70% of students abandon…") over a bullet headline — the question creates emotional immediacy and invites the audience to lean in before the answer is revealed.',
    },
    {
      slide: 3,
      decision:
        'Stats slide placed at slide 3 rather than a comparison slide — concrete metrics anchor credibility before we introduce features, so the audience has numbers to hold onto during the product walkthrough.',
    },
    {
      slide: 4,
      decision:
        '3 feature cards (not 4) keeps focus on the three core differentiators: AI adaptation, spaced repetition, and live tracking. A fourth card would dilute the message.',
    },
    {
      slide: 5,
      decision:
        'Timeline is scrollable so the full 5-step onboarding journey from Day 1 to Week 4 fits without cramming. Investors can see the complete student experience arc in one slide.',
    },
    {
      slide: 6,
      decision:
        'Comparison slide placed after the features slide so the audience already understands what LearnFlow does before seeing it contrasted with the traditional classroom.',
    },
    {
      slide: 7,
      decision:
        'Architecture diagram placed last before the CTA to show technical depth to investor technical advisors — it rewards anyone who stayed engaged through the product story.',
    },
  ],
  frameworkNotes: {
    'Claude Code':
      'Handled the full presentation in one context. RTL Hebrew translation worked perfectly out of the box — investors read the comparison slide in their own language. The diagram connections no longer needed a follow-up prompt — adding autoEdges: true with edges: [] lets the renderer auto-chain nodes left-to-right by column, so the architecture flow wires itself up without any manual edge definitions.',
  },
};
