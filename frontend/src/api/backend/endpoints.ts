import { queryOptions } from '@tanstack/react-query';
import { mutationOptions, queryClient } from '../queryClient';
import { createRequest } from '../request';
import {
  DualOffer,
  Info,
  InstrumentInfo,
  Transaction,
  TransactionData,
} from './types';

export const request = createRequest('http://127.0.0.1:8000/');

export const getInfoOptions = queryOptions({
  queryKey: ['info'],
  queryFn: () =>
    request<Info>({
      method: 'get',
      endpoint: '/api/info',
    }),
});

export const updateDualOffersByHtmlOptions = mutationOptions({
  mutationKey: ['updateDualOffersByHtml'],
  mutationFn: (htmlBody: string) =>
    request<DualOffer[]>({
      method: 'post',
      endpoint: '/api/info/dualOffers/html',
      textBody: htmlBody,
    }),
});

export const getInstrumentInfosOptions = queryOptions({
  queryKey: ['instrumentInfos'],
  queryFn: () =>
    request<InstrumentInfo[]>({
      method: 'get',
      endpoint: '/api/instrumentInfo/list',
    }),
});

export const getTransactionsOptions = queryOptions({
  queryKey: ['transactions'],
  queryFn: () =>
    request<Transaction[]>({
      method: 'get',
      endpoint: '/api/transaction/list',
    }),
});

export const addTransactionOptions = mutationOptions({
  mutationKey: ['addTransaction'],
  mutationFn: (jsonBody: TransactionData) =>
    request<Transaction>({
      method: 'post',
      endpoint: '/api/transaction',
      jsonBody,
    }),
});

export const updateTransactionOptions = mutationOptions({
  mutationKey: ['updateTransaction'],
  mutationFn: ({ id, data }: Transaction) =>
    request<Transaction>({
      method: 'put',
      endpoint: `/api/transaction/${id}`,
      jsonBody: data,
    }),
});

export const removeTransactionOptions = mutationOptions({
  mutationKey: ['removeTransaction'],
  mutationFn: (transactionId: number) =>
    request<void>({
      method: 'delete',
      endpoint: `/api/transaction/${transactionId}`,
    }),
});

export const importTransactionsOptions = mutationOptions({
  mutationKey: ['importTransactions'],
  mutationFn: (transactions: TransactionData[]) =>
    request<void>({
      method: 'post',
      endpoint: '/api/transaction/import',
      jsonBody: transactions,
    }),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: getTransactionsOptions.queryKey,
    });
  },
});
