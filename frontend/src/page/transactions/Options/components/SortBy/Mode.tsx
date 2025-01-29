import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { GridTransactionSortByProfit } from '../../../../../api/backend/select/grid';
import { Item } from '../../../../../components/ListItem/common';
import { ListItemSelect } from '../../../../../components/ListItem/Select';
import { useGridOptionsStore } from '../../store';

const items: Item<GridTransactionSortByProfit['mode']>[] = [
  {
    key: 'percent',
    text: (t) => t('page.transactions.options.sortBy.mode.value.percent'),
  },
  {
    key: 'usdt',
    text: (t) => t('page.transactions.options.sortBy.mode.value.usdt'),
  },
];

export const TransactionsPageOptionsSortByMode: FC = () => {
  const { t } = useTranslation();
  const by = useGridOptionsStore((state) => state.sort.by);

  if (by.category !== 'profit') {
    return null;
  }

  return (
    <ListItemSelect
      label={t('page.transactions.options.sortBy.mode.label')}
      items={items}
      selected={by.mode}
      onSelect={(mode) => {
        useGridOptionsStore.setState((state) => ({
          ...state,
          sort: {
            ...state.sort,
            by: {
              ...by,
              mode,
            },
          },
        }));
      }}
    />
  );
};
