# Sprint 50 Agent Brief — "מהדמו לפרודקשן" (Dr. Yuval Dror Q&A deck)

You are a Sonnet implementation agent on the AutoDeck framework (`/opt/autodeck`). Build a Hebrew (RTL) editorial presentation from a department head's interview answers to Dr. Yuval Dror about leading AI adoption.

## READ FIRST (authoritative — read before writing any code)
1. `src/engine/types.ts` — the `SlideData` union + every slide interface. Match field names EXACTLY.
2. `src/slides/slides-he.ts` — a complete live Hebrew deck using every slide type. Copy its structure/idioms (quoting style, emoji-prefixed point strings, comparison color values).
3. `src/slides/data/creation-story-meta.ts` and `src/slides/data/creation-story-acme.ts` — the `CreationStory` shape for ticket 50.2.

## Conventions (do not break)
- TypeScript: `import type { SlideData } from '../../engine/types';` (note the `../../` from `src/slides/data/`).
- Hebrew text only — RTL is fully automatic for `he` (handled in `PresentationViewer.tsx`). Do NOT add `dir`, `text-align`, or any layout overrides.
- NO new npm dependencies. NO changes to engine/themes/other decks.
- **Content fidelity rule:** keep the speaker's own words; do NOT invent metrics. There is intentionally **no `stats` slide and no `code` slide** — the source argues against hype-metrics, so fabricated numbers would betray its thesis. Use only the types specified below.
- Comparison `color` values must be from the allowed set seen in `slides-he.ts` (`red`, `green`, `amber`, `blue`, `violet`, `cyan`, etc.).
- After implementing, update `specs/backlog.md`: tickets 50.1 and 50.2 status 🔲 → 🧪.

---

## TICKET 50.1 — Create `src/slides/data/slides-demotoprod-he.ts`

Export `export const slidesDemoToProdHE: SlideData[] = [ ... ]` with these 12 slides, verbatim content (transcribe the Hebrew below exactly into the correct schema fields):

### Slide 1 — `title`
- title: `מהדמו לפרודקשן`
- subtitle: `למה הבינה המלאכותית כבר לא סיפור של מודלים — אלא של הנדסת תוכנה`
- tagline: `מהדמו. לפרודקשן. באחריות הנדסית.`
- badge: `בעקבות שיחה עם ד״ר יובל דרור`
- presenter: `אלי הונדיה`

### Slide 2 — `quote`  (פתיח אישי)
- title: `פתיח אישי`
- question: `הטעות הראשונה בהטמעת AI היא לקרוא לזה "הטמעת AI".`
- points:
  - `🧠  ברגע שקוראים לזה "כלי" — מפספסים את העומק`
  - `📚  זה שינוי באופן שבו ידע נוצר ועבודה מתבצעת`
  - `⚖️  זה שינוי באופן שבו אחריות מתחלקת`
  - `🛠️  ובאופן שבו מהנדסים מבינים את המקצוע שלהם`

### Slide 3 — `content`  (Q1)
- title: `מי אני ומה הובלתי`
- subtitle: `ראש מחלקה לפיתוח מערכות תוכנה ענניות לעולמות המודיעין — כ-85 מהנדסים`
- cards:
  - { icon: `⚙️`, title: `ציר תהליכי הפיתוח`, description: `AI נכנס להנדסת מערכת, ארכיטקטורה, פיתוח, בדיקות ותיעוד — כתפיסת עבודה מקצה לקצה, לא ככלי צדדי.` }
  - { icon: `🚀`, title: `ציר המוצר`, description: `צוות שמכניס Features מבוססי-AI אל המוצרים — כי המודלים כבר קיימים, והאתגר הוא המערכת שנבנית סביבם.` }

### Slide 4 — `comparison`  (Q1 dichotomy)
- title: `ההבדל המהותי`
- subtitle: `בין התקנה לבנייה`
- left: { label: `להתקין כלי`, color: `red`, items: [
    { icon: `🔌`, text: `מתקינים תוסף ל-IDE` },
    { icon: `✨`, text: `מראים דמו מרשים` },
    { icon: `⏱️`, text: `אירוע חד-פעמי` } ] }
- right: { label: `לבנות בית הנדסי חדש`, color: `green`, items: [
    { icon: `🏗️`, text: `בונים תרבות הנדסית` },
    { icon: `🔗`, text: `מחברים מידע, הרשאות, כלים ותהליכים` },
    { icon: `🔁`, text: `תפיסת עבודה מתמשכת` } ] }
- callout: `הלקוח לא קונה מודל — הוא קונה יכולת שעובדת בתוך מערכת אמיתית.`

### Slide 5 — `quote`  (Q2)
- title: `האתגר הניהולי`
- question: `האתגר הכי גדול לא היה טכנולוגי — הוא היה תודעתי.`
- points:
  - `🌍  המקצוע עצמו התחיל לזוז מתחת לרגליים`
  - `🏆  אנשים טובים מאמינים שהמצוינות של אתמול תספיק גם מחר`
  - `❓  AI מאלץ לשאול: מה הערך שלי כמהנדס, כמנהל, כארכיטקט`
  - `🎯  האתגר: לא לגרום להם להשתמש — אלא להבין שזה כבר המקצוע שלהם`

### Slide 6 — `timeline`  (Q3) — set `scrollable: true`
- title: `פריצת הדרך`
- subtitle: `מדחיפה מבחוץ — לתפיסת עבודה אחראית`
- steps:
  - { number: 1, title: `דחיפה מבחוץ`, subtitle: `דחפתי, ביקשתי, הקמתי פורום משפיעני AI — דברים זזו, אבל לא בקצב ולא בעומק שנדרשו`, time: `שלב 1` }
  - { number: 2, title: `ההבנה`, subtitle: `חלק מהבעיה היה אצלי: דרשתי התקדמות בלי לדעת מספיק טוב איך נראה שימוש בוגר`, time: `שלב 2` }
  - { number: 3, title: `הפשלתי שרוולים`, subtitle: `חודש שהפך לחודשיים של חיכוך אמיתי עם הכלים — למדתי, ניסיתי, טעיתי, בדקתי מתודולוגיות`, time: `חודשיים`, output: `לא "ראיתי דמו" — אלא hands-on` }
  - { number: 4, title: `תפיסת עבודה`, subtitle: `הצגתי לכל המחלקה תפיסה ברורה ואחראית — Spec Driven Development`, time: `שלב 4`, output: `מפינת הטריקים → פיתוח הנדסי מבוקר` }
  - { number: 5, title: `ציפייה ניהולית`, subtitle: `"בתוך חודש אני עובר צוות-צוות ורואה איך זה מוטמע בפועל" — לא הסתפקתי בהשראה`, time: `חודש` }
  - { number: 6, title: `פריצת הדרך`, subtitle: `יש סדר בתוך הכאוס; זו ציפייה ניהולית קונקרטית; והמנהל עצמו בתוך האירוע`, time: `התוצאה`, output: `מ"יוזמת חדשנות" → לחלק מהניהול השוטף` }

### Slide 7 — `quote`  (Q4)
- title: `העצה החשובה ביותר`
- question: `אל תנהלו את האירוע הזה מבחוץ.`
- points:
  - `🧭  מנהיגות ניהולית חייבת להיות גם טכנו-ניהולית`
  - `🎭  להבחין בין צעצוע לפרודקשן, בין קסם על הבמה לאחריות הנדסית`
  - `👏  לא למחוא כפיים לדמו — אלא לשאול את השאלות הקשות`
  - `🚫  אל תעשו outsourcing להבנה שלכם`

### Slide 8 — `content`  (Q4 hard questions)
- title: `השאלות הקשות שמנהל חייב לשאול`
- subtitle: `לא "מרשים" — אלא אחראי`
- cards:
  - { icon: `🧪`, title: `איכות ובדיקות`, description: `מה איכות הקוד? מה נבדק בפועל?` }
  - { icon: `🧱`, title: `קצה ואחריות`, description: `מה קורה בקצה? איפה האחריות כשמשהו נשבר?` }
  - { icon: `🔁`, title: `בגרות לפרודקשן`, description: `האם זה repeatable? האם זה מתאים לפרודקשן?` }
  - { icon: `🎲`, title: `שיטה או מזל`, description: `יש כאן שיטה — או שפשוט התמזל?` }

### Slide 9 — `comparison`  (Q5)
- title: `אשליית ההתקדמות`
- subtitle: `תנועה היא לא בהכרח התקדמות. מהירות היא לא בהכרח בגרות.`
- left: { label: `אשליית התקדמות`, color: `red`, items: [
    { icon: `📝`, text: `הרבה טקסט, הרבה קוד, הרבה תוצרים` },
    { icon: `🏃`, text: `"סיים תכולה של חודש ביומיים"` },
    { icon: `🎤`, text: `דמו מרשים ב-Vibe Coding` },
    { icon: `⚡`, text: `מהירות שמסנוורת` } ] }
- right: { label: `התקדמות אמיתית`, color: `green`, items: [
    { icon: `✅`, text: `עובד, נבדק, עומד בסטנדרטים` },
    { icon: `🔧`, text: `ניתן לתחזוקה ולא יישבר בפרודקשן` },
    { icon: `🔐`, text: `מאובטח וניתן להסבר` },
    { icon: `🧠`, text: `שיקול דעת אנושי שלא בוטל` } ] }
- callout: `אם משהו נשבר בפרודקשן — אי אפשר להגיד "אבל המודל כתב את זה".`

### Slide 10 — `comparison`  (Q6)
- title: `מה הייתי עושה אחרת`
- subtitle: `להפריד בין סיכון מידע לבין סיכון למידה`
- left: { label: `סיכון מידע`, color: `amber`, items: [
    { icon: `🔒`, text: `לנהל בזהירות קיצונית` },
    { icon: `🏛️`, text: `מסווג, מאושר, מוגן` },
    { icon: `🛡️`, text: `בלי להתפשר על כללי ביטחון` } ] }
- right: { label: `סיכון למידה`, color: `green`, items: [
    { icon: `🧪`, text: `אסור לחנוק — חייבים להתנסות` },
    { icon: `🌱`, text: `ללמוד, לטעות ולהיכשל על מידע לא מסווג` },
    { icon: `⏩`, text: `להתכונן מראש, בגבולות המותרים` } ] }
- callout: `אם מחכים שהכל יהיה מאושר ומסווג — מגלים שהעולם כבר עבר שלב.`

### Slide 11 — `content`  (Q6 actions)
- title: `להתחיל מוקדם יותר`
- subtitle: `פחות "פקק ארגוני" בין ההבנה שהעולם משתנה ליכולת להתכונן אליו`
- cards:
  - { icon: `🧫`, title: `סביבת התנסות`, description: `להקים מוקדם יותר סביבה לעבודה עם כלים מתקדמים על מידע לא מסווג.` }
  - { icon: `📐`, title: `מתודולוגיות`, description: `להגדיר מוקדם יותר דפוסי עבודה, מגבלות ותרחישים שבהם זה עובד.` }
  - { icon: `🗣️`, title: `שפה משותפת`, description: `לבנות מוקדם יותר שפה ניהולית והנדסית סביב AI.` }
  - { icon: `🚦`, title: `בלי פקק ארגוני`, description: `לא לחכות לאישור כדי להתחיל לחשוב — לחשוב, להתנסות ולהתכונן מראש.` }

### Slide 12 — `final`
- title: `מהדמו לפרודקשן`
- tagline: `כלי אפשר להתקין — תרבות הנדסית צריך לבנות.`

**IMPORTANT:** Confirm each slide's fields against `types.ts`. If a field name differs (e.g. `lines` vs `code`, or a required field is missing), follow `types.ts` + `slides-he.ts` as ground truth — those are authoritative over this brief's shorthand.

---

## TICKET 50.2 — Create `src/slides/data/creation-story-demotoprod.ts`

Export `export const demoToProdCreationStory` matching the `CreationStory` type used by `creation-story-meta.ts`. Make it short and honest (this deck was generated from an interview document via Claude Code / AutoDeck SDD). 3–4 prompts, a realistic minutes total. Hebrew or English labels per the existing files' convention (match `creation-story-meta.ts`).

---

## Verification before you finish
- `npx tsc --noEmit` (or `npm run build`) shows **no errors** in the two new files.
- Both files export the exact symbol names: `slidesDemoToProdHE`, `demoToProdCreationStory`.
- `specs/backlog.md`: 50.1 and 50.2 set to 🧪.
- Report: files created, the export names, and any field-name corrections you made vs this brief.
