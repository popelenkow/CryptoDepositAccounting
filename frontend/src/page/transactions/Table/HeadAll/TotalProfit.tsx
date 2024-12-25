import { Stack, TableCell, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { getGridTransactionsOptions } from '../../../../api/backend/select/grid';
import { getProfitPercentColor } from '../../../../common/color';
import { currencySymbols } from '../../../../common/currency';
import { getGridsFunding } from '../../../../common/grid/funding';
import { getGridsSpot } from '../../../../common/grid/spot';
import { getGridsTotal } from '../../../../common/grid/total';
import { getGridsTrades } from '../../../../common/grid/trade';
import { useGridOptionsStore } from '../../Options/store';

export const GridsHeadAllTotalProfit: FC = () => {
  const mode = useGridOptionsStore((state) => state.mode);
  const status = useGridOptionsStore((options) => options.status);
  const list = useQuery(getGridTransactionsOptions(status)).data ?? [];

  const symbol = currencySymbols[mode];

  const deposit = list.reduce((acc, x) => acc + x.data.amount, 0);
  const divisorToPercent = deposit / 100;
  const divisor = mode === 'usdt' ? 1 : divisorToPercent;

  const transactions = list.map((x) => x.data);

  const total = getGridsTotal(transactions, 'usdt');
  const spot = getGridsSpot(transactions, 'usdt');
  const funding = getGridsFunding(transactions, 'usdt');
  const grid = getGridsTrades(transactions, 'usdt');

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Total:</Typography>
        <Typography color={getProfitPercentColor(total / divisorToPercent)}>
          {(total / divisor).toFixed(2)} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Spot:</Typography>
        <Typography color={getProfitPercentColor(spot / divisorToPercent)}>
          {(spot / divisor).toFixed(2)} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Funding:</Typography>
        <Typography color={getProfitPercentColor(funding / divisorToPercent)}>
          {(funding / divisor).toFixed(2)} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Grid:</Typography>
        <Typography color={getProfitPercentColor(grid / divisorToPercent)}>
          {(grid / divisor).toFixed(2)} {symbol}
        </Typography>
      </Stack>
    </TableCell>
  );
};
