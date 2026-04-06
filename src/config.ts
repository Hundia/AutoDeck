import type { PresentationConfig } from './engine/types';

export const presentationConfig: PresentationConfig = {
  title: 'AutoDeck',
  languages: [
    { id: 'en', label: 'English' },
    { id: 'he', label: '\u05E2\u05D1\u05E8\u05D9\u05EA' },
  ],
  defaultLanguage: 'en',
  background: 'particles',
  branding: 'Built with AutoDeck',
  brandingUrl: 'https://github.com/Hundia/AutoDeck',
  keyboardHint: {
    en: '\u2190 \u2192 to navigate',
    he: '\u2190 \u2192 \u05DC\u05E0\u05D9\u05D5\u05D5\u05D8',
  },
};
