import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { GridTransactionData } from '../../../../api/types';
import { getProfitPercentColor } from '../../../../common/color';
import { currencySymbols } from '../../../../common/currency';
import { getGridFunding } from '../../../../common/grid/funding';
import { getGridSpot } from '../../../../common/grid/spot';
import { getGridTotal } from '../../../../common/grid/total';
import { getGridTrades } from '../../../../common/grid/trade';
import { useGridOptionsStore } from '../../Options/store';

export type GridsBodyTotalProfitProps = {
  transaction: GridTransactionData;
};
export const GridsBodyTotalProfit: FC<GridsBodyTotalProfitProps> = (props) => {
  const { transaction } = props;

  const mode = useGridOptionsStore((state) => state.mode);
  const symbol = currencySymbols[mode];

  const totalPercent = getGridTotal(transaction, 'percent');
  const total = getGridTotal(transaction, mode).toFixed(2);

  const spotPercent = getGridSpot(transaction, 'percent');
  const spot = getGridSpot(transaction, mode).toFixed(2);

  const fundingPercent = getGridFunding(transaction, 'percent');
  const funding = getGridFunding(transaction, mode).toFixed(2);

  const gridPercent = getGridTrades(transaction, 'percent');
  const grid = getGridTrades(transaction, mode).toFixed(2);

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Total:</Typography>
        <Typography color={getProfitPercentColor(totalPercent)}>
          {total} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Spot:</Typography>
        <Typography color={getProfitPercentColor(spotPercent)}>
          {spot} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Funding:</Typography>
        <Typography color={getProfitPercentColor(fundingPercent)}>
          {funding} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Grid:</Typography>
        <Typography color={getProfitPercentColor(gridPercent)}>
          {grid} {symbol}
        </Typography>
      </Stack>
    </TableCell>
  );
};
