import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { GridTransactionData } from '../../../../api/types';
import { mapSecondsToDays, toUiDateTime } from '../../../../common/time';

export type GridsCellTimeProps = {
  transaction: GridTransactionData;
};
export const GridsCellTime: FC<GridsCellTimeProps> = (props) => {
  const { transaction } = props;

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Duration:</Typography>
        <Typography>
          {`${mapSecondsToDays(transaction.duration).toFixed(2)} days`}
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
    </TableCell>
  );
};
