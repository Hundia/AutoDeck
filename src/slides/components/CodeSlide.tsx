import { motion } from 'framer-motion';
import type { SlideComponentProps } from '../../engine/types';

interface CodeSlideData {
  type: 'code';
  title: string;
  subtitle?: string;
  filename: string;
  language?: string;
  lines: string[];
  output?: string[];
  highlights?: number[]; // 1-indexed line numbers to highlight
}

// Simple syntax tokenizer for presentation-quality code display
function tokenizeLine(line: string): { text: string; className: string }[] {
  if (line.trimStart().startsWith('//') || line.trimStart().startsWith('#')) {
    return [{ text: line, className: 'text-slate-500' }];
  }

  const tokens: { text: string; className: string }[] = [];
  let remaining = line;

  const patterns: { regex: RegExp; className: string }[] = [
    { regex: /^(['"`])((?:\\.|(?!\1)[^\\])*)\1/, className: 'text-emerald-400' },
    { regex: /^(\/\/.*)/, className: 'text-slate-500' },
    { regex: /^\b(const|let|var|function|return|async|await|import|export|from|default|type|interface|if|else|try|catch|throw|new|class|extends|of|in|true|false|null|undefined)\b/, className: 'text-violet-400' },
    { regex: /^\b([A-Z][a-zA-Z0-9]*)\b/, className: 'text-cyan-300' },
    { regex: /^\b(\d+(?:\.\d+)?(?:ms|s|px)?)\b/, className: 'text-amber-400' },
    { regex: /^([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()/, className: 'text-blue-300' },
    { regex: /^([a-zA-Z_$][a-zA-Z0-9_$]*)/, className: 'text-slate-200' },
    { regex: /^([\s\S])/, className: 'text-slate-400' },
  ];

  while (remaining.length > 0) {
    let matched = false;
    for (const { regex, className } of patterns) {
      const m = remaining.match(regex);
      if (m) {
        tokens.push({ text: m[0], className });
        remaining = remaining.slice(m[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      tokens.push({ text: remaining[0], className: 'text-slate-400' });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
}

export default function CodeSlide({ data }: SlideComponentProps<CodeSlideData>) {
  const highlights = new Set(data.highlights ?? []);

  return (
    <div className="max-w-4xl mx-auto w-full">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-5xl font-bold text-white mb-3 text-center"
      >
        {data.title}
      </motion.h2>

      {data.subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-slate-400 text-lg mb-8"
        >
          {data.subtitle}
        </motion.p>
      )}

      {/* Editor window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="rounded-xl overflow-hidden border border-slate-700/60 shadow-2xl shadow-black/40"
      >
        {/* Title bar */}
        <div className="bg-slate-800 px-4 py-3 flex items-center gap-3 border-b border-slate-700/60">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <span className="text-xs text-slate-400 font-mono bg-slate-700/50 px-3 py-1 rounded">
              {data.filename}
            </span>
          </div>
          {data.language && (
            <span className="text-xs text-slate-500 font-mono">{data.language}</span>
          )}
        </div>

        {/* Code body */}
        <div className="bg-slate-900/90 overflow-x-auto">
          <table className="w-full border-collapse text-sm font-mono">
            <tbody>
              {data.lines.map((line, idx) => {
                const lineNum = idx + 1;
                const isHighlighted = highlights.has(lineNum);
                return (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.04, duration: 0.3 }}
                    className={isHighlighted ? 'bg-blue-500/10 border-l-2 border-blue-500' : ''}
                  >
                    <td className="select-none text-slate-600 text-right pr-4 pl-4 py-0.5 w-10 text-xs align-top">
                      {lineNum}
                    </td>
                    <td className="pr-6 py-0.5 whitespace-pre">
                      {line === '' ? (
                        <span>&nbsp;</span>
                      ) : (
                        tokenizeLine(line).map((token, tidx) => (
                          <span key={tidx} className={token.className}>
                            {token.text}
                          </span>
                        ))
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Output panel */}
        {data.output && data.output.length > 0 && (
          <div className="bg-black/70 border-t border-slate-700/60 px-4 py-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-slate-500 font-mono">OUTPUT</span>
            </div>
            {data.output.map((out, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + data.lines.length * 0.04 + idx * 0.15 }}
                className="font-mono text-xs text-green-400 leading-5"
              >
                {out}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
