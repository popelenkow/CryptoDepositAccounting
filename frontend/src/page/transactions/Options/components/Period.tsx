import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IncomePeriod, periodNames } from '../../../../common/period';
import { Item } from '../../../../components/ListItem/common';
import { ListItemSelect } from '../../../../components/ListItem/Select';
import { useGridOptionsStore } from '../store';

const items: Item<IncomePeriod>[] = [
  {
    key: 'daily',
    text: periodNames.daily,
  },
  {
    key: 'weekly',
    text: periodNames.weekly,
  },
  {
    key: 'monthly',
    text: periodNames.monthly,
  },
  {
    key: 'yearly',
    text: periodNames.yearly,
  },
];

export const TransactionsPageOptionsPeriod: FC = () => {
  const { t } = useTranslation();
  const period = useGridOptionsStore((state) => state.period);

  return (
    <ListItemSelect
      label={t('page.transactions.options.period.label')}
      items={items}
      selected={period}
      onSelect={(period) => {
        useGridOptionsStore.setState({ period });
      }}
    />
  );
};
