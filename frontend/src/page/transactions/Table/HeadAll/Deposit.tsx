import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { currencySymbols } from '../../../../common/currency';
import { useGridList } from '../../useGridList';

export const GridsHeadAllDeposit: FC = () => {
  const list = useGridList();

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
