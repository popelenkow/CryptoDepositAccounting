import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { mapSecondsToDays } from '../../../../common/time';
import { useGridList } from '../../useGridList';

export const GridsHeadTime: FC = () => {
  const list = useGridList();

  const duration =
    list.reduce((acc, x) => acc + x.data.duration, 0) / list.length;

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography>Duration:</Typography>
        <Typography>
          {`${mapSecondsToDays(duration).toFixed(2)} days`}
        </Typography>
      </Stack>
    </TableCell>
  );
};
