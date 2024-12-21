import { TableCell, TableRow } from '@mui/material';
import { FC } from 'react';
import { GridsHeadDeposit } from './Header/Deposit';
import { GridsHeadGridProfit } from './Header/GridProfit';
import { GridsHeadTime } from './Header/Time';
import { GridsHeadTotalProfit } from './Header/TotalProfit';

export const TransactionsPageTableAllRow: FC = () => {
  return (
    <TableRow>
      <TableCell align='right' width='1%'>
        All
      </TableCell>
      <TableCell align='right'></TableCell>
      <GridsHeadDeposit />
      <TableCell align='right'></TableCell>
      <GridsHeadTime />
      <GridsHeadGridProfit />
      <GridsHeadTotalProfit />
    </TableRow>
  );
};
