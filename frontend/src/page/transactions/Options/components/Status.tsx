import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FC } from 'react';
import { GridTransactionStatus } from '../../../../api/backend/select/grid';
import { useGridOptionsStore } from '../store';

const statuses: Record<GridTransactionStatus, string> = {
  actual: 'Actual',
  history: 'History',
  all: 'All',
};

export const TransactionsPageOptionsStatus: FC = () => {
  const status = useGridOptionsStore((state) => state.status);

  return (
    <ToggleButtonGroup
      color='primary'
      size='small'
      value={status}
      exclusive
      onChange={(_, status: GridTransactionStatus) => {
        useGridOptionsStore.setState({ status });
      }}
    >
      {Object.entries(statuses).map(([key, value]) => (
        <ToggleButton key={key} value={key}>
          {value}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
