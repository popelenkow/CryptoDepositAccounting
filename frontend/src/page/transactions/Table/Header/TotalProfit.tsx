import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { getProfitPercentColor } from '../../../../common/color';
import { currencySymbols } from '../../../../common/currency';
import {
  getGridFunding,
  getGridSpot,
  getGridTotal,
} from '../../../../common/grid/total';
import { getGridTrades } from '../../../../common/grid/trade';
import { useGridOptionsStore } from '../../Options/store';
import { useGridList } from '../../useGridList';
import { sum } from './common';

export const GridsHeadTotalProfit: FC = () => {
  const list = useGridList();
  const mode = useGridOptionsStore((state) => state.mode);

  const symbol = currencySymbols[mode];

  const deposit = list.reduce((acc, x) => acc + x.data.amount, 0);
  const divisorToPercent = deposit / 100;
  const divisor = mode === 'usdt' ? 1 : divisorToPercent;

  const total = sum(list, 'usdt', getGridTotal);
  const spot = sum(list, 'usdt', getGridSpot);
  const funding = sum(list, 'usdt', getGridFunding);
  const grid = sum(list, 'usdt', getGridTrades);

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
