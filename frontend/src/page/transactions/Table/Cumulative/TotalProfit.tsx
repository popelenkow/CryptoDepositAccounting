import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { getProfitPercentColor } from '../../../../common/color';
import { currencySymbols } from '../../../../common/currency';
import { getGridsFunding } from '../../../../common/grid/funding';
import { getGridsSpot } from '../../../../common/grid/spot';
import { getGridsTotal } from '../../../../common/grid/total';
import { getGridsTrades } from '../../../../common/grid/trade';
import { useGridOptionsStore } from '../../Options/store';
import { useGridList } from '../../useGridList';

export const GridsCumulativeTotalProfit: FC = () => {
  const { t } = useTranslation();
  const mode = useGridOptionsStore((state) => state.mode);
  const list = useGridList();

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
        <Typography variant='body2'>
          {t('page.transactions.table.body.total')}
        </Typography>
        <Typography
          variant='body2'
          color={getProfitPercentColor(total / divisorToPercent)}
        >
          {(total / divisor).toFixed(2)} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.spot')}
        </Typography>
        <Typography
          variant='body2'
          color={getProfitPercentColor(spot / divisorToPercent)}
        >
          {(spot / divisor).toFixed(2)} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.funding')}
        </Typography>
        <Typography
          variant='body2'
          color={getProfitPercentColor(funding / divisorToPercent)}
        >
          {(funding / divisor).toFixed(2)} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.grid')}
        </Typography>
        <Typography
          variant='body2'
          color={getProfitPercentColor(grid / divisorToPercent)}
        >
          {(grid / divisor).toFixed(2)} {symbol}
        </Typography>
      </Stack>
    </TableCell>
  );
};
