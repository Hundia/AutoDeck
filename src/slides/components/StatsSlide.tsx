import { motion } from 'framer-motion';
import type { SlideComponentProps } from '../../engine/types';

interface StatsSlideData {
  type: 'stats';
  title: string;
  subtitle?: string;
  titleColor?: string;
  leftItems?: string[];
  rightItems?: string[];
  leftLabel?: string;
  rightLabel?: string;
  stats: Array<{ value: string; label: string }>;
  bottomLine?: string;
}

export default function StatsSlide({ data }: SlideComponentProps<StatsSlideData>) {
  const hasColumns = data.leftItems && data.rightItems;

  return (
    <div className="max-w-5xl mx-auto w-full">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`text-4xl sm:text-5xl font-bold text-center mb-2 ${data.titleColor || 'text-white'}`}
      >
        {data.title}
      </motion.h2>

      {data.subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-center text-slate-400 text-lg mb-7"
        >
          {data.subtitle}
        </motion.p>
      )}

      {/* Optional two-column lists */}
      {hasColumns && (
        <div className="flex items-end justify-center gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-1"
          >
            <div className="rounded-xl p-4 w-full border" style={{ background: 'var(--theme-surface)', borderColor: 'var(--theme-surface-border)' }}>
              <p className="font-bold text-center mb-3 text-sm uppercase tracking-wide" style={{ color: 'var(--theme-accent-primary)' }}>
                {data.leftLabel || 'Left'}
              </p>
              <ul className="space-y-2">
                {data.leftItems!.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + idx * 0.2 }}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: 'var(--theme-accent-primary)' }}
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-1"
          >
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 w-full">
              <p className="text-red-400 font-bold text-center mb-3 text-sm uppercase tracking-wide">
                {data.rightLabel || 'Right'}
              </p>
              <ul className="space-y-2">
                {data.rightItems!.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + idx * 0.2 }}
                    className="flex items-center gap-2 text-red-300 text-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      )}

      {/* Stats grid */}
      <div className={`grid gap-4 mb-5`} style={{ gridTemplateColumns: `repeat(${Math.min(data.stats.length, 4)}, 1fr)` }}>
        {data.stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (hasColumns ? 1.0 : 0.3) + idx * 0.15 }}
            className="bg-slate-800/60 border border-slate-600/40 rounded-xl p-4 text-center"
          >
            <p className="text-2xl font-black text-blue-400 mb-1">{stat.value}</p>
            <p className="text-slate-400 text-xs">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Bottom line */}
      {data.bottomLine && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-center bg-blue-900/20 border border-blue-600/30 rounded-xl px-6 py-4"
        >
          <p className="text-blue-300 font-semibold text-base italic">{data.bottomLine}</p>
        </motion.div>
      )}
    </div>
  );
}
