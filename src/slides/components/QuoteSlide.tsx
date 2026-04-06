import { motion } from 'framer-motion';
import type { SlideComponentProps } from '../../engine/types';

interface QuoteSlideData {
  type: 'quote';
  title: string;
  question: string;
  points: string[];
}

const charVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function QuoteSlide({ data }: SlideComponentProps<QuoteSlideData>) {
  const chars = data.question.split('');

  return (
    <div className="max-w-3xl mx-auto w-full text-center">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-12 tracking-wide"
        style={{ color: 'var(--theme-accent-primary)' }}
      >
        {data.title}
      </motion.h2>

      {/* Typewriter question */}
      <div
        className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-12"
        style={{ textShadow: '0 0 40px var(--theme-accent-glow)' }}
      >
        {chars.map((char, idx) => (
          <motion.span
            key={idx}
            variants={charVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 + idx * 0.03, duration: 0.05 }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* Sub-points */}
      <div className="space-y-5">
        {data.points.map((point, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + chars.length * 0.03 + idx * 0.5, duration: 0.4 }}
            className="text-lg font-medium"
            style={{ color: 'var(--theme-accent-secondary)', opacity: 0.8 }}
          >
            {point}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
