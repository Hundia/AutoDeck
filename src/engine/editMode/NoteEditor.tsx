import React, { useState, useRef, useEffect } from 'react';

interface NoteEditorProps {
  onSave: (text: string) => void;
  onCancel: () => void;
  initialText?: string;
}

const CHAR_LIMIT = 500;
const CHAR_WARN = 400;

export default function NoteEditor({ onSave, onCancel, initialText = '' }: NoteEditorProps) {
  const [text, setText] = useState(initialText);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onCancel();
      return;
    }
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      const trimmed = text.trim();
      if (trimmed === '') {
        onCancel();
      } else {
        onSave(trimmed);
      }
    }
  };

  const handleSave = () => {
    const trimmed = text.trim();
    if (trimmed === '') return;
    onSave(trimmed);
  };

  const charCountColor =
    text.length >= CHAR_LIMIT
      ? 'text-red-400'
      : text.length >= CHAR_WARN
      ? 'text-amber-400'
      : 'text-white/50';

  return (
    <div data-testid="note-editor" className="flex flex-col gap-2">
      <textarea
        ref={textareaRef}
        data-testid="note-editor-textarea"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your note here…"
        className={[
          'w-full resize-none rounded-lg px-3 py-2 text-sm',
          'bg-[var(--theme-surface)] border border-[var(--theme-surface-border)]',
          'text-[var(--theme-text-primary)] placeholder:text-white/30',
          'focus:ring-2 focus:ring-[var(--theme-accent-primary)]/40 focus:outline-none',
          'transition-shadow',
        ].join(' ')}
      />
      <div className="flex items-center justify-between">
        <span className={`text-xs tabular-nums ${charCountColor}`}>
          {text.length} / {CHAR_LIMIT}
        </span>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={text.trim() === ''}
            className={[
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              'bg-[var(--theme-accent-primary)] text-white',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              'enabled:hover:opacity-90',
            ].join(' ')}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
