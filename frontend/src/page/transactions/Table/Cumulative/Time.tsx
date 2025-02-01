import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useGridList } from '../../useGridList';

export const GridsCumulativeTime: FC = () => {
  const { t } = useTranslation();
  const { transactions } = useGridList();

  const duration =
    transactions.reduce((acc, x) => acc + x.data.duration, 0) /
    transactions.length;

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.duration')}
        </Typography>
        <Typography variant='body2'>{`${duration.toFixed(2)} days`}</Typography>
      </Stack>
    </TableCell>
  );
};
