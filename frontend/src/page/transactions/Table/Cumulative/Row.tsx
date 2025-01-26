import { TableCell, TableRow, Typography } from '@mui/material';
import { FC } from 'react';
import { useGridList } from '../../useGridList';
import { GridsCumulativeDeposit } from './Deposit';
import { GridsCumulativePeriodProfit } from './PeriodProfit';
import { GridsCumulativeTime } from './Time';
import { GridsCumulativeTotalProfit } from './TotalProfit';

export const GridsCumulativeRow: FC = () => {
  const transactions = useGridList();

  if (!transactions.length) {
    return null;
  }

  return (
    <TableRow>
      <TableCell align='right' width='1%'>
        <Typography variant='body2'>Cumulative</Typography>
      </TableCell>
      <GridsCumulativeDeposit />
      <TableCell align='right'></TableCell>
      <GridsCumulativeTime />
      <GridsCumulativePeriodProfit />
      <GridsCumulativeTotalProfit />
    </TableRow>
  );
};
