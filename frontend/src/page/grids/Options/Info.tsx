import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { GridTransaction } from '../../../api/types';
import { getProfitColor } from '../../../common/color';
import { currencySymbols } from '../../../common/currency';
import {
  getSpotUsdtFromGrid,
  getTotalUsdtFromGrid,
} from '../../../common/grid/total';
import { getGridDailyUsdt, getGridTotalUsdt } from '../../../common/grid/trade';
import { useGridList } from '../useGridList';
import { useGridOptionsStore } from './store';

const sum = (
  list: GridTransaction[],
  toValue: (transaction: GridTransaction) => number,
) => list.reduce((acc, x) => acc + toValue(x), 0);

export const GridsOptionsInfo: FC = () => {
  const list = useGridList();
  const mode = useGridOptionsStore((state) => state.mode);

  const symbol = mode === '$' ? currencySymbols.usdt : currencySymbols.percent;

  const deposit = list.reduce((acc, x) => acc + x.amount, 0);
  const divisorToPercent = deposit / 100;
  const divisor = mode === '$' ? 1 : divisorToPercent;

  const total = sum(list, getTotalUsdtFromGrid);
  const spot = sum(list, getSpotUsdtFromGrid);
  const grid = sum(list, getGridTotalUsdt);
  const daily = sum(list, getGridDailyUsdt);

  return (
    <Stack alignItems='end'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Deposit:</Typography>
        <Typography>
          {deposit.toFixed(2)} {currencySymbols.usdt}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Total:</Typography>
        <Typography color={getProfitColor(total / divisorToPercent)}>
          {(total / divisor).toFixed(2)} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Spot:</Typography>
        <Typography color={getProfitColor(spot / divisorToPercent)}>
          {(spot / divisor).toFixed(2)} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Grid:</Typography>
        <Typography color={getProfitColor(grid / divisorToPercent)}>
          {(grid / divisor).toFixed(2)} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Grid daily:</Typography>
        <Typography>
          {(daily / divisor).toFixed(2)} {symbol}
        </Typography>
      </Stack>
    </Stack>
  );
};
