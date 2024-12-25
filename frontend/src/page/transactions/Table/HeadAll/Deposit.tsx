import { Stack, TableCell, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { getGridTransactionsOptions } from '../../../../api/backend/select/grid';
import { currencySymbols } from '../../../../common/currency';
import { useGridOptionsStore } from '../../Options/store';

export const GridsHeadAllDeposit: FC = () => {
  const status = useGridOptionsStore((options) => options.status);
  const list = useQuery(getGridTransactionsOptions(status)).data ?? [];

  const deposit = list.reduce((acc, x) => acc + x.data.amount, 0);
  const leverage =
    list.reduce((acc, x) => acc + x.data.leverage, 0) / list.length;

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Amount:</Typography>
        <Typography>
          {deposit.toFixed(2)} {currencySymbols.usdt}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Leverage:</Typography>
        <Typography>{leverage.toFixed(2)}</Typography>
      </Stack>
    </TableCell>
  );
};
