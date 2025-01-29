import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { GridTransactionStatus } from '../../../../api/backend/select/grid';
import { Item } from '../../../../components/ListItem/common';
import { ListItemSelect } from '../../../../components/ListItem/Select';
import { useGridOptionsStore } from '../store';

const items: Item<GridTransactionStatus>[] = [
  {
    key: 'all',
    text: (t) => t('page.transactions.options.status.value.all'),
  },
  {
    key: 'actual',
    text: (t) => t('page.transactions.options.status.value.actual'),
  },
  {
    key: 'history',
    text: (t) => t('page.transactions.options.status.value.history'),
  },
];

export const TransactionsPageOptionsStatus: FC = () => {
  const { t } = useTranslation();
  const status = useGridOptionsStore((state) => state.status);

  return (
    <ListItemSelect
      label={t('page.transactions.options.status.label')}
      items={items}
      selected={status}
      onSelect={(status) => {
        useGridOptionsStore.setState({ status });
      }}
    />
  );
};
