import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAppMode } from '../../common/appMode';
import { ExtensionPopupPage } from '../../page/extensionPopup';
import { NotFoundPage } from '../../page/notFound';
import { TransactionsPage } from '../../page/transactions';
import { AppLayout } from '../Layout';
import { routePatterns } from './routes';

export const AppRouter: FC = () => {
  if (getAppMode() === 'extensionPopup') {
    return (
      <Routes>
        <Route element={<ExtensionPopupPage />} path='*' />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<TransactionsPage />} path={routePatterns.home} />
        <Route element={<TransactionsPage />} path={routePatterns.grids} />
        <Route element={<NotFoundPage />} path='*' />
      </Route>
    </Routes>
  );
};
