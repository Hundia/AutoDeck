export interface GalleryEntry {
  id: string;         // slug, e.g. 'techbrief'
  title: string;      // display name
  slideCount: number; // verified from source
  route: string;      // full hash route, e.g. '#/techbrief'
  thumbnail: string;  // PNG filename, e.g. 'techbrief.png'
  featured?: boolean; // pinned to top of gallery with visual badge
}

export const galleryConfig: GalleryEntry[] = [
  { id: 'meta',      title: 'AutoDeck — The Framework',  slideCount: 8,  route: '#/meta',         thumbnail: 'meta.png',      featured: true },
  { id: 'acme',      title: 'Acme Corp Demo',            slideCount: 9,  route: '#/presentation', thumbnail: 'acme.png' },
  { id: 'techbrief', title: 'AutoSpec TechBrief',       slideCount: 10, route: '#/techbrief',    thumbnail: 'techbrief.png' },
  { id: 'uimockup',  title: 'Dashboard Design System',  slideCount: 10, route: '#/uimockup',     thumbnail: 'uimockup.png' },
  { id: 'howto',     title: 'How to Build with AI',     slideCount: 10, route: '#/howto',        thumbnail: 'howto.png' },
  { id: 'learnflow', title: 'LearnFlow Pitch Deck',     slideCount: 9,  route: '#/learnflow',    thumbnail: 'learnflow.png' },
  { id: 'ferric',    title: 'Ferric CLI v1.0',          slideCount: 9,  route: '#/ferric',       thumbnail: 'ferric.png' },
  { id: 'q2review',  title: 'Q2 2026 Business Review',  slideCount: 15, route: '#/q2review',     thumbnail: 'q2review.png' },
];
