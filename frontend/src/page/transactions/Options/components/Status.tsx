import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FC } from 'react';
import { GridOptionsStatus, useGridOptionsStore } from '../store';

const statuses: Record<GridOptionsStatus, string> = {
  actual: 'Actual',
  history: 'History',
};

export const TransactionsPageOptionsStatus: FC = () => {
  const status = useGridOptionsStore((state) => state.status);

  return (
    <ToggleButtonGroup
      color='primary'
      size='small'
      value={status}
      exclusive
      onChange={(_, status: GridOptionsStatus) => {
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
