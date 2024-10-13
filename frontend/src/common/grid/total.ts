import { GridTransactionData } from '../../api/types';
import { getGridTotalPercent, getGridTotalUsdt } from './trade';

export const getTotalPercentFromGrid = (transaction: GridTransactionData) => {
  const { pnl, amount } = transaction;
  return (pnl / amount) * 100;
};

export const getTotalUsdtFromGrid = (transaction: GridTransactionData) => {
  const { pnl } = transaction;
  return pnl;
};

export const getSpotPercentFromGrid = (transaction: GridTransactionData) => {
  const total = getTotalPercentFromGrid(transaction);
  const grid = getGridTotalPercent(transaction);
  return total - grid;
};

export const getSpotUsdtFromGrid = (transaction: GridTransactionData) => {
  const total = getTotalUsdtFromGrid(transaction);
  const grid = getGridTotalUsdt(transaction);
  return total - grid;
};
