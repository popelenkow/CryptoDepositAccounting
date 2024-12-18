import { create } from 'zustand';
import { IncomeMode, IncomePeriod } from '../../../common/grid/trade';

export type GridOptionsStatus = 'actual' | 'history';
export type GridOptionsSortType =
  | 'id'
  | 'instrument'
  | 'pricePercent'
  | 'duration'
  | 'totalPercent'
  | 'totalUsdt'
  | 'gridAprPercent'
  | 'gridAprUsdt'
  | 'gridTotalPercent'
  | 'gridTotalUsdt';
export type GridOptionsSortOrder = 'asc' | 'desc';

export type GridOptionsState = {
  status: GridOptionsStatus;
  mode: IncomeMode;
  period: IncomePeriod;
  sortType: GridOptionsSortType;
  sortOrder: GridOptionsSortOrder;
};
const defaultState: GridOptionsState = {
  status: 'actual',
  mode: 'percent',
  period: 'daily',
  sortType: 'gridAprPercent',
  sortOrder: 'desc',
};

export const useGridOptionsStore = create<GridOptionsState>(() => ({
  ...defaultState,
}));
