import { Stack } from '@mui/material';
import { FC } from 'react';
import { TransactionsPageOptions } from './Options';
import { TransactionsPageTable } from './Table';
import { TransactionsPageTitle } from './Title';

export const TransactionsPage: FC = () => {
  return (
    <Stack direction='column' padding={4} gap={4} width='100%' height='100dvh'>
      <TransactionsPageTitle />
      <Stack
        direction='row'
        gap={2}
        overflow='hidden'
        sx={{ '& > :nth-of-type(2)': { width: '240px' } }}
      >
        <TransactionsPageTable />
        <TransactionsPageOptions />
      </Stack>
    </Stack>
  );
};
