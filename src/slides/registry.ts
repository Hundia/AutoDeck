import type { SlideComponentProps } from '../engine/types';
import TitleSlide from './components/TitleSlide';
import ContentSlide from './components/ContentSlide';
import ComparisonSlide from './components/ComparisonSlide';
import StatsSlide from './components/StatsSlide';
import QuoteSlide from './components/QuoteSlide';
import TimelineSlide from './components/TimelineSlide';
import ClosingSlide from './components/ClosingSlide';
import FinalSlide from './components/FinalSlide';
import CodeSlide from './components/CodeSlide';
import DiagramSlide from './components/DiagramSlide';
import MockupSlide from './components/MockupSlide';

// Map slide type strings to their React components.
// Add your custom slide types here.
export const slideComponents: Record<string, React.ComponentType<SlideComponentProps>> = {
  title: TitleSlide,
  content: ContentSlide,
  comparison: ComparisonSlide,
  stats: StatsSlide,
  quote: QuoteSlide,
  timeline: TimelineSlide,
  closing: ClosingSlide,
  final: FinalSlide,
  code: CodeSlide,
  diagram: DiagramSlide,
  mockup: MockupSlide,
};
