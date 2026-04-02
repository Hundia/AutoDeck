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
