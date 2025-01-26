import { queryOptions } from '@tanstack/react-query';
import { assertNever } from '../../../common/assert';
import { getGridFunding } from '../../../common/grid/funding';
import {
  getGridCurrentPricePercent,
  getGridEndPricePercent,
} from '../../../common/grid/ratio';
import { getGridPeriodSpot, getGridSpot } from '../../../common/grid/spot';
import { getGridPeriodTotal, getGridTotal } from '../../../common/grid/total';
import {
  getGridPeriodTrades,
  getGridTrades,
  IncomeMode,
} from '../../../common/grid/trade';
import { getTransactionsOptions } from '../endpoints';
import { Transaction } from '../types';

const checkGridTransaction = (
  transaction: Transaction,
): transaction is Transaction<'grid'> => transaction.data.type === 'grid';

export type GridTransactionStatus = 'all' | 'actual' | 'history';
const checkGridTransactionStatusMap: Record<
  GridTransactionStatus,
  (transaction: Transaction<'grid'>) => boolean
> = {
  actual: (transaction) => transaction.data.close === 'pending',
  history: (transaction) => transaction.data.close !== 'pending',
  all: () => true,
};

export const uniqueInstrument = (
  transaction: Transaction<'grid'>,
  index: number,
  transactions: Transaction<'grid'>[],
) => {
  const { data } = transaction;
  const i = transactions.findIndex(
    (x) => x.data.instrument === data.instrument,
  );
  return i === index;
};

export type GridTransactionSelectType = 'all' | 'highest' | 'lowest';
const selectGridTransactionsMap: Record<
  GridTransactionSelectType,
  (transactions: Transaction<'grid'>[]) => Transaction<'grid'>[]
> = {
  highest: (transactions) =>
    transactions
      .sort((a, b) => a.data.minPrice - b.data.minPrice)
      .filter(uniqueInstrument),
  lowest: (transactions) =>
    transactions
      .sort((a, b) => b.data.minPrice - a.data.minPrice)
      .filter(uniqueInstrument),
  all: (transactions) => transactions,
};

export type GridTransactionSortOrder = 'asc' | 'desc';

export type GridTransactionSortByProfit = {
  category: 'profit';
  type: 'total' | 'spot' | 'funding' | 'grid';
  mode: IncomeMode;
  period: 'daily' | 'lifetime';
};
export type GridTransactionSortByTime = {
  category: 'time';
  type: 'duration';
};
export type GridTransactionSortByOther = {
  category: 'other';
  type: 'id' | 'instrument' | 'pricePercent';
};
export type GridTransactionSortBy =
  | GridTransactionSortByProfit
  | GridTransactionSortByTime
  | GridTransactionSortByOther;

export type GridTransactionSort = {
  order: GridTransactionSortOrder;
  by: GridTransactionSortBy;
};

const getSortValue = (
  transaction: Transaction<'grid'>,
  by: GridTransactionSortBy,
): number | string => {
  const { id, data } = transaction;
  if (by.category === 'profit') {
    if (by.period === 'daily') {
      if (by.type === 'total') {
        return getGridPeriodTotal(data, by.mode, 'daily');
      }
      if (by.type === 'spot') {
        return getGridPeriodSpot(data, by.mode, 'daily');
      }
      if (by.type === 'funding') {
        return getGridPeriodTotal(data, by.mode, 'daily');
      }
      if (by.type === 'grid') {
        return getGridPeriodTrades(data, by.mode, 'daily', 'optimistic');
      }
      return assertNever(by.type);
    }
    if (by.period === 'lifetime') {
      if (by.type === 'total') {
        return getGridTotal(data, by.mode);
      }
      if (by.type === 'spot') {
        return getGridSpot(data, by.mode);
      }
      if (by.type === 'funding') {
        return getGridFunding(data, by.mode);
      }
      if (by.type === 'grid') {
        return getGridTrades(data, by.mode);
      }
      return assertNever(by.type);
    }
    return assertNever(by.period);
  }

  if (by.category === 'time') {
    if (by.type === 'duration') {
      return data.duration;
    }
    return assertNever(by);
  }

  if (by.category === 'other') {
    if (by.type === 'id') {
      return id;
    }
    if (by.type === 'instrument') {
      return data.instrument;
    }
    if (by.type === 'pricePercent') {
      return data.close === 'pending'
        ? getGridCurrentPricePercent(data)
        : getGridEndPricePercent(data);
    }
    return assertNever(by.type);
  }

  return assertNever(by);
};

const getSort = (sort?: GridTransactionSort) => {
  if (!sort) return () => 0;

  const { order, by } = sort;
  return (a: Transaction<'grid'>, b: Transaction<'grid'>) => {
    const aValue = getSortValue(a, by);
    const bValue = getSortValue(b, by);

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

export type getGridTransactionsOptionsArgs = {
  status?: GridTransactionStatus;
  instruments?: string[];
  selectType?: GridTransactionSelectType;
  sort?: GridTransactionSort;
};
export const getGridTransactionsOptions = (
  args?: getGridTransactionsOptionsArgs,
) => {
  const { status = 'all', instruments, selectType = 'all', sort } = args ?? {};
  return queryOptions({
    ...getTransactionsOptions,
    select: (transactions) => {
      const grids = transactions.filter(checkGridTransaction);

      const checkStatus = checkGridTransactionStatusMap[status];
      const statusGrids = grids.filter(checkStatus);

      const selectInstruments = (transaction: Transaction<'grid'>) =>
        instruments?.length
          ? instruments.includes(transaction.data.instrument)
          : true;
      const instrumentGrids = statusGrids.filter(selectInstruments);

      const select = selectGridTransactionsMap[selectType];
      const selectedGrids = select(instrumentGrids);

      return selectedGrids.sort(getSort(sort));
    },
  });
};
