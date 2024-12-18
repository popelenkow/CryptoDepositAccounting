import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Stack, IconButton, Link } from '@mui/material';
import { FC } from 'react';
import { AutofillNewGrid } from './components/AutofillNewGrid';
import { SyncActual } from './components/SyncActual';
import { SyncDetail } from './components/SyncDetail';
import { SyncHistory } from './components/SyncHistory';

export const ExtensionPopupPage: FC = () => {
  return (
    <Box width='400px' padding={4}>
      <Stack direction='row' gap={4} justifyContent='space-between'>
        <Stack gap={2}>
          <SyncActual />
          <SyncHistory />
          <SyncDetail />
          <AutofillNewGrid />
        </Stack>
        <Stack>
          <IconButton
            component={Link}
            href='index.html?mode=extensionPage'
            target='_blank'
            rel='noopener noreferrer'
          >
            <OpenInNewIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};
