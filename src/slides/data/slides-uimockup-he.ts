import type { SlideData } from '../../engine/types';

export const slidesUimockupHE: SlideData[] = [
  // 1. TITLE
  {
    type: 'title',
    title: 'AutoDeck Dashboard',
    subtitle: 'מערכת עיצוב v2.0',
    tagline: 'טוקן אחד. כל מסך. אפס סטייה.',
    presenter: 'צוות העיצוב של AutoDeck',
    badge: 'v2.0 Preview',
  },

  // 2. QUOTE
  {
    type: 'quote',
    title: 'הבעיה',
    question: 'למה כל מסך חדש מרגיש כאילו נבנה על ידי צוות אחר?',
    points: [
      '🎨  למוצר ממוצע יש 47 גוני כחול — אף אחד מהם לא מכוון',
      '🔧  סטיית קומפוננטות גורמת ל-30% מבאגי ה-UI ועבודת העיצוב מחדש',
      '📐  מעצבים ומפתחים מדברים שפות שונות כברירת מחדל',
    ],
  },

  // 3. CONTENT — 4 DS pillars + token counts
  {
    type: 'content',
    title: 'עמודי מערכת העיצוב',
    subtitle: 'נבנה פעם אחת, עקיב בכל מקום',
    cards: [
      { icon: '🎨', title: 'טוקני עיצוב', description: '180 טוקנים סמנטיים לצבע, ריווח וטיפוגרפיה — מקור אמת יחיד.' },
      { icon: '🧱', title: 'ספריית קומפוננטות', description: '64 קומפוננטות מוכחות, כל אחת עם וריאנטים, מצבים ונגישות מובנית.' },
      { icon: '📐', title: 'גריד פריסה', description: 'גריד אדפטיבי של 12 עמודות, מערכת ריווח של 8 נקודות, נקודות שבירה רספונסיביות ב-4 גדלים.' },
      { icon: '✏️', title: 'שפת תנועה', description: 'עקומות תזמון ומשכים עקביים — כל אינטראקציה מרגישה מכוונת.' },
    ],
    metrics: [
      { label: 'טוקנים', value: '180' },
      { label: 'קומפוננטות', value: '64' },
      { label: 'מסכים', value: '12' },
      { label: 'כיסוי', value: '100%' },
    ],
  },

  // 4. STATS
  {
    type: 'stats',
    title: 'החזר השקעה — מערכת עיצוב',
    subtitle: 'לפני ואחרי אימוץ AutoDeck DS',
    stats: [
      { value: '180', label: 'טוקני עיצוב' },
      { value: '64', label: 'קומפוננטות' },
      { value: '70%', label: 'מסכים מהר יותר' },
      { value: '0', label: 'בעיות סטייה' },
    ],
    leftLabel: 'בלי מערכת עיצוב',
    rightLabel: 'עם AutoDeck DS',
    leftItems: ['47 ערכי צבע אד-הוק', '3–5 ימים למסך חדש', '30% באגי UI מסטייה', 'Figma ≠ קוד תמיד'],
    rightItems: ['180 טוקנים סמנטיים', '0.5 ימים למסך חדש', '0% בעיות סטייה', 'Figma = קוד תמיד'],
    bottomLine: 'שפת עיצוב אחת — עלות תרגום אפס',
  },

  // 5. TIMELINE — 5-step design-to-code
  {
    type: 'timeline',
    scrollable: true,
    title: 'תהליך עיצוב ← קוד',
    subtitle: 'מרעיון למסך פרוס — זרימה אחידה',
    steps: [
      { number: 1, title: 'סנכרון טוקנים', subtitle: 'טוקני עיצוב מיוצאים מ-Figma Tokens plugin כ-JSON', time: '1min', output: 'tokens.json → src/design-tokens.ts נוצר אוטומטית' },
      { number: 2, title: 'מפרט קומפוננטה', subtitle: 'כל קומפוננטה מפורטת עם וריאנטים, props ודרישות נגישות', time: '30min', output: 'components/Button.spec.md עם קריטריוני קבלה' },
      { number: 3, title: 'יצירת קוד', subtitle: 'סוכן AI של AutoSpec מממש קומפוננטה ממפרט + ערכי טוקנים', time: '5min', output: 'src/components/Button.tsx + סיפור Storybook' },
      { number: 4, title: 'בדיקות ויזואליות', subtitle: 'השוואת צילומי מסך ב-Storybook + ביקורת נגישות + בדיקת viewport נייד', time: '2min', output: 'כל הסיפורים עברו — 0 הפרות נגישות' },
      { number: 5, title: 'פריסה + פרסום', subtitle: 'קומפוננטה נדחפת לחבילת npm + תיעוד Storybook מעודכן', time: '1min', output: '@autodeck/ds v2.0.1 פורסם — 64 קומפוננטות' },
    ],
  },

  // 6. MOCKUP — Dashboard wireframe
  {
    type: 'mockup',
    title: 'מסך הדשבורד',
    subtitle: 'תצוגת האנליטיקה הראשית — סרגל ניווט, מדדי גיבור וגריד כרטיסים',
    displayMode: 'browser',
    url: 'app.autodeck.io/dashboard',
    blocks: [
      { type: 'navbar', label: 'ניווט' },
      { type: 'hero', label: 'מדדי גיבור' },
      { type: 'card-grid', label: 'כרטיסי KPI' },
      { type: 'chart-bar', label: 'תרשים פריסות' },
    ],
  },

  // 7. MOCKUP — Backlog screen
  {
    type: 'mockup',
    title: 'מסך הבאקלוג',
    subtitle: 'תצוגת ניהול ספרינט — ניווט צד ותצוגת כרטיסים',
    displayMode: 'browser',
    url: 'app.autodeck.io/backlog',
    blocks: [
      { type: 'navbar', label: 'ניווט' },
      { type: 'sidebar', label: 'סרגל ספרינט' },
      { type: 'table', label: 'טבלת כרטיסים' },
    ],
  },

  // 8. MOCKUP — flow mode, 3 mini-frames
  {
    type: 'mockup',
    title: 'זרימת הצטרפות משתמש',
    subtitle: 'זרימה בת שלושה שלבים מהרשמה עד המצגת הראשונה',
    displayMode: 'flow',
    frames: [
      {
        url: 'autodeck.io/signup',
        blocks: [{ type: 'hero' }, { type: 'form' }],
      },
      {
        url: 'autodeck.io/setup',
        blocks: [{ type: 'navbar' }, { type: 'card-grid' }],
      },
      {
        url: 'autodeck.io/dashboard',
        blocks: [{ type: 'navbar' }, { type: 'chart-bar' }],
      },
    ],
  },

  // 9. COMPARISON
  {
    type: 'comparison',
    title: 'עיצוב ידני מול מערכת עיצוב',
    subtitle: 'העלות האמיתית של בנייה בלי מערכת',
    left: {
      label: 'עיצוב ידני',
      color: 'red',
      items: [
        { icon: '🎨', text: 'צבע חדש נבחר בכל ספרינט' },
        { icon: '🔧', text: '30% מה-PRs דורשים עיצוב מחדש' },
        { icon: '📐', text: 'Figma וקוד תמיד מתבדלים' },
        { icon: '🐛', text: 'סטייה גורמת לבאגי UI בלתי ניתנים למעקב' },
      ],
    },
    right: {
      label: 'AutoDeck Design System',
      color: 'purple',
      items: [
        { icon: '🎯', text: '180 טוקנים — אפס ערכים אד-הוק' },
        { icon: '✅', text: 'קומפוננטות מפורטות לפני הקוד' },
        { icon: '🔗', text: 'טוקני Figma מסונכרנים לקוד תוך דקה' },
        { icon: '⚡', text: '70% מהיר יותר במסירת מסכים חדשים' },
      ],
    },
    callout: 'צוותים על AutoDeck DS מספקים מסכים חדשים 70% מהר יותר ללא בעיות סטייה',
  },

  // 10. FINAL
  {
    type: 'final',
    title: 'AUTODECK DS',
    tagline: 'שפת עיצוב אחת. כל מסך. עקיבות לנצח.',
  },
];
