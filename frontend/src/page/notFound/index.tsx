import { Button, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { routeLinks } from '../../app/router/routes';

export const NotFoundPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Stack
      direction='column'
      gap={2}
      width='100%'
      height='100dvh'
      justifyContent='center'
      alignItems='center'
    >
      <Typography textAlign='center'>
        {t('page.notFound.label', 'Page not found')}
      </Typography>
      <Button
        variant='contained'
        size='large'
        component={Link}
        to={routeLinks.home}
      >
        <Typography>{t('page.notFound.goHome', 'Back to home')}</Typography>
      </Button>
    </Stack>
  );
};
