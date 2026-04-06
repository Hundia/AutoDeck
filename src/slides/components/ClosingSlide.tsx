import { motion } from 'framer-motion';
import { Terminal, ExternalLink } from 'lucide-react';
import type { SlideComponentProps } from '../../engine/types';

interface ClosingSlideData {
  type: 'closing';
  title: string;
  install?: string;
  commands?: Array<{ cmd: string; desc: string }>;
  links?: Array<{ url: string; label: string }>;
  tagline: string;
}

export default function ClosingSlide({ data }: SlideComponentProps<ClosingSlideData>) {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl sm:text-5xl font-bold text-white mb-8"
      >
        {data.title}
      </motion.h2>

      {/* Install Command */}
      {data.install && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black/50 border border-green-500/30 rounded-xl p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Terminal className="text-green-400" size={20} />
            <span className="text-white/50 text-sm">Get started</span>
          </div>
          <code className="text-lg sm:text-xl text-green-400 font-mono break-all">
            {data.install}
          </code>
        </motion.div>
      )}

      {/* Commands */}
      {data.commands && data.commands.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 rounded-xl p-6 mb-8"
        >
          <div className="space-y-3">
            {data.commands.map((cmd, idx) => (
              <div key={idx} className="grid grid-cols-[minmax(0,auto)_1fr] items-center gap-6 text-left">
                <code className="font-mono bg-black/30 px-3 py-2 rounded whitespace-nowrap" style={{ color: 'var(--theme-accent-primary)' }}>
                  {cmd.cmd}
                </code>
                <span className="text-white/60 text-sm">{cmd.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Links */}
      {data.links && data.links.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-6 mb-12"
        >
          {data.links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ExternalLink size={16} />
              <span>{link.label}</span>
            </a>
          ))}
        </motion.div>
      )}

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-2xl sm:text-3xl font-bold"
        style={{
          background: 'var(--theme-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {data.tagline}
      </motion.p>
    </div>
  );
}
