const roundTo = (value: number, decimals: number) => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

const assertDefined = <T>(value: T | undefined | null): T => {
  if (value === undefined || value === null) {
    throw new Error('Value is undefined');
  }
  return value;
};

const jsonHeaders: HeadersInit = { 'Content-Type': 'application/json' };
const textHeaders: HeadersInit = { 'Content-Type': 'text/plain' };

type RequestOptions = {
  method: 'get' | 'post' | 'put' | 'delete';
  endpoint: string;
  formBody?: FormData;
  textBody?: string;
  jsonBody?: unknown;
};
const request = async <Result = void>(
  options: RequestOptions,
): Promise<Result> => {
  const { method, endpoint, formBody, textBody, jsonBody } = options;

  const getHeaders = () => {
    if (formBody) return undefined;
    if (textBody) return textHeaders;
    if (jsonBody) return jsonHeaders;
    return undefined;
  };
  const body = formBody ?? textBody ?? JSON.stringify(jsonBody);

  const url = new URL(endpoint);
  const response = await fetch(url, {
    method,
    headers: getHeaders(),
    body,
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export type FutureGrid = {
  grid_id: string;
  mark_price: string;
  total_investment: string;
  pnl: string;
  pnl_per: string;
  symbol: string;
  leverage: string;
  min_price: string;
  max_price: string;
  cell_num: number;
  status: 'RUNNING' | 'COMPLETED';
  running_duration: string;
  grid_mode: 'FUTURE_GRID_MODE_LONG';
  liq_price: string;
  price_token: string;
  account_type: 'BOT_ACCOUNT_TYPE_FUND';
  close_detail: {
    settlement_asset: string;
    close_reason: 'STOP_TYPE_USER' | 'STOP_TYPE_TP';
    bot_close_code:
      | 'BOT_CLOSE_CODE_CANCELED_MANUALLY'
      | 'BOT_CLOSE_CODE_CANCELED_AUTO_TP';
  } | null;
  arbitrage_num: number;
  total_apr: string;
  allow_follow: number;
  follow_num: number;
  entry_price: string;
  current_price: string;
  used_reward_amount: string;
  copy_trade_is_master: boolean;
  copy_trade_follower_num: string;
  grid_type: 'FUTURE_GRID_TYPE_GEOMETRIC' | 'FUTURE_GRID_TYPE_ARITHMETIC';
};

export type FutureGridBot = {
  type: 'GRID_FUTURES';
  grid: null;
  dca: null;
  future_grid: FutureGrid;
  fmart: null;
  fcombo: null;
};

export type FutureGridResponse = {
  ret_code: number;
  ret_msg: string;
  result: {
    bots: FutureGridBot[];
    total: string;
    status_code: number;
    debug_msg: string;
  };
  ext_code: string;
  ext_info: null | string;
  time_now: string;
};

export type LayoutNewGridParameters = {
  from: number;
  to: number;
  leverage: number;
  grids: number;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const setInputValue = (selector: HTMLInputElement, text: string | number) => {
  const inputElement =
    typeof selector === 'string'
      ? document.querySelector<HTMLInputElement>(selector)
      : selector;

  if (!inputElement) {
    throw new Error(`Input not found: ${selector}`);
  }
  const valueDescriptor = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    'value',
  );
  if (!valueDescriptor) {
    throw new Error('Value descriptor not found');
  }
  if (!valueDescriptor.set) {
    throw new Error('Value descriptor set not found');
  }

  valueDescriptor.set.call(inputElement, text);
  inputElement.dispatchEvent(new Event('input', { bubbles: true }));
};
const findByInnerTextXPath = (text: string) => {
  const xpath = `//*[text()="${text}"]`;
  const result = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  );
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return assertDefined(result.singleNodeValue) as HTMLElement;
};
const findElement = <
  Container extends Element = HTMLElement,
  Result extends Element = Container,
>(
  containerSelector: string,
  check?: (element: Container) => boolean,
  select?: (element: Container) => Result | null | undefined,
) => {
  const containerNodeList =
    document.querySelectorAll<Container>(containerSelector);
  const containers = Array.from(containerNodeList);
  const container = assertDefined(containers.find(check ?? (() => true)));
  const element = assertDefined(
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    select ? select(container) : (container as unknown as Result),
  );
  return element;
};

const bybitApi = {
  getBots: async () =>
    await request<FutureGridResponse>({
      endpoint: 'https://api2.bybit.com/s1/bot/tradingbot/v1/list-all-bots',
      method: 'post',
      jsonBody: { status: 0, page: 0, limit: 150 },
    }),
  getHistoryBots: async () =>
    await request<FutureGridResponse>({
      endpoint: 'https://api2.bybit.com/s1/bot/tradingbot/v1/list-all-bots',
      method: 'post',
      jsonBody: { status: 1, page: 0, limit: 60, type: 'GRID_FUTURES' },
    }),
  getGridCurrentPrice: async () => {
    const element = document.querySelector<HTMLSpanElement>(
      '.ob__market-price-bg',
    );
    if (!element) {
      throw new Error('Price not found');
    }
    const text = element.innerText;
    const value = Number(text);
    if (!text || Number.isNaN(value)) {
      throw new Error(`Invalid price: ${text}`);
    }
    return value;
  },
  fillGridParameters: async (parameters: LayoutNewGridParameters) => {
    assertDefined(
      document.querySelector<HTMLElement>('.oc-head-leverage'),
    ).click();
    await wait(100);

    const leverageInput = findElement(
      '.poz-mode-switch__lvg-wrap',
      (container) =>
        container
          .querySelector('.poz-mode-switch__lvg-title')
          ?.textContent?.trim() === 'Leverage',
      (container) =>
        container.querySelector<HTMLInputElement>('.by-input__inner')!,
    );
    setInputValue(leverageInput, parameters.leverage);

    const confirmButton = findElement(
      '[role="dialog"]',
      () => true,
      (container) =>
        Array.from(
          container.querySelectorAll<HTMLButtonElement>('button'),
        ).find((button) => button.textContent?.trim() === 'Confirm'),
    );
    confirmButton.click();

    const gridInput = findElement(
      '.by-input__container',
      (container) =>
        container
          .querySelector('.by-input__right-icon')
          ?.textContent?.trim() === 'Grids',
      (container) => container.querySelector('input'),
    );
    setInputValue(gridInput, parameters.grids);

    const fromInput = assertDefined(
      document.querySelector<HTMLInputElement>(
        '[placeholder="Lower price range"]',
      ),
    );
    setInputValue(fromInput, parameters.from);

    const toInput = assertDefined(
      document.querySelector<HTMLInputElement>(
        '[placeholder="Upper price range"]',
      ),
    );
    setInputValue(toInput, parameters.to);

    findByInnerTextXPath('Arithmetic').click();
    await wait(100);
    const geometric = assertDefined(
      document.querySelector<HTMLElement>('[title="Geometric"]'),
    );
    geometric.click();

    let takeProfitRoot = document.querySelector<HTMLElement>(
      '.grid-take-profit-loss-input',
    );
    if (!takeProfitRoot) {
      assertDefined(
        document.querySelector<HTMLElement>('.oc__tp-sl-chk-text'),
      ).click();
      await wait(100);
      takeProfitRoot = assertDefined(
        document.querySelector<HTMLElement>('.grid-take-profit-loss-input'),
      );
    }
    const takeProfitInput = assertDefined(
      takeProfitRoot.querySelector('input'),
    );
    setInputValue(takeProfitInput, roundTo(parameters.to + 0.0001, 4));
  },
};

export type BybitApi = typeof bybitApi;

type BybitApiArg<Key extends keyof BybitApi> = Parameters<BybitApi[Key]>[0];

export type BybitApiMessage<Key extends keyof BybitApi> =
  BybitApiArg<Key> extends undefined
    ? { key: Key }
    : {
        key: Key;
        data: BybitApiArg<Key>;
      };

const handleBybitApi = () => {
  chrome.runtime.onMessage.addListener(
    (message: BybitApiMessage<keyof BybitApi>, _sender, sendResponse) => {
      const handle = async () => {
        const api = bybitApi[message.key];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/consistent-type-assertions
        const data = message.data as any;
        const response = await api(data);
        console.log(`Response: ${message.key}`, response);
        sendResponse(response);
      };
      handle();

      return true;
    },
  );
  console.log('Bybit API handler registered');
};

handleBybitApi();
