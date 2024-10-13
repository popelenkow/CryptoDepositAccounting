import { MenuItem, TextField } from '@mui/material';
import { FC } from 'react';
import { Controller, Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TransactionData } from '../../api/transaction';

export type TransactionFormCloseDropdownProps = {
  control: Control<TransactionData>;
  type: TransactionData['type'];
  method: TransactionData['method'];
};
export const TransactionFormCloseDropdown: FC<
  TransactionFormCloseDropdownProps
> = (props) => {
  const { control, type, method } = props;

  const { t } = useTranslation();

  const getOptions = () => {
    if (type === 'spot') {
      return [
        { value: 'limit', label: 'Limit' },
        { value: 'market', label: 'Market' },
      ];
    }
    if (method === 'buy') {
      return [
        { value: 'pending', label: 'Pending' },
        { value: 'buy', label: 'Buy' },
        { value: 'earn', label: 'Earn' },
      ];
    }
    return [
      { value: 'pending', label: 'Pending' },
      { value: 'sell', label: 'Sell' },
      { value: 'earn', label: 'Earn' },
    ];
  };

  return (
    <Controller
      name='close'
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          select
          fullWidth
          label={t('page.newTransaction.close', 'Close')}
        >
          {getOptions().map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};
