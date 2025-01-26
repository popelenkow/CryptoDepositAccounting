import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { IconButton, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useGridOptionsStore } from './Options/store';
import { useGridList } from './useGridList';

export const TransactionsPageTitle: FC = () => {
  const { t } = useTranslation();

  const open = useGridOptionsStore((state) => state.open);
  const list = useGridList();

  return (
    <Stack direction='row' gap={2} justifyContent='space-between'>
      <Typography variant='h5'>
        {t('page.grids.label', 'Grids')} ({list.length})
      </Typography>
      <IconButton
        color={open ? 'primary' : undefined}
        onClick={() => useGridOptionsStore.setState({ open: !open })}
      >
        <FilterAltIcon />
      </IconButton>
    </Stack>
  );
};
