import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FC } from 'react';
import { GridOptionsSortOrder, useGridOptionsStore } from '../store';

const sortOrders: Record<GridOptionsSortOrder, string> = {
  asc: 'Asc',
  desc: 'Desc',
};

export const TransactionsPageOptionsSortOrder: FC = () => {
  const sortOrder = useGridOptionsStore((state) => state.sortOrder);

  return (
    <ToggleButtonGroup
      color='primary'
      size='small'
      value={sortOrder}
      exclusive
      onChange={(_, sortOrder: GridOptionsSortOrder) => {
        useGridOptionsStore.setState({ sortOrder });
      }}
    >
      {Object.entries(sortOrders).map(([key, value]) => (
        <ToggleButton key={key} value={key}>
          {value}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
