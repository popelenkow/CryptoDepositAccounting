import { createRequest } from '../request';
import { fillGridParameters, getGridCurrentPrice } from './fillGridParameters';
import { FutureGridsResponse } from './types/grid';
import { FutureGridDetailResponse } from './types/gridDetail';
import { GridHistoryOrdersResponse } from './types/gridHistoryOrder';
import { GridOrdersResponse } from './types/gridOrder';

const request = createRequest('https://api2.bybit.com/', {
  credentials: 'include',
});

const bybitApi = {
  getGrids: () =>
    request<FutureGridsResponse>({
      endpoint: '/s1/bot/tradingbot/v1/list-all-bots',
      method: 'post',
      jsonBody: { status: 0, page: 0, limit: 150 },
    }),
  getHistoryGrids: () =>
    request<FutureGridsResponse>({
      endpoint: '/s1/bot/tradingbot/v1/list-all-bots',
      method: 'post',
      jsonBody: { status: 1, page: 0, limit: 30, type: 'GRID_FUTURES' },
    }),
  getGridDetail: (orderId: string) =>
    request<FutureGridDetailResponse>({
      endpoint: '/s1/bot/fgrid/v1/get-fgrid-detail',
      method: 'post',
      jsonBody: { bot_id: orderId },
    }),
  getGridOrders: (orderId: string) =>
    request<GridOrdersResponse>({
      endpoint: '/s1/bot/fgrid/v1/get-fgrid-open-orders',
      method: 'post',
      jsonBody: {
        bot_id: orderId,
        limit: 200,
      },
    }),
  getGridHistoryOrders: (orderId: string) =>
    request<GridHistoryOrdersResponse>({
      endpoint: '/s1/bot/fgrid/v1/get-fgrid-history-orders',
      method: 'post',
      jsonBody: {
        bot_id: orderId,
        limit: 200,
        page: 0,
      },
    }),
  getGridCurrentPrice,
  fillGridParameters,
};

export type BybitApi = typeof bybitApi;

export type BybitApiArg<Key extends keyof BybitApi> = Parameters<
  BybitApi[Key]
>[0];

export type BybitApiMessage<Key extends keyof BybitApi> = {
  key: Key;
  arg: BybitApiArg<Key>;
};

const registerBybitApi = () => {
  chrome.runtime.onMessage.addListener(
    (message: BybitApiMessage<keyof BybitApi>, _sender, sendResponse) => {
      const handle = async () => {
        const api = bybitApi[message.key];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/consistent-type-assertions
        const arg = message.arg as any;
        const response = await api(arg);
        console.log(`Response: ${message.key}`, response);
        sendResponse(response);
      };
      handle();

      return true;
    },
  );
  console.log('Bybit API registered');
};

registerBybitApi();
