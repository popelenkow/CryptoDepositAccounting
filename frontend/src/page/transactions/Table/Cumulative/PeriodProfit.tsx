import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { currencySymbols } from '../../../../common/currency';
import { getGridsPeriodFunding } from '../../../../common/grid/funding';
import { getGridsPeriodSpot } from '../../../../common/grid/spot';
import { getGridsPeriodTotal } from '../../../../common/grid/total';
import { getGridsPeriodTrades } from '../../../../common/grid/trade';
import { useGridOptionsStore } from '../../Options/store';
import { useGridList } from '../../useGridList';

export const GridsCumulativePeriodProfit: FC = () => {
  const mode = useGridOptionsStore((state) => state.mode);
  const prediction = useGridOptionsStore((state) => state.prediction);
  const period = useGridOptionsStore((state) => state.period);
  const list = useGridList();

  const symbol =
    mode === 'usdt' ? currencySymbols.usdt : currencySymbols.percent;

  const deposit = list.reduce((acc, x) => acc + x.data.amount, 0);
  const divisorToPercent = deposit / 100;
  const divisor = mode === 'usdt' ? 1 : divisorToPercent;

  const transactions = list.map((x) => x.data);

  const total = getGridsPeriodTotal(transactions, 'usdt', period);
  const spot = getGridsPeriodSpot(transactions, 'usdt', period);
  const funding = getGridsPeriodFunding(transactions, 'usdt', period);
  const grid = getGridsPeriodTrades(transactions, 'usdt', period, prediction);

  const toPreview = (value: number) =>
    `${(value / divisor).toFixed(2)} ${symbol}`;

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>Total:</Typography>
        <Typography variant='body2'>{toPreview(total)}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>Spot:</Typography>
        <Typography variant='body2'>{toPreview(spot)}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>Funding:</Typography>
        <Typography variant='body2'>{toPreview(funding)}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>Grid:</Typography>
        <Typography variant='body2'>{toPreview(grid)}</Typography>
      </Stack>
    </TableCell>
  );
};
