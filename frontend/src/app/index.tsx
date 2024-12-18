import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { FC } from 'react';
import { HashRouter } from 'react-router-dom';
import { queryClient } from '../api/queryClient';
import { AppRouter } from './router/AppRouter';
import { appTheme } from './theme';

export const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <HashRouter>
          <AppRouter />
        </HashRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
