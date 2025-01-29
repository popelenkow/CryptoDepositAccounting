import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { GridTransactionSelectType } from '../../../../api/backend/select/grid';
import { Item } from '../../../../components/ListItem/common';
import { ListItemSelect } from '../../../../components/ListItem/Select';
import { useGridOptionsStore } from '../store';

const items: Item<GridTransactionSelectType>[] = [
  {
    key: 'all',
    text: (t) => t('page.transactions.options.selectType.value.all'),
  },
  {
    key: 'highest',
    text: (t) => t('page.transactions.options.selectType.value.highest'),
  },
  {
    key: 'lowest',
    text: (t) => t('page.transactions.options.selectType.value.lowest'),
  },
];

export const TransactionsPageOptionsSelectType: FC = () => {
  const { t } = useTranslation();
  const selectType = useGridOptionsStore((state) => state.selectType);

  return (
    <ListItemSelect
      label={t('page.transactions.options.selectType.label')}
      items={items}
      selected={selectType}
      onSelect={(selectType) => {
        useGridOptionsStore.setState({ selectType });
      }}
    />
  );
};
