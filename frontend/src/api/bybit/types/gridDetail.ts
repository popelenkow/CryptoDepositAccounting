export type FutureGridDetail = {
  bot_id: string;
  symbol: string;
  status: 'RUNNING' | 'COMPLETED';
  base_token: string;
  quote_token: string;
  min_price: string;
  max_price: string;
  cell_number: number;
  grid_type: 'FUTURE_GRID_TYPE_GEOMETRIC' | 'FUTURE_GRID_TYPE_ARITHMETIC';
  grid_mode: 'FUTURE_GRID_MODE_LONG' | 'FUTURE_GRID_MODE_SHORT';
  stop_loss_per: string | null;
  take_profit_per: string | null;
  real_leverage: string;
  total_investment: string;
  total_value: string | null;
  current_position: string;
  arbitrage_num: number;
  arbitrage_num_24: number;
  pnl: string;
  pnl_per: string;
  grid_profit: string;
  grid_apr: string;
  total_apr: string;
  last_price: string;
  liquidation_price: string;
  realised_pnl: string;
  unrealised_pnl: string;
  funding_fee: string;
  position_balance: string;
  available_balance: string;
  total_order_balance: string;
  close_reason: 'STOP_TYPE_USER' | 'STOP_TYPE_TP' | 'STOP_TYPE_UNSPECIFIED';
  allow_follow: number;
  operation_time: string;
  create_time: string;
  modify_time: string;
  end_time: string | null;
  min_profit: string;
  max_profit: string;
  leverage: string;
  mark_price: string;
  bot_close_code:
    | 'BOT_CLOSE_CODE_UNKNOWN'
    | 'BOT_CLOSE_CODE_CANCELED_MANUALLY'
    | 'BOT_CLOSE_CODE_CANCELED_AUTO_TP';
  futures_pos_side:
    | 'FUTURES_POSITION_SIDE_LONG'
    | 'FUTURES_POSITION_SIDE_SHORT';
  follow_num: number;
  entry_price: string;
  stop_loss_price: string | null;
  take_profit_price: string;
  tp_sl_type: 'TP_SL_TYPE_PRICE' | 'TP_SL_TYPE_PERCENTAGE';
  real_close_price: string | null;
  min_price_precision: string;
  tick_size: string;
  used_reward_amount: string | null;
  settlement_assets: string | null;
  account_type: 'BOT_ACCOUNT_TYPE_FUND';
  cum_withdrew_amount: string;
  current_profit: string;
  current_per: string;
  copy_trade_is_master: boolean;
  copy_trade_follower_num: string;
  init_bonus: string;
  used_bonus_amount: string | null;
  used_reward_id: string | null;
  taker_fee_rate: string;
  maker_fee_rate: string;
};

export type FutureGridDetailResult = {
  status_code: number;
  detail: FutureGridDetail;
  debug_msg: string;
};

export type FutureGridDetailResponse = {
  ret_code: number;
  ret_msg: string;
  result: FutureGridDetailResult;
  ext_code: string;
  ext_info: null | string;
  time_now: string;
};
