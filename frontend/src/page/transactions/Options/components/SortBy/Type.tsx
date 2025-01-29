import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  GridTransactionSortByOther,
  GridTransactionSortByProfit,
  GridTransactionSortByTime,
} from '../../../../../api/backend/select/grid';
import { Item } from '../../../../../components/ListItem/common';
import { ListItemSelect } from '../../../../../components/ListItem/Select';
import { useGridOptionsStore } from '../../store';

const profitItems: Item<GridTransactionSortByProfit['type']>[] = [
  {
    key: 'total',
    text: (t) => t('page.transactions.options.sortBy.type.value.total'),
  },
  {
    key: 'spot',
    text: (t) => t('page.transactions.options.sortBy.type.value.spot'),
  },
  {
    key: 'funding',
    text: (t) => t('page.transactions.options.sortBy.type.value.funding'),
  },
  {
    key: 'grid',
    text: (t) => t('page.transactions.options.sortBy.type.value.grid'),
  },
];

const timeItems: Item<GridTransactionSortByTime['type']>[] = [
  {
    key: 'duration',
    text: (t) => t('page.transactions.options.sortBy.type.value.duration'),
  },
];

const otherItems: Item<GridTransactionSortByOther['type']>[] = [
  {
    key: 'id',
    text: (t) => t('page.transactions.options.sortBy.type.value.id'),
  },
  {
    key: 'instrument',
    text: (t) => t('page.transactions.options.sortBy.type.value.instrument'),
  },
  {
    key: 'pricePercent',
    text: (t) => t('page.transactions.options.sortBy.type.value.pricePercent'),
  },
];

const itemsDict = {
  profit: profitItems,
  time: timeItems,
  other: otherItems,
};

export const TransactionsPageOptionsSortByType: FC = () => {
  const { t } = useTranslation();
  const by = useGridOptionsStore((state) => state.sort.by);

  return (
    <ListItemSelect
      label={t('page.transactions.options.sortBy.type.label')}
      items={itemsDict[by.category]}
      selected={by.type}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSelect={(type: any) => {
        useGridOptionsStore.setState((state) => ({
          ...state,
          sort: {
            ...state.sort,
            by: {
              ...by,
              type,
            },
          },
        }));
      }}
    />
  );
};
