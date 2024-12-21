import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FC } from 'react';
import { GridOptionsSortType, useGridOptionsStore } from '../store';

const sortTypes: Record<GridOptionsSortType, string> = {
  id: 'Id',
  instrument: 'Instrument',
  pricePercent: 'PricePercent',
  duration: 'Duration',
  totalPercent: 'TotalPercent',
  totalUsdt: 'TotalUsdt',
  gridPeriodPercent: 'GridPeriodPercent',
  gridPeriodUsdt: 'GridPeriodUsdt',
  gridTotalPercent: 'GridTotalPercent',
  gridTotalUsdt: 'GridTotalUsdt',
};

export const TransactionsPageOptionsSortType: FC = () => {
  const sortType = useGridOptionsStore((state) => state.sortType);

  return (
    <ToggleButtonGroup
      color='primary'
      size='small'
      value={sortType}
      exclusive
      onChange={(_, sortType: GridOptionsSortType) => {
        useGridOptionsStore.setState({ sortType });
      }}
    >
      {Object.entries(sortTypes).map(([key, value]) => (
        <ToggleButton key={key} value={key}>
          {value}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
