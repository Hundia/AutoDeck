export type ThemeId = 'aurora' | 'sivania' | 'noir';

export interface Theme {
  id: ThemeId;
  label: string;
  previewColors: string[];  // used by Palette dropdown swatches
}

export const THEMES: Theme[] = [
  { id: 'aurora',  label: 'Aurora',  previewColors: ['#60a5fa', '#a78bfa', '#0f172a'] },
  { id: 'sivania', label: 'Sivania Light', previewColors: ['#698472', '#8e6a59', '#f5f3ed'] },
  { id: 'noir',    label: 'Noir',    previewColors: ['#00d9ff', '#0099b8', '#0a0a0a'] },
];

export const DEFAULT_THEME: ThemeId = 'aurora';
