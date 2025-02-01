import { GridTransactionData, InstrumentInfo } from '../../api/backend/types';
import { assertNever } from '../assert';
import { getRatio } from '../ratio';
import { ceilTo, floorTo, getDecimals } from '../value';

export const getGridTradeRatio = (transaction: GridTransactionData) => {
  const { grids, minPrice, maxPrice } = transaction;
  const totalRatio = getRatio(maxPrice, minPrice);
  const ratio = Math.pow(totalRatio, 1 / grids);
  return ratio;
};

export const getGridPrices = (
  transaction: GridTransactionData,
  instrumentInfo: InstrumentInfo,
  side: 'buy' | 'sell',
  floor: boolean,
) => {
  const { grids, minPrice } = transaction;
  const { priceStep } = instrumentInfo;

  const decimals = getDecimals(priceStep);
  const ratio = getGridTradeRatio(transaction);

  const arr: number[] = [];
  for (let i = 0; i <= grids; i++) {
    let value = minPrice * Math.pow(ratio, i);
    value = floor ? floorTo(value, decimals) : ceilTo(value, decimals);
    arr.push(value);
  }
  if (side === 'buy') {
    return arr.slice(0, arr.length - 1);
  }
  if (side === 'sell') {
    return arr.slice(1);
  }
  return assertNever(side);
};

export const getGridCurrentPricePercent = (
  transaction: GridTransactionData,
) => {
  const { endPrice, minPrice, maxPrice } = transaction;
  const current = endPrice - minPrice;
  const total = maxPrice - minPrice;
  return (current / total) * 100;
};

export const getGridEndPricePercent = (transaction: GridTransactionData) => {
  const { endPrice, minPrice, maxPrice } = transaction;
  const end = endPrice - minPrice;
  const total = maxPrice - minPrice;
  return (end / total) * 100;
};
