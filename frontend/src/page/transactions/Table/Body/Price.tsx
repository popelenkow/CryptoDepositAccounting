import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { GridTransactionData } from '../../../../api/types';
import { getRangeRatioColor } from '../../../../common/color';
import { currencySymbols } from '../../../../common/currency';
import {
  getExcessRatioPercent,
  getRatioPercent,
} from '../../../../common/ratio';
import { useGridOptionsStore } from '../../Options/store';

export type GridsBodyPriceProps = {
  transaction: GridTransactionData;
};
export const GridsBodyPrice: FC<GridsBodyPriceProps> = (props) => {
  const { transaction } = props;
  const { minPrice, maxPrice, currentPrice, startPrice, endPrice } =
    transaction;

  const mode = useGridOptionsStore((state) => state.mode);
  const currency = currencySymbols[mode];

  const rangePercent = `${getExcessRatioPercent(maxPrice, minPrice).toFixed(2)} ${currencySymbols.percent}`;
  const range = `${minPrice} ${currencySymbols.usdt} - ${maxPrice} ${currencySymbols.usdt}`;

  const startRatioPercent = getRatioPercent(startPrice, maxPrice, minPrice);
  const start = mode === 'usdt' ? startPrice : startRatioPercent.toFixed(2);

  const endRatioPercent = getRatioPercent(endPrice, maxPrice, minPrice);
  const end = mode === 'usdt' ? endPrice : endRatioPercent.toFixed(2);

  const currentRatioPercent = getRatioPercent(currentPrice, maxPrice, minPrice);
  const current =
    mode === 'usdt' ? currentPrice : currentRatioPercent.toFixed(2);

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Range:</Typography>
        <Typography>{range}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Excess ratio:</Typography>
        <Typography>{rangePercent}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Start:</Typography>
        <Typography>{`${start} ${currency}`}</Typography>
      </Stack>
      {transaction.close !== 'pending' && (
        <Stack direction='row' justifyContent='end' gap={1}>
          <Typography>End:</Typography>
          <Typography
            color={getRangeRatioColor(endRatioPercent, startRatioPercent)}
          >{`${end} ${currency}`}</Typography>
        </Stack>
      )}
      {transaction.close === 'pending' && (
        <Stack direction='row' justifyContent='end' gap={1}>
          <Typography>Current:</Typography>
          <Typography
            color={getRangeRatioColor(currentRatioPercent, startRatioPercent)}
          >{`${current} ${currency}`}</Typography>
        </Stack>
      )}
    </TableCell>
  );
};
