import { TransactionData } from '../api/types';
import { Currency, currencySymbols } from '../common/currency';

export const commissions = {
  limit: 0.0002,
  market: 0.01,
} as const;

export type CurrencyAmount = {
  amount: number;
  currency: Currency;
};

export const stringifyAmount = (currencyAmount?: CurrencyAmount) => {
  if (!currencyAmount) return '';
  const { currency, amount } = currencyAmount;
  return `${amount.toFixed(currency === 'usdt' ? 4 : 8)} ${currencySymbols[currency]}`;
};

export const getTransactionAmount = (
  transaction: TransactionData,
): CurrencyAmount => {
  // ToDo: Refactor this function
  if (transaction.type === 'grid')
    return { amount: transaction.amount, currency: 'usdt' };

  const { method, amount } = transaction;

  return {
    amount,
    currency: method === 'buy' ? 'usdt' : 'btc',
  };
};
