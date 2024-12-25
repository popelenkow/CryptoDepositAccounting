import { create } from 'zustand';
import {
  GridTransactionSort,
  GridTransactionStatus,
} from '../../../api/backend/select/grid';
import { IncomeMode, IncomePrediction } from '../../../common/grid/trade';
import { IncomePeriod } from '../../../common/period';

export type GridOptionsState = {
  status: GridTransactionStatus;
  mode: IncomeMode;
  prediction: IncomePrediction;
  period: IncomePeriod;
  sort: GridTransactionSort;
};
const defaultState: GridOptionsState = {
  status: 'actual',
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
