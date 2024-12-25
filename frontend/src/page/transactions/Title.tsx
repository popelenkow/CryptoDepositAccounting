import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { getGridTransactionsOptions } from '../../api/backend/select/grid';
import { useGridOptionsStore } from './Options/store';

export const TransactionsPageTitle: FC = () => {
  const { t } = useTranslation();

  const status = useGridOptionsStore((options) => options.status);
  const list = useQuery(getGridTransactionsOptions(status)).data ?? [];

  return (
    <Typography variant='h5'>
      {t('page.grids.label', 'Grids')} ({list.length})
    </Typography>
  );
};
