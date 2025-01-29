import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { FC } from 'react';
import { I18nextProvider } from 'react-i18next';
import { HashRouter } from 'react-router-dom';
import { queryClient } from '../api/queryClient';
import { i18n } from '../translation';
import { AppRouter } from './router/AppRouter';
import { appTheme } from './theme';

export const App: FC = () => {
  return (
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <HashRouter>
            <AppRouter />
          </HashRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
};
