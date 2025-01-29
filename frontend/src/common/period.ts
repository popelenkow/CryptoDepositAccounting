import { TFunction } from 'i18next';
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

export const periodNames: Record<IncomePeriod, (t: TFunction) => string> = {
  daily: (t) => t('common.period.daily'),
  weekly: (t) => t('common.period.weekly'),
  monthly: (t) => t('common.period.monthly'),
  yearly: (t) => t('common.period.yearly'),
};
