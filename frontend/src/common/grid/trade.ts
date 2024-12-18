import { GridTransactionData, InstrumentInfo } from '../../api/types';
import { commissions } from '../../utils/transaction';
import { assertNever } from '../assert';
import { mapSecondsToDays } from '../time';
import { getGridRangePrices, getGridTradeRatio } from './ratio';

export type IncomeMode = 'usdt' | 'percent';
export type IncomePeriod = 'daily' | 'weekly' | 'monthly' | 'yearly';

export const getGridTradeCoin = (
  transaction: GridTransactionData,
  instrumentInfo: InstrumentInfo,
) => {
  const { amount, leverage, startPrice } = transaction;
  const prices = getGridRangePrices(transaction, instrumentInfo, 'low');
  const totalPrices = prices.reduce(
    (acc, p) => acc + (p < startPrice ? startPrice : p),
    0,
  );
  const coin = (amount * leverage) / totalPrices;
  return coin;
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

export const getGridPeriodIncome = (
  transaction: GridTransactionData,
  mode: IncomeMode,
  period: IncomePeriod,
) => {
  const { duration } = transaction;
  const profit = getGridTrades(transaction, mode);
  const days = mapSecondsToDays(duration);
  const daily = profit / days;
  if (period === 'daily') {
    return daily;
  }
  if (period === 'weekly') {
    return daily * 7;
  }
  if (period === 'monthly') {
    return daily * 30;
  }
  if (period === 'yearly') {
    return daily * 365;
  }
  return assertNever(period);
};

export const periodNames: Record<IncomePeriod, string> = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly',
};
