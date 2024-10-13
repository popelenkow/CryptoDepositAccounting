import { queryOptions } from '@tanstack/react-query';
import {
  requestCreateTransaction,
  requestRemoveTransaction,
  requestGetTransactions,
  requestUpdateTransaction,
  Transaction,
} from '../../api/transaction';
import { mutationOptions } from './queryClient';

export const getTransactionsOptions = queryOptions({
  queryKey: ['transactions'],
  queryFn: requestGetTransactions,
});

export const createTransactionOptions = mutationOptions({
  mutationKey: ['createTransaction'],
  mutationFn: requestCreateTransaction,
});

export const updateTransactionOptions = mutationOptions({
  mutationKey: ['createTransaction'],
  mutationFn: ({ id, ...transaction }: Transaction) =>
    requestUpdateTransaction(id, transaction),
});

export const removeTransactionOptions = mutationOptions({
  mutationKey: ['removeTransaction'],
  mutationFn: requestRemoveTransaction,
});
