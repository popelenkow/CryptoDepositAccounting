import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FC } from 'react';
import { GridTransactionSelectType } from '../../../../api/backend/select/grid';
import { useGridOptionsStore } from '../store';

const selectTypes: Record<GridTransactionSelectType, string> = {
  highest: 'Highest',
  lowest: 'Lowest',
  all: 'All',
};

export const TransactionsPageOptionsSelectType: FC = () => {
  const selectType = useGridOptionsStore((state) => state.selectType);

  return (
    <ToggleButtonGroup
      color='primary'
      size='small'
      value={selectType}
      exclusive
      onChange={(_, selectType: GridTransactionSelectType) => {
        useGridOptionsStore.setState({ selectType });
      }}
    >
      {Object.entries(selectTypes).map(([key, value]) => (
        <ToggleButton key={key} value={key}>
          {value}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
