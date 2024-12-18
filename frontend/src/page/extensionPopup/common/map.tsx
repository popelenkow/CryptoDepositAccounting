import { FutureGrid } from '../../../api/bybit/types/grid';
import { FutureGridDetail } from '../../../api/bybit/types/gridDetail';
import {
  GridHistoryOrder,
  GridHistoryOrderPair,
} from '../../../api/bybit/types/gridHistoryOrder';
import { GridOrdersResult } from '../../../api/bybit/types/gridOrder';
import {
  GridTransactionData,
  GridTransactionHistoryOrder,
  GridTransactionHistoryOrderPair,
  GridTransactionOrder,
  Transaction,
} from '../../../api/types';

type GridTransactionInfo = Pick<
  GridTransactionData,
  | 'startPrice'
  | 'endPrice'
  | 'funding'
  | 'detailTimestamp'
  | 'startTime'
  | 'endTime'
  | 'historyOrders'
  | 'orders'
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
    detailTimestamp: 'open',
  };
  return transaction;
};

const toTransactionHistoryOrders = (
  orders?: GridHistoryOrderPair[],
): GridTransactionHistoryOrderPair[] | undefined => {
  if (!orders) {
    return undefined;
  }
  const sorted = orders.sort(
    (a, b) => Number(a.open_order.avg_price) - Number(b.open_order.avg_price),
  );

  const result = sorted.map((x): GridTransactionHistoryOrderPair => {
    const [buy, sell] =
      x.open_order.side === '1'
        ? [x.open_order, x.close_order]
        : [x.close_order, x.open_order];

    const toOrder = (
      x: GridHistoryOrder,
    ): GridTransactionHistoryOrder | undefined => {
      if (x.order_status === 'FUTURE_ORDER_STATUS_NEW') {
        return undefined;
      }
      return {
        price: Number(x.avg_price),
        quantity: Number(x.quantity),
        fee: Number(x.fee),
      };
    };
    return {
      profit: Number(x.profits),
      buy: toOrder(buy),
      sell: toOrder(sell),
    };
  });

  return result;
};

const toTransactionOrders = (
  orders?: GridOrdersResult,
): GridTransactionOrder[] | undefined => {
  if (!orders) {
    return undefined;
  }
  const buys = orders.buys.map(
    (x): GridTransactionOrder => ({
      type: 'buy',
      price: Number(x.price),
      quantity: Number(x.quantity),
    }),
  );
  const sells = orders.sells.map(
    (x): GridTransactionOrder => ({
      type: 'sell',
      price: Number(x.price),
      quantity: Number(x.quantity),
    }),
  );
  return [...buys, ...sells].sort((a, b) => a.price - b.price);
};

const toTransactionInfo = (
  rawDetail: FutureGridDetail,
  historyOrders: GridHistoryOrderPair[],
  orders?: GridOrdersResult,
): GridTransactionInfo => {
  const pending = rawDetail.status === 'RUNNING';

  const detail: GridTransactionInfo = {
    startPrice: Number(rawDetail.entry_price),
    endPrice: Number(rawDetail.real_close_price),
    startTime: new Date(Number(rawDetail.create_time)).toISOString(),
    endTime: new Date(Number(rawDetail.end_time)).toISOString(),
    funding: -Number(rawDetail.funding_fee),
    detailTimestamp: pending ? 1 : 'close',
    historyOrders: toTransactionHistoryOrders(historyOrders),
    orders: toTransactionOrders(orders),
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
    detailTimestamp: transaction.detailTimestamp,
    historyOrders: transaction.historyOrders,
    orders: transaction.orders,
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
  detail: FutureGridDetail,
  historyOrders: GridHistoryOrderPair[],
  orders?: GridOrdersResult,
): GridTransactionData => {
  const info = toTransactionInfo(detail, historyOrders, orders);
  const result = mergeTransactionInfo(data, info);
  return result;
};
