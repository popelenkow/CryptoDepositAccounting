import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { GridTransactionData } from '../../../../api/types';
import { getProfitPercentColor } from '../../../../common/color';
import { currencySymbols } from '../../../../common/currency';
import {
  getGridPeriodIncome,
  getGridTrade,
  getGridTrades,
  periodNames,
} from '../../../../common/grid/trade';
import { useGridOptionsStore } from '../../Options/store';

export type GridsCellGridProfitProps = {
  transaction: GridTransactionData;
};
export const GridsCellGridProfit: FC<GridsCellGridProfitProps> = (props) => {
  const { transaction } = props;

  const mode = useGridOptionsStore((state) => state.mode);
  const period = useGridOptionsStore((state) => state.period);

  const symbol = currencySymbols[mode];

  const totalPercent = getGridTrades(transaction, 'percent');
  const total = getGridTrades(transaction, mode).toFixed(2);

  const trade = getGridTrade(transaction, mode).toFixed(4);

  const periodIncome = getGridPeriodIncome(transaction, mode, period).toFixed(
    2,
  );

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Total:</Typography>
        <Typography color={getProfitPercentColor(totalPercent)}>
          {total} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>{periodNames[period]}:</Typography>
        <Typography>
          {periodIncome} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Trades:</Typography>
        <Typography>
          {transaction.trades} x {trade} {symbol}
        </Typography>
      </Stack>
    </TableCell>
  );
};
