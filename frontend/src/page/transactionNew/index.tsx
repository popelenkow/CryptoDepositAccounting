import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Stack, Typography, Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { addTransactionOptions } from '../../api/options';
import { routeLinks } from '../../app/router/routes';
import { TransactionForm } from '../../components/TransactionForm';

export const TransactionNewPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const addTransaction = useMutation({
    ...addTransactionOptions,
    onSuccess: () => {
      navigate(routeLinks.home);
    },
  });

  return (
    <Stack direction='column' padding={4} gap={4} width='100%' height='100dvh'>
      <Typography variant='h5'>
        {t('page.newTransaction.label', 'New Transaction')}
      </Typography>
      <Button
        component={Link}
        to={routeLinks.home}
        variant='contained'
        startIcon={<ArrowBackIcon />}
      >
        {t('page.newTransaction.back', 'Back')}
      </Button>
      <TransactionForm onSubmit={addTransaction.mutate} />
    </Stack>
  );
};
