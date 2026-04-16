import type { SlideNote } from '../types';

const keyFor = (deckId: string) => `autodeck-notes-${deckId}`;

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function readNotes(deckId: string): SlideNote[] {
  try {
    const raw = localStorage.getItem(keyFor(deckId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as SlideNote[];
  } catch {
    return [];
  }
}

function writeNotes(deckId: string, notes: SlideNote[]): void {
  try {
    localStorage.setItem(keyFor(deckId), JSON.stringify(notes));
  } catch {
    // Silently swallow — quota exceeded or private browsing mode
  }
}

export function getNotes(deckId: string): SlideNote[] {
  return readNotes(deckId);
}

export function getNotesForSlide(deckId: string, slideIndex: number): SlideNote[] {
  return readNotes(deckId).filter((n) => n.slideIndex === slideIndex);
}

export function addNote(deckId: string, slideIndex: number, text: string): SlideNote {
  const trimmed = text.trim();
  if (!trimmed) throw new Error('Note text is empty');

  const note: SlideNote = {
    id: generateId(),
    slideIndex,
    text: trimmed,
    createdAt: new Date().toISOString(),
    status: 'open',
  };

  const notes = readNotes(deckId);
  notes.push(note);
  writeNotes(deckId, notes);
  return note;
}

export function updateNote(deckId: string, id: string, patch: Partial<SlideNote>): SlideNote | null {
  const notes = readNotes(deckId);
  const index = notes.findIndex((n) => n.id === id);
  if (index === -1) return null;

  // Never allow id or slideIndex to change via patch
  const { id: _id, slideIndex: _slideIndex, ...safePatch } = patch;
  void _id;
  void _slideIndex;

  const updated: SlideNote = { ...notes[index], ...safePatch };
  notes[index] = updated;
  writeNotes(deckId, notes);
  return updated;
}

export function deleteNote(deckId: string, id: string): void {
  const notes = readNotes(deckId);
  writeNotes(deckId, notes.filter((n) => n.id !== id));
}

export function clearAllNotes(deckId: string): void {
  try {
    localStorage.removeItem(keyFor(deckId));
  } catch {
    // Silently swallow
  }
}

export function exportAsMarkdown(
  deckId: string,
  slides: Array<{ title?: string; type?: string; [key: string]: unknown }>
): string {
  const notes = readNotes(deckId);

  if (notes.length === 0) {
    return '# Slide Notes Export\n\nNo notes yet.\n';
  }

  const grouped = new Map<number, SlideNote[]>();
  for (const note of notes) {
    const bucket = grouped.get(note.slideIndex) ?? [];
    bucket.push(note);
    grouped.set(note.slideIndex, bucket);
  }

  const sortedIndices = Array.from(grouped.keys()).sort((a, b) => a - b);

  const sections = sortedIndices.map((idx) => {
    const slide = slides[idx];
    const slideTitle = slide?.title ?? slide?.type ?? 'Untitled';
    const heading = `## Slide ${idx + 1}: ${slideTitle}`;
    const bucketNotes = grouped.get(idx)!;
    const bullets = bucketNotes
      .map((n) => `- [${n.status}] ${n.text}`)
      .join('\n');
    return `${heading}\n\n${bullets}`;
  });

  const header = [
    '# Slide Notes Export',
    '',
    `**Deck:** ${deckId}`,
    `**Generated:** ${new Date().toISOString()}`,
    `**Total notes:** ${notes.length}`,
    '',
    '---',
  ].join('\n');

  return `${header}\n\n${sections.join('\n\n')}\n`;
}
