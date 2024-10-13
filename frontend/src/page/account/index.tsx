import AddIcon from '@mui/icons-material/Add';
import { Button, Stack, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getInfoOptions } from '../../app/api/info';
import {
  getTransactionsOptions,
  removeTransactionOptions,
} from '../../app/api/transaction';
import { routeLinks } from '../../app/router/routes';
import { TransactionsTable } from '../../components/TransactionsTable';

export const AccountPage: FC = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const info = useQuery(getInfoOptions);
  const list = useQuery(getTransactionsOptions);

  const removeTransaction = useMutation({
    ...removeTransactionOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getTransactionsOptions.queryKey,
      });
    },
  });

  return (
    <Stack direction='column' padding={4} gap={4} width='100%' height='100dvh'>
      <Typography variant='h5'>{t('page.account.label', 'Account')}</Typography>
      <Typography>
        {t('page.account.btc', 'Btc:')} {info.data?.btcPrice?.toFixed(2)}
      </Typography>
      <TransactionsTable
        list={list.data}
        isFetching={list.isFetching}
        currentPrice={info.data?.btcPrice ?? 0}
        onRemove={removeTransaction.mutate}
      />
      <Button
        component={Link}
        to={routeLinks.transactionNew}
        color='primary'
        variant='contained'
        startIcon={<AddIcon />}
        sx={{ width: '100%' }}
      />
    </Stack>
  );
};
