import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  GridTransactionData,
  InstrumentInfo,
} from '../../../../api/backend/types';
import { getProfitPercentColor } from '../../../../common/color';
import { currencySymbols } from '../../../../common/currency';
import { getGridFunding } from '../../../../common/grid/funding';
import { getGridSpot } from '../../../../common/grid/spot';
import { getGridTotal } from '../../../../common/grid/total';
import { getGridTrades } from '../../../../common/grid/trade';
import { useGridOptionsStore } from '../../Options/store';

export type GridsBodyTotalProfitProps = {
  transaction: GridTransactionData;
  info: InstrumentInfo;
};
export const GridsBodyTotalProfit: FC<GridsBodyTotalProfitProps> = (props) => {
  const { transaction, info } = props;

  const { t } = useTranslation();

  const mode = useGridOptionsStore((state) => state.mode);
  const symbol = currencySymbols[mode];

  const totalPercent = getGridTotal(transaction, 'percent');
  const total = getGridTotal(transaction, mode).toFixed(2);

  const spotPercent = getGridSpot(transaction, info, 'percent', false);
  const spot = getGridSpot(transaction, info, mode, false).toFixed(2);

  const fundingPercent = getGridFunding(transaction, 'percent');
  const funding = getGridFunding(transaction, mode).toFixed(2);

  const gridPercent = getGridTrades(transaction, 'percent');
  const grid = getGridTrades(transaction, mode).toFixed(2);

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.total')}
        </Typography>
        <Typography variant='body2' color={getProfitPercentColor(totalPercent)}>
          {total} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.spot')}
        </Typography>
        <Typography variant='body2' color={getProfitPercentColor(spotPercent)}>
          {spot} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.funding')}
        </Typography>
        <Typography
          variant='body2'
          color={getProfitPercentColor(fundingPercent)}
        >
          {funding} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.grid')}
        </Typography>
        <Typography variant='body2' color={getProfitPercentColor(gridPercent)}>
          {grid} {symbol}
        </Typography>
      </Stack>
    </TableCell>
  );
};
