import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// GitHub Pages project site — base must match the repo subpath.
// build.sourcemap stays at its default (false): privacy spec forbids maps in dist.
export default defineConfig({
  base: '/portfolio-web/',
  plugins: [react()],
});
