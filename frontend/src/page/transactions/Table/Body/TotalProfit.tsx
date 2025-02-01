import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { GridTransactionData } from '../../../../api/backend/types';
import { getProfitPercentColor } from '../../../../common/color';
import { currencySymbols } from '../../../../common/currency';
import { getMultiplier } from '../../../../common/multiplier';
import { useGridOptionsStore } from '../../Options/store';

export type GridsBodyTotalProfitProps = {
  transaction: GridTransactionData;
};
export const GridsBodyTotalProfit: FC<GridsBodyTotalProfitProps> = (props) => {
  const { transaction } = props;
  const {
    totalProfit,
    spotProfit,
    fundingProfit,
    gridProfit,
    amount,
    profitStatus,
  } = transaction;

  const { t } = useTranslation();

  const mode = useGridOptionsStore((state) => state.mode);
  const symbol = currencySymbols[mode];

  const multiplier = getMultiplier({ amount, mode });
  const percentMultiplier = getMultiplier({ amount, mode: 'percent' });

  const toPreview = (value: number) =>
    `${(value * multiplier).toFixed(2)} ${symbol}`;
  const toColor = (value: number) =>
    getProfitPercentColor(value * percentMultiplier);

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.total')}
        </Typography>
        <Typography variant='body2' color={toColor(totalProfit)}>
          {toPreview(totalProfit)}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography
          variant='body2'
          color={profitStatus !== 'done' ? 'red.main' : undefined}
        >
          {t('page.transactions.table.body.spot')}
        </Typography>
        <Typography variant='body2' color={toColor(spotProfit)}>
          {toPreview(spotProfit)}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.funding')}
        </Typography>
        <Typography variant='body2' color={toColor(fundingProfit)}>
          {toPreview(fundingProfit)}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.grid')}
        </Typography>
        <Typography variant='body2' color={toColor(gridProfit)}>
          {toPreview(gridProfit)}
        </Typography>
      </Stack>
    </TableCell>
  );
};
