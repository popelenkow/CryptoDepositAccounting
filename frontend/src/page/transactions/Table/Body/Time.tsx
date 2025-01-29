import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { GridTransactionData } from '../../../../api/backend/types';
import { currencySymbols } from '../../../../common/currency';
import { getGridDuration } from '../../../../common/grid/time';
import { getGridTrade } from '../../../../common/grid/trade';
import { toUiDateTime } from '../../../../common/time';
import { useGridOptionsStore } from '../../Options/store';

export type GridsBodyTimeProps = {
  transaction: GridTransactionData;
};
export const GridsBodyTime: FC<GridsBodyTimeProps> = (props) => {
  const { transaction } = props;

  const { t } = useTranslation();
  const mode = useGridOptionsStore((state) => state.mode);

  const symbol = currencySymbols[mode];

  const trade = getGridTrade(transaction, mode).toFixed(4);

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.duration')}
        </Typography>
        <Typography variant='body2'>
          {`${getGridDuration(transaction).toFixed(2)} days`}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.start')}
        </Typography>
        <Typography variant='body2'>
          {toUiDateTime(transaction.startTime)}
        </Typography>
      </Stack>
      {transaction.close !== 'pending' && (
        <Stack direction='row' justifyContent='end' gap={1}>
          <Typography variant='body2'>
            {t('page.transactions.table.body.end')}
          </Typography>
          <Typography variant='body2'>
            {toUiDateTime(transaction.endTime)}
          </Typography>
        </Stack>
      )}
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>Trades:</Typography>
        <Typography variant='body2'>
          {transaction.trades} x {trade} {symbol}
        </Typography>
      </Stack>
    </TableCell>
  );
};
