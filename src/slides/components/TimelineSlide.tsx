import { motion } from 'framer-motion';
import type { SlideComponentProps } from '../../engine/types';

interface TimelineSlideData {
  type: 'timeline';
  scrollable?: boolean;
  title: string;
  subtitle?: string;
  steps: Array<{
    number: number;
    title: string;
    subtitle?: string;
    time?: string;
    output?: string;
  }>;
}

export default function TimelineSlide({ data }: SlideComponentProps<TimelineSlideData>) {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-5xl font-bold text-center mb-3 text-white"
      >
        {data.title}
      </motion.h2>

      {data.subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-slate-400 text-lg mb-10"
        >
          {data.subtitle}
        </motion.p>
      )}

      {/* Vertical timeline */}
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ background: 'var(--theme-gradient)', opacity: 0.5 }} />

        <div className="space-y-6">
          {data.steps.map((step, idx) => {
            const useWhileInView = !!data.scrollable;
            const animProps = useWhileInView
              ? { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, amount: 0.3 } }
              : { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 } };

            return (
              <motion.div
                key={idx}
                {...animProps}
                transition={{ delay: useWhileInView ? 0.1 : 0.3 + idx * 0.15, duration: 0.5 }}
                className="relative flex items-start gap-5 pl-14"
              >
                {/* Step number circle */}
                <div className="absolute left-3 w-7 h-7 rounded-full bg-slate-800 border-2 border-blue-500/60 flex items-center justify-center text-xs font-bold text-blue-400">
                  {step.number}
                </div>

                <div className="bg-white/5 border border-slate-600/30 rounded-xl p-5 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-semibold text-lg">{step.title}</h3>
                    {step.time && (
                      <span className="text-xs text-slate-500 font-mono bg-slate-800/60 px-2 py-1 rounded">
                        {step.time}
                      </span>
                    )}
                  </div>
                  {step.subtitle && (
                    <p className="text-slate-400 text-sm mb-2">{step.subtitle}</p>
                  )}
                  {step.output && (
                    <div className="mt-2 bg-black/30 border border-slate-700/50 rounded-lg px-3 py-2">
                      <code className="text-green-400 text-xs font-mono">{step.output}</code>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
