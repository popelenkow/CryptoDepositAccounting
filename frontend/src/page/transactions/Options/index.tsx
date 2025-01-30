import { List, Paper } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TransactionsPageOptionsInstruments } from './components/Instruments';
import { ListItemCategory } from './components/ListItemCategory';
import { TransactionsPageOptionsMode } from './components/Mode';
import { TransactionsPageOptionsPeriod } from './components/Period';
import { TransactionsPageOptionsPrediction } from './components/Prediction';
import { TransactionsPageOptionsSelectType } from './components/SelectType';
import { TransactionsPageOptionsSortBy } from './components/SortBy';
import { TransactionsPageOptionsSortOrder } from './components/SortOrder';
import { TransactionsPageOptionsStatus } from './components/Status';
import { useGridOptionsStore } from './store';

export const TransactionsPageOptions: FC = () => {
  const { t } = useTranslation();
  const open = useGridOptionsStore((state) => state.open);

  if (!open) {
    return null;
  }

  return (
    <List
      component={Paper}
      elevation={1}
      sx={{
        padding: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <ListItemCategory label={t('page.transactions.options.title.filter')}>
        <TransactionsPageOptionsStatus />
        <TransactionsPageOptionsInstruments />
        <TransactionsPageOptionsSelectType />
      </ListItemCategory>
      <ListItemCategory label={t('page.transactions.options.title.sort')}>
        <TransactionsPageOptionsSortOrder />
        <TransactionsPageOptionsSortBy />
      </ListItemCategory>
      <ListItemCategory label={t('page.transactions.options.title.display')}>
        <TransactionsPageOptionsMode />
        <TransactionsPageOptionsPeriod />
        <TransactionsPageOptionsPrediction />
      </ListItemCategory>
    </List>
  );
};
