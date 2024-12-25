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
import { getGridTransactionsOptions } from '../../../api/backend/select/grid';
import { customScrollbarSx } from '../../../components/CustomScrollbar';
import { LinearLoader } from '../../../components/LinearLoader';
import { useGridOptionsStore } from '../Options/store';
import { GridsBodyRow } from './Body/Row';
import { GridsHeadRow } from './Head/Row';
import { GridsHeadAllRow } from './HeadAll/Row';

export const TransactionsPageTable: FC = () => {
  const status = useGridOptionsStore((options) => options.status);
  const sort = useGridOptionsStore((options) => options.sort);
  const transactions = useQuery(getGridTransactionsOptions(status, sort));

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
          {!!transactions.data?.length && <GridsHeadAllRow />}
        </TableHead>
        <TableBody>
          {transactions.data?.map((transaction) => (
            <GridsBodyRow key={transaction.id} transaction={transaction} />
          ))}
          {!transactions.data?.length && (
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
