import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
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
  const mode = useGridOptionsStore((state) => state.mode);

  const symbol = currencySymbols[mode];

  const trade = getGridTrade(transaction, mode).toFixed(4);

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Duration:</Typography>
        <Typography>
          {`${getGridDuration(transaction).toFixed(2)} days`}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Start:</Typography>
        <Typography>{toUiDateTime(transaction.startTime)}</Typography>
      </Stack>
      {transaction.close !== 'pending' && (
        <Stack direction='row' justifyContent='end' gap={1}>
          <Typography>End:</Typography>
          <Typography>{toUiDateTime(transaction.endTime)}</Typography>
        </Stack>
      )}
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Trades:</Typography>
        <Typography>
          {transaction.trades} x {trade} {symbol}
        </Typography>
      </Stack>
    </TableCell>
  );
};
