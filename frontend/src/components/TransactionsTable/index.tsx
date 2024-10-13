import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Transaction } from '../../api/types';
import { routeLinks } from '../../app/router/routes';
import {
  calculateTotalAmounts,
  getChangePercentage,
  getTransactionAmount,
  stringifyAmount,
} from '../../utils/transaction';
import { customScrollbarSx } from '../CustomScrollbar';
import { LinearLoader } from '../LinearLoader';
import { TransactionDurationCell } from './TransactionDurationCell';

export type TransactionsTableProps = {
  list?: Transaction[];
  isFetching: boolean;
  currentPrice: number;
  onRemove: (transactionId: number) => void;
};
export const TransactionsTable: FC<TransactionsTableProps> = (props) => {
  const { list, isFetching, currentPrice, onRemove } = props;
  const theme = useTheme();

  return (
    <TableContainer component={Paper} sx={customScrollbarSx}>
      {isFetching && <LinearLoader />}
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align='right' width='1%'>
              Id
            </TableCell>
            <TableCell align='right'>Type</TableCell>
            <TableCell align='right'>Amount</TableCell>
            <TableCell align='right'>Price</TableCell>
            <TableCell align='right'>Duration</TableCell>
            <TableCell align='right'>Change</TableCell>
            <TableCell align='right' width='1%'>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list?.map((x) => (
            <TableRow key={x.id}>
              <TableCell align='right'>{x.id}</TableCell>
              <TableCell align='right'>
                {x.type} {'method' in x && x.method}
              </TableCell>
              <TableCell align='right'>
                {stringifyAmount(getTransactionAmount(x))}
              </TableCell>
              <TableCell align='right'>{x.price}</TableCell>
              <TableCell align='right'>
                <TransactionDurationCell transaction={x} />
              </TableCell>
              <TableCell align='right'>
                <Stack
                  direction='column'
                  color={
                    x.close !== 'pending'
                      ? theme.palette.text.primary
                      : theme.palette.text.disabled
                  }
                >
                  {calculateTotalAmounts(x, currentPrice).map((amount) => (
                    <Box key={amount.currency}>{stringifyAmount(amount)}</Box>
                  ))}
                  {getChangePercentage(x)}
                </Stack>
              </TableCell>
              <TableCell align='right'>
                <Stack direction='row'>
                  <IconButton
                    component={Link}
                    to={routeLinks.transactionEdit(x.id)}
                  >
                    <AppRegistrationIcon />
                  </IconButton>
                  <IconButton onClick={() => onRemove(x.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
          {!list?.length && (
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
