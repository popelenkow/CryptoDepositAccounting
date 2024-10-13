import { BybitApi, BybitApiMessage, LayoutNewGridParameters } from './bybitApi';

export const requestBybitApi = async <Key extends keyof BybitApi>(
  tabId: number,
  message: BybitApiMessage<Key>,
): Promise<Awaited<ReturnType<BybitApi[Key]>>> => {
  const response = await chrome.tabs.sendMessage(tabId, message);
  if (chrome.runtime.lastError) {
    throw new Error(chrome.runtime.lastError.message);
  }
  return response;
};

export const createBybitApi = (tabId: number): BybitApi => ({
  getBots: () => requestBybitApi(tabId, { key: 'getBots' }),
  getHistoryBots: () => requestBybitApi(tabId, { key: 'getHistoryBots' }),
  fillGridParameters: (parameters: LayoutNewGridParameters) =>
    requestBybitApi(tabId, { key: 'fillGridParameters', data: parameters }),
  getGridCurrentPrice: () =>
    requestBybitApi(tabId, { key: 'getGridCurrentPrice' }),
});

export const average = (a: number, b: number) => {
  const scaleA = a.toString().split('.')[1]?.length || 0;
  const scaleB = b.toString().split('.')[1]?.length || 0;
  const precision = Math.max(scaleA, scaleB) + 1;
  const factor = 10 ** precision;

  return Math.round((a * factor + b * factor) / 2) / factor;
};
