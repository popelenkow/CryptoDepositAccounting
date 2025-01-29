import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IncomePrediction } from '../../../../common/grid/trade';
import { Item } from '../../../../components/ListItem/common';
import { ListItemSelect } from '../../../../components/ListItem/Select';
import { useGridOptionsStore } from '../store';

const items: Item<IncomePrediction>[] = [
  {
    key: 'optimistic',
    text: (t) => t('page.transactions.options.prediction.value.optimistic'),
  },
  {
    key: 'pessimistic',
    text: (t) => t('page.transactions.options.prediction.value.pessimistic'),
  },
];

export const TransactionsPageOptionsPrediction: FC = () => {
  const { t } = useTranslation();
  const prediction = useGridOptionsStore((state) => state.prediction);

  return (
    <ListItemSelect
      label={t('page.transactions.options.prediction.label')}
      items={items}
      selected={prediction}
      onSelect={(prediction) => {
        useGridOptionsStore.setState({ prediction });
      }}
    />
  );
};
