import { TableRow } from '@mui/material';
import { memo } from 'react';
import { Transaction } from '../../../../api/backend/types';
import { GridsBodyDeposit } from './Deposit';
import { GridsBodyInstrument } from './Instrument';
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
      <GridsBodyInstrument id={id} transaction={data} />
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
