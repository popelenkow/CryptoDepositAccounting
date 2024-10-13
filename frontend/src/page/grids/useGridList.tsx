import { useQuery } from '@tanstack/react-query';
import { getTransactionsOptions } from '../../api/options';
import { GridTransaction } from '../../api/types';
import { getGridCurrentPricePercent } from '../../common/grid/ratio';
import {
  getTotalPercentFromGrid,
  getTotalUsdtFromGrid,
} from '../../common/grid/total';
import {
  getGridAprPercent,
  getGridAprUsdt,
  getGridTotalPercent,
  getGridTotalUsdt,
} from '../../common/grid/trade';
import {
  GridOptionsSortOrder,
  GridOptionsSortType,
  useGridOptionsStore,
} from './Options/store';

type SortValueDict = Record<
  GridOptionsSortType,
  (transaction: GridTransaction) => number
>;

const sortValueDict: SortValueDict = {
  id: (transaction) => transaction.id,
  gridAprPercent: getGridAprPercent,
  gridAprUsdt: getGridAprUsdt,
  gridTotalPercent: getGridTotalPercent,
  gridTotalUsdt: getGridTotalUsdt,
  totalPercent: getTotalPercentFromGrid,
  totalUsdt: getTotalUsdtFromGrid,
  priceCurrentPercent: getGridCurrentPricePercent,
};

const getSort = (type: GridOptionsSortType, order: GridOptionsSortOrder) => {
  return (a: GridTransaction, b: GridTransaction) => {
    const aValue = sortValueDict[type](a);
    const bValue = sortValueDict[type](b);

    if (order === 'desc') {
      return bValue - aValue;
    }

    return aValue - bValue;
  };
};

export const useGridList = () => {
  const transactions = useQuery(getTransactionsOptions);
  const options = useGridOptionsStore();

  if (!transactions.data) {
    return [];
  }

  const gridList = transactions.data.filter(
    (transaction) => transaction.type === 'grid',
  );

  const filteredList = gridList.filter((transaction) => {
    if (options.status === 'actual') {
      return transaction.close === 'pending';
    }
    return transaction.close !== 'pending';
  });

  const sortedList = filteredList.sort(
    getSort(options.sortType, options.sortOrder),
  );

  return sortedList;
};
