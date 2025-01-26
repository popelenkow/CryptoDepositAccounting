import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { GridTransactionData } from '../../../../api/backend/types';
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
        <Typography variant='body2'>Max:</Typography>
        <Typography variant='body2'>{`${maxPrice} ${currencySymbols.usdt}`}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>Min:</Typography>
        <Typography variant='body2'>{`${minPrice} ${currencySymbols.usdt}`}</Typography>
      </Stack>
      {transaction.close === 'pending' && (
        <Stack direction='row' justifyContent='end' gap={1}>
          <Typography variant='body2'>Current:</Typography>
          <Typography
            variant='body2'
            color={getRangeRatioColor(currentRatioPercent, startRatioPercent)}
          >
            {`${current} ${currency}`}
          </Typography>
        </Stack>
      )}
      {transaction.close !== 'pending' && (
        <Stack direction='row' justifyContent='end' gap={1}>
          <Typography variant='body2'>End:</Typography>
          <Typography
            variant='body2'
            color={getRangeRatioColor(endRatioPercent, startRatioPercent)}
          >
            {`${end} ${currency}`}
            </Typography>
        </Stack>
      )}
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>Start:</Typography>
        <Typography variant='body2'>{`${start} ${currency}`}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>Excess ratio:</Typography>
        <Typography variant='body2'>{rangePercent}</Typography>
      </Stack>
    </TableCell>
  );
};
