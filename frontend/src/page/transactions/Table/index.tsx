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
import { useGridList } from '../useGridList';
import { GridsCellDeposit } from './Cell/Deposit';
import { GridsCellGridProfit } from './Cell/GridProfit';
import { GridsCellPrice } from './Cell/Price';
import { GridsCellTime } from './Cell/Time';
import { GridsCellTotalProfit } from './Cell/TotalProfit';
import { GridsHeadDeposit } from './Header/Deposit';
import { GridsHeadGridProfit } from './Header/GridProfit';
import { GridsHeadTime } from './Header/Time';
import { GridsHeadTotalProfit } from './Header/TotalProfit';

export const TransactionsPageTable: FC = () => {
  const transactions = useQuery(getTransactionsOptions);
  const list = useGridList();

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
          <TableRow>
            <TableCell align='right' width='1%'>
              Id
            </TableCell>
            <TableCell align='right'>Instrument</TableCell>
            <TableCell align='right'>Deposit</TableCell>
            <TableCell align='right'>Price</TableCell>
            <TableCell align='right'>Time</TableCell>
            <TableCell align='right'>Grid Profit</TableCell>
            <TableCell align='right'>Total Profit</TableCell>
          </TableRow>
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
        </TableHead>
        <TableBody>
          {list.map(({ id, data }) => (
            <TableRow key={id}>
              <TableCell align='right'>{id}</TableCell>
              <TableCell align='right'>{data.instrument}</TableCell>
              <GridsCellDeposit transaction={data} />
              <GridsCellPrice transaction={data} />
              <GridsCellTime transaction={data} />
              <GridsCellGridProfit transaction={data} />
              <GridsCellTotalProfit transaction={data} />
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
