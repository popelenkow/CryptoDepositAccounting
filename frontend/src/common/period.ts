import { TFunction } from 'i18next';
import { assertNever } from './assert';

export type IncomePeriod = 'daily' | 'weekly' | 'monthly' | 'yearly';

export const getPeriodValue = (period: IncomePeriod) => {
  if (period === 'daily') {
    return 1;
  }
  if (period === 'weekly') {
    return 7;
  }
  if (period === 'monthly') {
    return 30;
  }
  if (period === 'yearly') {
    return 365;
  }
  return assertNever(period);
};
export const toPeriodValue = (daily: number, period: IncomePeriod) => {
  const periodValue = getPeriodValue(period);
  return daily * periodValue;
};

export const periodNames: Record<IncomePeriod, (t: TFunction) => string> = {
  daily: (t) => t('common.period.daily'),
  weekly: (t) => t('common.period.weekly'),
  monthly: (t) => t('common.period.monthly'),
  yearly: (t) => t('common.period.yearly'),
};
