import { Stack } from '@mui/material';
import { FC } from 'react';
import { TransactionsPageOptionsMode } from './components/Mode';
import { TransactionsPageOptionsPeriod } from './components/Period';
import { TransactionsPageOptionsPrediction } from './components/Prediction';
import { TransactionsPageOptionsSortOrder } from './components/SortOrder';
import { TransactionsPageOptionsSortType } from './components/SortType';
import { TransactionsPageOptionsStatus } from './components/Status';

export const TransactionsPageOptions: FC = () => {
  return (
    <Stack gap={4}>
      <Stack direction='row' gap={4}>
        <TransactionsPageOptionsStatus />
        <TransactionsPageOptionsMode />
        <TransactionsPageOptionsPrediction />
        <TransactionsPageOptionsPeriod />
      </Stack>
      <Stack direction='row' gap={4}>
        <TransactionsPageOptionsSortOrder />
        <TransactionsPageOptionsSortType />
      </Stack>
    </Stack>
  );
};
