import { Box } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { customScrollbarSx } from './common';

export const CustomScrollbar: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <Box sx={customScrollbarSx}>{children}</Box>;
};
