import { TableRow } from '@mui/material';
import { memo } from 'react';
import { InstrumentInfo, Transaction } from '../../../../api/backend/types';
import { GridsBodyDeposit } from './Deposit';
import { GridsBodyInstrument } from './Instrument';
import { GridsBodyPeriodProfit } from './PeriodProfit';
import { GridsBodyPrice } from './Price';
import { GridsBodyTime } from './Time';
import { GridsBodyTotalProfit } from './TotalProfit';

export type GridsBodyRowProps = {
  transaction: Transaction<'grid'>;
  info: InstrumentInfo;
};
const GridsBodyRow = (props: GridsBodyRowProps) => {
  const { transaction, info } = props;
  const { id, data } = transaction;

  return (
    <TableRow key={id}>
      <GridsBodyInstrument id={id} transaction={data} />
      <GridsBodyDeposit transaction={data} />
      <GridsBodyPrice transaction={data} />
      <GridsBodyTime transaction={data} />
      <GridsBodyPeriodProfit transaction={data} info={info} />
      <GridsBodyTotalProfit transaction={data} info={info} />
    </TableRow>
  );
};

export const MemoizedGridsBodyRow = memo(GridsBodyRow);
export { MemoizedGridsBodyRow as GridsBodyRow };
