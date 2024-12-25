import { Stack, TableCell, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { getGridTransactionsOptions } from '../../../../api/backend/select/grid';
import { currencySymbols } from '../../../../common/currency';
import { getGridsPeriodFunding } from '../../../../common/grid/funding';
import { getGridsPeriodSpot } from '../../../../common/grid/spot';
import { getGridsPeriodTotal } from '../../../../common/grid/total';
import { getGridsPeriodTrades } from '../../../../common/grid/trade';
import { useGridOptionsStore } from '../../Options/store';

export const GridsHeadAllPeriodProfit: FC = () => {
  const mode = useGridOptionsStore((state) => state.mode);
  const prediction = useGridOptionsStore((state) => state.prediction);
  const period = useGridOptionsStore((state) => state.period);
  const status = useGridOptionsStore((options) => options.status);
  const list = useQuery(getGridTransactionsOptions(status)).data ?? [];

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
        <Typography>Total:</Typography>
        <Typography>{toPreview(total)}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Spot:</Typography>
        <Typography>{toPreview(spot)}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Funding:</Typography>
        <Typography>{toPreview(funding)}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Grid:</Typography>
        <Typography>{toPreview(grid)}</Typography>
      </Stack>
    </TableCell>
  );
};
