import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import type { SlideNote } from '../types';
import {
  getNotesForSlide,
  addNote,
  deleteNote,
  clearAllNotes,
} from './notes';
import { NoteCard } from './NoteCard';
import NoteEditor from './NoteEditor';

interface SlideNotesPanelProps {
  deckId: string;
  slideIndex: number;
  slideTitle?: string;
  totalSlides: number;
  isRTL?: boolean;
  onClose: () => void;
  onExport: () => void;
  onNotesChanged?: () => void;
}

export function SlideNotesPanel({
  deckId,
  slideIndex,
  slideTitle,
  totalSlides,
  isRTL = false,
  onClose,
  onExport,
  onNotesChanged,
}: SlideNotesPanelProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [notes, setNotes] = useState<SlideNote[]>([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  function reloadNotes() {
    const fresh = getNotesForSlide(deckId, slideIndex);
    fresh.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setNotes(fresh);
  }

  useEffect(() => {
    reloadNotes();
    // Reset transient state when slide changes
    setIsAdding(false);
    setShowClearConfirm(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId, slideIndex]);

  // Escape key: only fires when textarea is NOT focused (NoteEditor's own handler stops propagation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  function handleSave(text: string) {
    addNote(deckId, slideIndex, text);
    setIsAdding(false);
    reloadNotes();
    onNotesChanged?.();
  }

  function handleDelete(id: string) {
    deleteNote(deckId, id);
    reloadNotes();
    onNotesChanged?.();
  }

  function confirmClear() {
    clearAllNotes(deckId);
    reloadNotes();
    onNotesChanged?.();
    setShowClearConfirm(false);
    setIsAdding(false);
  }

  const panelX = isRTL ? '-100%' : '100%';
  const panelPosition = isRTL ? 'left-0' : 'right-0';
  const borderSide = isRTL ? 'border-r border-white/10' : 'border-l border-white/10';
  const noteCount = notes.length;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        data-testid="notes-panel-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        data-testid="notes-panel"
        initial={{ x: panelX }}
        animate={{ x: 0 }}
        exit={{ x: panelX }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed top-0 bottom-0 w-80 bg-slate-900/95 backdrop-blur-sm ${borderSide} ${panelPosition} z-50 flex flex-col overflow-hidden`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 border-b border-white/10 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-sm font-semibold text-white">Notes</h2>
            <p className="text-xs text-white/50">
              Slide {slideIndex + 1} of {totalSlides} &bull; {noteCount}{' '}
              {noteCount === 1 ? 'note' : 'notes'}
            </p>
            {slideTitle && (
              <p className="text-xs text-white/30 mt-0.5 truncate max-w-[200px]">{slideTitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close notes"
            data-testid="notes-panel-close"
            className="p-1.5 text-white/40 hover:text-white/80 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {isAdding && (
            <NoteEditor
              initialText=""
              onSave={handleSave}
              onCancel={() => setIsAdding(false)}
            />
          )}

          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={handleDelete}
            />
          ))}

          {notes.length === 0 && !isAdding && (
            <div className="flex flex-col items-center justify-center flex-1 text-center py-12">
              <p className="text-sm text-white/50">No notes on this slide yet.</p>
              <p className="text-xs text-white/30 mt-1">
                Click &ldquo;Add Note&rdquo; below to leave a suggestion for the LLM.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-900/95 border-t border-white/10 px-4 py-3 flex flex-col gap-2 flex-shrink-0">
          {showClearConfirm ? (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-white/70 text-center">
                Delete all notes for this deck?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmClear}
                  className="flex-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <>
              {!isAdding && (
                <button
                  onClick={() => setIsAdding(true)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-[var(--theme-accent-primary)] text-white hover:opacity-90 transition-opacity"
                >
                  <Plus size={14} />
                  Add Note
                </button>
              )}

              <button
                data-testid="notes-export-trigger"
                onClick={onExport}
                className="w-full px-3 py-2 rounded-lg text-sm font-medium bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
              >
                Export All
              </button>

              <button
                onClick={() => setShowClearConfirm(true)}
                className="text-xs text-white/30 hover:text-red-400 transition-colors text-center py-1"
              >
                Clear All for this Deck
              </button>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}
