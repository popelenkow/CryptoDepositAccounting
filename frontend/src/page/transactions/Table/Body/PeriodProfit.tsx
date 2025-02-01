import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { GridTransactionData } from '../../../../api/backend/types';
import { currencySymbols } from '../../../../common/currency';
import { isGridOutOfTrade } from '../../../../common/grid/trade';
import { getMultiplier } from '../../../../common/multiplier';
import { useGridOptionsStore } from '../../Options/store';

export type GridsBodyPeriodProfitProps = {
  transaction: GridTransactionData;
};
export const GridsBodyPeriodProfit: FC<GridsBodyPeriodProfitProps> = (
  props,
) => {
  const { transaction } = props;
  const {
    totalProfit,
    spotProfit,
    fundingProfit,
    gridProfit,
    duration,
    amount,
    profitStatus,
  } = transaction;

  const { t } = useTranslation();
  const mode = useGridOptionsStore((state) => state.mode);
  const prediction = useGridOptionsStore((state) => state.prediction);
  const period = useGridOptionsStore((state) => state.period);

  const symbol = currencySymbols[mode];

  const multiplier = getMultiplier({ amount, mode, duration, period });
  const zeroGrid =
    prediction === 'pessimistic' && isGridOutOfTrade(transaction);

  const toPreview = (value: number) =>
    `${(value * multiplier).toFixed(2)} ${symbol}`;

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.total')}
        </Typography>
        <Typography variant='body2'>{toPreview(totalProfit)}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography
          variant='body2'
          color={profitStatus !== 'done' ? 'red.main' : undefined}
        >
          {t('page.transactions.table.body.spot')}
        </Typography>
        <Typography variant='body2'>{toPreview(spotProfit)}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.funding')}
        </Typography>
        <Typography variant='body2'>{toPreview(fundingProfit)}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.grid')}
        </Typography>
        <Typography variant='body2'>
          {toPreview(zeroGrid ? 0 : gridProfit)}
        </Typography>
      </Stack>
    </TableCell>
  );
};
