import { motion } from 'framer-motion';
import type { SlideComponentProps } from '../../engine/types';

interface ComparisonSlideData {
  type: 'comparison';
  title: string;
  subtitle?: string;
  left: {
    label: string;
    color: string;
    items: Array<{ icon: string; text: string }>;
  };
  right: {
    label: string;
    color: string;
    items: Array<{ icon: string; text: string }>;
  };
  callout?: string;
}

const colorStyles: Record<string, { border: string; bg: string; label: string; dot: string }> = {
  red: { border: 'border-red-500/40', bg: 'bg-red-500/10', label: 'text-red-400', dot: 'bg-red-400' },
  green: { border: 'border-green-500/40', bg: 'bg-green-500/10', label: 'text-green-400', dot: 'bg-green-400' },
  blue: { border: 'border-blue-500/40', bg: 'bg-blue-500/10', label: 'text-blue-400', dot: 'bg-blue-400' },
  amber: { border: 'border-amber-500/40', bg: 'bg-amber-500/10', label: 'text-amber-400', dot: 'bg-amber-400' },
  purple: { border: 'border-purple-500/40', bg: 'bg-purple-500/10', label: 'text-purple-400', dot: 'bg-purple-400' },
  cyan: { border: 'border-cyan-500/40', bg: 'bg-cyan-500/10', label: 'text-cyan-400', dot: 'bg-cyan-400' },
};

export default function ComparisonSlide({ data }: SlideComponentProps<ComparisonSlideData>) {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-4xl sm:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent"
      >
        {data.title}
      </motion.h2>

      {data.subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-center text-slate-400 text-base mb-8 max-w-2xl mx-auto"
        >
          {data.subtitle}
        </motion.p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[data.left, data.right].map((col, colIdx) => {
          const styles = colorStyles[col.color] || colorStyles.red;
          return (
            <motion.div
              key={colIdx}
              initial={{ opacity: 0, x: colIdx === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + colIdx * 0.15, duration: 0.5 }}
              className={`${styles.bg} border ${styles.border} rounded-xl p-5`}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-2.5 h-2.5 rounded-full ${styles.dot}`} />
                <h3 className={`text-lg font-semibold ${styles.label}`}>{col.label}</h3>
              </div>
              <div className="space-y-3">
                {col.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + colIdx * 0.15 + idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <span className="text-white/80 text-sm">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {data.callout && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <p className="text-lg text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg px-6 py-3 inline-block">
            {data.callout}
          </p>
        </motion.div>
      )}
    </div>
  );
}
