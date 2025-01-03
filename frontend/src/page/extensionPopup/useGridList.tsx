import { useQuery } from '@tanstack/react-query';
import {
  getGridTransactionsOptions,
  GridTransactionSort,
} from '../../api/backend/select/grid';

const sort: GridTransactionSort = {
  order: 'desc',
  type: 'id',
};
export const useGridList = () => {
  const transactions = useQuery(getGridTransactionsOptions({ sort }));

  return transactions.data ?? [];
};
