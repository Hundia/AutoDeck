import type { SlideData } from '../engine/types';

export const slidesHE: SlideData[] = [
  // ── 1. TITLE ────────────────────────────────────────────────────────────────
  {
    type: 'title',
    title: 'Acme',
    subtitle: 'בונים את עתיד כלי הפיתוח',
    tagline: 'שלחו מהר. שברו פחות. ישנו יותר.',
    presenter: "ג'יין סמית'",
    badge: 'הדגמה חיה',
  },

  // ── 2. QUOTE ────────────────────────────────────────────────────────────────
  {
    type: 'quote',
    title: 'הבעיה',
    question: 'למה מפתחים מעולים מבזבזים חצי שבוע על פריסות?',
    points: [
      '⏳  פריסה ממוצעת לוקחת 47 דקות — 38 מהן המתנה',
      '🔥  1 מכל 4 תקלות ייצור נגרמות על ידי שינויי קונפיגורציה ידניים',
      '😴  עייפות on-call היא הסיבה מספר 1 שמפתחים עוזבים',
    ],
  },

  // ── 3. CONTENT ──────────────────────────────────────────────────────────────
  {
    type: 'content',
    title: 'תכונות מרכזיות',
    subtitle: 'כל מה שצריך כדי לשלוח בביטחון',
    cards: [
      {
        icon: '⚡',
        title: 'מהיר ברק',
        description: 'בנוי על סטק מודרני עם זמני תגובה מתחת ל-100ms ואפס cold starts.',
      },
      {
        icon: '🔐',
        title: 'מאובטח כברירת מחדל',
        description: 'הצפנה מקצה לקצה, תאימות SOC2, וסריקת פגיעויות אוטומטית.',
      },
      {
        icon: '🌍',
        title: 'קנה מידה גלובלי',
        description: 'פריסה ל-42 אזורים בעולם עם מעבר אוטומטי וקאשינג בשולי הרשת.',
      },
      {
        icon: '🧩',
        title: 'ניתן להרחבה',
        description: 'ארכיטקטורת תוספים עם 200+ אינטגרציות. בנו הרחבות מותאמות תוך דקות.',
      },
    ],
    metrics: [
      { label: 'זמינות', value: '99.99%' },
      { label: 'תגובה', value: '<50ms' },
      { label: 'אזורים', value: '42' },
      { label: 'תוספים', value: '200+' },
    ],
  },

  // ── 4. CODE ─────────────────────────────────────────────────────────────────
  {
    type: 'code',
    title: 'פריסה ב-3 שורות',
    subtitle: 'כל ה-API של Acme — ללא YAML',
    filename: 'deploy.ts',
    language: 'TypeScript',
    lines: [
      "import { Acme } from '@acme/sdk'",
      '',
      'const acme = new Acme({ token: process.env.ACME_TOKEN })',
      '',
      '// פריסה עם rollback אוטומטי בכישלון',
      'const deploy = await acme.deploy({',
      "  app: 'my-api',",
      "  image: 'ghcr.io/acme/my-api:latest',",
      '  replicas: 3,',
      "  strategy: 'rolling',",
      '  healthCheck: { path: \'/health\', timeout: 5000 },',
      '})',
      '',
      'console.log(`✅ פעיל ב-${deploy.url} תוך ${deploy.duration}ms`)',
    ],
    highlights: [6, 7, 8, 9, 10, 11, 12],
    output: [
      '▶  בונה image... הושלם (12.3s)',
      '▶  בודק health checks... עבר (3/3)',
      '▶  מעביר תעבורה 0% → 100%... הושלם',
      '✅ פעיל ב-https://my-api.acme.app תוך 18400ms',
    ],
  },

  // ── 5. COMPARISON ───────────────────────────────────────────────────────────
  {
    type: 'comparison',
    title: 'לפני ואחרי',
    subtitle: 'ראו את ההבדל ש-Acme עושה',
    left: {
      label: 'בלי Acme',
      color: 'red',
      items: [
        { icon: '🔥', text: 'פריסות ידניות שלוקחות שעות' },
        { icon: '💥', text: 'שינויים שוברים בפרודקשן' },
        { icon: '😴', text: 'סיוטי on-call בכל ספרינט' },
        { icon: '📉', text: 'מחזורי איטרציה איטיים' },
      ],
    },
    right: {
      label: 'עם Acme',
      color: 'green',
      items: [
        { icon: '🚀', text: 'פריסה בלחיצה אחת תוך שניות' },
        { icon: '🛡️', text: 'חזרה אוטומטית בשגיאות' },
        { icon: '😌', text: 'התראות פרואקטיביות לפני תקלות' },
        { icon: '⚡', text: 'מהירות שליחה פי 10' },
      ],
    },
    callout: 'צוותים שמשתמשים ב-Acme שולחים פי 10 מהר יותר עם 90% פחות תקלות',
  },

  // ── 6. TIMELINE (scrollable) ─────────────────────────────────────────────────
  {
    type: 'timeline',
    scrollable: true,
    title: 'צינור הפריסה',
    subtitle: 'מ-git push לתעבורה גלובלית — תוך 30 שניות',
    steps: [
      {
        number: 1,
        title: 'Git Push',
        subtitle: 'Webhook מפעיל את תור הבנייה של Acme מיידית',
        time: '0.1s',
        output: 'POST /webhooks/github → 202 Accepted',
      },
      {
        number: 2,
        title: 'בנייה ובדיקות',
        subtitle: 'במקביל: npm ci, TypeScript, ESLint, בדיקות יחידה',
        time: '12s',
        output: '✓ 247 בדיקות עברו  ✓ 0 שגיאות  ✓ types OK',
      },
      {
        number: 3,
        title: 'בניית Container',
        subtitle: 'Docker build עם layer cache נדחף ל-registry',
        time: '8s',
        output: 'sha256:a3f9...  נדחף ל-registry.acme.app',
      },
      {
        number: 4,
        title: 'Rolling Deploy',
        subtitle: 'replicas חדשות פעילות, health checks עברו, תעבורה הועברה',
        time: '6s',
        output: 'Replicas: 3/3 בריאים  תעבורה: 0% → 100%',
      },
      {
        number: 5,
        title: 'פעיל + מנוטר',
        subtitle: 'מדדים, לוגים ומעקב שגיאות פעילים בכל האזורים',
        time: '0s',
        output: '✅ https://my-api.acme.app  p99: 34ms  שגיאות: 0',
      },
    ],
  },

  // ── 7. STATS ────────────────────────────────────────────────────────────────
  {
    type: 'stats',
    title: 'במספרים',
    subtitle: 'נבחר על ידי צוותים ברחבי העולם',
    stats: [
      { value: '10,000+', label: 'צוותים פעילים' },
      { value: '99.99%', label: 'SLA זמינות' },
      { value: '2M+', label: 'פריסות/חודש' },
      { value: '<50ms', label: 'תגובה ממוצעת' },
    ],
    leftLabel: 'לפני Acme',
    rightLabel: 'אחרי Acme',
    leftItems: ['47 דק׳ פריסה ממוצעת', '1 מ-4 תקלות', '3 שעות MTTR', 'גרסה/שבוע'],
    rightItems: ['28 שניות פריסה', '90% פחות תקלות', '4 דקות MTTR', '12 גרסאות/שבוע'],
    bottomLine: 'מסטארטאפ עד אנטרפרייז — Acme גדל איתך',
  },

  // ── 8. CLOSING ──────────────────────────────────────────────────────────────
  {
    type: 'closing',
    title: 'התחילו היום',
    install: 'npm install @acme/sdk',
    commands: [
      { cmd: 'acme init', desc: 'חיברו את ה-repo תוך 60 שניות' },
      { cmd: 'acme deploy', desc: 'פריסה ראשונה ללא קונפיגורציה' },
      { cmd: 'acme logs --tail', desc: 'לוגים חיים בכל האזורים' },
    ],
    links: [
      { url: 'https://acme.dev/docs', label: 'תיעוד' },
      { url: 'https://acme.dev/pricing', label: 'תמחור' },
      { url: 'https://github.com/acme', label: 'GitHub' },
    ],
    tagline: 'הפריסה הבאה שלכם במרחק פקודה אחת.',
  },

  // ── 9. FINAL ────────────────────────────────────────────────────────────────
  {
    type: 'final',
    title: 'ACME',
    tagline: 'עתיד הפיתוח מתחיל כאן.',
  },
];
