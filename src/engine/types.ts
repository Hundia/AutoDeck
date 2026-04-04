export type Language = string;

export interface SlideData {
  type: string;
  scrollable?: boolean;
  [key: string]: unknown;
}

export interface SlideComponentProps<T extends SlideData = SlideData> {
  data: T;
  lang: Language;
}

export interface LanguageOption {
  id: string;
  label: string;
}

export interface PresentationConfig {
  title: string;
  languages: LanguageOption[];
  defaultLanguage: string;
  background: string;
  branding?: string;
  keyboardHint?: Record<string, string>;
}

export interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  col: number;
  row: number;
  color?: 'blue' | 'violet' | 'emerald' | 'amber' | 'cyan' | 'slate';
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
}

export interface DiagramSlideData extends SlideData {
  type: 'diagram';
  mode: 'arch' | 'sequence' | 'er';
  title: string;
  subtitle?: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

export type BlockType = 'navbar' | 'hero' | 'card-grid' | 'table' | 'form' | 'chart-bar' | 'sidebar' | 'text-block';

export interface MockupBlock {
  type: BlockType;
  label?: string;
}

export interface MockupFrame {
  url?: string;
  blocks: MockupBlock[];
}

export interface MockupSlideData extends SlideData {
  type: 'mockup';
  title: string;
  subtitle?: string;
  displayMode: 'browser' | 'flow';
  url?: string;
  blocks?: MockupBlock[];
  frames?: MockupFrame[];
}
