import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AccountPage } from '../../page/account';
import { NotFoundPage } from '../../page/notFound';
import { TransactionEditPage } from '../../page/transactionEdit';
import { TransactionNewPage } from '../../page/transactionNew';
import { routePatterns } from './routes';

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route
        element={<TransactionNewPage />}
        path={routePatterns.transactionNew}
      />
      <Route
        element={<TransactionEditPage />}
        path={routePatterns.transactionEdit}
      />
      <Route element={<AccountPage />} path={routePatterns.account} />
      <Route element={<AccountPage />} path={routePatterns.home} />
      <Route element={<NotFoundPage />} path='*' />
    </Routes>
  );
};
