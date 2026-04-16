import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Download, X } from 'lucide-react';
import { exportAsMarkdown, getNotes } from './notes';

interface NotesExportModalProps {
  deckId: string;
  slides: Array<{ title?: string; type?: string; [key: string]: unknown }>;
  onClose: () => void;
}

export function NotesExportModal({ deckId, slides, onClose }: NotesExportModalProps) {
  const [copied, setCopied] = useState(false);

  const notesCount = getNotes(deckId).length;
  const slidesWithNotes = useMemo(() => {
    const notes = getNotes(deckId);
    const unique = new Set(notes.map((n) => n.slideIndex));
    return unique.size;
  }, [deckId]);

  const markdown = useMemo(
    () => exportAsMarkdown(deckId, slides),
    [deckId, slides]
  );

  const isEmpty = markdown === '# Slide Notes Export\n\nNo notes yet.\n';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'slide-notes.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        data-testid="notes-export-modal"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close export modal"
          className="absolute top-4 right-4 p-1.5 text-white/40 hover:text-white/80 hover:bg-white/5 rounded-lg transition-colors"
        >
          <X size={16} />
        </button>

        {/* Heading */}
        <h2 className="text-white font-semibold text-lg mb-1">Export Notes</h2>
        <p className="text-xs text-white/50 mb-4">
          {notesCount} {notesCount === 1 ? 'note' : 'notes'} across {slidesWithNotes}{' '}
          {slidesWithNotes === 1 ? 'slide' : 'slides'}
        </p>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
            <p className="text-sm text-white/60">No notes to export — your deck is all set.</p>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-white/10 border border-white/10 text-white/70 hover:bg-white/15 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <textarea
              readOnly
              data-testid="notes-export-textarea"
              rows={14}
              value={markdown}
              className="w-full font-mono text-xs bg-white/5 border border-white/10 rounded-lg p-3 text-white/80 resize-none focus:outline-none mb-4"
            />
            <div className="flex gap-2">
              <button
                data-testid="notes-export-copy"
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
                style={{ background: 'var(--theme-accent-primary)' }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy to Clipboard'}
              </button>
              <button
                data-testid="notes-export-download"
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
              >
                <Download size={14} />
                Download .md
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
