import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { GridTransactionSortByProfit } from '../../../../../api/backend/select/grid';
import { Item } from '../../../../../components/ListItem/common';
import { ListItemSelect } from '../../../../../components/ListItem/Select';
import { useGridOptionsStore } from '../../store';

const items: Item<GridTransactionSortByProfit['period']>[] = [
  {
    key: 'lifetime',
    text: (t) => t('page.transactions.options.sortBy.period.value.lifetime'),
  },
  {
    key: 'daily',
    text: (t) => t('page.transactions.options.sortBy.period.value.daily'),
  },
];

export const TransactionsPageOptionsSortByPeriod: FC = () => {
  const { t } = useTranslation();
  const by = useGridOptionsStore((state) => state.sort.by);

  if (by.category !== 'profit') {
    return null;
  }

  return (
    <ListItemSelect
      label={t('page.transactions.options.sortBy.period.label')}
      items={items}
      selected={by.period}
      onSelect={(period) => {
        useGridOptionsStore.setState((state) => ({
          ...state,
          sort: {
            ...state.sort,
            by: {
              ...by,
              period,
            },
          },
        }));
      }}
    />
  );
};
