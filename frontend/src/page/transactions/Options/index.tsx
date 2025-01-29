import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  Collapse,
  lighten,
  List,
  ListItemButton,
  ListItemText,
  Paper,
} from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TransactionsPageOptionsInstruments } from './components/Instruments';
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
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [displayOpen, setDisplayOpen] = useState(false);

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
      <ListItemButton
        onClick={() => setFilterOpen(!filterOpen)}
        sx={{
          backgroundColor: (theme) =>
            lighten(theme.palette.background.paper, 0.1),
        }}
      >
        <ListItemText primary={t('page.transactions.options.title.filter')} />
        {filterOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={filterOpen}>
        <List dense disablePadding>
          <TransactionsPageOptionsStatus />
          <TransactionsPageOptionsInstruments />
          <TransactionsPageOptionsSelectType />
        </List>
      </Collapse>
      <ListItemButton
        onClick={() => setSortOpen(!sortOpen)}
        sx={{
          backgroundColor: (theme) =>
            lighten(theme.palette.background.paper, 0.1),
        }}
      >
        <ListItemText primary={t('page.transactions.options.title.sort')} />
        {sortOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={sortOpen}>
        <List dense disablePadding>
          <TransactionsPageOptionsSortOrder />
          <TransactionsPageOptionsSortBy />
        </List>
      </Collapse>
      <ListItemButton
        onClick={() => setDisplayOpen(!displayOpen)}
        sx={{
          backgroundColor: (theme) =>
            lighten(theme.palette.background.paper, 0.1),
        }}
      >
        <ListItemText primary={t('page.transactions.options.title.display')} />
        {displayOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={displayOpen}>
        <List dense disablePadding>
          <TransactionsPageOptionsMode />
          <TransactionsPageOptionsPeriod />
          <TransactionsPageOptionsPrediction />
        </List>
      </Collapse>
    </List>
  );
};
