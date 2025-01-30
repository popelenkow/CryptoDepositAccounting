import { BoxProps, Box, keyframes, styled } from '@mui/material';
import { FC } from 'react';

const width = '20%';

const slideAnimation = keyframes`
  0% { left: -${width} }
  100% { left: 100% }
`;

const LoaderContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '4px',
  borderRadius: '1px',
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.palette.primary.mainL062
      : theme.palette.primary.mainD05,
  overflow: 'hidden',
  position: 'relative',
}));

const LoaderBar = styled(Box)(({ theme }) => ({
  width,
  height: '100%',
  position: 'absolute',
  backgroundColor: theme.palette.primary.main,
  animation: `${slideAnimation} 2s infinite cubic-bezier(0.5, 0.2, 0.5, 0.8)`,
}));

export type LinearLoaderProps = {
  sx?: BoxProps['sx'];
};
export const LinearLoader: FC<LinearLoaderProps> = (props) => {
  const { sx } = props;

  return (
    <LoaderContainer sx={sx}>
      <LoaderBar />
    </LoaderContainer>
  );
};
