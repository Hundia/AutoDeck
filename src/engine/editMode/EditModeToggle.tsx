import React from 'react';
import { Eye, Pencil } from 'lucide-react';

interface EditModeToggleProps {
  editMode: boolean;
  onToggle: () => void;
  label?: { live: string; edit: string };
}

export function EditModeToggle({ editMode, onToggle, label }: EditModeToggleProps) {
  const liveLabel = label?.live ?? 'Live';
  const editLabel = label?.edit ?? 'Edit';

  const baseClasses =
    'flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border text-xs transition-colors hover:bg-white/10';

  const stateClasses = editMode
    ? 'border-[var(--theme-accent-primary)]/50 text-white'
    : 'border-white/10 text-white/70';

  return (
    <button
      type="button"
      data-testid="edit-mode-toggle"
      aria-pressed={editMode}
      aria-label={editMode ? 'Exit edit mode' : 'Enter edit mode'}
      onClick={onToggle}
      className={`${baseClasses} ${stateClasses}`}
    >
      {editMode ? (
        <Pencil
          size={14}
          style={{
            color: 'var(--theme-accent-primary)',
            filter: 'drop-shadow(0 0 4px var(--theme-accent-glow))',
          }}
        />
      ) : (
        <Eye size={14} />
      )}
      <span>{editMode ? editLabel : liveLabel}</span>
    </button>
  );
}
