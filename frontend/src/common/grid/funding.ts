import { GridTransactionData } from '../../api/backend/types';
import { assertNever } from '../assert';
import { IncomePeriod, toPeriodValue } from '../period';
import { getGridDuration, getGridsDuration } from './time';
import { IncomeMode } from './trade';

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

export const getGridsFunding = (
  transactions: GridTransactionData[],
  mode: IncomeMode,
) => transactions.reduce((acc, x) => acc + getGridFunding(x, mode), 0);

export const getGridPeriodFunding = (
  transaction: GridTransactionData,
  mode: IncomeMode,
  period: IncomePeriod,
) => {
  const funding = getGridFunding(transaction, mode);
  const days = getGridDuration(transaction);
  const daily = funding / days;
  return toPeriodValue(daily, period);
};

export const getGridsPeriodFunding = (
  transactions: GridTransactionData[],
  mode: IncomeMode,
  period: IncomePeriod,
) => {
  const funding = getGridsFunding(transactions, mode);
  const days = getGridsDuration(transactions);
  const daily = funding / days;
  return toPeriodValue(daily, period);
};
