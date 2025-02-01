import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { GridTransactionData } from '../../../../api/backend/types';
import { currencySymbols } from '../../../../common/currency';

export type GridsBodyDepositProps = {
  transaction: GridTransactionData;
};
export const GridsBodyDeposit: FC<GridsBodyDepositProps> = (props) => {
  const { transaction } = props;

  const { t } = useTranslation();

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.amount')}
        </Typography>
        <Typography variant='body2'>
          {`${transaction.amount.toFixed(2)} ${currencySymbols.usdt}`}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.leverage')}
        </Typography>
        <Typography variant='body2'>x{transaction.leverage}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.grids')}
        </Typography>
        <Typography variant='body2'>{transaction.grids}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.quantity')}
        </Typography>
        <Typography variant='body2'>{transaction.quantity}</Typography>
      </Stack>
    </TableCell>
  );
};
