import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import appPackage from './package.json';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2022',
    assetsDir: '',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        bybitApi: 'src/api/bybit/index.ts',
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
});
