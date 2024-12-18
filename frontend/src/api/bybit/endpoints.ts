import { mutationOptions } from '../queryClient';
import { createBybitRequest } from './request';

export const getGridsOptions = (tabId?: number) =>
  mutationOptions({
    mutationKey: ['getGrids'],
    mutationFn: createBybitRequest(tabId, 'getGrids'),
  });

export const getHistoryGridsOptions = (tabId?: number) =>
  mutationOptions({
    mutationKey: ['getHistoryGrids'],
    mutationFn: createBybitRequest(tabId, 'getHistoryGrids'),
  });

export const getGridDetailOptions = (tabId?: number) =>
  mutationOptions({
    mutationKey: ['getGridDetail'],
    mutationFn: createBybitRequest(tabId, 'getGridDetail'),
  });

export const fillGridParametersOptions = (tabId?: number) =>
  mutationOptions({
    mutationKey: ['fillGridParameters'],
    mutationFn: createBybitRequest(tabId, 'fillGridParameters'),
  });

export const getGridCurrentPriceOptions = (tabId?: number) =>
  mutationOptions({
    mutationKey: ['getGridCurrentPrice'],
    mutationFn: createBybitRequest(tabId, 'getGridCurrentPrice'),
  });

export const getGridOrdersOptions = (tabId?: number) =>
  mutationOptions({
    mutationKey: ['getGridOrders'],
    mutationFn: createBybitRequest(tabId, 'getGridOrders'),
  });

export const getGridHistoryOrdersOptions = (tabId?: number) =>
  mutationOptions({
    mutationKey: ['getGridHistoryOrders'],
    mutationFn: createBybitRequest(tabId, 'getGridHistoryOrders'),
  });
