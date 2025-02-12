import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: './package.json', dest: '' },
        { src: './readme.md', dest: '' },
        { src: '../license.md', dest: '' },
        { src: './src/manifest.json', dest: '' },
      ],
    }),
  ],
  build: {
    target: 'es2022',
    assetsDir: '',
    rollupOptions: {
      input: {
        index: 'index.html',
      },
      output: {
        assetFileNames: '[name][extname]',
        chunkFileNames: '[name].js',
        entryFileNames: '[name].js',
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
      },
    },
  },
});
