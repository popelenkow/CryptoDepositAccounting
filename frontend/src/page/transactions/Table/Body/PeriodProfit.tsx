import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { GridTransactionData } from '../../../../api/backend/types';
import { currencySymbols } from '../../../../common/currency';
import { getGridPeriodFunding } from '../../../../common/grid/funding';
import { getGridPeriodSpot } from '../../../../common/grid/spot';
import { getGridPeriodTotal } from '../../../../common/grid/total';
import { getGridPeriodTrades } from '../../../../common/grid/trade';
import { useGridOptionsStore } from '../../Options/store';

export type GridsBodyPeriodProfitProps = {
  transaction: GridTransactionData;
};
export const GridsBodyPeriodProfit: FC<GridsBodyPeriodProfitProps> = (
  props,
) => {
  const { transaction } = props;

  const mode = useGridOptionsStore((state) => state.mode);
  const prediction = useGridOptionsStore((state) => state.prediction);
  const period = useGridOptionsStore((state) => state.period);

  const symbol = currencySymbols[mode];

  const total = getGridPeriodTotal(transaction, mode, period);
  const spot = getGridPeriodSpot(transaction, mode, period);
  const funding = getGridPeriodFunding(transaction, mode, period);
  const grid = getGridPeriodTrades(transaction, mode, period, prediction);

  const toPreview = (value: number) => `${value.toFixed(2)} ${symbol}`;

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
