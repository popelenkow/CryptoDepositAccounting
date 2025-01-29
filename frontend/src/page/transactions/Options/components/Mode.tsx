import { TFunction } from 'i18next';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IncomeMode } from '../../../../common/grid/trade';
import { ListItemSelect } from '../../../../components/ListItem/Select';
import { useGridOptionsStore } from '../store';

type Item = {
  key: IncomeMode;
  text: (t: TFunction) => string;
};
const items: Item[] = [
  {
    key: 'percent',
    text: (t) => t('page.transactions.options.mode.value.percent'),
  },
  {
    key: 'usdt',
    text: (t) => t('page.transactions.options.mode.value.usdt'),
  },
];

export const TransactionsPageOptionsMode: FC = () => {
  const { t } = useTranslation();
  const mode = useGridOptionsStore((state) => state.mode);

  return (
    <ListItemSelect
      label={t('page.transactions.options.mode.label')}
      items={items}
      selected={mode}
      onSelect={(mode) => {
        useGridOptionsStore.setState({ mode });
      }}
    />
  );
};
