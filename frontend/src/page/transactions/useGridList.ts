import { useQuery } from '@tanstack/react-query';
import {
  getGridTransactionsOptions,
  GridTransactionSort,
} from '../../api/backend/select/grid';
import { useGridOptionsStore } from './Options/store';

export const useGridList = (sort?: GridTransactionSort) => {
  const status = useGridOptionsStore((options) => options.status);
  const selectType = useGridOptionsStore((options) => options.selectType);
  const options = getGridTransactionsOptions({ status, selectType, sort });
  const list = useQuery(options).data ?? [];
  return list;
};
