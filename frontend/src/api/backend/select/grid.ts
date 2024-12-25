import { queryOptions } from '@tanstack/react-query';
import {
  getGridCurrentPricePercent,
  getGridEndPricePercent,
} from '../../../common/grid/ratio';
import { getGridTotal } from '../../../common/grid/total';
import { getGridPeriodTrades, getGridTrades } from '../../../common/grid/trade';
import { getTransactionsOptions } from '../endpoints';
import { Transaction } from '../types';

export type GridTransactionStatus = 'actual' | 'history' | 'all';

const checkGridTransaction = (
  transaction: Transaction,
): transaction is Transaction<'grid'> => transaction.data.type === 'grid';

const checkGridTransactionStatusMap: Record<
  GridTransactionStatus,
  (transaction: Transaction<'grid'>) => boolean
> = {
  actual: (transaction) => transaction.data.close === 'pending',
  history: (transaction) => transaction.data.close !== 'pending',
  all: () => true,
};

export type GridTransactionSortOrder = 'asc' | 'desc';
export type GridTransactionSortType =
  | 'id'
  | 'instrument'
  | 'pricePercent'
  | 'duration'
  | 'totalPercent'
  | 'totalUsdt'
  | 'gridPeriodPercent'
  | 'gridPeriodUsdt'
  | 'gridTotalPercent'
  | 'gridTotalUsdt';

export type GridTransactionSort = {
  order: GridTransactionSortOrder;
  type: GridTransactionSortType;
};

type SortValueDict = Record<
  GridTransactionSortType,
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

const getSort = (sort?: GridTransactionSort) => {
  if (!sort) return () => 0;

  const { order, type } = sort;
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

export const getGridTransactionsOptions = (
  status: GridTransactionStatus,
  sort?: GridTransactionSort,
) =>
  queryOptions({
    ...getTransactionsOptions,
    select: (transactions) =>
      transactions
        .filter(checkGridTransaction)
        .filter(checkGridTransactionStatusMap[status])
        .sort(getSort(sort)),
  });
