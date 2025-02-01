import { GridTransactionData } from '../../api/backend/types';
import { assertNever } from '../assert';
import { IncomePeriod, toPeriodValue } from '../period';
import { getGridDuration, getGridsDuration } from './time';
import { IncomeMode } from './trade';

export const getGridTotal = (
  transaction: GridTransactionData,
  mode: IncomeMode,
) => {
  const { totalProfit, amount } = transaction;
  if (mode === 'percent') {
    return (totalProfit / amount) * 100;
  }
  if (mode === 'usdt') {
    return totalProfit;
  }
  return assertNever(mode);
};

export const getGridsTotal = (
  transactions: GridTransactionData[],
  mode: IncomeMode,
) => transactions.reduce((acc, x) => acc + getGridTotal(x, mode), 0);

export const getGridPeriodTotal = (
  transaction: GridTransactionData,
  mode: IncomeMode,
  period: IncomePeriod,
) => {
  const total = getGridTotal(transaction, mode);
  const days = getGridDuration(transaction);
  const daily = total / days;
  return toPeriodValue(daily, period);
};

export const getGridsPeriodTotal = (
  transactions: GridTransactionData[],
  mode: IncomeMode,
  period: IncomePeriod,
) => {
  const total = getGridsTotal(transactions, mode);
  const days = getGridsDuration(transactions);
  const daily = total / days;
  return toPeriodValue(daily, period);
};
