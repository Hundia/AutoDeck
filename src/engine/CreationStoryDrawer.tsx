import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronDown, ChevronUp, Copy, Check, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { CreationStory } from './types';

interface Props {
  story: CreationStory;
  isOpen: boolean;
  onClose: () => void;
  isRTL: boolean;
}

const FRAMEWORK_COLORS: Record<string, string> = {
  'Claude Code': 'text-orange-400',
  'Copilot': 'text-blue-400',
  'Cursor': 'text-violet-400',
  'Gemini': 'text-cyan-400',
};

function PromptCard({ label, prompt, framework }: { label: string; prompt: string; framework?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      // Fallback for browsers without clipboard API
      const el = document.createElement('textarea');
      el.value = prompt;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-white/80 text-sm font-semibold">{label}</span>
          {framework && (
            <span className={`text-xs font-medium ${FRAMEWORK_COLORS[framework] ?? 'text-white/50'}`}>
              {framework}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-white/40 hover:text-white/80 transition-colors p-1 rounded"
          aria-label="Copy prompt"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" />
              <span className="text-xs text-emerald-400">Copied!</span>
            </>
          ) : (
            <Copy size={12} />
          )}
        </button>
      </div>
      <p className="font-mono text-xs text-slate-300 whitespace-pre-wrap break-words mt-2">
        {prompt}
      </p>
    </div>
  );
}

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Collapsible({ title, children, defaultOpen = false }: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-slate-800/60 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-700/40 transition-colors"
      >
        <span className="text-white/80 text-sm font-semibold">{title}</span>
        {open ? (
          <ChevronUp size={16} className="text-white/40" />
        ) : (
          <ChevronDown size={16} className="text-white/40" />
        )}
      </button>
      <div
        style={{
          maxHeight: open ? '9999px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        <div className="px-4 pb-4">{children}</div>
      </div>
    </div>
  );
}

export function CreationStoryDrawer({ story, isOpen, onClose, isRTL }: Props) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const panelPositionClass = isRTL ? 'left-0 border-r' : 'right-0 border-l';
  const closeButtonClass = isRTL ? 'left-4' : 'right-4';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-[70]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ x: isRTL ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? '-100%' : '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed top-0 bottom-0 w-80 sm:w-96 bg-slate-900 border-slate-700/60 z-[80] flex flex-col overflow-hidden ${panelPositionClass}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-5 py-4 border-b border-slate-700/60 flex-shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={16} className="text-white/60" />
                  <h2 className="text-white font-bold text-base">How This Was Built</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-slate-800 rounded-full text-xs text-white/60 border border-slate-700/60">
                    {story.totalPrompts} prompts
                  </span>
                  <span className="px-2 py-0.5 bg-slate-800 rounded-full text-xs text-white/60 border border-slate-700/60">
                    {story.totalMinutes} min
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className={`absolute top-4 ${closeButtonClass} p-1.5 text-white/40 hover:text-white/80 hover:bg-slate-800 rounded-lg transition-colors`}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 p-4 space-y-4">
              {/* Prompts Section — always shown */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest px-1">
                  Prompts
                </h3>
                {story.prompts.map((p, i) => (
                  <PromptCard key={i} label={p.label} prompt={p.prompt} framework={p.framework} />
                ))}
              </div>

              {/* Slide Decisions — only if defined */}
              {story.decisions && story.decisions.length > 0 && (
                <Collapsible title="Slide Decisions">
                  <div className="space-y-2 mt-1">
                    {story.decisions.map((d) => (
                      <div key={d.slide} className="flex gap-3 items-start">
                        <span className="flex-shrink-0 w-16 text-xs font-mono text-white/40">
                          Slide {d.slide}
                        </span>
                        <span className="text-xs text-white/70 leading-relaxed">{d.decision}</span>
                      </div>
                    ))}
                  </div>
                </Collapsible>
              )}

              {/* Framework Comparison — only if defined */}
              {story.frameworkNotes && Object.keys(story.frameworkNotes).length > 0 && (
                <Collapsible title="Framework Comparison">
                  <div className="space-y-3 mt-1">
                    {Object.entries(story.frameworkNotes).map(([fw, note]) => (
                      <div key={fw} className="space-y-1">
                        <span className={`text-xs font-semibold ${FRAMEWORK_COLORS[fw] ?? 'text-white/60'}`}>
                          {fw}
                        </span>
                        <p className="text-xs text-white/60 leading-relaxed">{note}</p>
                      </div>
                    ))}
                  </div>
                </Collapsible>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
