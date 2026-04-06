import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface DropdownOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
  previewColors?: string[];
}

interface LanguageDropdownProps {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  animateIcon?: boolean;
  align?: 'left' | 'right';
}

export default function LanguageDropdown({
  value,
  options,
  onChange,
  icon,
  animateIcon = false,
  align = 'left',
}: LanguageDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.id === value);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/[0.06] rounded-full px-3 py-1.5 transition-all duration-200 group"
      >
        {icon && (
          <motion.span
            className="text-white/60 group-hover:text-white/80 transition-colors flex items-center"
            animate={animateIcon && open ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {icon}
          </motion.span>
        )}
        <span className="text-xs text-white/80 group-hover:text-white transition-colors">
          {selected?.label ?? value}
        </span>
        <motion.span
          className="text-white/40 flex items-center"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={10} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute top-full z-[60] mt-1 min-w-[140px] py-1 rounded-xl bg-slate-800/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 ${
              align === 'right' ? 'right-0' : 'left-0'
            }`}
          >
            {options.map((option, i) => {
              const isActive = option.id === value;
              return (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.15 }}
                  onClick={() => {
                    onChange(option.id);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs transition-all duration-150 ${
                    isActive
                      ? 'text-white bg-white/10'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                    style={isActive ? {
                      background: 'var(--theme-dot-active)',
                      boxShadow: '0 0 6px var(--theme-accent-glow)',
                    } : {}}
                  />
                  {option.icon && <span className="flex items-center">{option.icon}</span>}
                  {option.previewColors && option.previewColors.length > 0 && (
                    <span className="flex items-center gap-0.5">
                      {option.previewColors.map((c, i) => (
                        <span
                          key={i}
                          className="w-2 h-2 rounded-full inline-block flex-shrink-0"
                          style={{ background: c }}
                        />
                      ))}
                    </span>
                  )}
                  <span>{option.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
