import { GridTransactionData, Transaction } from '../../../../api/types';
import { IncomeMode } from '../../../../common/grid/trade';

export const sum = (
  list: Transaction<'grid'>[],
  mode: IncomeMode,
  toValue: (transaction: GridTransactionData, mode: IncomeMode) => number,
) => list.reduce((acc, x) => acc + toValue(x.data, mode), 0);
