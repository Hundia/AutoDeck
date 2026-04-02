import { HashRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './landing';
import PresentationViewer from './engine/PresentationViewer';
import { presentationConfig } from './config';
import { slidesEN } from './slides/slides-en';
import { slidesHE } from './slides/slides-he';
import { slideComponents } from './slides/registry';

export default function App() {
  const slides = { en: slidesEN, he: slidesHE };
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/presentation"
          element={
            <PresentationViewer
              config={presentationConfig}
              slides={slides}
              slideComponents={slideComponents}
            />
          }
        />
      </Routes>
    </HashRouter>
  );
}
