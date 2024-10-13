import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Stack, Typography, Button } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  getTransactionsOptions,
  updateTransactionOptions,
} from '../../api/options';
import { routeLinks } from '../../app/router/routes';
import { TransactionForm } from '../../components/TransactionForm';

export const TransactionEditPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams<{ transactionId: string }>();
  const transactionId = Number(params.transactionId);

  const { data: transactions = [] } = useQuery(getTransactionsOptions);

  const updateTransaction = useMutation({
    ...updateTransactionOptions,
    onSuccess: () => {
      navigate(routeLinks.home);
    },
  });

  const transaction = transactions.find((t) => t.id === transactionId);

  return (
    <Stack direction='column' padding={4} gap={4} width='100%' height='100dvh'>
      <Typography variant='h5'>
        {t('page.editTransaction.label', 'Edit Transaction')}
      </Typography>
      <Button
        component={Link}
        to={routeLinks.home}
        variant='contained'
        startIcon={<ArrowBackIcon />}
      >
        {t('page.editTransaction.back', 'Back')}
      </Button>
      {transaction && (
        <TransactionForm
          defaultValues={transaction}
          onSubmit={(data) =>
            updateTransaction.mutate({ ...data, id: transactionId })
          }
        />
      )}
    </Stack>
  );
};
