import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { GridTransactionSortBy } from '../../../../../api/backend/select/grid';
import { assertNever } from '../../../../../common/assert';
import { Item } from '../../../../../components/ListItem/common';
import { ListItemSelect } from '../../../../../components/ListItem/Select';
import { useGridOptionsStore } from '../../store';

const items: Item<GridTransactionSortBy['category']>[] = [
  {
    key: 'profit',
    text: (t) => t('page.transactions.options.sortBy.category.value.profit'),
  },
  {
    key: 'time',
    text: (t) => t('page.transactions.options.sortBy.category.value.time'),
  },
  {
    key: 'other',
    text: (t) => t('page.transactions.options.sortBy.category.value.other'),
  },
];

const createByCategory = (
  category: GridTransactionSortBy['category'],
): GridTransactionSortBy => {
  if (category === 'profit') {
    return { category, type: 'total', mode: 'percent', period: 'lifetime' };
  }
  if (category === 'time') {
    return { category, type: 'duration' };
  }
  if (category === 'other') {
    return { category, type: 'id' };
  }
  return assertNever(category);
};

export const TransactionsPageOptionsSortByCategory: FC = () => {
  const { t } = useTranslation();
  const by = useGridOptionsStore((state) => state.sort.by);

  return (
    <ListItemSelect
      label={t('page.transactions.options.sortBy.category.label')}
      items={items}
      selected={by.category}
      onSelect={(category) => {
        useGridOptionsStore.setState((state) => ({
          ...state,
          sort: { ...state.sort, by: createByCategory(category) },
        }));
      }}
    />
  );
};
