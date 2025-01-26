import { Stack, TableCell, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { getInstrumentInfosOptions } from '../../../../api/backend/endpoints';
import { GridTransactionData } from '../../../../api/backend/types';
import { warnDefined } from '../../../../common/assert';
import { currencySymbols } from '../../../../common/currency';
import { getGridTradeQuantity } from '../../../../common/grid/trade';

export type GridsBodyDepositProps = {
  transaction: GridTransactionData;
};
export const GridsBodyDeposit: FC<GridsBodyDepositProps> = (props) => {
  const { transaction } = props;

  const instrumentInfos = useQuery(getInstrumentInfosOptions);

  if (!instrumentInfos.data) {
    return null;
  }

  const instrumentInfo = warnDefined(
    instrumentInfos.data.find((x) => x.instrument === transaction.instrument),
    {
      id: -1,
      instrument: transaction.instrument,
      priceStep: 1,
      quantityStep: 1,
    },
    `Instrument info not found: ${transaction.instrument}`,
  );

  const quantity = getGridTradeQuantity(transaction, instrumentInfo);

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>Amount:</Typography>
        <Typography variant='body2'>
          {`${transaction.amount.toFixed(2)} ${currencySymbols.usdt}`}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>Leverage:</Typography>
        <Typography variant='body2'>x{transaction.leverage}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>Grids:</Typography>
        <Typography variant='body2'>{transaction.grids}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>Quantity:</Typography>
        <Typography variant='body2'>{quantity}</Typography>
      </Stack>
    </TableCell>
  );
};
