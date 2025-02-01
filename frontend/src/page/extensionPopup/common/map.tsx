import {
  GridTransactionData,
  InstrumentInfo,
  Transaction,
} from '../../../api/backend/types';
import { FutureGrid } from '../../../api/bybit/types/grid';
import { FutureGridDetail } from '../../../api/bybit/types/gridDetail';
import { getGridSpot } from '../../../common/grid/spot';
import { mapSecondsToDays } from '../../../common/time';

type GridTransactionInfo = Pick<
  GridTransactionData,
  | 'fundingProfit'
  | 'quantity'
  | 'startPrice'
  | 'endPrice'
  | 'startTime'
  | 'endTime'
  | 'detailTime'
  | 'detailStatus'
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
    leverage: Number(grid.leverage),
    totalProfit: Number(grid.pnl),
    spotProfit: 0,
    fundingProfit: 0,
    gridProfit: 0,
    trades: Number(grid.arbitrage_num),
    grids: Number(grid.cell_num),
    quantity: 1,
    minPrice: Number(grid.min_price),
    maxPrice: Number(grid.max_price),
    startPrice: 0,
    endPrice: Number(grid.current_price || '0'),
    duration: mapSecondsToDays(Number(grid.running_duration)),
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    detailTime: new Date().toISOString(),
    detailStatus: 'init',
    profitStatus: 'init',
    close: getClose(grid),
  };
  return transaction;
};

const toTransactionInfo = (
  rawDetail: FutureGridDetail & { timestamp: string; quantity: string },
): GridTransactionInfo => {
  const pending = rawDetail.status === 'RUNNING';

  const detail: GridTransactionInfo = {
    fundingProfit: -Number(rawDetail.funding_fee),
    quantity: Number(rawDetail.quantity),
    startPrice: Number(rawDetail.entry_price),
    endPrice: Number(rawDetail.real_close_price || rawDetail.take_profit_price),
    startTime: new Date(Number(rawDetail.create_time)).toISOString(),
    endTime: new Date(Number(rawDetail.end_time)).toISOString(),
    detailTime: new Date(Number(rawDetail.timestamp) * 1000).toISOString(),
    detailStatus: pending ? 'pending' : 'close',
  };
  return detail;
};

const mapInfo = (
  transaction?: GridTransactionData,
): GridTransactionInfo | undefined => {
  if (!transaction) {
    return undefined;
  }

  return {
    fundingProfit: transaction.fundingProfit,
    quantity: transaction.quantity,
    startPrice: transaction.startPrice,
    endPrice: transaction.endPrice,
    startTime: transaction.startTime,
    endTime: transaction.endTime,
    detailTime: transaction.detailTime,
    detailStatus: transaction.detailStatus,
  };
};

export const createTransaction = (
  rowData: FutureGrid,
  list: Transaction<'grid'>[],
): GridTransactionData => {
  const data = toTransaction(rowData);
  const prev = list.find((x) => x.data.orderId === data.orderId);
  const result: GridTransactionData = {
    ...data,
    ...mapInfo(prev?.data),
    endPrice: data.endPrice,
  };
  return result;
};

export const injectTransactionDetail = (
  data: GridTransactionData,
  detail: FutureGridDetail & { timestamp: string; quantity: string },
): GridTransactionData => {
  const info = toTransactionInfo(detail);
  const result: GridTransactionData = {
    ...data,
    ...info,
    endPrice: data.close === 'pending' ? data.endPrice : info.endPrice,
  };
  return result;
};

export const calcTransactionProfits = (
  transaction: GridTransactionData,
  infos: InstrumentInfo[],
): GridTransactionData => {
  if (transaction.detailStatus === 'init') {
    return transaction;
  }
  const info = infos.find((x) => x.instrument === transaction.instrument);
  const defaultInfo: InstrumentInfo = {
    id: -1,
    instrument: transaction.instrument,
    priceStep: 1,
    quantityStep: 1,
  };
  const { totalProfit, fundingProfit } = transaction;
  const spotProfit = getGridSpot(
    transaction,
    info ?? defaultInfo,
    'usdt',
    false,
  );
  const gridProfit = totalProfit - fundingProfit - spotProfit;
  return {
    ...transaction,
    spotProfit,
    gridProfit,
    profitStatus: info === undefined ? 'infoError' : 'done',
  };
};
