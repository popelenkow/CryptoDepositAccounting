import { Stack, TableCell, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { getInstrumentInfosOptions } from '../../../../api/backend/endpoints';
import { GridTransactionData } from '../../../../api/backend/types';
import { assertDefined } from '../../../../common/assert';
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

  const instrumentInfo = assertDefined(
    instrumentInfos.data.find((x) => x.instrument === transaction.instrument),
  );

  const quantity = getGridTradeQuantity(transaction, instrumentInfo).toFixed(2);

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
        <Typography>Quantity:</Typography>
        <Typography>{quantity}</Typography>
      </Stack>
    </TableCell>
  );
};
