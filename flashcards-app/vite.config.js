import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/assets/flashcards/',
  build: {
    outDir: '../docs/assets/flashcards',
    emptyOutDir: false,
    assetsDir: '.',
    rollupOptions: {
      input: 'src/main.jsx',
      output: {
        entryFileNames: 'bundle.js',
        assetFileNames: 'bundle.[ext]',
        chunkFileNames: 'chunk-[name].js'
      }
    }
  }
});
