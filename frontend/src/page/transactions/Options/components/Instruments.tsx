import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { getGridTransactionsOptions } from '../../../../api/backend/select/grid';
import { unique } from '../../../../common/unique';
import { Item } from '../../../../components/ListItem/common';
import { ListItemMultiSelect } from '../../../../components/ListItem/MultiSelect';
import { useGridOptionsStore } from '../store';

export const TransactionsPageOptionsInstruments: FC = () => {
  const { t } = useTranslation();
  const transactions = useQuery(getGridTransactionsOptions()).data ?? [];
  const instruments = useGridOptionsStore((state) => state.instruments);
  const items = transactions
    .map((transaction) => transaction.data.instrument)
    .filter(unique)
    .sort()
    .map(
      (key): Item => ({
        key,
        text: key,
      }),
    );

  return (
    <ListItemMultiSelect
      label={t('page.transactions.options.instruments.label')}
      emptySelectedText={t('page.transactions.options.instruments.all')}
      items={items}
      selected={instruments}
      onSelect={(instruments) => {
        useGridOptionsStore.setState({ instruments });
      }}
    />
  );
};
