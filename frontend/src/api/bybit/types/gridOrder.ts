export type GridOrder = {
  price: string;
  quantity: string;
};

export type GridOrdersResult = {
  status_code: number;
  debug_msg: string;
  base_token: string;
  quote_token: string;
  cell_investment: string;
  last_price: string;
  buys: GridOrder[];
  sells: GridOrder[];
  mark_price: string;
  cell_number: number;
};

export type GridOrdersResponse = {
  ret_code: number;
  ret_msg: string;
  result: GridOrdersResult;
  ext_code: string;
  ext_info: null | string;
  time_now: string;
};
