import { HashRouter, Routes, Route } from 'react-router-dom';
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

const techBriefConfig: PresentationConfig = {
  title: 'AutoSpec TechBrief',
  languages: [{ id: 'en', label: 'English' }, { id: 'he', label: 'עברית' }],
  defaultLanguage: 'en',
  background: 'circuits',
  branding: 'Built with AutoDeck',
};

const uiMockupConfig: PresentationConfig = {
  title: 'AutoDeck Dashboard DS',
  languages: [{ id: 'en', label: 'English' }, { id: 'he', label: 'עברית' }],
  defaultLanguage: 'en',
  background: 'constellation',
  branding: 'Built with AutoDeck',
};

const howToConfig: PresentationConfig = {
  title: 'AutoDeck How-To',
  languages: [{ id: 'en', label: 'English' }, { id: 'he', label: 'עברית' }],
  defaultLanguage: 'en',
  background: 'hex',
  branding: 'Built with AutoDeck',
};

export default function App() {
  const acmeSlides = { en: slidesEN, he: slidesHE };
  const techBriefSlides = { en: slidesTechbriefEN, he: slidesTechbriefHE };
  const uiMockupSlides = { en: slidesUimockupEN, he: slidesUimockupHE };
  const howToSlides = { en: slidesHowtoEN, he: slidesHowtoHE };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/presentation"
          element={<PresentationViewer config={presentationConfig} slides={acmeSlides} slideComponents={slideComponents} />}
        />
        <Route
          path="/techbrief"
          element={<PresentationViewer config={techBriefConfig} slides={techBriefSlides} slideComponents={slideComponents} />}
        />
        <Route
          path="/uimockup"
          element={<PresentationViewer config={uiMockupConfig} slides={uiMockupSlides} slideComponents={slideComponents} />}
        />
        <Route
          path="/howto"
          element={<PresentationViewer config={howToConfig} slides={howToSlides} slideComponents={slideComponents} />}
        />
      </Routes>
    </HashRouter>
  );
}
