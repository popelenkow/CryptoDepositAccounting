import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { getProfitPercentColor } from '../../../../common/color';
import { currencySymbols } from '../../../../common/currency';
import {
  getGridTrades,
  getGridPeriodIncome,
  periodNames,
} from '../../../../common/grid/trade';
import { useGridOptionsStore } from '../../Options/store';
import { useGridList } from '../../useGridList';
import { sum } from './common';

export const GridsHeadGridProfit: FC = () => {
  const list = useGridList();
  const mode = useGridOptionsStore((state) => state.mode);
  const period = useGridOptionsStore((state) => state.period);

  const symbol =
    mode === 'usdt' ? currencySymbols.usdt : currencySymbols.percent;

  const deposit = list.reduce((acc, x) => acc + x.data.amount, 0);
  const divisorToPercent = deposit / 100;
  const divisor = mode === 'usdt' ? 1 : divisorToPercent;

  const grid = sum(list, 'usdt', getGridTrades);
  const periodIncome = sum(list, 'usdt', (x, mode) =>
    getGridPeriodIncome(x, mode, period),
  );

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Total:</Typography>
        <Typography color={getProfitPercentColor(grid / divisorToPercent)}>
          {(grid / divisor).toFixed(2)} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>{periodNames[period]}</Typography>
        <Typography>
          {(periodIncome / divisor).toFixed(2)} {symbol}
        </Typography>
      </Stack>
    </TableCell>
  );
};
