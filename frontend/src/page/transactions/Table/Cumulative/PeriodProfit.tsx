import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Transaction } from '../../../../api/backend/types';
import { currencySymbols } from '../../../../common/currency';
import { isGridOutOfTrade } from '../../../../common/grid/trade';
import { getMultiplier } from '../../../../common/multiplier';
import { useGridOptionsStore } from '../../Options/store';
import { useGridList } from '../../useGridList';

export const GridsCumulativePeriodProfit: FC = () => {
  const { t } = useTranslation();
  const mode = useGridOptionsStore((state) => state.mode);
  const prediction = useGridOptionsStore((state) => state.prediction);
  const period = useGridOptionsStore((state) => state.period);
  const { transactions } = useGridList();

  const symbol = currencySymbols[mode];

  const amount = transactions.reduce((acc, x) => acc + x.data.amount, 0);
  const duration =
    transactions.reduce((acc, x) => acc + x.data.duration, 0) /
    transactions.length;
  const multiplier = getMultiplier({ amount, mode, duration, period });

  type GetValue = (transaction: Transaction<'grid'>) => number;
  const toPreview = (getValue: GetValue) => {
    const result = transactions.reduce((acc, x) => acc + getValue(x), 0);
    return `${(result * multiplier).toFixed(2)} ${symbol}`;
  };

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.total')}
        </Typography>
        <Typography variant='body2'>
          {toPreview((x) => x.data.totalProfit)}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.spot')}
        </Typography>
        <Typography variant='body2'>
          {toPreview((x) => x.data.spotProfit)}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.funding')}
        </Typography>
        <Typography variant='body2'>
          {toPreview((x) => x.data.fundingProfit)}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.grid')}
        </Typography>
        <Typography variant='body2'>
          {toPreview((x) => {
            if (prediction === 'pessimistic' && isGridOutOfTrade(x.data)) {
              return 0;
            }
            return x.data.gridProfit;
          })}
        </Typography>
      </Stack>
    </TableCell>
  );
};
