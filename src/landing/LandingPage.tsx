import { motion } from 'framer-motion';
import GallerySection from './GallerySection';
import GitHubStarCounter from './GitHubStarCounter';
import {
  Grid3X3,
  Globe,
  Rocket,
  Sparkles,
  Play,
  Settings,
  Github,
  Terminal,
  ExternalLink,
  BookOpen,
  Pencil,
} from 'lucide-react';

// ─── Animation helpers ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
};

// ─── HeroSection ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Subtle dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Ambient glow blobs */}
      <motion.div
        className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto w-full">
        <span className="text-xl font-bold text-white tracking-tight">
          Auto<span className="text-blue-400">Deck</span>
        </span>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Hundia/AutoDeck"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href="#/presentation"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Launch Demo
          </a>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-white/5 border border-white/10 rounded-full text-sm text-white/60 font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
            React + Framer Motion
          </motion.div>

          {/* Title */}
          <motion.h1
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-7xl sm:text-9xl font-black tracking-tight mb-6"
            style={{
              background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 60%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(96,165,250,0.35))',
            }}
          >
            AutoDeck
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={0.25}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-xl sm:text-2xl text-white/60 mb-12 font-light leading-relaxed"
          >
            Beautiful animated presentations.
            <br className="hidden sm:block" />
            Clone, customize, deploy.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={0.4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#/presentation"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-base transition-all hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
            >
              Launch Demo →
            </a>
            <a
              href="#/howto"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-violet-600/80 hover:bg-violet-500/90 border border-violet-500/40 text-white font-semibold rounded-xl text-base transition-all hover:shadow-lg hover:shadow-violet-500/20 hover:-translate-y-0.5"
            >
              <Sparkles size={18} />
              How to Build with AI →
            </a>
            <a
              href="https://github.com/Hundia/AutoDeck"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl text-base transition-all hover:-translate-y-0.5"
            >
              <Github size={18} />
              GitHub →
            </a>
          </motion.div>

          {/* Example presentations */}
          <motion.div
            custom={0.55}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2"
          >
            <span className="text-white/30 text-xs font-medium uppercase tracking-widest hidden sm:block">
              Examples:
            </span>
            <a
              href="#/techbrief"
              className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-sm font-medium rounded-lg transition-all hover:-translate-y-0.5"
            >
              TechBrief
              <span className="text-white/30 text-xs">— Spec-driven project story · 10 slides</span>
            </a>
            <a
              href="#/uimockup"
              className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-sm font-medium rounded-lg transition-all hover:-translate-y-0.5"
            >
              UIMockup
              <span className="text-white/30 text-xs">— Design system wireframes · 10 slides</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="relative z-10 flex justify-center pb-8"
        animate={{ y: [0, 6, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </div>
      </motion.div>
    </section>
  );
}

// ─── FeaturesSection ──────────────────────────────────────────────────────────

const features = [
  {
    icon: Grid3X3,
    color: 'text-blue-400',
    border: 'border-blue-500/20',
    title: '10 Slide Types',
    desc: 'Title, stats, comparison, timeline, diagram, mockup, and more. Pre-animated, ready to use.',
  },
  {
    icon: Globe,
    color: 'text-violet-400',
    border: 'border-violet-500/20',
    title: 'Multi-Language + RTL',
    desc: 'Hebrew, Arabic, Farsi auto-detected. Layout mirrors. Add any language in minutes.',
  },
  {
    icon: Rocket,
    color: 'text-emerald-400',
    border: 'border-emerald-500/20',
    title: 'One-Command Deploy',
    desc: 'GitHub Actions CI/CD included. Push to main → live on GitHub Pages.',
  },
  {
    icon: Sparkles,
    color: 'text-amber-400',
    border: 'border-amber-500/20',
    title: 'AI-Assisted',
    desc: 'Feed SKILL.md to Claude, Copilot, or Cursor. Get slides instantly.',
  },
  {
    icon: Play,
    color: 'text-cyan-400',
    border: 'border-cyan-500/20',
    title: 'Framer Motion',
    desc: 'Spring physics, stagger animations, scroll-triggered. Buttery smooth.',
  },
  {
    icon: Settings,
    color: 'text-pink-400',
    border: 'border-pink-500/20',
    title: 'Zero Config',
    desc: 'React 18 + Vite + Tailwind. Clone and start in 30 seconds.',
  },
  {
    icon: Pencil,
    color: 'text-orange-400',
    border: 'border-orange-500/20',
    title: 'Edit Mode & LLM Notes',
    desc: 'Toggle Edit Mode to annotate slides in-browser. Export notes as markdown and paste into /apply-slide-notes for batch AI edits.',
  },
];

function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-white/50 text-lg">
            A complete presentation framework, batteries included.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`bg-white/5 border ${f.border} rounded-xl p-6 hover:bg-white/8 transition-colors`}
            >
              <f.icon className={`${f.color} mb-4`} size={28} />
              <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HowItWorksSection ────────────────────────────────────────────────────────

const steps = [
  {
    num: '1',
    label: 'Clone',
    color: 'bg-blue-500',
    cmd: 'git clone github.com/Hundia/AutoDeck',
    desc: 'Fork or clone the repo to your machine.',
  },
  {
    num: '2',
    label: 'Edit',
    color: 'bg-violet-500',
    cmd: 'src/slides/slides-en.ts',
    desc: 'Define your slides as TypeScript objects.',
  },
  {
    num: '3',
    label: 'Deploy',
    color: 'bg-emerald-500',
    cmd: 'git push',
    desc: 'GitHub Actions auto-deploys to Pages.',
  },
];

function HowItWorksSection() {
  return (
    <section className="py-24 px-6 bg-slate-800">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Up and Running in 3 Steps
          </h2>
          <p className="text-white/50 text-lg">
            From zero to live presentation in under a minute.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-0">
          {/* Dashed connector (desktop) */}
          <div className="hidden lg:block absolute top-8 left-[calc(16.66%)] right-[calc(16.66%)] h-px border-t border-dashed border-white/15 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative z-10 flex-1 flex flex-col items-center text-center px-4"
            >
              {/* Circle */}
              <div
                className={`w-14 h-14 rounded-full ${step.color} flex items-center justify-center text-white font-bold text-xl mb-5 shadow-lg`}
              >
                {step.num}
              </div>
              <h3 className="text-white font-bold text-xl mb-2">{step.label}</h3>
              <p className="text-white/50 text-sm mb-4">{step.desc}</p>
              {/* Code chip */}
              <div className="bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 w-full max-w-xs">
                <code
                  className="text-green-400 text-xs font-mono break-all"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {step.cmd}
                </code>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── DeployButtonsSection ────────────────────────────────────────────────────

function DeployButtonsSection() {
  const buttons = [
    { label: 'Deploy to Vercel', href: 'https://vercel.com/new/clone?repository-url=https://github.com/Hundia/AutoDeck', icon: '▲' },
    { label: 'Deploy to Netlify', href: 'https://app.netlify.com/start/deploy?repository=https://github.com/Hundia/AutoDeck', icon: '◆' },
    { label: 'Open in Stackblitz', href: 'https://stackblitz.com/github/Hundia/AutoDeck', icon: '⚡' },
    { label: 'Open in Codespaces', href: 'https://github.com/codespaces/new?repo=Hundia/AutoDeck', icon: '⎔' },
  ];

  return (
    <section className="py-20 px-6 bg-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold text-white mb-3">One Click to Your Own AutoDeck</h2>
          <p className="text-white/50 mb-10">Fork and deploy in under 60 seconds. No config needed.</p>
          <div className="flex flex-wrap justify-center gap-4" data-testid="deploy-buttons-section">
            {buttons.map((b, i) => (
              <motion.a
                key={b.label}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -2 }}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                <span>{b.icon}</span>
                {b.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── QuickStartSection ───────────────────────────────────────────────────────

const promptSteps = [
  {
    step: '1',
    color: 'border-blue-500/30 bg-blue-500/5',
    badge: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    label: 'Brief your AI',
    hint: 'Works in Claude, Copilot, Cursor, Gemini',
    lines: [
      { text: 'Read ', dim: false },
      { text: 'SKILL.md', dim: false, mono: true, highlight: true },
      { text: ' and create a 10-slide deck', dim: false },
      { text: ' about our Q2 launch.', dim: false },
      { text: '\n\nInclude a timeline, a code slide,', dim: true },
      { text: '\nand before/after stats.', dim: true },
    ],
  },
  {
    step: '2',
    color: 'border-violet-500/30 bg-violet-500/5',
    badge: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    label: 'Get your slides',
    hint: 'AI generates typed TypeScript — no hallucination',
    lines: [
      { text: '{ type: ', dim: true },
      { text: "'title'", dim: false, highlight: true },
      { text: ', title: ', dim: true },
      { text: "'Q2 Launch'", dim: false },
      { text: ' }\n', dim: true },
      { text: '{ type: ', dim: true },
      { text: "'timeline'", dim: false, highlight: true },
      { text: ', scrollable: true … }\n', dim: true },
      { text: '{ type: ', dim: true },
      { text: "'stats'", dim: false, highlight: true },
      { text: ', leftItems: … }', dim: true },
    ],
  },
  {
    step: '3',
    color: 'border-emerald-500/30 bg-emerald-500/5',
    badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    label: 'Push to deploy',
    hint: 'GitHub Actions → GitHub Pages, 2 minutes',
    lines: [
      { text: '$ git push origin main\n', dim: false },
      { text: '\n▶  Building…  ', dim: true },
      { text: 'done', dim: false },
      { text: '\n▶  Deploying… ', dim: true },
      { text: 'done', dim: false },
      { text: '\n✅ ', dim: false },
      { text: 'https://you.github.io/AutoDeck/', dim: false, highlight: true },
    ],
  },
];

function QuickStartSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-violet-500/10 border border-violet-500/20 rounded-full text-sm text-violet-400 font-medium">
            <Sparkles size={14} />
            AI-first workflow
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            From Prompt to Live Deck
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Three messages to any AI assistant.
            No design skills. No slide software.
          </p>
        </motion.div>

        {/* Three terminal cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {promptSteps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`border rounded-xl overflow-hidden ${s.color}`}
            >
              {/* Card header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-white/5">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${s.badge}`}>
                  {s.step}
                </span>
                <span className="text-white/80 text-sm font-semibold">{s.label}</span>
              </div>
              {/* Code area */}
              <div className="px-5 py-4 min-h-[100px]">
                <p
                  className="text-sm leading-relaxed whitespace-pre-wrap"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {s.lines.map((l, li) => (
                    <span
                      key={li}
                      className={
                        l.highlight
                          ? 'text-white font-semibold'
                          : l.dim
                          ? 'text-white/35'
                          : 'text-white/80'
                      }
                    >
                      {l.text}
                    </span>
                  ))}
                </p>
              </div>
              {/* Hint */}
              <div className="px-5 pb-4">
                <span className="text-white/25 text-xs">{s.hint}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="#/howto"
            className="inline-flex items-center gap-3 px-8 py-4 bg-violet-600/80 hover:bg-violet-500/90 border border-violet-500/40 text-white font-semibold rounded-xl text-base transition-all hover:shadow-xl hover:shadow-violet-500/20 hover:-translate-y-0.5"
          >
            <Sparkles size={18} />
            See the Full How-To Guide — 10 slides
          </a>
          <p className="text-white/25 text-sm mt-4">
            AI-framework agnostic · EN + Hebrew · hex background
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── SlideTypesSection ────────────────────────────────────────────────────────

const slideTypes = [
  { name: 'title', desc: 'Gradient hero with animated tagline', color: 'blue' },
  { name: 'content', desc: 'Icon cards grid + optional metrics bar', color: 'violet' },
  { name: 'comparison', desc: 'Two colored panels side-by-side', color: 'amber' },
  { name: 'stats', desc: 'Animated counters + comparison lists', color: 'emerald' },
  { name: 'quote', desc: 'Typewriter question + staggered bullets', color: 'cyan' },
  { name: 'timeline', desc: 'Vertical step pipeline with scroll', color: 'indigo' },
  { name: 'closing', desc: 'macOS terminal + CTA links', color: 'pink' },
  { name: 'final', desc: 'Word-by-word tagline reveal', color: 'rose' },
  { name: 'diagram', desc: 'Architecture, sequence, and ER diagrams via pure SVG — no libraries needed.', color: 'teal' },
  { name: 'mockup', desc: 'Browser-chrome wireframes with 8 block types — no Figma exports required.', color: 'sky' },
];

const colorMap: Record<string, string> = {
  blue: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
  violet: 'text-violet-400 border-violet-500/20 bg-violet-500/5',
  amber: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
  emerald: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
  cyan: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
  indigo: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5',
  pink: 'text-pink-400 border-pink-500/20 bg-pink-500/5',
  rose: 'text-rose-400 border-rose-500/20 bg-rose-500/5',
  teal: 'text-teal-400 border-teal-500/20 bg-teal-500/5',
  sky: 'text-sky-400 border-sky-500/20 bg-sky-500/5',
};

function SlideTypesSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            10 Built-In Slide Types
          </h2>
          <p className="text-white/50 text-lg">
            Every type you need, animated and production-ready.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {slideTypes.map((t, i) => {
            const cls = colorMap[t.color] ?? colorMap.blue;
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`border rounded-xl p-5 ${cls} hover:brightness-125 transition-all`}
              >
                <p
                  className={`font-bold text-base mb-1 ${cls.split(' ')[0]}`}
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {t.name}
                </p>
                <p className="text-white/50 text-xs leading-relaxed">{t.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── AIAssistedSection ────────────────────────────────────────────────────────

const aiAssistants = ['Claude', 'GitHub Copilot', 'Cursor', 'Gemini'];

function AIAssistedSection() {
  return (
    <section className="py-24 px-6 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-amber-500/10 border border-amber-500/20 rounded-full text-sm text-amber-400 font-medium">
            <Sparkles size={14} />
            AI-Powered
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Works With Any AI Assistant
          </h2>
          <p className="text-white/50 text-lg">
            Feed SKILL.md to your coding AI and build slides in plain English.
          </p>
        </motion.div>

        {/* AI badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {aiAssistants.map((name) => (
            <span
              key={name}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm font-medium"
            >
              {name}
            </span>
          ))}
        </motion.div>

        {/* Creation Story callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-black/60 border border-white/10 rounded-xl p-5 mb-6 flex items-start gap-4"
        >
          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <BookOpen size={16} className="text-amber-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm mb-1">Creation Story</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Every AI-generated deck ships with a <span className="text-white/80">Creation Story</span> — see the exact prompts, slide decisions, and framework comparisons. Press{' '}
              <kbd className="px-1.5 py-0.5 bg-white/10 border border-white/20 rounded text-xs text-white/70 font-mono">I</kbd>{' '}
              on any presentation.
            </p>
          </div>
        </motion.div>

        {/* Prompt card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-black/60 border border-white/10 rounded-xl overflow-hidden"
        >
          {/* Terminal bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
            <Terminal size={14} className="text-white/40" />
            <span className="text-white/40 text-xs font-medium">
              Example AI prompt
            </span>
          </div>
          {/* Prompt content */}
          <div className="p-6">
            <p
              className="text-green-400 text-sm leading-relaxed"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="text-white/30">$</span>{' '}
              <span className="text-white/60">Read</span> SKILL.md{' '}
              <span className="text-white/60">and help me add a comparison slide
              <br className="hidden sm:block" />
              showing before/after microservices migration</span>
            </p>
            <p className="text-white/30 text-xs mt-4">
              The AI reads all 10 slide types, animation patterns, and quality
              requirements — then generates ready-to-paste TypeScript.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── TestimonialsSection ──────────────────────────────────────────────────────

const testimonials = [
  {
    initials: 'NB',
    avatarColor: 'bg-emerald-500',
    name: 'Noa Ben-David',
    role: 'Founder & CEO',
    company: 'LearnFlow',
    route: '#/learnflow',
    deckLabel: 'LearnFlow Pitch Deck',
    rating: 5,
    quote:
      'RTL Hebrew worked perfectly out of the box — our investors read the comparison slide in their own language and it closed the round. Had to ask Claude twice to get the diagram connections right, but the result was worth every prompt.',
  },
  {
    initials: 'MW',
    avatarColor: 'bg-amber-500',
    name: 'Marcus Webb',
    role: 'Senior Rust Engineer',
    company: 'Open Source',
    route: '#/ferric',
    deckLabel: 'Ferric v1.0 Release Deck',
    rating: 4,
    quote:
      'The code slide with Rust syntax highlighting was exactly what I needed for my release announcement. Timeline mapped perfectly to my changelog milestones. Only wish: a way to show actual terminal output inline with the code block.',
  },
  {
    initials: 'SK',
    avatarColor: 'bg-violet-500',
    name: 'Sarah Kim',
    role: 'Product Manager',
    company: 'SaaS Co.',
    route: '#/q2review',
    deckLabel: 'Q2 2026 Business Review',
    rating: 5,
    quote:
      'No coding background at all — fed SKILL.md to Claude, got TypeScript back, pasted it in and it just worked. The animated stats counters made my leadership team sit up straight. Would love an image embed block for product screenshots.',
  },
];

function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm text-emerald-400 font-medium">
            <span>★</span>
            From the Community
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Built by Real People
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Founders, engineers, and PMs using AutoDeck with AI to ship faster.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-4 hover:bg-white/[0.08] transition-colors"
            >
              {/* Header row */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${t.avatarColor} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>

              {/* Star rating */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <span
                    key={si}
                    className={si < t.rating ? 'text-amber-400' : 'text-white/15'}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/65 text-sm leading-relaxed flex-1">
                "{t.quote}"
              </p>

              {/* Deck link */}
              <a
                href={t.route}
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors mt-auto"
              >
                View Deck →
                <span className="text-white/30 text-xs font-normal">
                  {t.deckLabel}
                </span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ByTheNumbersSection ─────────────────────────────────────────────────────

const numberCards = [
  { value: <GitHubStarCounter />, label: 'GitHub Stars' },
  { value: '7', label: 'Showcase Decks' },
  { value: '10', label: 'Built-In Slide Types' },
  { value: '443', label: 'Sprint Points Invested' },
];

function ByTheNumbersSection() {
  return (
    <section className="py-20 px-6 bg-slate-800">
      <motion.h2
        className="text-3xl font-bold text-white text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        By the Numbers
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-10">
        {numberCards.map((card, i) => (
          <motion.div
            key={card.label}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="text-4xl font-bold text-white mb-2">{card.value}</div>
            <div className="text-white/50 text-sm">{card.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── FooterSection ────────────────────────────────────────────────────────────

function FooterSection() {
  const links = [
    {
      label: 'GitHub',
      href: 'https://github.com/Hundia/AutoDeck',
      external: true,
    },
    {
      label: 'SKILL.md',
      href: 'https://github.com/Hundia/AutoDeck/blob/main/SKILL.md',
      external: true,
    },
    {
      label: 'CLAUDE.md',
      href: 'https://github.com/Hundia/AutoDeck/blob/main/CLAUDE.md',
      external: true,
    },
    {
      label: 'Issues',
      href: 'https://github.com/Hundia/AutoDeck/issues',
      external: true,
    },
  ];

  return (
    <footer className="py-12 px-6 bg-slate-900 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: brand */}
        <div>
          <p className="text-white font-semibold text-sm mb-1">
            Auto<span className="text-blue-400">Deck</span>
          </p>
          <p className="text-white/30 text-xs">MIT License — Built with AutoDeck</p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-1 text-white/40 hover:text-white/80 text-sm transition-colors"
            >
              {l.label}
              {l.external && <ExternalLink size={11} className="opacity-60" />}
            </a>
          ))}
        </div>

        {/* Right: copyright */}
        <p className="text-white/25 text-xs text-center sm:text-right">
          © 2026 AutoDeck
        </p>
      </div>
    </footer>
  );
}

// ─── LandingPage (root) ───────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen font-inter antialiased">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DeployButtonsSection />
      <QuickStartSection />
      <SlideTypesSection />
      <AIAssistedSection />
      <TestimonialsSection />
      <GallerySection />
      <ByTheNumbersSection />
      <FooterSection />
    </div>
  );
}
