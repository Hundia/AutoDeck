import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Change '/autodeck/' to match your GitHub repo name for GitHub Pages deployment
  base: '/autodeck/',
});
