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
    close_reason:
      | 'STOP_TYPE_USER'
      | 'STOP_TYPE_TP'
      | 'STOP_TYPE_TRIGGER_FBU_FAIL';
    bot_close_code:
      | 'BOT_CLOSE_CODE_CANCELED_MANUALLY'
      | 'BOT_CLOSE_CODE_CANCELED_AUTO_TP'
      | 'BOT_CLOSE_CODE_FAILED_INITIATION';
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

export type FutureGridResult = {
  type: 'GRID_FUTURES';
  grid: null;
  dca: null;
  future_grid: FutureGrid;
  fmart: null;
  fcombo: null;
};

export type FutureGridsResponse = {
  ret_code: number;
  ret_msg: string;
  result: {
    bots: FutureGridResult[];
    total: string;
    status_code: number;
    debug_msg: string;
  };
  ext_code: string;
  ext_info: null | string;
  time_now: string;
};
