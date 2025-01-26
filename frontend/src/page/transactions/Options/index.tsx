import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  Collapse,
  Divider,
  lighten,
  List,
  ListItemButton,
  ListItemText,
  Paper,
} from '@mui/material';
import { FC, useState } from 'react';
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
      dense
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
        <ListItemText primary='Filter' />
        {filterOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Divider />
      <Collapse in={filterOpen} timeout='auto' unmountOnExit>
        <List dense component='div' disablePadding>
          <TransactionsPageOptionsStatus />
          <Divider />
          <TransactionsPageOptionsInstruments />
          <Divider />
          <TransactionsPageOptionsSelectType />
          <Divider />
        </List>
      </Collapse>

      <ListItemButton
        onClick={() => setSortOpen(!sortOpen)}
        sx={{
          backgroundColor: (theme) =>
            lighten(theme.palette.background.paper, 0.1),
        }}
      >
        <ListItemText primary='Sort' />
        {sortOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Divider />
      <Collapse in={sortOpen} timeout='auto' unmountOnExit>
        <List dense component='div' disablePadding>
          <TransactionsPageOptionsSortOrder />
          <Divider />
          <TransactionsPageOptionsSortBy />
          <Divider />
        </List>
      </Collapse>

      <ListItemButton
        onClick={() => setDisplayOpen(!displayOpen)}
        sx={{
          backgroundColor: (theme) =>
            lighten(theme.palette.background.paper, 0.1),
        }}
      >
        <ListItemText primary='Display' />
        {displayOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Divider />
      <Collapse in={displayOpen} timeout='auto' unmountOnExit>
        <List dense component='div' disablePadding>
          <TransactionsPageOptionsMode />
          <Divider />
          <TransactionsPageOptionsPeriod />
          <Divider />
          <TransactionsPageOptionsPrediction />
        </List>
      </Collapse>
    </List>
  );
};
