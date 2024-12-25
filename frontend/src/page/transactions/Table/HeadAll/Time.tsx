import { Stack, TableCell, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { getGridTransactionsOptions } from '../../../../api/backend/select/grid';
import { getGridsDuration } from '../../../../common/grid/time';
import { useGridOptionsStore } from '../../Options/store';

export const GridsHeadAllTime: FC = () => {
  const status = useGridOptionsStore((options) => options.status);
  const list = useQuery(getGridTransactionsOptions(status)).data ?? [];

  const transactions = list.map((x) => x.data);

  const duration = getGridsDuration(transactions);

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Duration:</Typography>
        <Typography>{`${duration.toFixed(2)} days`}</Typography>
      </Stack>
    </TableCell>
  );
};
