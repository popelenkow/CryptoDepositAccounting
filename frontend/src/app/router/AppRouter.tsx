import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AccountPage } from '../../page/account';
import { ExtensionPopupPage } from '../../page/extensionPopup';
import { GridsPage } from '../../page/grids';
import { NotFoundPage } from '../../page/notFound';
import { TransactionEditPage } from '../../page/transactionEdit';
import { TransactionNewPage } from '../../page/transactionNew';
import { AppLayout } from '../Layout';
import { routePatterns } from './routes';

export const AppRouter: FC = () => {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.get('mode') === 'extensionPopup') {
    return (
      <Routes>
        <Route element={<ExtensionPopupPage />} path='*' />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          element={<TransactionNewPage />}
          path={routePatterns.transactionNew}
        />
        <Route
          element={<TransactionEditPage />}
          path={routePatterns.transactionEdit}
        />
        <Route element={<GridsPage />} path={routePatterns.grids} />
        <Route element={<AccountPage />} path={routePatterns.account} />
        <Route element={<GridsPage />} path={routePatterns.home} />
        <Route element={<NotFoundPage />} path='*' />
      </Route>
    </Routes>
  );
};
