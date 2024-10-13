import { Typography, Box } from '@mui/material';
import React from 'react';
import { Transaction } from '../../api/types';
import { displayDuration } from '../../utils/dual';

export type TransactionDurationCellProps = {
  transaction: Transaction;
};
export const TransactionDurationCell: React.FC<TransactionDurationCellProps> = (
  props,
) => {
  const { transaction } = props;

  if (transaction.type === 'spot') {
    return (
      <Typography variant='body2' sx={{ fontWeight: 500 }}>
        Instant
      </Typography>
    );
  }

  if (transaction.type === 'dual') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant='body2' sx={{ fontWeight: 500 }}>
          {displayDuration(transaction.duration)}
        </Typography>
        <Typography variant='body2' sx={{ fontWeight: 500 }}>
          APR: {transaction.apr.toFixed(1)} %
        </Typography>
      </Box>
    );
  }

  if (transaction.type === 'grid') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant='body2' sx={{ fontWeight: 500 }}>
          {displayDuration(transaction.duration)}
        </Typography>
      </Box>
    );
  }

  console.error('Unknown transaction type', transaction);
  throw new Error('Unknown transaction type');
};
