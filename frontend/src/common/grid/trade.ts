import { GridTransactionData, InstrumentInfo } from '../../api/backend/types';
import { assertNever } from '../assert';
import { IncomePeriod, toPeriodValue } from '../period';
import { commissions } from '../transaction';
import { getGridRangePrices, getGridTradeRatio } from './ratio';
import { getGridDuration, getGridsDuration } from './time';

export type IncomeMode = 'usdt' | 'percent';
export type IncomePrediction = 'pessimistic' | 'optimistic';

export const isGridOutOfTrade = (transaction: GridTransactionData) => {
  const { close, currentPrice, minPrice } = transaction;
  return close === 'pending' && currentPrice < minPrice;
};

export const getGridTradeQuantity = (
  transaction: GridTransactionData,
  instrumentInfo: InstrumentInfo,
) => {
  const { amount, leverage, startPrice } = transaction;
  const prices = getGridRangePrices(transaction, instrumentInfo, 'low');
  const totalPrices = prices.reduce(
    (acc, p) => acc + (p < startPrice ? startPrice : p),
    0,
  );
  const quantity = (amount * leverage) / totalPrices;
  return quantity;
};

export const getGridTrade = (
  transaction: GridTransactionData,
  mode: IncomeMode,
) => {
  const { grids, amount } = transaction;
  const ratio = getGridTradeRatio(transaction);
  const profit = (ratio - 1 - (ratio + 1) * commissions.limit) / grids;
  if (mode === 'percent') {
    return profit * 100;
  }
  if (mode === 'usdt') {
    return profit * amount;
  }
  return assertNever(mode);
};

export const getGridTrades = (
  transaction: GridTransactionData,
  mode: IncomeMode,
) => {
  const { trades } = transaction;
  const profit = getGridTrade(transaction, mode);
  return profit * trades;
};

export const getGridsTrades = (
  transactions: GridTransactionData[],
  mode: IncomeMode,
) => transactions.reduce((acc, x) => acc + getGridTrades(x, mode), 0);

export const getGridPeriodTrades = (
  transaction: GridTransactionData,
  mode: IncomeMode,
  period: IncomePeriod,
  prediction: IncomePrediction,
) => {
  if (prediction === 'pessimistic' && isGridOutOfTrade(transaction)) {
    return 0;
  }
  const profit = getGridTrades(transaction, mode);
  const days = getGridDuration(transaction);
  const daily = profit / days;
  return toPeriodValue(daily, period);
};

export const getGridsPeriodTrades = (
  rawTransactions: GridTransactionData[],
  mode: IncomeMode,
  period: IncomePeriod,
  prediction: IncomePrediction,
) => {
  const transactions =
    prediction === 'optimistic'
      ? rawTransactions
      : rawTransactions.filter((x) => !isGridOutOfTrade(x));

  const profit = transactions.reduce(
    (acc, x) => acc + getGridTrades(x, mode),
    0,
  );
  const days = getGridsDuration(transactions);
  const daily = profit / days;
  return toPeriodValue(daily, period);
};
