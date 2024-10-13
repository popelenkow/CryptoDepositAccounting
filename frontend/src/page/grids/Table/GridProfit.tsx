import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { GridTransaction } from '../../../api/types';
import { getProfitColor } from '../../../common/color';
import { currencySymbols } from '../../../common/currency';
import {
  getGridAprPercent,
  getGridAprUsdt,
  getGridTotalPercent,
  getGridTotalUsdt,
  getGridTradeCoin,
  getGridTradePercent,
  getGridTradeProfit,
} from '../../../common/grid/trade';
import { useGridOptionsStore } from '../Options/store';

export type GridsTableGridProfitProps = {
  transaction: GridTransaction;
};
export const GridsTableGridProfit: FC<GridsTableGridProfitProps> = (props) => {
  const { transaction } = props;

  const mode = useGridOptionsStore((state) => state.mode);
  const symbol = mode === '$' ? currencySymbols.usdt : currencySymbols.percent;

  const totalPercent = getGridTotalPercent(transaction);
  const total =
    mode === '$'
      ? getGridTotalUsdt(transaction).toFixed(2)
      : totalPercent.toFixed(2);

  const tradePercent = getGridTradePercent(transaction);
  const trade =
    mode === '$'
      ? getGridTradeProfit(transaction).toFixed(4)
      : tradePercent.toFixed(4);

  const apr =
    mode === '$'
      ? getGridAprUsdt(transaction).toFixed(0)
      : getGridAprPercent(transaction).toFixed(0);

  const coins = getGridTradeCoin(transaction).toFixed(2);

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Total:</Typography>
        <Typography color={getProfitColor(totalPercent)}>
          {total} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>APR:</Typography>
        <Typography>
          {apr} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Trades:</Typography>
        <Typography>
          {transaction.trades} x {trade} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Coins:</Typography>
        <Typography>{coins}</Typography>
      </Stack>
    </TableCell>
  );
};
