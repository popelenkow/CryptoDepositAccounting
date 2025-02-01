import { GridTransactionData, InstrumentInfo } from '../../api/backend/types';
import { assertNever } from '../assert';
import { findInstrumentInfo } from '../instrumentInfo';
import { IncomePeriod, toPeriodValue } from '../period';
import { commissions } from '../transaction';
import { getGridPrices } from './ratio';
import { getGridDuration, getGridsDuration } from './time';
import { getGridTradeQuantity, IncomeMode } from './trade';

export const getGridSpot = (
  transaction: GridTransactionData,
  info: InstrumentInfo,
  mode: IncomeMode,
  floor: boolean,
) => {
  const { startPrice, endPrice, amount } = transaction;
  const buyPrices = getGridPrices(transaction, info, 'buy', floor);
  const sellPrices = getGridPrices(transaction, info, 'sell', floor);
  const quantity = getGridTradeQuantity(transaction, info);
  const commission = commissions.limit;

  const profits = buyPrices.map((_, i) => {
    const buyPrice = buyPrices[i];
    const sellPrice = sellPrices[i];
    const buy = buyPrice * quantity * (1 + commission);
    const sell = sellPrice * quantity * (1 - commission);
    const sBuy = startPrice * quantity * (1 + commission);
    const eSell = endPrice * quantity * (1 - commission);
    if (endPrice < startPrice) {
      if (buyPrice > startPrice) {
        return eSell - sBuy;
      }
      if (buyPrice > endPrice) {
        return eSell - buy;
      }
      return 0;
    }

    if (buyPrice < startPrice) {
      return 0;
    }
    if (sellPrice < endPrice) {
      return sell - sBuy;
    }
    return eSell - sBuy;
  });
  const profit = profits.reduce((acc, x) => acc + x, 0);

  if (mode === 'percent') {
    return (profit / amount) * 100;
  }
  if (mode === 'usdt') {
    return profit;
  }
  return assertNever(mode);
};

export const getGridsSpot = (
  transactions: GridTransactionData[],
  infos: InstrumentInfo[],
  mode: IncomeMode,
  floor: boolean,
) =>
  transactions.reduce((acc, transaction) => {
    const info = findInstrumentInfo(infos, transaction.instrument);
    const profit = getGridSpot(transaction, info, mode, floor);
    return acc + profit;
  }, 0);

export const getGridPeriodSpot = (
  transaction: GridTransactionData,
  info: InstrumentInfo,
  mode: IncomeMode,
  period: IncomePeriod,
  floor: boolean,
) => {
  const spot = getGridSpot(transaction, info, mode, floor);
  const days = getGridDuration(transaction);
  const daily = spot / days;
  return toPeriodValue(daily, period);
};

export const getGridsPeriodSpot = (
  transactions: GridTransactionData[],
  infos: InstrumentInfo[],
  mode: IncomeMode,
  period: IncomePeriod,
  floor: boolean,
) => {
  const spot = getGridsSpot(transactions, infos, mode, floor);
  const days = getGridsDuration(transactions);
  const daily = spot / days;
  return toPeriodValue(daily, period);
};
