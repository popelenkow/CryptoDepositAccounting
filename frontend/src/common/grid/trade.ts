import { GridTransactionData } from '../../api/types';
import { commissions } from '../../utils/transaction';
import { mapSecondsToDays } from '../time';
import { roundTo } from '../value';
import { getGridRangePrices, getGridTradeRatio } from './ratio';

export const getGridTradeCoin = (transaction: GridTransactionData) => {
  const { amount, leverage, price } = transaction;
  const prices = getGridRangePrices(transaction);
  const totalPrices = prices.reduce(
    (acc, p) => acc + (p < price ? price : p),
    0,
  );
  const coin = (amount * leverage) / totalPrices;
  return coin;
};

export const getGridTradePercent = (transaction: GridTransactionData) => {
  const { grids } = transaction;
  const ratio = getGridTradeRatio(transaction);
  const profit = ratio - 1 - (ratio + 1) * commissions.limit;
  return (profit / grids) * 100;
};

export const getGridTradeProfit = (transaction: GridTransactionData) => {
  const { amount } = transaction;
  const rawProfit = getGridTradePercent(transaction);
  const profit = roundTo((rawProfit * amount) / 100, 4);
  return profit;
};

export const getGridTotalPercent = (transaction: GridTransactionData) => {
  const { trades } = transaction;
  const profit = getGridTradePercent(transaction);
  return profit * trades;
};

export const getGridTotalUsdt = (transaction: GridTransactionData) => {
  const { trades } = transaction;
  const profit = getGridTradeProfit(transaction);
  return profit * trades;
};

export const getGridDailyPercent = (transaction: GridTransactionData) => {
  const { duration } = transaction;
  const profit = getGridTotalPercent(transaction);
  const days = mapSecondsToDays(duration);
  return profit / days;
};

export const getGridDailyUsdt = (transaction: GridTransactionData) => {
  const { duration } = transaction;
  const profit = getGridTotalUsdt(transaction);
  const days = mapSecondsToDays(duration);
  return profit / days;
};

export const getGridAprPercent = (transaction: GridTransactionData) => {
  const profit = getGridDailyPercent(transaction);
  return profit * 365;
};

export const getGridAprUsdt = (transaction: GridTransactionData) => {
  const profit = getGridDailyUsdt(transaction);
  return profit * 365;
};
