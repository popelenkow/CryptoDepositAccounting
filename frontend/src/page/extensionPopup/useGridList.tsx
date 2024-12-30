import { useQuery } from '@tanstack/react-query';
import { getGridTransactionsOptions } from '../../api/backend/select/grid';

export const useGridList = () => {
  const transactions = useQuery(getGridTransactionsOptions());

  if (!transactions.data) {
    return [];
  }

  const sortedGridList = transactions.data.sort((a, b) => b.id - a.id);

  return sortedGridList;
};
