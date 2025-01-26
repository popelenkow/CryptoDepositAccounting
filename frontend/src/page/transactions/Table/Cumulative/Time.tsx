import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { getGridsDuration } from '../../../../common/grid/time';
import { useGridList } from '../../useGridList';

export const GridsCumulativeTime: FC = () => {
  const list = useGridList();

  const transactions = list.map((x) => x.data);

  const duration = getGridsDuration(transactions);

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>Duration:</Typography>
        <Typography variant='body2'>{`${duration.toFixed(2)} days`}</Typography>
      </Stack>
    </TableCell>
  );
};
