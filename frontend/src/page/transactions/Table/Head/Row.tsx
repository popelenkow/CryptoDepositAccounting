import { TableCell, TableRow } from '@mui/material';
import { FC } from 'react';
import { periodNames } from '../../../../common/period';
import { useGridOptionsStore } from '../../Options/store';

export const GridsHeadRow: FC = () => {
  const period = useGridOptionsStore((state) => state.period);

  return (
    <TableRow>
      <TableCell align='right' width='1%'>
        Instrument
      </TableCell>
      <TableCell align='right'>Deposit</TableCell>
      <TableCell align='right'>Price</TableCell>
      <TableCell align='right'>Time</TableCell>
      <TableCell align='right'>{periodNames[period]} Profit</TableCell>
      <TableCell align='right'>Total Profit</TableCell>
    </TableRow>
  );
};
