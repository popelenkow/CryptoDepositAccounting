import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { GridTransaction } from '../../../api/types';
import { getProfitColor } from '../../../common/color';
import { currencySymbols } from '../../../common/currency';
import {
  getSpotPercentFromGrid,
  getSpotUsdtFromGrid,
  getTotalPercentFromGrid,
  getTotalUsdtFromGrid,
} from '../../../common/grid/total';
import {
  getGridDailyPercent,
  getGridDailyUsdt,
  getGridTotalPercent,
  getGridTotalUsdt,
} from '../../../common/grid/trade';
import { useGridOptionsStore } from '../Options/store';

export type GridsTableTotalProfitProps = {
  transaction: GridTransaction;
};
export const GridsTableTotalProfit: FC<GridsTableTotalProfitProps> = (
  props,
) => {
  const { transaction } = props;

  const mode = useGridOptionsStore((state) => state.mode);
  const symbol = mode === '$' ? currencySymbols.usdt : currencySymbols.percent;

  const totalPercent = getTotalPercentFromGrid(transaction);
  const total =
    mode === '$'
      ? getTotalUsdtFromGrid(transaction).toFixed(2)
      : totalPercent.toFixed(2);

  const spotPercent = getSpotPercentFromGrid(transaction);
  const spot =
    mode === '$'
      ? getSpotUsdtFromGrid(transaction).toFixed(2)
      : spotPercent.toFixed(2);

  const gridPercent = getGridTotalPercent(transaction);
  const grid =
    mode === '$'
      ? getGridTotalUsdt(transaction).toFixed(2)
      : gridPercent.toFixed(2);

  const daily =
    mode === '$'
      ? getGridDailyUsdt(transaction).toFixed(2)
      : getGridDailyPercent(transaction).toFixed(2);

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Total:</Typography>
        <Typography color={getProfitColor(totalPercent)}>
          {total} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Spot:</Typography>
        <Typography color={getProfitColor(spotPercent)}>{spot} {symbol}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Grid:</Typography>
        <Typography color={getProfitColor(gridPercent)}>{grid} {symbol}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Daily:</Typography>
        <Typography>{daily} {symbol}</Typography>
      </Stack>
    </TableCell>
  );
};
