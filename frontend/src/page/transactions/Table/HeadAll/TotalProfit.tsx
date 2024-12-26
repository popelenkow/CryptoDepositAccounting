import { Stack, TableCell, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { getInstrumentInfosOptions } from '../../../../api/backend/endpoints';
import { GridTransactionHistoryOrderPair } from '../../../../api/backend/types';
import { getProfitPercentColor } from '../../../../common/color';
import { currencySymbols } from '../../../../common/currency';
import { getGridsFunding } from '../../../../common/grid/funding';
import { getGridRangePrices } from '../../../../common/grid/ratio';
import { getGridsSpot } from '../../../../common/grid/spot';
import { getGridsTotal } from '../../../../common/grid/total';
import { getGridsTrades } from '../../../../common/grid/trade';
import { commissions } from '../../../../common/transaction';
import { getDecimalPrecision, roundTo } from '../../../../common/value';
import { useGridOptionsStore } from '../../Options/store';
import { useGridList } from '../../useGridList';

export const GridsHeadAllTotalProfit: FC = () => {
  const mode = useGridOptionsStore((state) => state.mode);
  const list = useGridList();
  const infos = useQuery(getInstrumentInfosOptions).data ?? [];

  const f = () => {
    if (infos.length === 0) return;

    const res = list.map((x) => {
      const { instrument } = x.data;
      const historyOrders = x.data.historyOrders?.filter(
        (x) => x.buy && x.sell,
      );
      if (!historyOrders || historyOrders.length === 0) {
        return { instrument };
      }
      const info = infos.find((i) => i.instrument === instrument)!;
      const highPrices = getGridRangePrices(x.data, info, 'high');
      const lowPrices = getGridRangePrices(x.data, info, 'low');
      const quantity = historyOrders[0].buy!.quantity;
      const calcOrders = lowPrices.map(
        (_, index): GridTransactionHistoryOrderPair => {
          const decimals =
            6 +
            getDecimalPrecision(info.priceStep) +
            getDecimalPrecision(info.quantityStep);
          const commission = commissions.limit;

          const buyPrice = lowPrices[index];
          const buyCost = quantity * buyPrice;
          const buyFee = roundTo(commission * buyCost, decimals);

          const sellPrice = highPrices[index];
          const sellCost = quantity * sellPrice;
          const sellFee = roundTo(commission * sellCost, decimals);

          return {
            calc: true,
            profit: 0,
            buy: {
              fee: buyFee,
              price: buyPrice,
              quantity,
            },
            sell: {
              fee: sellFee,
              price: sellPrice,
              quantity,
            },
          };
        },
      );
      const arr = [...historyOrders, ...calcOrders];
      const ord = Object.groupBy(arr, (x) => x.buy!.price);
      return { instrument, ord };
    });
    console.log(res);
  };
  f();

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
        <Typography>Total:</Typography>
        <Typography color={getProfitPercentColor(total / divisorToPercent)}>
          {(total / divisor).toFixed(2)} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Spot:</Typography>
        <Typography color={getProfitPercentColor(spot / divisorToPercent)}>
          {(spot / divisor).toFixed(2)} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Funding:</Typography>
        <Typography color={getProfitPercentColor(funding / divisorToPercent)}>
          {(funding / divisor).toFixed(2)} {symbol}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Grid:</Typography>
        <Typography color={getProfitPercentColor(grid / divisorToPercent)}>
          {(grid / divisor).toFixed(2)} {symbol}
        </Typography>
      </Stack>
    </TableCell>
  );
};
