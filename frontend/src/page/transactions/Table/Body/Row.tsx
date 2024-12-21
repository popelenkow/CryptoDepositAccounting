import { TableCell, TableRow } from '@mui/material';
import { memo } from 'react';
import { Transaction } from '../../../../api/types';
import { GridsBodyDeposit } from './Deposit';
import { GridsBodyPeriodProfit } from './PeriodProfit';
import { GridsBodyPrice } from './Price';
import { GridsBodyTime } from './Time';
import { GridsBodyTotalProfit } from './TotalProfit';

export type GridsBodyRowProps = {
  transaction: Transaction<'grid'>;
};
const GridsBodyRow = (props: GridsBodyRowProps) => {
  const { transaction } = props;
  const { id, data } = transaction;

  return (
    <TableRow key={id}>
      <TableCell align='right'>{id}</TableCell>
      <TableCell align='right'>{data.instrument}</TableCell>
      <GridsBodyDeposit transaction={data} />
      <GridsBodyPrice transaction={data} />
      <GridsBodyTime transaction={data} />
      <GridsBodyPeriodProfit transaction={data} />
      <GridsBodyTotalProfit transaction={data} />
    </TableRow>
  );
};

export const MemoizedGridsBodyRow = memo(GridsBodyRow);
export { MemoizedGridsBodyRow as GridsBodyRow };
