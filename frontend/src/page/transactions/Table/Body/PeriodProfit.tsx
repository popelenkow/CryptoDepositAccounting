import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  GridTransactionData,
  InstrumentInfo,
} from '../../../../api/backend/types';
import { currencySymbols } from '../../../../common/currency';
import { getGridPeriodFunding } from '../../../../common/grid/funding';
import { getGridPeriodSpot } from '../../../../common/grid/spot';
import { getGridPeriodTotal } from '../../../../common/grid/total';
import { getGridPeriodTrades } from '../../../../common/grid/trade';
import { useGridOptionsStore } from '../../Options/store';

export type GridsBodyPeriodProfitProps = {
  transaction: GridTransactionData;
  info: InstrumentInfo;
};
export const GridsBodyPeriodProfit: FC<GridsBodyPeriodProfitProps> = (
  props,
) => {
  const { transaction, info } = props;

  const { t } = useTranslation();
  const mode = useGridOptionsStore((state) => state.mode);
  const prediction = useGridOptionsStore((state) => state.prediction);
  const period = useGridOptionsStore((state) => state.period);

  const symbol = currencySymbols[mode];

  const total = getGridPeriodTotal(transaction, mode, period);
  const spot = getGridPeriodSpot(transaction, info, mode, period, false);
  const funding = getGridPeriodFunding(transaction, mode, period);
  const grid = getGridPeriodTrades(transaction, mode, period, prediction);

  const toPreview = (value: number) => `${value.toFixed(2)} ${symbol}`;

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.total')}
        </Typography>
        <Typography variant='body2'>{toPreview(total)}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.spot')}
        </Typography>
        <Typography variant='body2'>{toPreview(spot)}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.funding')}
        </Typography>
        <Typography variant='body2'>{toPreview(funding)}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.grid')}
        </Typography>
        <Typography variant='body2'>{toPreview(grid)}</Typography>
      </Stack>
    </TableCell>
  );
};
