import { GridTransactionData, Transaction } from '../../../api/backend/types';
import { FutureGrid } from '../../../api/bybit/types/grid';
import { FutureGridDetail } from '../../../api/bybit/types/gridDetail';

type GridTransactionInfo = Pick<
  GridTransactionData,
  'startPrice' | 'endPrice' | 'funding' | 'startTime' | 'endTime' | 'lastUpdate'
>;

const getClose = (grid: FutureGrid): GridTransactionData['close'] => {
  if (grid.status === 'RUNNING') {
    return 'pending';
  }
  if (grid.close_detail?.bot_close_code === 'BOT_CLOSE_CODE_CANCELED_AUTO_TP') {
    return 'auto';
  }
  return 'manual';
};

const toTransaction = (grid: FutureGrid): GridTransactionData => {
  const transaction: GridTransactionData = {
    orderId: grid.grid_id,
    type: 'grid',
    instrument: grid.symbol,
    amount: Number(grid.total_investment),
    minPrice: Number(grid.min_price),
    maxPrice: Number(grid.max_price),
    currentPrice: Number(grid.current_price || '0'),
    startPrice: 0,
    endPrice: 0,
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    grids: Number(grid.cell_num),
    leverage: Number(grid.leverage),
    duration: Number(grid.running_duration),
    trades: Number(grid.arbitrage_num),
    total: Number(grid.pnl),
    funding: 0,
    close: getClose(grid),
    lastUpdate: 'open',
  };
  return transaction;
};

const toTransactionInfo = (
  rawDetail: FutureGridDetail & { timestamp: string },
): GridTransactionInfo => {
  const pending = rawDetail.status === 'RUNNING';

  const detail: GridTransactionInfo = {
    startPrice: Number(rawDetail.entry_price),
    endPrice: Number(rawDetail.real_close_price || rawDetail.take_profit_price),
    startTime: new Date(Number(rawDetail.create_time)).toISOString(),
    endTime: new Date(Number(rawDetail.end_time)).toISOString(),
    funding: -Number(rawDetail.funding_fee),
    lastUpdate: pending
      ? new Date(Number(rawDetail.timestamp) * 1000).toISOString()
      : 'close',
  };
  return detail;
};

const mergeTransactionInfo = (
  transaction: GridTransactionData,
  info?: GridTransactionInfo,
): GridTransactionData => {
  if (!info) {
    return transaction;
  }

  return {
    ...transaction,
    ...info,
  };
};

const mapInfo = (
  transaction?: GridTransactionData,
): GridTransactionInfo | undefined => {
  if (!transaction) {
    return undefined;
  }

  return {
    startPrice: transaction.startPrice,
    endPrice: transaction.endPrice,
    startTime: transaction.startTime,
    endTime: transaction.endTime,
    funding: transaction.funding,
    lastUpdate: transaction.lastUpdate,
  };
};

export const createTransaction = (
  rowData: FutureGrid,
  list: Transaction<'grid'>[],
): GridTransactionData => {
  const data = toTransaction(rowData);
  const prev = list.find((x) => x.data.orderId === data.orderId);
  const result = mergeTransactionInfo(data, mapInfo(prev?.data));
  return result;
};

export const injectTransactionDetail = (
  data: GridTransactionData,
  detail: FutureGridDetail & { timestamp: string },
): GridTransactionData => {
  const info = toTransactionInfo(detail);
  const result = mergeTransactionInfo(data, info);
  return result;
};
