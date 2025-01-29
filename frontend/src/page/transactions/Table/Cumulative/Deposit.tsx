import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { currencySymbols } from '../../../../common/currency';
import { useGridList } from '../../useGridList';

export const GridsCumulativeDeposit: FC = () => {
  const { t } = useTranslation();
  const list = useGridList();

  const deposit = list.reduce((acc, x) => acc + x.data.amount, 0);
  const leverage =
    list.reduce((acc, x) => acc + x.data.leverage, 0) / list.length;

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.amount')}
        </Typography>
        <Typography variant='body2'>
          {deposit.toFixed(2)} {currencySymbols.usdt}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.leverage')}
        </Typography>
        <Typography variant='body2'>{leverage.toFixed(2)}</Typography>
      </Stack>
    </TableCell>
  );
};
