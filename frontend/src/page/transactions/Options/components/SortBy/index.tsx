import { FC } from 'react';
import { TransactionsPageOptionsSortByCategory } from './Category';
import { TransactionsPageOptionsSortByMode } from './Mode';
import { TransactionsPageOptionsSortByPeriod } from './Period';
import { TransactionsPageOptionsSortByType } from './Type';

export const TransactionsPageOptionsSortBy: FC = () => {
  return (
    <>
      <TransactionsPageOptionsSortByCategory />
      <TransactionsPageOptionsSortByType />
      <TransactionsPageOptionsSortByMode />
      <TransactionsPageOptionsSortByPeriod />
    </>
  );
};
