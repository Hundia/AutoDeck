import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import BackgroundEffect from './BackgroundEffects';
import LanguageDropdown from './LanguageDropdown';
import ScrollProgressBar from './ScrollProgressBar';
import type { SlideData, SlideComponentProps, PresentationConfig } from './types';

const RTL_LANGUAGES = ['he', 'ar', 'fa', 'ur'];

interface PresentationViewerProps {
  config: PresentationConfig;
  slides: Record<string, SlideData[]>;
  slideComponents: Record<string, React.ComponentType<SlideComponentProps>>;
}

export default function PresentationViewer({
  config,
  slides,
  slideComponents,
}: PresentationViewerProps) {
  const [lang, setLang] = useState(config.defaultLanguage);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentSlides = slides[lang] || slides[config.defaultLanguage] || [];
  const isRTL = RTL_LANGUAGES.includes(lang);

  const nextSlide = () => {
    if (currentSlide < currentSlides.length - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      if (isRTL) prevSlide(); else nextSlide();
    } else if (e.key === 'ArrowLeft') {
      if (isRTL) nextSlide(); else prevSlide();
    } else if (e.key === ' ') {
      const isScrollable = !!(currentSlides[currentSlide] as SlideData).scrollable;
      if (!isScrollable) {
        e.preventDefault();
        nextSlide();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isRTL]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [currentSlide]);

  if (currentSlides.length === 0) return null;

  const currentSlideData = currentSlides[currentSlide];
  const isScrollable = !!currentSlideData.scrollable;
  const SlideComponent = slideComponents[currentSlideData.type];

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir * (isRTL ? -100 : 100),
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir * (isRTL ? 100 : -100),
    }),
  };

  const defaultKeyboardHint: Record<string, string> = {
    en: '\u2190 \u2192 to navigate',
    he: '\u2190 \u2192 \u05DC\u05E0\u05D9\u05D5\u05D5\u05D8',
  };
  const keyboardHint = config.keyboardHint?.[lang] || defaultKeyboardHint[lang] || defaultKeyboardHint.en;

  return (
    <div
      ref={scrollRef}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white ${isScrollable ? 'h-screen overflow-y-auto overflow-x-hidden' : 'min-h-screen overflow-hidden'}`}
    >
      <style>{`@keyframes floatingGrid { 0% { background-position: 0 0; } 100% { background-position: 40px 40px; } }`}</style>

      <BackgroundEffect activeId={config.background} />

      {/* Language Selector */}
      {config.languages.length > 1 && (
        <div className={`fixed top-4 z-50 ${isRTL ? 'left-4' : 'right-4'}`}>
          <LanguageDropdown
            value={lang}
            onChange={setLang}
            icon={<Globe size={14} />}
            animateIcon
            align="right"
            options={config.languages}
          />
        </div>
      )}

      {/* Slide Counter */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 text-sm text-white/60">
        {currentSlide + 1} / {currentSlides.length}
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`${lang}-${currentSlide}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`min-h-screen ${isScrollable ? 'pt-16' : 'flex items-center justify-center'} p-8`}
        >
          {SlideComponent && <SlideComponent data={currentSlideData} lang={lang} />}
        </motion.div>
      </AnimatePresence>

      <ScrollProgressBar containerRef={scrollRef} visible={isScrollable} />

      {/* Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-full transition-colors"
          aria-label="Previous"
        >
          {isRTL ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>

        <div className={`flex gap-1 sm:gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {currentSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentSlide ? 1 : -1);
                setCurrentSlide(idx);
              }}
              className={`rounded-full transition-all ${
                idx === currentSlide
                  ? 'bg-blue-500 w-4 sm:w-8 h-1.5 sm:h-2'
                  : 'bg-white/30 hover:bg-white/50 w-1.5 sm:w-2 h-1.5 sm:h-2'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === currentSlides.length - 1}
          className="p-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-full transition-colors"
          aria-label="Next"
        >
          {isRTL ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>

      {/* Branding */}
      {config.branding && (
        <div className={`fixed bottom-4 text-xs text-white/30 ${isRTL ? 'right-4' : 'left-4'}`}>
          {config.branding}
        </div>
      )}

      {/* Keyboard hint */}
      <div className={`fixed bottom-4 text-xs text-white/40 ${isRTL ? 'left-4' : 'right-4'}`}>
        {keyboardHint}
      </div>
    </div>
  );
}
