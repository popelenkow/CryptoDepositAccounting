import { Box } from '@mui/material';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AppTabTitle } from './AppTabTitle';

export const AppLayout: FC = () => {
  return (
    <Box>
      <AppTabTitle />
      <Outlet />
    </Box>
  );
};
