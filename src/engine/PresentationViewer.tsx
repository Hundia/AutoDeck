import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronDown, Globe, Layers, BookOpen, Palette, Share2, Pencil, StickyNote } from 'lucide-react';
import BackgroundEffect from './BackgroundEffects';
import LanguageDropdown from './LanguageDropdown';
import ScrollProgressBar from './ScrollProgressBar';
import { CreationStoryDrawer } from './CreationStoryDrawer';
import ShareModal from './ShareModal';
import type { SlideData, SlideComponentProps, PresentationConfig, CreationStory } from './types';
import { useTheme } from './ThemeContext';
import { THEMES } from './themes';
import type { ThemeId } from './themes';
import { useEditMode } from './editMode/useEditMode';
import { EditModeToggle } from './editMode/EditModeToggle';
import { SlideNotesPanel } from './editMode/SlideNotesPanel';
import { NotesExportModal } from './editMode/NotesExportModal';
import { getNotes } from './editMode/notes';

const RTL_LANGUAGES = ['he', 'ar', 'fa', 'ur'];

const BG_OPTIONS = [
  { id: 'particles',     label: 'Particles' },
  { id: 'circuits',      label: 'Circuits' },
  { id: 'matrix',        label: 'Matrix' },
  { id: 'constellation', label: 'Constellation' },
  { id: 'hex',           label: 'Hex Grid' },
  { id: 'waves',         label: 'Waves' },
  { id: 'gradient',      label: 'Gradient' },
  { id: 'grid',          label: 'Grid' },
];

interface PresentationViewerProps {
  config: PresentationConfig;
  slides: Record<string, SlideData[]>;
  slideComponents: Record<string, React.ComponentType<SlideComponentProps>>;
  creationStory?: CreationStory;
}

export default function PresentationViewer({
  config,
  slides,
  slideComponents,
  creationStory,
}: PresentationViewerProps) {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [lang, setLang] = useState(config.defaultLanguage);
  const [bg, setBg] = useState(config.background);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [notesPanelOpen, setNotesPanelOpen] = useState(false);
  const [notesExportOpen, setNotesExportOpen] = useState(false);
  const [notesCount, setNotesCount] = useState(0);
  const { editMode, toggle } = useEditMode({ enabled: config.editModeEnabled !== false });
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const deckId = useMemo(() => {
    const segment = location.pathname.split('/').filter(Boolean)[0];
    return segment || 'default';
  }, [location.pathname]);

  const currentSlides = slides[lang] || slides[config.defaultLanguage] || [];
  const isRTL = RTL_LANGUAGES.includes(lang);

  useEffect(() => {
    setNotesCount(getNotes(deckId).length);
  }, [deckId]);

  const handleNotesChanged = () => setNotesCount(getNotes(deckId).length);

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
    if (drawerOpen || shareOpen || notesPanelOpen || notesExportOpen) {
      if (e.key === 'Escape') { setDrawerOpen(false); setShareOpen(false); }
      return;
    }
    if (e.key === 'e' || e.key === 'E') {
      const isEditableFocused = () => {
        const el = document.activeElement as HTMLElement | null;
        if (!el) return false;
        const tag = el.tagName;
        return tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable === true;
      };
      if (!e.metaKey && !e.ctrlKey && !e.altKey && !isEditableFocused() && config.editModeEnabled !== false) {
        e.preventDefault();
        toggle();
      }
      return;
    }
    if (e.key === 'i' || e.key === 'I') {
      if (creationStory) setDrawerOpen(prev => !prev);
      return;
    }
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
  }, [currentSlide, isRTL, drawerOpen, shareOpen, notesPanelOpen, notesExportOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    setHasScrolled(false);
  }, [currentSlide]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    if (scrollRef.current.scrollTop > 100) {
      setHasScrolled(true);
    }
  };

  // Compute isScrollable early (safe: empty slides handled below)
  const currentSlideScrollable = !!(currentSlides[currentSlide] as SlideData | undefined)?.scrollable;

  // Also listen for scroll on inner scrollable children (e.g. MockupSlide browser frame)
  useEffect(() => {
    if (!currentSlideScrollable) return;
    let cleanup: (() => void) | undefined;
    // Delay slightly so the slide component DOM is fully rendered
    const timer = setTimeout(() => {
      if (!scrollRef.current) return;
      const innerScrollable = scrollRef.current.querySelector<HTMLElement>('[class*="overflow-y-auto"]:not([data-theme])');
      if (!innerScrollable) return;
      const onInnerScroll = () => {
        if (innerScrollable.scrollTop > 100) setHasScrolled(true);
      };
      innerScrollable.addEventListener('scroll', onInnerScroll);
      cleanup = () => innerScrollable.removeEventListener('scroll', onInnerScroll);
    }, 500);
    return () => {
      clearTimeout(timer);
      cleanup?.();
    };
  }, [currentSlide, currentSlideScrollable]);

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
      data-theme={theme}
      className={`relative text-white ${isScrollable ? 'h-screen overflow-y-auto overflow-x-hidden' : 'min-h-screen overflow-hidden'}`}
      style={{ background: 'var(--theme-bg)' }}
      onScroll={handleScroll}
    >
      <style>{`@keyframes floatingGrid { 0% { background-position: 0 0; } 100% { background-position: 40px 40px; } }`}</style>

      <BackgroundEffect activeId={bg} />

      {/* Language Selector */}
      <div className={`fixed top-4 z-50 flex items-center gap-2 ${isRTL ? 'left-4' : 'right-4'}`}>
        <div data-testid="control-cluster-edit" className="contents">
          {editMode && (
            <LanguageDropdown
              value={theme}
              onChange={(id) => setTheme(id as ThemeId)}
              icon={<Palette size={14} />}
              align="right"
              options={THEMES.map(t => ({ id: t.id, label: t.label, previewColors: t.previewColors }))}
            />
          )}
          {editMode && (
            <LanguageDropdown
              value={bg}
              onChange={setBg}
              icon={<Layers size={14} />}
              align="right"
              options={BG_OPTIONS}
            />
          )}
          {editMode && config.languages.length > 1 && (
            <LanguageDropdown
              value={lang}
              onChange={setLang}
              icon={<Globe size={14} />}
              animateIcon
              align="right"
              options={config.languages}
            />
          )}
          {editMode && (
            <button
              type="button"
              data-testid="notes-button"
              aria-label="Open slide notes"
              onClick={() => setNotesPanelOpen(true)}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 hover:bg-white/10 transition-colors"
            >
              <StickyNote size={14} />
              {notesCount > 0 && (
                <span
                  data-testid="notes-count-badge"
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-amber-500 text-white text-[10px] rounded-full flex items-center justify-center font-semibold"
                >
                  {notesCount}
                </span>
              )}
            </button>
          )}
        </div>
        <div data-testid="control-cluster-live" className="contents">
          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white/70 hover:text-white text-xs font-medium transition-colors"
            aria-label="Share"
          >
            <Share2 size={14} />
          </button>
          {config.editModeEnabled !== false && (
            <EditModeToggle editMode={editMode} onToggle={toggle} />
          )}
        </div>
      </div>

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
                  ? 'w-4 sm:w-8 h-1.5 sm:h-2'
                  : 'bg-white/30 hover:bg-white/50 w-1.5 sm:w-2 h-1.5 sm:h-2'
              }`}
              style={idx === currentSlide ? { background: 'var(--theme-dot-active)' } : {}}
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
        creationStory ? (
          <button
            onClick={() => setDrawerOpen(true)}
            className={`fixed bottom-4 text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer ${isRTL ? 'right-4' : 'left-4'}`}
          >
            {config.branding}
          </button>
        ) : config.brandingUrl ? (
          <a
            href={config.brandingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`fixed bottom-4 text-xs text-white/30 hover:text-white/60 transition-colors ${isRTL ? 'right-4' : 'left-4'}`}
          >
            {config.branding}
          </a>
        ) : (
          <div className={`fixed bottom-4 text-xs text-white/30 ${isRTL ? 'right-4' : 'left-4'}`}>
            {config.branding}
          </div>
        )
      )}

      {/* Keyboard hint */}
      <div className={`fixed bottom-4 text-xs text-white/40 ${isRTL ? 'left-4' : 'right-4'}`}>
        {keyboardHint}
      </div>

      {/* Edit mode indicator pill */}
      {editMode && (
        <div
          data-testid="edit-mode-pill"
          className="fixed bottom-4 left-4 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border text-xs"
          style={{
            borderColor: 'var(--theme-accent-primary)',
            color: 'var(--theme-accent-primary)',
          }}
        >
          <Pencil size={12} />
          <span>EDIT MODE</span>
        </div>
      )}

      {/* Creation Story trigger pill */}
      {editMode && creationStory && (
        <motion.button
          onClick={() => setDrawerOpen(prev => !prev)}
          className={`fixed bottom-20 z-50 flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white/70 hover:text-white text-xs font-medium transition-colors ${isRTL ? 'left-4' : 'right-4'}`}
          aria-label="How This Was Built"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.4, ease: 'easeOut' }}
        >
          <BookOpen size={14} />
          <span>Creation Story</span>
        </motion.button>
      )}

      {/* Creation Story drawer */}
      {creationStory && (
        <CreationStoryDrawer
          story={creationStory}
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          isRTL={isRTL}
        />
      )}

      {/* Scroll invite arrow */}
      <AnimatePresence>
        {isScrollable && !hasScrolled && (
          <motion.div
            key="scroll-arrow"
            data-testid="scroll-invite-arrow"
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 1.2, duration: 0.6 } }}
            exit={{ opacity: 0, transition: { delay: 0, duration: 0.4 } }}
          >
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-1"
            >
              <ChevronDown size={24} className="text-white/50" />
              <span className="text-xs text-white/40">scroll to explore</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share modal */}
      <AnimatePresence>
        {shareOpen && (
          <ShareModal
            url={window.location.href}
            title={config.title}
            onClose={() => setShareOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Slide Notes Panel */}
      <AnimatePresence>
        {notesPanelOpen && (
          <SlideNotesPanel
            deckId={deckId}
            slideIndex={currentSlide}
            slideTitle={currentSlides[currentSlide]?.title}
            totalSlides={currentSlides.length}
            isRTL={isRTL}
            onClose={() => setNotesPanelOpen(false)}
            onExport={() => setNotesExportOpen(true)}
            onNotesChanged={handleNotesChanged}
          />
        )}
      </AnimatePresence>

      {/* Notes Export Modal */}
      <AnimatePresence>
        {notesExportOpen && (
          <NotesExportModal
            deckId={deckId}
            slides={currentSlides}
            onClose={() => setNotesExportOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
