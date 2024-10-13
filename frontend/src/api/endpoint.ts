import { request } from './request';
import { DualOffer, Info, Transaction, TransactionData } from './types';

export const requestGetInfo = () =>
  request<Info>({
    method: 'get',
    endpoint: '/info',
  });

export const requestUpdateDualOffersByHtml = (htmlBody: string) =>
  request<DualOffer[]>({
    method: 'post',
    endpoint: '/info/dualOffers/html',
    textBody: htmlBody,
  });

export const requestAddTransaction = (jsonBody: TransactionData) =>
  request<Transaction>({
    method: 'post',
    endpoint: '/api/transaction',
    jsonBody,
  });

export const requestGetTransactions = () =>
  request<Transaction[]>({
    method: 'get',
    endpoint: '/api/transaction/list',
  });

export const requestUpdateTransaction = (
  transactionId: number,
  jsonBody: TransactionData,
) =>
  request<Transaction>({
    method: 'put',
    endpoint: `/api/transaction/${transactionId}`,
    jsonBody,
  });

export const requestRemoveTransaction = (transactionId: number) =>
  request<void>({
    method: 'delete',
    endpoint: `/api/transaction/${transactionId}`,
  });

export const requestImportTransactions = (transactions: TransactionData[]) =>
  request<void>({
    method: 'post',
    endpoint: '/api/transaction/import',
    jsonBody: transactions,
  });
