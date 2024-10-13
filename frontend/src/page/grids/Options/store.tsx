import { create } from 'zustand';

export type GridOptionsStatus = 'actual' | 'history';
export type GridOptionsMode = '$' | '%';
export type GridOptionsSortType =
  | 'id'
  | 'priceCurrentPercent'
  | 'totalPercent'
  | 'totalUsdt'
  | 'gridAprPercent'
  | 'gridAprUsdt'
  | 'gridTotalPercent'
  | 'gridTotalUsdt';
export type GridOptionsSortOrder = 'asc' | 'desc';

export type GridOptionsState = {
  status: GridOptionsStatus;
  mode: GridOptionsMode;
  sortType: GridOptionsSortType;
  sortOrder: GridOptionsSortOrder;
};
const defaultState: GridOptionsState = {
  status: 'actual',
  mode: '%',
  sortType: 'gridAprPercent',
  sortOrder: 'desc',
};

export const useGridOptionsStore = create<GridOptionsState>(() => ({
  ...defaultState,
}));
