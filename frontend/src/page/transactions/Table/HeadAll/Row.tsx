import { TableCell, TableRow } from '@mui/material';
import { FC } from 'react';
import { useGridList } from '../../useGridList';
import { GridsHeadAllDeposit } from './Deposit';
import { GridsHeadAllPeriodProfit } from './PeriodProfit';
import { GridsHeadAllTime } from './Time';
import { GridsHeadAllTotalProfit } from './TotalProfit';

export const GridsHeadAllRow: FC = () => {
  const transactions = useGridList();

  if (!transactions.length) {
    return null;
  }

  return (
    <TableRow>
      <TableCell align='right' width='1%'>
        All
      </TableCell>
      <TableCell align='right'></TableCell>
      <GridsHeadAllDeposit />
      <TableCell align='right'></TableCell>
      <GridsHeadAllTime />
      <GridsHeadAllPeriodProfit />
      <GridsHeadAllTotalProfit />
    </TableRow>
  );
};
