import { TableBody, TableCell, TableRow } from '@mui/material';
import { FC } from 'react';
import { useGridOptionsStore } from '../../Options/store';
import { useGridList } from '../../useGridList';
import { GridsBodyRow } from './Row';

export const GridsBody: FC = () => {
  const sort = useGridOptionsStore((options) => options.sort);
  const transactions = useGridList(sort);

  return (
    <TableBody>
      {transactions.map((transaction) => (
        <GridsBodyRow key={transaction.id} transaction={transaction} />
      ))}
      {!transactions.length && (
        <TableRow>
          <TableCell colSpan={100} align='center'>
            Empty list
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};
