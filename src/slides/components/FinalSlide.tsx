import { motion } from 'framer-motion';
import type { SlideComponentProps } from '../../engine/types';

interface FinalSlideData {
  type: 'final';
  title: string;
  tagline: string;
}

export default function FinalSlide({ data }: SlideComponentProps<FinalSlideData>) {
  const words = data.tagline.split(' ');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <span className="text-2xl font-bold tracking-[0.3em] text-slate-500 uppercase">
          {data.title}
        </span>
      </motion.div>

      <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight max-w-3xl">
        {words.map((word, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.15, duration: 0.4, ease: 'easeOut' }}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '8rem' }}
        transition={{ delay: 0.4 + words.length * 0.15 + 0.3, duration: 0.6, ease: 'easeOut' }}
        className="h-0.5 bg-white/30 rounded-full mt-8"
      />
    </div>
  );
}
