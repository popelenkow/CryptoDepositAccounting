import { request } from './request';

export type BuyDualTransactionData = {
  orderId: string;
  type: 'dual';
  method: 'buy';
  amount: number;
  price: number;
  duration: number;
  apr: number;
  close: 'pending' | 'earn' | 'buy';
};

export type SellDualTransactionData = {
  orderId: string;
  type: 'dual';
  method: 'sell';
  amount: number;
  price: number;
  duration: number;
  apr: number;
  close: 'pending' | 'earn' | 'sell';
};

export type BuySpotTransactionData = {
  orderId: string;
  type: 'spot';
  method: 'buy';
  amount: number;
  price: number;
  close: 'limit' | 'market';
};

export type SellSpotTransactionData = {
  orderId: string;
  type: 'spot';
  method: 'sell';
  amount: number;
  price: number;
  close: 'limit' | 'market';
};

export type TransactionData =
  | BuyDualTransactionData
  | SellDualTransactionData
  | BuySpotTransactionData
  | SellSpotTransactionData;

export type Transaction = TransactionData & { id: number };

export const requestCreateTransaction = (jsonBody: TransactionData) =>
  request<Transaction>({
    method: 'post',
    endpoint: '/transaction',
    jsonBody,
  });

export const requestGetTransactions = () =>
  request<Transaction[]>({
    method: 'get',
    endpoint: '/transactions',
  });

export const requestUpdateTransaction = (
  transactionId: number,
  jsonBody: TransactionData,
) =>
  request<Transaction>({
    method: 'put',
    endpoint: `/transaction/${transactionId}`,
    jsonBody,
  });

export const requestRemoveTransaction = (transactionId: number) =>
  request<void>({
    method: 'delete',
    endpoint: `/transaction/${transactionId}`,
  });
