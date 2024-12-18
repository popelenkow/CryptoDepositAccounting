import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import appPackage from './package.json';

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
    mkcert(),
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
  define: {
    APP_VERSION: JSON.stringify(appPackage.version),
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    https: true,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
});
