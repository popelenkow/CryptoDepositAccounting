import { GridTransactionData } from '../../api/types';
import { IncomePeriod, toPeriodValue } from '../period';
import { getGridFunding } from './funding';
import { getGridDuration, getGridsDuration } from './time';
import { getGridTotal } from './total';
import { getGridTrades, IncomeMode } from './trade';

export const getGridSpot = (
  transaction: GridTransactionData,
  mode: IncomeMode,
) => {
  const total = getGridTotal(transaction, mode);
  const grid = getGridTrades(transaction, mode);
  const funding = getGridFunding(transaction, mode);
  return total - grid - funding;
};

export const getGridsSpot = (
  transactions: GridTransactionData[],
  mode: IncomeMode,
) => transactions.reduce((acc, x) => acc + getGridSpot(x, mode), 0);

export const getGridPeriodSpot = (
  transaction: GridTransactionData,
  mode: IncomeMode,
  period: IncomePeriod,
) => {
  const spot = getGridSpot(transaction, mode);
  const days = getGridDuration(transaction);
  const daily = spot / days;
  return toPeriodValue(daily, period);
};

export const getGridsPeriodSpot = (
  transactions: GridTransactionData[],
  mode: IncomeMode,
  period: IncomePeriod,
) => {
  const spot = getGridsSpot(transactions, mode);
  const days = getGridsDuration(transactions);
  const daily = spot / days;
  return toPeriodValue(daily, period);
};
