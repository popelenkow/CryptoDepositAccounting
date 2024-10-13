export const currencySymbols = {
  usdt: '$',
  btc: '₿',
} as const;

type CurrencySymbols = typeof currencySymbols;
export type Currency = keyof CurrencySymbols;
