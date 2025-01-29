import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { GridTransactionSortOrder } from '../../../../api/backend/select/grid';
import { Item } from '../../../../components/ListItem/common';
import { ListItemSelect } from '../../../../components/ListItem/Select';
import { useGridOptionsStore } from '../store';

const items: Item<GridTransactionSortOrder>[] = [
  {
    key: 'asc',
    text: (t) => t('page.transactions.options.sortOrder.value.asc'),
  },
  {
    key: 'desc',
    text: (t) => t('page.transactions.options.sortOrder.value.desc'),
  },
];

export const TransactionsPageOptionsSortOrder: FC = () => {
  const { t } = useTranslation();
  const order = useGridOptionsStore((state) => state.sort.order);

  return (
    <ListItemSelect
      label={t('page.transactions.options.sortOrder.label')}
      items={items}
      selected={order}
      onSelect={(order) => {
        useGridOptionsStore.setState((state) => ({
          ...state,
          sort: { ...state.sort, order },
        }));
      }}
    />
  );
};
