import type { SlideData } from '../../engine/types';

export const slidesLearnflowEN: SlideData[] = [
  {
    type: 'title',
    title: 'LearnFlow',
    subtitle: 'Adaptive Learning That Actually Adapts',
    tagline: 'Retention up. Dropout down. Learning unlocked.',
    presenter: 'Noa Ben-David, LearnFlow',
    badge: 'Beta 2026',
  },
  {
    type: 'quote',
    title: 'The Learning Problem',
    question: 'Why do 70% of students abandon online courses before week 3?',
    points: [
      '🧠  The forgetting curve is brutal — content vanishes from memory within 48 hours without reinforcement',
      '📺  Passive video watching creates the illusion of learning — no feedback loop, no retention',
      '⏩  One-size-fits-all pacing lets the fastest learner set the tempo, leaving everyone else behind',
    ],
  },
  {
    type: 'stats',
    title: 'LearnFlow vs The Alternative',
    stats: [
      { label: 'Course Completion Rate', value: '92%' },
      { label: 'Faster Concept Mastery', value: '3.2×' },
      { label: 'Dropout Reduction', value: '68%' },
      { label: 'Average NPS Score', value: '4.8' },
    ],
    leftLabel: 'Traditional LMS',
    rightLabel: 'LearnFlow',
    leftItems: [
      'Fixed-pace modules with no adaptation',
      'Completion rates below 15% industry-wide',
      'No insight into what students actually retained',
      'One video, one quiz, repeat until bored',
    ],
    rightItems: [
      'AI-personalised path for every learner',
      '92% average course completion rate',
      'Real-time mastery map per student per concept',
      'Spaced repetition that fights the forgetting curve',
    ],
    bottomLine: 'Students who finish actually remember what they learned.',
  },
  {
    type: 'content',
    title: 'Platform Features',
    subtitle: 'Three pillars of adaptive learning',
    cards: [
      {
        icon: 'Brain',
        title: 'AI Tutor Engine',
        description: "Real-time adaptation to each student's pace and knowledge gaps",
      },
      {
        icon: 'RefreshCw',
        title: 'Spaced Repetition',
        description: 'Flashcard review cycles timed to the forgetting curve',
      },
      {
        icon: 'TrendingUp',
        title: 'Live Progress Tracker',
        description: 'Students and teachers see mastery in real time',
      },
    ],
    metrics: [
      { label: 'Students', value: '12,000+' },
      { label: 'Institutions', value: '48' },
      { label: 'Subjects', value: '200+' },
      { label: 'Languages', value: '14' },
    ],
  },
  {
    type: 'timeline',
    scrollable: true,
    title: 'Student Onboarding Journey',
    steps: [
      {
        number: '1',
        title: 'Day 1: Diagnostic Assessment',
        subtitle: '12-question adaptive quiz maps your knowledge baseline',
        time: 'Day 1',
        output: 'Personalised learning path',
      },
      {
        number: '2',
        title: 'Day 2: First Adaptive Lesson',
        subtitle: 'Content difficulty auto-adjusts based on your quiz results',
        time: 'Day 2',
        output: 'First mastery milestone',
      },
      {
        number: '3',
        title: 'Week 1: Habit Loop Formation',
        subtitle: 'Daily micro-sessions of 10–15 minutes build the learning habit',
        time: 'Week 1',
        output: 'Streak established',
      },
      {
        number: '4',
        title: 'Week 2: AI Adaptation Kicks In',
        subtitle: "The AI tutor recalibrates based on your first week's patterns",
        time: 'Week 2',
        output: 'Personalised difficulty curve',
      },
      {
        number: '5',
        title: 'Week 4: Mastery Check',
        subtitle: 'End-of-module assessment compares to Day 1 baseline',
        time: 'Week 4',
        output: 'Completion certificate',
      },
    ],
  },
  {
    type: 'comparison',
    title: 'LearnFlow vs Traditional Classroom',
    left: {
      label: 'Traditional',
      color: 'red',
      items: [
        { icon: '❌', text: 'Fixed syllabus pace — no adaptation to individual speed' },
        { icon: '❌', text: 'Feedback arrives days later via graded assignments' },
        { icon: '❌', text: 'Teacher has no visibility into real-time comprehension' },
        { icon: '❌', text: 'Struggling students fall behind silently until it is too late' },
      ],
    },
    right: {
      label: 'LearnFlow',
      color: 'emerald',
      items: [
        { icon: '✅', text: 'AI-personalised path adjusts difficulty after every answer' },
        { icon: '✅', text: 'Instant micro-feedback after every question or exercise' },
        { icon: '✅', text: 'Live mastery dashboard visible to both student and teacher' },
        { icon: '✅', text: 'Early-warning alerts flag at-risk learners before dropout' },
      ],
    },
    callout: 'Students learn 3× faster with real-time feedback loops.',
  },
  {
    type: 'diagram',
    mode: 'arch',
    title: 'Platform Architecture',
    subtitle: 'AI-native from the ground up',
    nodes: [
      { id: 'student', label: 'Student', sublabel: 'Mobile / Web', col: 0, row: 1 },
      { id: 'mobile', label: 'Mobile App', sublabel: 'iOS · Android', col: 1, row: 0 },
      { id: 'web', label: 'Web App', sublabel: 'React SPA', col: 1, row: 2 },
      { id: 'ai', label: 'AI Tutor Engine', sublabel: 'Claude + fine-tune', col: 2, row: 1, color: 'violet' },
      { id: 'lms', label: 'LMS Backend', sublabel: 'Node · PostgreSQL', col: 3, row: 0, color: 'emerald' },
      { id: 'analytics', label: 'Analytics', sublabel: 'Real-time events', col: 3, row: 2, color: 'amber' },
    ],
    autoEdges: true,
    edges: [],
  },
  {
    type: 'closing',
    title: 'Join the Beta',
    install: 'learnflow.io/beta',
    commands: [
      { cmd: 'Sign up free', desc: 'No credit card required' },
      { cmd: 'Invite your class', desc: '30 students free forever' },
      { cmd: 'Track mastery live', desc: 'Real-time dashboard from day one' },
    ],
    links: [
      { url: 'https://learnflow.io', label: 'LearnFlow' },
      { url: 'https://learnflow.io/docs', label: 'Docs' },
      { url: 'https://learnflow.io/pricing', label: 'Pricing' },
    ],
    tagline: 'Learning that grows with every student.',
  },
  {
    type: 'final',
    title: 'LearnFlow',
    tagline: 'Personalised learning for every mind.',
  },
];
