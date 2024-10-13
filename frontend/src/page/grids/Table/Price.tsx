import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { GridTransaction } from '../../../api/types';
import { getGridCurrentPricePercent } from '../../../common/grid/ratio';

export type GridsTablePriceProps = {
  transaction: GridTransaction;
};
export const GridsTablePrice: FC<GridsTablePriceProps> = (props) => {
  const { transaction } = props;

  const range = transaction.priceMax / transaction.priceMin - 1;
  const rangePercent = (range * 100).toFixed(0);
  const currentPercent = getGridCurrentPricePercent(transaction).toFixed(2);

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Start:</Typography>
        <Typography>{transaction.price}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Range:</Typography>
        <Typography>{`(${rangePercent} %) ${transaction.priceMin} - ${transaction.priceMax}`}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Current:</Typography>
        <Typography>{`(${currentPercent} %) ${transaction.priceCurrent}`}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Grids:</Typography>
        <Typography>{transaction.grids}</Typography>
      </Stack>
    </TableCell>
  );
};
