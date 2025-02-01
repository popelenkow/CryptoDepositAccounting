import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Transaction } from '../../../../api/backend/types';
import { getProfitPercentColor } from '../../../../common/color';
import { currencySymbols } from '../../../../common/currency';
import { getMultiplier } from '../../../../common/multiplier';
import { useGridOptionsStore } from '../../Options/store';
import { useGridList } from '../../useGridList';

export const GridsCumulativeTotalProfit: FC = () => {
  const { t } = useTranslation();
  const mode = useGridOptionsStore((state) => state.mode);
  const { transactions } = useGridList();

  const symbol = currencySymbols[mode];

  const amount = transactions.reduce((acc, x) => acc + x.data.amount, 0);

  const multiplier = getMultiplier({ amount, mode });
  const percentMultiplier = getMultiplier({ amount, mode: 'percent' });

  type GetValue = (transaction: Transaction<'grid'>) => number;
  const toPreview = (getValue: GetValue) => {
    const result = transactions.reduce((acc, x) => acc + getValue(x), 0);
    return `${(result * multiplier).toFixed(2)} ${symbol}`;
  };
  const toColor = (getValue: GetValue) => {
    const result = transactions.reduce((acc, x) => acc + getValue(x), 0);
    return getProfitPercentColor(result * percentMultiplier);
  };

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.total')}
        </Typography>
        <Typography variant='body2' color={toColor((x) => x.data.totalProfit)}>
          {toPreview((x) => x.data.totalProfit)}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.spot')}
        </Typography>
        <Typography variant='body2' color={toColor((x) => x.data.spotProfit)}>
          {toPreview((x) => x.data.spotProfit)}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.funding')}
        </Typography>
        <Typography
          variant='body2'
          color={toColor((x) => x.data.fundingProfit)}
        >
          {toPreview((x) => x.data.fundingProfit)}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.grid')}
        </Typography>
        <Typography variant='body2' color={toColor((x) => x.data.gridProfit)}>
          {toPreview((x) => x.data.gridProfit)}
        </Typography>
      </Stack>
    </TableCell>
  );
};
