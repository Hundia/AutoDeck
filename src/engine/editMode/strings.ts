export type EditModeStrings = {
  toggleLive: string;
  toggleEdit: string;
  modePill: string;
  notesTitle: string;
  notesSlideLabel: (slideNum: number, total: number) => string;
  notesCountSuffix: (count: number) => string;
  addNote: string;
  emptyState: string;
  exportAll: string;
  clearAll: string;
  exportCopied: string;
  exportEmpty: string;
};

export const editModeStringsEN: EditModeStrings = {
  toggleLive: 'Live',
  toggleEdit: 'Edit',
  modePill: 'EDIT MODE',
  notesTitle: 'Notes',
  notesSlideLabel: (n, total) => `Slide ${n} of ${total}`,
  notesCountSuffix: (c) => (c === 1 ? 'note' : 'notes'),
  addNote: 'Add Note',
  emptyState: 'No notes on this slide yet. Click "Add Note" to leave a suggestion for the LLM.',
  exportAll: 'Export Notes for LLM',
  clearAll: 'Clear All',
  exportCopied: 'Copied \u2713',
  exportEmpty: 'No notes to export \u2014 your deck is all set.',
};

export const editModeStringsHE: EditModeStrings = {
  toggleLive: '\u05ea\u05e6\u05d5\u05d2\u05d4',
  toggleEdit: '\u05e2\u05e8\u05d9\u05db\u05d4',
  modePill: '\u05de\u05e6\u05d1 \u05e2\u05e8\u05d9\u05db\u05d4',
  notesTitle: '\u05d4\u05e2\u05e8\u05d5\u05ea',
  notesSlideLabel: (n, total) => `\u05e9\u05e7\u05e3 ${n} \u05de\u05ea\u05d5\u05da ${total}`,
  notesCountSuffix: (c) => (c === 1 ? '\u05d4\u05e2\u05e8\u05d4' : '\u05d4\u05e2\u05e8\u05d5\u05ea'),
  addNote: '\u05d4\u05d5\u05e1\u05e3 \u05d4\u05e2\u05e8\u05d4',
  emptyState: '\u05d0\u05d9\u05df \u05d4\u05e2\u05e8\u05d5\u05ea \u05e2\u05dc \u05e9\u05e7\u05e3 \u05d6\u05d4. \u05dc\u05d7\u05e5 "\u05d4\u05d5\u05e1\u05e3 \u05d4\u05e2\u05e8\u05d4" \u05db\u05d3\u05d9 \u05dc\u05d4\u05e9\u05d0\u05d9\u05e8 \u05d4\u05e0\u05d7\u05d9\u05d4 \u05dc-LLM.',
  exportAll: '\u05d9\u05d9\u05e6\u05d0 \u05d4\u05e2\u05e8\u05d5\u05ea \u05dc-LLM',
  clearAll: '\u05e0\u05e7\u05d4 \u05d4\u05db\u05dc',
  exportCopied: '\u05d4\u05d5\u05e2\u05ea\u05e7 \u2713',
  exportEmpty: '\u05d0\u05d9\u05df \u05d4\u05e2\u05e8\u05d5\u05ea \u05dc\u05d9\u05d9\u05e6\u05d5\u05d0 \u2014 \u05d4\u05de\u05e6\u05d2\u05ea \u05de\u05d5\u05db\u05e0\u05d4.',
};

export function getEditModeStrings(lang: string): EditModeStrings {
  if (lang === 'he') return editModeStringsHE;
  return editModeStringsEN;
}
