export type GridHistoryOrder = {
  order_id: string;
  avg_price: string;
  quantity: string;
  side: string;
  fee: string;
  fee_token: string;
  time: string;
  order_status: 'FUTURE_ORDER_STATUS_FILLED' | 'FUTURE_ORDER_STATUS_NEW';
};

export type GridHistoryOrderPair = {
  pair_type: 'ARBITRAGE';
  profits: string;
  profits_token: string;
  open_order: GridHistoryOrder;
  close_order: GridHistoryOrder;
};

export type GridHistoryOrdersResult = {
  status_code: number;
  debug_msg: string;
  bot_id: string;
  base_token: string;
  quote_token: string;
  pairs: GridHistoryOrderPair[];
  total: string;
};

export type GridHistoryOrdersResponse = {
  ret_code: number;
  ret_msg: string;
  result: GridHistoryOrdersResult;
  ext_code: string;
  ext_info: null | string;
  time_now: string;
};
