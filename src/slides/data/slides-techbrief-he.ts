import type { SlideData } from '../../engine/types';

export const slidesTechbriefHE: SlideData[] = [
  // 1. TITLE
  {
    type: 'title',
    title: 'AutoSpec',
    subtitle: 'פיתוח מונחה-מפרט בקנה מידה גדול',
    tagline: 'שלחו מהר. שברו פחות. ישנו יותר.',
    presenter: 'צוות AutoDeck',
    badge: 'ספרינט 40',
  },

  // 2. QUOTE — spec drift problem
  {
    type: 'quote',
    title: 'הבעיה',
    question: 'למה מהנדסים מעולים מספקים פיצ\'רים שאף אחד לא מפרט?',
    points: [
      '📋  60% מהבאגים נובעים מדרישות מעורפלות או חסרות',
      '🔄  סטייה בין מפרט לקוד עומדת בממוצע על 3 חריגות מרכזיות לספרינט',
      '⏰  צוותים מבלים 40% מזמן הספרינט על הבהרות במקום לבנות',
    ],
  },

  // 3. CONTENT — 4 deliverables + 4 metrics
  {
    type: 'content',
    title: 'מה AutoSpec מספק',
    subtitle: 'ארבעה עמודי תווך לביטחון מונחה-מפרט',
    cards: [
      { icon: '📐', title: 'מפרטים חיים', description: 'מפרטים שמתפתחים עם הקוד שלכם — לעולם לא מיושנים, תמיד סמכותיים.' },
      { icon: '🤖', title: 'תזמור בינה מלאכותית', description: 'סוכנים מבוססי Claude מתכננים, מממשים ומבצעים QA לכל טיקט ברצף.' },
      { icon: '🔁', title: 'QA לולאה סגורה', description: 'כל טיקט עובר שער בנייה → בדיקות → תיעוד לפני סימון ✅ הושלם.' },
      { icon: '📊', title: 'אנליטיקת ספרינט', description: 'מעקב מהירות, burndown ונתוני רטרוספקטיבה מופקים אוטומטית.' },
    ],
    metrics: [
      { label: 'ספרינטים', value: '40+' },
      { label: 'נקודות שנמסרו', value: '443' },
      { label: 'אחוז השגת טיקטים', value: '97%' },
      { label: 'ממוצע נק\' לספרינט', value: '38' },
    ],
  },

  // 4. TIMELINE — 5 sprint execution steps (scrollable)
  {
    type: 'timeline',
    scrollable: true,
    title: 'תהליך הרצת הספרינט',
    subtitle: 'מ-backlog לפריסה — ניתן לחזרה בכל ספרינט',
    steps: [
      { number: 1, title: 'גיזום ה-Backlog', subtitle: 'מנהל המוצר כותב טיקטים עם בעלים, מודל, נקודות ותלויות — ללא עמימות', time: '15 דק\'', output: 'specs/backlog.md מעודכן עם טיקטים 🔲' },
      { number: 2, title: 'בריף אורכסטרטור', subtitle: 'Opus כותב agents/sprint-N-brief.md — חבילת הקשר לכל סוכני Sonnet', time: '5 דק\'', output: 'agents/sprint-N-brief.md נוצר עם נתיבי קבצים ומוסכמות' },
      { number: 3, title: 'הרצה מקבילה', subtitle: 'טיקטים עצמאיים מוגזמים כסוכני Sonnet מקבילים — ללא זמן סרק', time: 'N×מקביל', output: 'כל סוכן מבצע commit לקוד ומעדכן backlog 🔄→🧪' },
      { number: 4, title: 'QA + שער בנייה', subtitle: 'npm run build יוצא 0; בדיקות עשן עוברות; אין שגיאות console', time: '2 דק\'', output: 'כל הבדיקות ירוקות; בדיקה ויזואלית הושלמה' },
      { number: 5, title: 'סגירת ספרינט', subtitle: 'סיכום נכתב, backlog ✅, תגית git נוצרת, push ל-GitHub Pages', time: '10 דק\'', output: 'sprints/sprint-N/summary.md + תגית git sprint-N-complete' },
    ],
  },

  // 5. DIAGRAM — arch mode, 5 nodes
  {
    type: 'diagram',
    mode: 'arch',
    title: 'ארכיטקטורת AutoSpec',
    subtitle: 'כיצד האורכסטרטור, הסוכנים וה-backlog מתחברים',
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
    title: 'מחזור חיי הטיקט',
    subtitle: 'מיצירה לסגירה — תהליך AutoSpec',
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
    title: 'מודל הנתונים',
    subtitle: 'ספרינט, טיקט ופלט — סכמת AutoSpec',
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
    title: 'קונפיגורציית ספרינט כקוד',
    subtitle: 'כל ספרינט מוגדר ב-YAML מובנה — ללא עמימות',
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
      '▶  מאמת קונפיגורציית ספרינט... אישור',
      '▶  פותר גרף תלויות... 8 אצוות',
      '✅ ספרינט 40 מוכן — 14 טיקטים, 3 שלבים',
    ],
  },

  // 9. STATS
  {
    type: 'stats',
    title: 'AutoSpec במספרים',
    subtitle: 'ארבע שנות פיתוח מונחה-מפרט',
    stats: [
      { value: '443', label: 'נקודות שנמסרו' },
      { value: '97%', label: 'אחוז השגת טיקטים' },
      { value: '40+', label: 'ספרינטים שהושלמו' },
      { value: '<2min', label: 'זמן בנייה' },
    ],
    leftLabel: 'ללא AutoSpec',
    rightLabel: 'עם AutoSpec',
    leftItems: ['40% ספרינט על הבהרות', '3 חריגות מפרט/ספרינט', 'QA ידני לכל טיקט', 'פריסה 1/ספרינט'],
    rightItems: ['5% ספרינט על הבהרות', '0.1 חריגות מפרט/ספרינט', 'שער בנייה אוטומטי', '12+ פריסות/ספרינט'],
    bottomLine: 'מהאקרים בודדים עד צוותי אנטרפרייז — AutoSpec גדל איתכם',
  },

  // 10. CLOSING
  {
    type: 'closing',
    title: 'התחילו את הספרינט המונחה-מפרט הראשון שלכם',
    install: 'npx autospec init',
    commands: [
      { cmd: '/plan-sprint', desc: 'בינה מלאכותית מתכננת את הספרינט הבא מה-backlog' },
      { cmd: '/sprint-run 1', desc: 'הרצת ספרינט מקצה לקצה, ללא קונפיגורציה' },
      { cmd: '/sprint-close 1', desc: 'סגירה, סיכום, תיוג ודחיפה' },
    ],
    links: [
      { url: 'https://github.com/Hundia/AutoDeck', label: 'GitHub' },
      { url: 'https://hundia.github.io/AutoDeck/', label: 'הדגמה חיה' },
    ],
    tagline: 'הספרינט הבא שלכם מתחיל במפרט.',
  },
];
