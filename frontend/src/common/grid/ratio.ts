import { GridTransactionData } from '../../api/types';

export const getGridTradeRatio = (transaction: GridTransactionData) => {
  const { grids, priceMin, priceMax } = transaction;
  const ratio = Math.pow(priceMax / priceMin, 1 / grids);
  return ratio;
};

export const getGridRangePrices = (transaction: GridTransactionData) => {
  const { grids, priceMin } = transaction;
  const ratio = getGridTradeRatio(transaction);
  const arr: number[] = [];
  for (let i = 0; i < grids; i++) {
    arr.push(priceMin * Math.pow(ratio, i));
  }
  return arr;
};

export const getGridCurrentPricePercent = (
  transaction: GridTransactionData,
) => {
  const { priceCurrent, priceMin, priceMax } = transaction;
  const current = priceCurrent - priceMin;
  const total = priceMax - priceMin;
  return (current / total) * 100;
};
