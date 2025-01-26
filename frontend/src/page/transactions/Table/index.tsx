import { lighten, Table, TableContainer, TableHead } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { getGridTransactionsOptions } from '../../../api/backend/select/grid';
import { LinearLoader } from '../../../components/LinearLoader';
import { GridsBody } from './Body';
import { GridsCumulativeRow } from './Cumulative/Row';
import { GridsHeadRow } from './Head/Row';

export const TransactionsPageTable: FC = () => {
  const transactions = useQuery(getGridTransactionsOptions());

  return (
    <TableContainer>
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
          <GridsCumulativeRow />
        </TableHead>
        <GridsBody />
      </Table>
    </TableContainer>
  );
};
