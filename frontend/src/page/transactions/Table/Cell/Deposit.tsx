import { Stack, TableCell, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { getInstrumentInfosOptions } from '../../../../api/endpoints';
import { GridTransactionData } from '../../../../api/types';
import { assertDefined } from '../../../../common/assert';
import { currencySymbols } from '../../../../common/currency';
import { getGridRangePrices } from '../../../../common/grid/ratio';
import { getGridTradeCoin } from '../../../../common/grid/trade';

export type GridsCellDepositProps = {
  transaction: GridTransactionData;
};
export const GridsCellDeposit: FC<GridsCellDepositProps> = (props) => {
  const { transaction } = props;

  const instrumentInfos = useQuery(getInstrumentInfosOptions);

  if (!instrumentInfos.data) {
    return null;
  }

  const instrumentInfo = assertDefined(
    instrumentInfos.data.find((x) => x.instrument === transaction.instrument),
  );

  const coins = getGridTradeCoin(transaction, instrumentInfo).toFixed(2);

  const prices = getGridRangePrices(transaction, instrumentInfo, 'low');
  const orders = transaction.orders
    ?.map((x) => x.price)
    .filter((x) => {
      if (prices.includes(x)) {
        return false;
      }
      return true;
    });
  console.log({ instrumentInfo, transaction, orders, prices });

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Amount:</Typography>
        <Typography>
          {`${transaction.amount.toFixed(2)} ${currencySymbols.usdt}`}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Leverage:</Typography>
        <Typography>x{transaction.leverage}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Grids:</Typography>
        <Typography>{transaction.grids}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Coins:</Typography>
        <Typography>{coins}</Typography>
      </Stack>
    </TableCell>
  );
};
