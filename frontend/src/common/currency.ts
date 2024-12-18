export const currencySymbols = {
  usdt: '$',
  btc: '₿',
  percent: '%',
} as const;

type CurrencySymbols = typeof currencySymbols;
export type Currency = keyof CurrencySymbols;
