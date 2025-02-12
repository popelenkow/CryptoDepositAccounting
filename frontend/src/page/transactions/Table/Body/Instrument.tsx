import { Stack, TableCell, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { GridTransactionData } from '../../../../api/backend/types';

export type GridsBodyInstrumentProps = {
  id: number;
  transaction: GridTransactionData;
};
export const GridsBodyInstrument: FC<GridsBodyInstrumentProps> = (props) => {
  const { id, transaction } = props;
  const { instrument } = transaction;

  const { t } = useTranslation();

  return (
    <TableCell align='right'>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>{instrument}</Typography>
      </Stack>
      <Stack direction='row' justifyContent='end' gap={1}>
        <Typography variant='body2'>
          {t('page.transactions.table.body.id')}
        </Typography>
        <Typography variant='body2'>{id}</Typography>
      </Stack>
    </TableCell>
  );
};
