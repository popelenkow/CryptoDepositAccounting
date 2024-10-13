import { Box, Button, MenuItem, TextField } from '@mui/material';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TransactionData } from '../../api/types';
import { availableDualDurations, displayDuration } from '../../utils/dual';
import { TransactionFormCloseDropdown } from './CloseDropdown';

export type TransactionFormProps = {
  defaultValues?: TransactionData;
  onSubmit: (data: TransactionData) => void;
};

export const TransactionForm: FC<TransactionFormProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const { control, handleSubmit, watch } = useForm<TransactionData>({
    defaultValues,
  });

  const type = watch('type');
  const method = watch('method');

  return (
    <Box
      component='form'
      onSubmit={handleSubmit((data) => {
        if (data.method === 'buy') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/consistent-type-assertions
          delete (data as any).links;
        }
        data.orderId = data.orderId ?? '';
        onSubmit(data);
      })}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        width: '100%',
      }}
    >
      <Controller
        name='type'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value ?? ''}
            select
            fullWidth
            label={t('components.transactionForm.type', 'Type')}
          >
            <MenuItem value='spot'>Spot</MenuItem>
            <MenuItem value='dual'>Dual</MenuItem>
          </TextField>
        )}
      />
      <Controller
        name='method'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value ?? ''}
            select
            fullWidth
            label={t('components.transactionForm.method', 'Method')}
          >
            <MenuItem value='buy'>Buy</MenuItem>
            <MenuItem value='sell'>Sell</MenuItem>
          </TextField>
        )}
      />
      <Controller
        name='amount'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value ?? ''}
            type='number'
            fullWidth
            label={t('components.transactionForm.amount', 'Amount')}
            sx={{
              '& input[type=number]': { MozAppearance: 'textfield' },
              '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
                {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
            }}
          />
        )}
      />
      <Controller
        name='price'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value ?? ''}
            type='number'
            fullWidth
            label={t('components.transactionForm.price', 'Price')}
            sx={{
              '& input[type=number]': { MozAppearance: 'textfield' },
              '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
                {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
            }}
          />
        )}
      />
      {type === 'dual' && (
        <Controller
          name='apr'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value ?? ''}
              type='number'
              fullWidth
              label={t('components.transactionForm.apr', 'APR')}
              sx={{
                '& input[type=number]': { MozAppearance: 'textfield' },
                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
                  {
                    WebkitAppearance: 'none',
                    margin: 0,
                  },
              }}
            />
          )}
        />
      )}
      {type === 'dual' && (
        <Controller
          name='duration'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value ?? ''}
              select
              fullWidth
              label={t('components.transactionForm.duration', 'Duration')}
            >
              {availableDualDurations.map((value) => (
                <MenuItem key={value} value={value}>
                  {displayDuration(value)}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      )}
      <TransactionFormCloseDropdown
        control={control}
        type={type}
        method={method}
      />
      <Button
        type='submit'
        color='primary'
        variant='contained'
        sx={{ width: '100%' }}
      >
        {t('components.transactionForm.save', 'Save')}
      </Button>
    </Box>
  );
};
