import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Must match the exact GitHub repo name casing (case-sensitive on GitHub Pages)
  base: '/AutoDeck/',
});
