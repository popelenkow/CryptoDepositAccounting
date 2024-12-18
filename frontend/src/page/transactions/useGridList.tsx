import { useQuery } from '@tanstack/react-query';
import { getTransactionsOptions } from '../../api/endpoints';
import { Transaction } from '../../api/types';
import {
  getGridCurrentPricePercent,
  getGridEndPricePercent,
} from '../../common/grid/ratio';
import { getGridTotal } from '../../common/grid/total';
import { getGridPeriodIncome, getGridTrades } from '../../common/grid/trade';
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
  gridAprPercent: (transaction) =>
    getGridPeriodIncome(transaction.data, 'percent', 'daily'),
  gridAprUsdt: (transaction) =>
    getGridPeriodIncome(transaction.data, 'usdt', 'daily'),
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
  const transactions = useQuery(getTransactionsOptions);
  const options = useGridOptionsStore();

  if (!transactions.data) {
    return [];
  }

  const gridList = transactions.data.filter(
    (transaction): transaction is Transaction<'grid'> =>
      transaction.data.type === 'grid',
  );

  const filteredList = gridList.filter((transaction) => {
    if (options.status === 'actual') {
      return transaction.data.close === 'pending';
    }
    return transaction.data.close !== 'pending';
  });

  const sortedList = filteredList.sort(
    getSort(options.sortType, options.sortOrder),
  );

  return sortedList;
};
