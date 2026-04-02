import { motion } from 'framer-motion';
import type { SlideComponentProps } from '../../engine/types';

interface ContentSlideData {
  type: 'content';
  title: string;
  subtitle?: string;
  titleColor?: string;
  cards: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  metrics?: Array<{
    label: string;
    value: string;
  }>;
}

export default function ContentSlide({ data }: SlideComponentProps<ContentSlideData>) {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`text-4xl sm:text-5xl font-bold text-center mb-3 ${data.titleColor || 'text-white'}`}
      >
        {data.title}
      </motion.h2>

      {data.subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center text-slate-400 text-lg mb-10"
        >
          {data.subtitle}
        </motion.p>
      )}

      {/* Card grid */}
      <div className={`grid gap-5 mb-10 ${data.cards.length <= 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2'}`}>
        {data.cards.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.15, duration: 0.5 }}
            className="bg-white/5 border border-slate-600/40 rounded-xl p-6 flex items-start gap-4"
          >
            <span className="text-3xl flex-shrink-0">{item.icon}</span>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Optional metrics bar */}
      {data.metrics && data.metrics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + data.cards.length * 0.15 + 0.2, duration: 0.5 }}
          className={`grid gap-3 bg-slate-800/60 border border-slate-600/30 rounded-xl p-4`}
          style={{ gridTemplateColumns: `repeat(${data.metrics.length}, 1fr)` }}
        >
          {data.metrics.map((m, idx) => (
            <div key={idx} className="text-center">
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">{m.label}</p>
              <p className="text-slate-300 font-semibold text-sm">{m.value}</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
