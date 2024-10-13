import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/index.tsx';
import { initI18next } from './translation/index.ts';

const runApp = async () => {
  await initI18next();

  const root = document.getElementById('root')!;
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );

  const splashScreen = document.getElementById('splashScreen')!;
  splashScreen.style.display = 'none';
};

await runApp();
