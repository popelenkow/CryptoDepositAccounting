import { GridTransactionData, InstrumentInfo } from '../../api/backend/types';
import { assertNever } from '../assert';
import { getRatio } from '../ratio';
import { floorTo, getDecimalPrecision } from '../value';

export const getGridTradeRatio = (transaction: GridTransactionData) => {
  const { grids, minPrice, maxPrice } = transaction;
  const totalRatio = getRatio(maxPrice, minPrice);
  const ratio = Math.pow(totalRatio, 1 / grids);
  return ratio;
};

export const getGridRangePrices = (
  transaction: GridTransactionData,
  instrumentInfo: InstrumentInfo,
  side: 'low' | 'high',
) => {
  const { grids, minPrice } = transaction;
  const { priceStep } = instrumentInfo;

  const decimals = getDecimalPrecision(priceStep);
  const ratio = getGridTradeRatio(transaction);

  const arr: number[] = [];
  for (let i = 0; i <= grids; i++) {
    const value = minPrice * Math.pow(ratio, i);
    const rounded = floorTo(value, decimals);
    arr.push(rounded);
  }
  if (side === 'low') {
    return arr.slice(0, arr.length - 1);
  }
  if (side === 'high') {
    return arr.slice(1);
  }
  return assertNever(side);
};

export const getGridCurrentPricePercent = (
  transaction: GridTransactionData,
) => {
  const { currentPrice, minPrice, maxPrice } = transaction;
  const current = currentPrice - minPrice;
  const total = maxPrice - minPrice;
  return (current / total) * 100;
};

export const getGridEndPricePercent = (transaction: GridTransactionData) => {
  const { endPrice, minPrice, maxPrice } = transaction;
  const end = endPrice - minPrice;
  const total = maxPrice - minPrice;
  return (end / total) * 100;
};
