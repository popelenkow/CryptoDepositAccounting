import {
  lighten,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { getTransactionsOptions } from '../../../api/endpoints';
import { customScrollbarSx } from '../../../components/CustomScrollbar';
import { LinearLoader } from '../../../components/LinearLoader';
import { useSortedGridList } from '../useGridList';
import { GridsBodyRow } from './Body/Row';
import { GridsHeadRow } from './Head/Row';
import { GridsHeadAllRow } from './HeadAll/Row';

export const TransactionsPageTable: FC = () => {
  const transactions = useQuery(getTransactionsOptions);
  const list = useSortedGridList();

  return (
    <TableContainer sx={customScrollbarSx}>
      {transactions.isFetching && <LinearLoader />}
      <Table
        stickyHeader
        sx={{
          backgroundColor: (theme) =>
            lighten(theme.palette.background.paper, 0.05),
        }}
      >
        <TableHead
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            '& th': {
              backgroundColor: (theme) =>
                lighten(theme.palette.background.paper, 0.1),
            },
          }}
        >
          <GridsHeadRow />
          {!!list.length && <GridsHeadAllRow />}
        </TableHead>
        <TableBody>
          {list.map((transaction) => (
            <GridsBodyRow key={transaction.id} transaction={transaction} />
          ))}
          {!list.length && (
            <TableRow>
              <TableCell colSpan={100} align='center'>
                Empty list
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
