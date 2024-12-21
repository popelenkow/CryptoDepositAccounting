import { create } from 'zustand';
import { IncomeMode, IncomePrediction } from '../../../common/grid/trade';
import { IncomePeriod } from '../../../common/period';

export type GridOptionsStatus = 'actual' | 'history';
export type GridOptionsSortType =
  | 'id'
  | 'instrument'
  | 'pricePercent'
  | 'duration'
  | 'totalPercent'
  | 'totalUsdt'
  | 'gridPeriodPercent'
  | 'gridPeriodUsdt'
  | 'gridTotalPercent'
  | 'gridTotalUsdt';
export type GridOptionsSortOrder = 'asc' | 'desc';

export type GridOptionsState = {
  status: GridOptionsStatus;
  mode: IncomeMode;
  prediction: IncomePrediction;
  period: IncomePeriod;
  sortType: GridOptionsSortType;
  sortOrder: GridOptionsSortOrder;
};
const defaultState: GridOptionsState = {
  status: 'actual',
  mode: 'percent',
  prediction: 'pessimistic',
  period: 'daily',
  sortType: 'gridPeriodPercent',
  sortOrder: 'desc',
};

export const useGridOptionsStore = create<GridOptionsState>(() => ({
  ...defaultState,
}));
