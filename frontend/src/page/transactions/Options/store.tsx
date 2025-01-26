import { create } from 'zustand';
import {
  GridTransactionSelectType,
  GridTransactionSort,
  GridTransactionStatus,
} from '../../../api/backend/select/grid';
import { IncomeMode, IncomePrediction } from '../../../common/grid/trade';
import { IncomePeriod } from '../../../common/period';

export type GridOptionsState = {
  open: boolean;
  status: GridTransactionStatus;
  instruments: string[];
  selectType: GridTransactionSelectType;
  mode: IncomeMode;
  prediction: IncomePrediction;
  period: IncomePeriod;
  sort: GridTransactionSort;
};
const defaultState: GridOptionsState = {
  open: false,
  status: 'actual',
  instruments: [],
  selectType: 'all',
  mode: 'percent',
  prediction: 'pessimistic',
  period: 'daily',
  sort: {
    order: 'desc',
    by: {
      category: 'profit',
      type: 'total',
      mode: 'percent',
      period: 'lifetime',
    },
  },
};

export const useGridOptionsStore = create<GridOptionsState>(() => ({
  ...defaultState,
}));
