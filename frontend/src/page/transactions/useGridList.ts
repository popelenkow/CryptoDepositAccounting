import { useQuery } from '@tanstack/react-query';
import { getInstrumentInfosOptions } from '../../api/backend/endpoints';
import {
  getGridTransactionsOptions,
  GridTransactionSort,
} from '../../api/backend/select/grid';
import { useGridOptionsStore } from './Options/store';

export const useGridList = (sort?: GridTransactionSort) => {
  const status = useGridOptionsStore((options) => options.status);
  const instruments = useGridOptionsStore((options) => options.instruments);
  const selectType = useGridOptionsStore((options) => options.selectType);
  const options = getGridTransactionsOptions({
    status,
    instruments,
    selectType,
    sort,
  });
  const list = useQuery(options).data ?? [];
  const q = useQuery(getInstrumentInfosOptions).data?.find(
    (x) => x.instrument === 'FTMUSDT',
  );
  console.log(q);
  return list;
};
