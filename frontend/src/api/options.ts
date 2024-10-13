import { queryOptions } from '@tanstack/react-query';
import {
  requestGetInfo,
  requestUpdateDualOffersByHtml,
  requestAddTransaction,
  requestRemoveTransaction,
  requestGetTransactions,
  requestUpdateTransaction,
  requestImportTransactions,
} from './endpoint';
import { mutationOptions } from './queryClient';
import { Transaction } from './types';

export const getInfoOptions = queryOptions({
  queryKey: ['info'],
  queryFn: requestGetInfo,
});

export const updateDualOffersByHtmlOptions = mutationOptions({
  mutationKey: ['updateDualOffersByHtml'],
  mutationFn: requestUpdateDualOffersByHtml,
});

export const getTransactionsOptions = queryOptions({
  queryKey: ['transactions'],
  queryFn: requestGetTransactions,
});

export const addTransactionOptions = mutationOptions({
  mutationKey: ['addTransaction'],
  mutationFn: requestAddTransaction,
});

export const updateTransactionOptions = mutationOptions({
  mutationKey: ['updateTransaction'],
  mutationFn: ({ id, ...transaction }: Transaction) =>
    requestUpdateTransaction(id, transaction),
});

export const removeTransactionOptions = mutationOptions({
  mutationKey: ['removeTransaction'],
  mutationFn: requestRemoveTransaction,
});

export const importTransactionsOptions = mutationOptions({
  mutationKey: ['importTransactions'],
  mutationFn: requestImportTransactions,
});
