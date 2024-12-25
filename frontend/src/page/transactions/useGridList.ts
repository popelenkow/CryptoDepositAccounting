import { useQuery } from '@tanstack/react-query';
import { getGridTransactionsOptions } from '../../api/backend/select/grid';
import { useGridOptionsStore } from './Options/store';

export const useGridList = () => {
  const status = useGridOptionsStore((options) => options.status);
  const selectType = useGridOptionsStore((options) => options.selectType);
  const list =
    useQuery(getGridTransactionsOptions({ status, selectType })).data ?? [];
  return list;
};
