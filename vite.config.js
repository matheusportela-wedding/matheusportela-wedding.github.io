import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Build a single self-contained `docs/index.html` with all JS/CSS inlined.
// GitHub Pages serves the `docs/` folder directly — no build action required.
// Edit the source under `src/`, run `npm run build`, then commit `docs/`.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
});
