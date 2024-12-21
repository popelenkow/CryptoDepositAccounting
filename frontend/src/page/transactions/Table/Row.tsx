import { TableCell, TableRow } from '@mui/material';
import { memo } from 'react';
import { Transaction } from '../../../api/types';
import { GridsCellDeposit } from './Cell/Deposit';
import { GridsCellGridProfit } from './Cell/GridProfit';
import { GridsCellPrice } from './Cell/Price';
import { GridsCellTime } from './Cell/Time';
import { GridsCellTotalProfit } from './Cell/TotalProfit';

export type TransactionsPageTableRowProps = {
  transaction: Transaction<'grid'>;
};
const TransactionsPageTableRow = (props: TransactionsPageTableRowProps) => {
  const { transaction } = props;
  const { id, data } = transaction;

  return (
    <TableRow key={id}>
      <TableCell align='right'>{id}</TableCell>
      <TableCell align='right'>{data.instrument}</TableCell>
      <GridsCellDeposit transaction={data} />
      <GridsCellPrice transaction={data} />
      <GridsCellTime transaction={data} />
      <GridsCellGridProfit transaction={data} />
      <GridsCellTotalProfit transaction={data} />
    </TableRow>
  );
};

export const MemoizedTransactionsPageTableRow = memo(TransactionsPageTableRow);
export { MemoizedTransactionsPageTableRow as TransactionsPageTableRow };
