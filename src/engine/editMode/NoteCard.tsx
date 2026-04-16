import { Trash2 } from 'lucide-react';
import type { SlideNote } from '../types';

interface NoteCardProps {
  note: SlideNote;
  onDelete: (id: string) => void;
  onStatusChange?: (id: string, status: SlideNote['status']) => void;
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return 'just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  const day = Math.floor(hr / 24);
  return `${day} day${day === 1 ? '' : 's'} ago`;
}

const STATUS_CYCLE: SlideNote['status'][] = ['open', 'applied', 'dismissed'];

function nextStatus(current: SlideNote['status']): SlideNote['status'] {
  const idx = STATUS_CYCLE.indexOf(current);
  return STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
}

const STATUS_CLASSES: Record<SlideNote['status'], string> = {
  open: 'bg-amber-500/20 text-amber-300 border border-amber-500/40',
  applied: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
  dismissed: 'bg-slate-500/20 text-slate-300 border border-slate-500/40',
};

export function NoteCard({ note, onDelete, onStatusChange }: NoteCardProps) {
  const pillClasses = `px-2 py-0.5 rounded-full ${STATUS_CLASSES[note.status]}`;

  return (
    <div
      data-testid={`note-card-${note.id}`}
      className="bg-[var(--theme-surface)] border border-[var(--theme-surface-border)] rounded-lg p-3 flex flex-col gap-2"
    >
      <p className="text-sm text-[var(--theme-text-primary)] whitespace-pre-wrap max-h-[8rem] overflow-y-auto">
        {note.text}
      </p>

      <div className="flex items-center justify-between gap-2 text-xs">
        {onStatusChange ? (
          <button
            onClick={() => onStatusChange(note.id, nextStatus(note.status))}
            className={pillClasses}
          >
            {note.status}
          </button>
        ) : (
          <span className={pillClasses}>{note.status}</span>
        )}

        <span className="text-[var(--theme-text-secondary)]">
          {relativeTime(note.createdAt)}
        </span>

        <button
          onClick={() => onDelete(note.id)}
          aria-label="Delete note"
          className="text-white/40 hover:text-red-400 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
