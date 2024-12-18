import { GridTransactionData } from '../../api/types';
import { assertNever } from '../assert';
import { getGridTrades, IncomeMode } from './trade';

export const getGridTotal = (
  transaction: GridTransactionData,
  mode: IncomeMode,
) => {
  const { total, amount } = transaction;
  if (mode === 'percent') {
    return (total / amount) * 100;
  }
  if (mode === 'usdt') {
    return total;
  }
  return assertNever(mode);
};

export const getGridFunding = (
  transaction: GridTransactionData,
  mode: IncomeMode,
) => {
  const { funding, amount } = transaction;
  if (mode === 'percent') {
    return (funding / amount) * 100;
  }
  if (mode === 'usdt') {
    return funding;
  }
  return assertNever(mode);
};

export const getGridSpot = (
  transaction: GridTransactionData,
  mode: IncomeMode,
) => {
  const total = getGridTotal(transaction, mode);
  const grid = getGridTrades(transaction, mode);
  const funding = getGridFunding(transaction, mode);
  return total - grid - funding;
};
