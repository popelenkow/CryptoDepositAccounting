import { create } from 'zustand';
import {
  GridTransactionSelectType,
  GridTransactionSort,
  GridTransactionStatus,
} from '../../../api/backend/select/grid';
import { IncomeMode, IncomePrediction } from '../../../common/grid/trade';
import { IncomePeriod } from '../../../common/period';

export type GridOptionsState = {
  status: GridTransactionStatus;
  selectType: GridTransactionSelectType;
  mode: IncomeMode;
  prediction: IncomePrediction;
  period: IncomePeriod;
  sort: GridTransactionSort;
};
const defaultState: GridOptionsState = {
  status: 'actual',
  selectType: 'all',
  mode: 'percent',
  prediction: 'pessimistic',
  period: 'daily',
  sort: {
    order: 'desc',
    type: 'gridPeriodPercent',
  },
};

export const useGridOptionsStore = create<GridOptionsState>(() => ({
  ...defaultState,
}));
