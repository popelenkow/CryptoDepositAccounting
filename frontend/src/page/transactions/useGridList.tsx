import { useQuery } from '@tanstack/react-query';
import { getGridTransactionsOptions } from '../../api/endpoints';
import { Transaction } from '../../api/types';
import {
  getGridCurrentPricePercent,
  getGridEndPricePercent,
} from '../../common/grid/ratio';
import { getGridTotal } from '../../common/grid/total';
import { getGridPeriodTrades, getGridTrades } from '../../common/grid/trade';
import {
  GridOptionsSortOrder,
  GridOptionsSortType,
  useGridOptionsStore,
} from './Options/store';

type SortValueDict = Record<
  GridOptionsSortType,
  (transaction: Transaction<'grid'>) => number | string
>;

const sortValueDict: SortValueDict = {
  id: (transaction) => transaction.id,
  instrument: (transaction) => transaction.data.instrument,
  pricePercent: (transaction) =>
    transaction.data.close === 'pending'
      ? getGridCurrentPricePercent(transaction.data)
      : getGridEndPricePercent(transaction.data),
  duration: (transaction) => transaction.data.duration,
  gridPeriodPercent: (transaction) =>
    getGridPeriodTrades(transaction.data, 'percent', 'daily', 'optimistic'),
  gridPeriodUsdt: (transaction) =>
    getGridPeriodTrades(transaction.data, 'usdt', 'daily', 'optimistic'),
  gridTotalPercent: (transaction) => getGridTrades(transaction.data, 'percent'),
  gridTotalUsdt: (transaction) => getGridTrades(transaction.data, 'usdt'),
  totalPercent: (transaction) => getGridTotal(transaction.data, 'percent'),
  totalUsdt: (transaction) => getGridTotal(transaction.data, 'usdt'),
};

const getSort = (type: GridOptionsSortType, order: GridOptionsSortOrder) => {
  return (a: Transaction<'grid'>, b: Transaction<'grid'>) => {
    const aValue = sortValueDict[type](a);
    const bValue = sortValueDict[type](b);

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      if (order === 'desc') {
        return aValue.localeCompare(bValue);
      }

      return bValue.localeCompare(aValue);
    }

    if (typeof aValue !== 'number' || typeof bValue !== 'number') {
      throw new Error('Invalid sort value');
    }

    if (order === 'desc') {
      return bValue - aValue;
    }

    return aValue - bValue;
  };
};

export const useGridList = () => {
  const transactions = useQuery(getGridTransactionsOptions);
  const status = useGridOptionsStore((options) => options.status);

  if (!transactions.data) {
    return [];
  }

  const filteredList = transactions.data.filter((transaction) => {
    if (status === 'actual') {
      return transaction.data.close === 'pending';
    }
    return transaction.data.close !== 'pending';
  });

  return filteredList;
};

export const useSortedGridList = () => {
  const transactions = useGridList();
  const sortType = useGridOptionsStore((options) => options.sortType);
  const sortOrder = useGridOptionsStore((options) => options.sortOrder);

  const sort = getSort(sortType, sortOrder);
  const sortedList = transactions.sort(sort);

  return sortedList;
};
