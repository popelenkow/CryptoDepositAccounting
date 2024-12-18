import { Box, SxProps } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

export const customScrollbarSx: SxProps = {
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
  },
};
export const CustomScrollbar: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <Box sx={customScrollbarSx}>{children}</Box>;
};
