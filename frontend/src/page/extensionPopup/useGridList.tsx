import { useQuery } from '@tanstack/react-query';
import { getTransactionsOptions } from '../../api/backend/endpoints';
import { Transaction } from '../../api/backend/types';

export const useGridList = () => {
  const transactions = useQuery(getTransactionsOptions);

  if (!transactions.data) {
    return [];
  }

  const gridList = transactions.data.filter(
    (transaction): transaction is Transaction<'grid'> =>
      transaction.data.type === 'grid',
  );

  const sortedGridList = gridList.sort((a, b) => b.id - a.id);

  return sortedGridList;
};
