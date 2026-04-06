import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './engine/ThemeContext';
import { LandingPage } from './landing';
import PresentationViewer from './engine/PresentationViewer';
import { presentationConfig } from './config';
import { slidesEN } from './slides/slides-en';
import { slidesHE } from './slides/slides-he';
import { slidesTechbriefEN } from './slides/data/slides-techbrief-en';
import { slidesTechbriefHE } from './slides/data/slides-techbrief-he';
import { slidesUimockupEN } from './slides/data/slides-uimockup-en';
import { slidesUimockupHE } from './slides/data/slides-uimockup-he';
import { slidesHowtoEN } from './slides/data/slides-howto-en';
import { slidesHowtoHE } from './slides/data/slides-howto-he';
import { slideComponents } from './slides/registry';
import type { PresentationConfig } from './engine/types';
import { acmeCreationStory } from './slides/data/creation-story-acme';
import { techBriefCreationStory } from './slides/data/creation-story-techbrief';
import { uiMockupCreationStory } from './slides/data/creation-story-uimockup';
import { howToCreationStory } from './slides/data/creation-story-howto';
import { slidesLearnflowEN } from './slides/data/slides-learnflow-en';
import { learnflowCreationStory } from './slides/data/creation-story-learnflow';
import { slidesFerricEN } from './slides/data/slides-ferric-en';
import { ferricCreationStory } from './slides/data/creation-story-ferric';
import { slidesQ2ReviewEN } from './slides/data/slides-q2review-en';
import { q2ReviewCreationStory } from './slides/data/creation-story-q2review';
import { slidesMetaEN } from './slides/data/slides-meta-en';
import { metaCreationStory } from './slides/data/creation-story-meta';

const techBriefConfig: PresentationConfig = {
  title: 'AutoSpec TechBrief',
  languages: [{ id: 'en', label: 'English' }, { id: 'he', label: 'עברית' }],
  defaultLanguage: 'en',
  background: 'circuits',
  branding: 'Built with AutoDeck',
  brandingUrl: 'https://github.com/Hundia/AutoDeck',
};

const uiMockupConfig: PresentationConfig = {
  title: 'AutoDeck Dashboard DS',
  languages: [{ id: 'en', label: 'English' }, { id: 'he', label: 'עברית' }],
  defaultLanguage: 'en',
  background: 'constellation',
  branding: 'Built with AutoDeck',
  brandingUrl: 'https://github.com/Hundia/AutoDeck',
};

const howToConfig: PresentationConfig = {
  title: 'AutoDeck How-To',
  languages: [{ id: 'en', label: 'English' }, { id: 'he', label: 'עברית' }],
  defaultLanguage: 'en',
  background: 'hex',
  branding: 'Built with AutoDeck',
  brandingUrl: 'https://github.com/Hundia/AutoDeck',
};

const learnflowConfig: PresentationConfig = {
  title: 'LearnFlow — Adaptive EdTech',
  languages: [{ id: 'en', label: 'English' }],
  defaultLanguage: 'en',
  background: 'gradient',
  branding: 'Built with AutoDeck',
  brandingUrl: 'https://github.com/Hundia/AutoDeck',
};

const ferricConfig: PresentationConfig = {
  title: 'Ferric — Rust CLI Tool',
  languages: [{ id: 'en', label: 'English' }],
  defaultLanguage: 'en',
  background: 'circuits',
  branding: 'Built with AutoDeck',
  brandingUrl: 'https://github.com/Hundia/AutoDeck',
};

const q2ReviewConfig: PresentationConfig = {
  title: 'Q2 2026 Business Review',
  languages: [{ id: 'en', label: 'English' }],
  defaultLanguage: 'en',
  background: 'waves',
  branding: 'Built with AutoDeck',
  brandingUrl: 'https://github.com/Hundia/AutoDeck',
};

const metaConfig: PresentationConfig = {
  title: 'AutoDeck',
  languages: [{ id: 'en', label: 'English' }],
  defaultLanguage: 'en',
  background: 'particles',
  branding: 'Built with AutoDeck',
  brandingUrl: 'https://github.com/Hundia/AutoDeck',
};

export default function App() {
  const acmeSlides = { en: slidesEN, he: slidesHE };
  const techBriefSlides = { en: slidesTechbriefEN, he: slidesTechbriefHE };
  const uiMockupSlides = { en: slidesUimockupEN, he: slidesUimockupHE };
  const howToSlides = { en: slidesHowtoEN, he: slidesHowtoHE };

  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/presentation"
            element={<PresentationViewer config={presentationConfig} slides={acmeSlides} slideComponents={slideComponents} creationStory={acmeCreationStory} />}
          />
          <Route
            path="/techbrief"
            element={<PresentationViewer config={techBriefConfig} slides={techBriefSlides} slideComponents={slideComponents} creationStory={techBriefCreationStory} />}
          />
          <Route
            path="/uimockup"
            element={<PresentationViewer config={uiMockupConfig} slides={uiMockupSlides} slideComponents={slideComponents} creationStory={uiMockupCreationStory} />}
          />
          <Route
            path="/howto"
            element={<PresentationViewer config={howToConfig} slides={howToSlides} slideComponents={slideComponents} creationStory={howToCreationStory} />}
          />
          <Route
            path="/learnflow"
            element={<PresentationViewer config={learnflowConfig} slides={{ en: slidesLearnflowEN }} slideComponents={slideComponents} creationStory={learnflowCreationStory} />}
          />
          <Route
            path="/ferric"
            element={<PresentationViewer config={ferricConfig} slides={{ en: slidesFerricEN }} slideComponents={slideComponents} creationStory={ferricCreationStory} />}
          />
          <Route
            path="/q2review"
            element={<PresentationViewer config={q2ReviewConfig} slides={{ en: slidesQ2ReviewEN }} slideComponents={slideComponents} creationStory={q2ReviewCreationStory} />}
          />
          <Route
            path="/meta"
            element={<PresentationViewer config={metaConfig} slides={{ en: slidesMetaEN }} slideComponents={slideComponents} creationStory={metaCreationStory} />}
          />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}
