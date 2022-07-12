/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// eslint-disable-next-line import/no-unresolved
import Icons from 'unplugin-icons/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { alias } from './alias';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    setupFiles: 'src/setupTests.js',
  },
  resolve: {
    alias,
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-router-dom', 'react-dom'],
        },
      },
    },
  },
  plugins: [
    react(),
    Icons({ compiler: 'jsx', jsx: 'react' }),
    visualizer({
      filename: './rollup-bundle-size-stats.html',
    }),
  ],
});
