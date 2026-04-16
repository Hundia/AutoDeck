import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'autodeck-edit-mode';

interface UseEditModeOptions {
  enabled?: boolean;
}

interface UseEditModeReturn {
  editMode: boolean;
  setEditMode: (v: boolean) => void;
  toggle: () => void;
}

function readStorage(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function writeStorage(v: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, v ? '1' : '0');
  } catch {
    // ignore
  }
}

export function useEditMode(options: UseEditModeOptions = {}): UseEditModeReturn {
  const enabled = options.enabled !== false;

  const [editMode, setEditModeState] = useState<boolean>(() => readStorage());

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setEditModeState(e.newValue === '1');
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const setEditMode = useCallback(
    (v: boolean) => {
      if (!enabled) return;
      setEditModeState(v);
      writeStorage(v);
    },
    [enabled]
  );

  const toggle = useCallback(() => {
    if (!enabled) return;
    setEditModeState((prev) => {
      const next = !prev;
      writeStorage(next);
      return next;
    });
  }, [enabled]);

  const effectiveEditMode = enabled ? editMode : false;

  return { editMode: effectiveEditMode, setEditMode, toggle };
}
