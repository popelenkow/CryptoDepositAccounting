import { GridTransactionData } from '../../api/types';
import { mapSecondsToDays } from '../time';

export const getGridDuration = (transaction: GridTransactionData) => {
  const result = mapSecondsToDays(transaction.duration);
  return result;
};

export const getGridsDuration = (transactions: GridTransactionData[]) =>
  transactions.reduce((acc, x) => acc + getGridDuration(x), 0) /
  transactions.length;
