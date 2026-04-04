import React from 'react';
import { motion } from 'framer-motion';
import type { SlideComponentProps } from '../../engine/types';

type BlockType = 'navbar' | 'hero' | 'card-grid' | 'table' | 'form' | 'chart-bar' | 'sidebar' | 'text-block';

interface MockupBlock {
  type: BlockType;
  label?: string;
}

interface MockupFrame {
  url?: string;
  blocks: MockupBlock[];
}

interface MockupSlideData {
  type: 'mockup';
  title: string;
  subtitle?: string;
  displayMode: 'browser' | 'flow';
  // browser mode: single frame
  url?: string;
  blocks?: MockupBlock[];
  // flow mode: multiple frames
  frames?: MockupFrame[];
}

function renderBlock(block: MockupBlock, index: number) {
  const delay = 0.3 + index * 0.1;

  switch (block.type) {
    case 'navbar':
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay, duration: 0.3 }}
          className="bg-white h-10 flex items-center gap-4 px-4 border-b border-slate-200"
        >
          <span className="text-slate-800 font-bold text-sm">▦ App</span>
          <span className="text-xs text-slate-500 bg-slate-100 rounded px-2 py-0.5">Home</span>
          <span className="text-xs text-slate-500 bg-slate-100 rounded px-2 py-0.5">About</span>
          <span className="text-xs text-slate-500 bg-slate-100 rounded px-2 py-0.5">Contact</span>
        </motion.div>
      );

    case 'hero':
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay, duration: 0.3 }}
          className="bg-gradient-to-r from-blue-500 to-violet-500 h-20 flex items-center justify-between px-4"
        >
          <span className="text-white text-lg font-bold">
            {block.label ?? 'Welcome to the App'}
          </span>
          <button className="bg-white text-blue-600 text-xs px-3 py-1 rounded font-medium">
            Get Started
          </button>
        </motion.div>
      );

    case 'card-grid':
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay, duration: 0.3 }}
          className="grid grid-cols-3 gap-2 p-3"
        >
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-lg p-2 space-y-1.5">
              <div className="bg-slate-200 h-2 rounded w-full" />
              <div className="bg-slate-200 h-2 rounded w-3/4" />
            </div>
          ))}
        </motion.div>
      );

    case 'table':
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay, duration: 0.3 }}
          className="overflow-hidden"
        >
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-100">
                {['Name', 'Status', 'Date', 'Action'].map((col) => (
                  <th key={col} className="text-left px-3 py-2 text-slate-600 font-medium">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2].map((row) => (
                <tr key={row} className={row % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  {[0, 1, 2, 3].map((col) => (
                    <td key={col} className="px-3 py-2">
                      <div className="bg-slate-200 rounded h-2 w-full" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      );

    case 'form':
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay, duration: 0.3 }}
          className="p-3 space-y-2"
        >
          {['Email', 'Password'].map((lbl) => (
            <div key={lbl}>
              <label className="text-xs text-slate-500 block mb-0.5">{lbl}</label>
              <input
                readOnly
                className="border border-slate-300 rounded px-2 py-1 w-full bg-white text-xs text-slate-400 outline-none"
                placeholder={lbl.toLowerCase()}
              />
            </div>
          ))}
          <button className="bg-blue-500 text-white text-xs px-4 py-1.5 rounded">
            Submit
          </button>
        </motion.div>
      );

    case 'chart-bar':
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay, duration: 0.3 }}
          className="flex items-end gap-1.5 h-16 px-3 pb-2 border-b border-slate-200"
        >
          {[60, 80, 40, 90, 65].map((pct, i) => (
            <div
              key={i}
              className="bg-blue-400 rounded-t w-8"
              style={{ height: `${pct}%` }}
            />
          ))}
        </motion.div>
      );

    case 'sidebar':
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay, duration: 0.3 }}
          className="flex"
        >
          <div className="w-24 bg-slate-100 border-r border-slate-200 py-1">
            {['Dashboard', 'Reports', 'Settings', 'Logout'].map((item) => (
              <div key={item} className="text-xs py-1.5 px-2 rounded text-slate-600">
                {item}
              </div>
            ))}
          </div>
          <div className="flex-1 p-2 space-y-1">
            <div className="bg-slate-200 h-2 rounded w-full" />
            <div className="bg-slate-200 h-2 rounded w-5/6" />
            <div className="bg-slate-200 h-2 rounded w-4/5" />
          </div>
        </motion.div>
      );

    case 'text-block':
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay, duration: 0.3 }}
          className="p-3 space-y-1.5"
        >
          <div className="bg-slate-200 h-2 rounded w-full" />
          <div className="bg-slate-200 h-2 rounded w-full" />
          <div className="bg-slate-200 h-2 rounded w-full" />
          <div className="bg-slate-200 h-2 rounded w-3/4" />
        </motion.div>
      );

    default:
      return null;
  }
}

function BrowserChrome({ url }: { url?: string }) {
  return (
    <div className="bg-slate-800 px-4 py-3 flex items-center gap-3 border-b border-slate-700/60">
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <span className="text-xs text-slate-400 font-mono bg-slate-700/50 px-3 py-1 rounded">
          {url ?? 'app.example.com'}
        </span>
      </div>
    </div>
  );
}

function BrowserFrame({ url, blocks }: { url?: string; blocks: MockupBlock[] }) {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-700/60">
      <BrowserChrome url={url} />
      <div className="bg-slate-50 rounded-b-xl overflow-hidden">
        {blocks.map((block, i) => renderBlock(block, i))}
      </div>
    </div>
  );
}

export default function MockupSlide({ data }: SlideComponentProps<MockupSlideData>) {
  const blocks = data.blocks ?? [];
  const frames = data.frames ?? [];

  return (
    <div className="max-w-5xl mx-auto w-full">
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

      {data.displayMode === 'browser' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl overflow-hidden border border-slate-700/60 shadow-2xl shadow-black/40"
        >
          <BrowserChrome url={data.url} />
          <div className="bg-slate-50 rounded-b-xl overflow-hidden">
            {blocks.map((block, i) => renderBlock(block, i))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start gap-0">
            {frames.map((frame, i) => (
              <React.Fragment key={i}>
                {/* Mini browser frame */}
                <div className="flex-1 rounded-xl overflow-hidden border border-slate-700/60 shadow-2xl shadow-black/40">
                  <BrowserChrome url={frame.url} />
                  <div className="bg-slate-50 rounded-b-xl overflow-hidden">
                    {frame.blocks.map((block, bi) => renderBlock(block, bi))}
                  </div>
                </div>
                {/* CSS arrow connector — CSS-only, no refs or SVG overlay */}
                {i < frames.length - 1 && (
                  <div className="flex items-center self-center px-1">
                    <div className="w-6 h-0.5 bg-blue-500/60" />
                    <div
                      className="border-t-transparent border-b-transparent border-l-blue-500/60"
                      style={{
                        width: 0,
                        height: 0,
                        borderTopWidth: 4,
                        borderBottomWidth: 4,
                        borderLeftWidth: 6,
                        borderTopStyle: 'solid',
                        borderBottomStyle: 'solid',
                        borderLeftStyle: 'solid',
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
