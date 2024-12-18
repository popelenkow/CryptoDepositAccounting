import { Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useGridList } from './useGridList';

export const TransactionsPageTitle: FC = () => {
  const { t } = useTranslation();

  const list = useGridList();

  return (
    <Typography variant='h5'>
      {t('page.grids.label', 'Grids')} ({list.length})
    </Typography>
  );
};
