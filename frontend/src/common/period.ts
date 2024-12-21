import { assertNever } from './assert';

export type IncomePeriod = 'daily' | 'weekly' | 'monthly' | 'yearly';

export const toPeriodValue = (daily: number, period: IncomePeriod) => {
  if (period === 'daily') {
    return daily;
  }
  if (period === 'weekly') {
    return daily * 7;
  }
  if (period === 'monthly') {
    return daily * 30;
  }
  if (period === 'yearly') {
    return daily * 365;
  }
  return assertNever(period);
};

export const periodNames: Record<IncomePeriod, string> = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly',
};
