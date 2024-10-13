import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { getTransactionsOptions } from '../../../api/options';
import { mapSecondsToDays } from '../../../common/time';
import { customScrollbarSx } from '../../../components/CustomScrollbar';
import { LinearLoader } from '../../../components/LinearLoader';
import {
  getTransactionAmount,
  stringifyAmount,
} from '../../../utils/transaction';
import { useGridList } from '../useGridList';
import { GridsTableGridProfit } from './GridProfit';
import { GridsTablePrice } from './Price';
import { GridsTableTotalProfit } from './TotalProfit';

export const GridsTable: FC = () => {
  const transactions = useQuery(getTransactionsOptions);
  const list = useGridList();

  return (
    <TableContainer component={Paper} sx={customScrollbarSx}>
      {transactions.isFetching && <LinearLoader />}
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align='right' width='1%'>
              Id
            </TableCell>
            <TableCell align='right'>Symbol</TableCell>
            <TableCell align='right'>Amount</TableCell>
            <TableCell align='right'>Price</TableCell>
            <TableCell align='right'>Duration</TableCell>
            <TableCell align='right'>Grid Profit</TableCell>
            <TableCell align='right'>Total Profit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((x) => (
            <TableRow key={x.id}>
              <TableCell align='right'>{x.id}</TableCell>
              <TableCell align='right'>{x.symbol}</TableCell>
              <TableCell align='right'>
                <Box>{stringifyAmount(getTransactionAmount(x))}</Box>
                <Box>x{x.leverage}</Box>
              </TableCell>
              <GridsTablePrice transaction={x} />
              <TableCell align='right'>
                {mapSecondsToDays(x.duration).toFixed(2)}
              </TableCell>
              <GridsTableGridProfit transaction={x} />
              <GridsTableTotalProfit transaction={x} />
            </TableRow>
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
