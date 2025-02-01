import { IncomeMode } from './grid/trade';
import { getPeriodValue, IncomePeriod } from './period';

export type GetMultiplierArgs = {
  amount: number;
  mode: IncomeMode;
  duration?: number;
  period?: IncomePeriod;
};
export const getMultiplier = (args: GetMultiplierArgs) => {
  const { amount, mode, duration, period } = args;
  let multiplier = 1;

  if (mode === 'percent') {
    multiplier *= 100 / amount;
  }
  if (period && duration) {
    const periodValue = getPeriodValue(period);
    multiplier *= periodValue / duration;
  }
  return multiplier;
};
