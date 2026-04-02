import PresentationViewer from './engine/PresentationViewer';
import { presentationConfig } from './config';
import { slideComponents } from './slides/registry';
import { slidesEN } from './slides/slides-en';
import { slidesHE } from './slides/slides-he';

const slides = {
  en: slidesEN,
  he: slidesHE,
};

export default function App() {
  return (
    <PresentationViewer
      config={presentationConfig}
      slides={slides}
      slideComponents={slideComponents}
    />
  );
}
