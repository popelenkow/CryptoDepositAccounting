import { Stack } from '@mui/material';
import { FC } from 'react';
import { TransactionsPageOptionsInstruments } from './components/Instruments';
import { TransactionsPageOptionsMode } from './components/Mode';
import { TransactionsPageOptionsPeriod } from './components/Period';
import { TransactionsPageOptionsPrediction } from './components/Prediction';
import { TransactionsPageOptionsSelectType } from './components/SelectType';
import { TransactionsPageOptionsSort } from './components/Sort';
import { TransactionsPageOptionsStatus } from './components/Status';

export const TransactionsPageOptions: FC = () => {
  return (
    <Stack gap={4}>
      <Stack direction='row' gap={4}>
        <TransactionsPageOptionsStatus />
        <TransactionsPageOptionsInstruments />
        <TransactionsPageOptionsSelectType />
        <TransactionsPageOptionsMode />
        <TransactionsPageOptionsPrediction />
        <TransactionsPageOptionsPeriod />
      </Stack>
      <Stack direction='row' gap={4}>
        <TransactionsPageOptionsSort />
      </Stack>
    </Stack>
  );
};
