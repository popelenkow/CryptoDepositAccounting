import { Transaction, TransactionData } from '../api/types';
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

export const getTransactionChange = (
  transaction: TransactionData,
  currentPrice: number,
): CurrencyAmount | undefined => {
  // ToDo: Refactor this function
  if (transaction.type === 'grid') return undefined;

  const { method, amount, price } = transaction;

  const change = method === 'buy' ? amount / price : amount * price;

  if (transaction.type === 'spot') {
    const { close } = transaction;
    const commission = commissions[close];
    return {
      amount: change * (1 - commission),
      currency: method === 'buy' ? 'btc' : 'usdt',
    };
  }

  const getClose = () => {
    if (transaction.close !== 'pending') return transaction.close;
    if (method === 'buy') {
      return currentPrice > price ? 'earn' : 'buy';
    }
    return currentPrice < price ? 'earn' : 'sell';
  };
  const close = getClose();
  const getCurrency = () => {
    if (close === 'earn') {
      return method === 'buy' ? 'usdt' : 'btc';
    }
    return method === 'buy' ? 'btc' : 'usdt';
  };
  const dualChange = close === 'earn' ? amount : change;
  const income = 1 + (transaction.apr * transaction.duration) / 365 / 24 / 100;
  return {
    amount: dualChange * income,
    currency: getCurrency(),
  };
};

export const calculateTotalAmounts = (
  targetTransaction: Transaction,
  currentPrice: number,
) => {
  const total = {
    usdt: 0,
    btc: 0,
  };

  const targetAmount = getTransactionAmount(targetTransaction);
  const targetChange = getTransactionChange(targetTransaction, currentPrice);
  if (targetChange) {
    total[targetAmount.currency] -= targetAmount.amount;
    total[targetChange.currency] += targetChange.amount;
  }

  const usdtTotal: CurrencyAmount | undefined =
    Number(total.usdt.toFixed(2)) === 0
      ? undefined
      : {
          amount: total.usdt,
          currency: 'usdt',
        };
  const btcTotal: CurrencyAmount | undefined =
    Number(total.btc.toFixed(8)) === 0
      ? undefined
      : {
          amount: total.btc,
          currency: 'btc',
        };
  return [usdtTotal, btcTotal].filter((x): x is CurrencyAmount => !!x);
};

export const getChangePercentage = (transaction: TransactionData) => {
  if (transaction.type === 'spot') {
    return `-${commissions[transaction.close] * 100} %`;
  }
  if (transaction.type === 'dual') {
    return `${(((transaction.apr / 365) * transaction.duration) / 24).toFixed(2)} %`;
  }
  if (transaction.type === 'grid') {
    return `-${commissions.market * 100} %`;
  }
  console.error('Invalid transaction type', transaction);
  throw new Error('Invalid transaction type');
};
