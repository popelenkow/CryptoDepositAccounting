import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { minPrice, maxPrice, startPrice, endPrice } = transaction;

  const { t } = useTranslation();
  const mode = useGridOptionsStore((state) => state.mode);
  const currency = currencySymbols[mode];

  const rangePercent = `${getExcessRatioPercent(maxPrice, minPrice).toFixed(2)} ${currencySymbols.percent}`;

  const startRatioPercent = getRatioPercent(startPrice, maxPrice, minPrice);
  const start = mode === 'usdt' ? startPrice : startRatioPercent.toFixed(2);

  const endRatioPercent = getRatioPercent(endPrice, maxPrice, minPrice);
  const end = mode === 'usdt' ? endPrice : endRatioPercent.toFixed(2);

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.max')}
        </Typography>
        <Typography variant='body2'>{`${maxPrice} ${currencySymbols.usdt}`}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.min')}
        </Typography>
        <Typography variant='body2'>{`${minPrice} ${currencySymbols.usdt}`}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {transaction.close === 'pending'
            ? t('page.transactions.table.body.current')
            : t('page.transactions.table.body.end')}
        </Typography>
        <Typography
          variant='body2'
          color={getRangeRatioColor(endRatioPercent, startRatioPercent)}
        >
          {`${end} ${currency}`}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.start')}
        </Typography>
        <Typography variant='body2'>{`${start} ${currency}`}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.excessRatio')}
        </Typography>
        <Typography variant='body2'>{rangePercent}</Typography>
      </Stack>
    </TableCell>
  );
};
