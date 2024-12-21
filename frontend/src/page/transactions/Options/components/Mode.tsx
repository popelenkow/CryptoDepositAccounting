import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FC } from 'react';
import { IncomeMode } from '../../../../common/grid/trade';
import { useGridOptionsStore } from '../store';

const modes: Record<IncomeMode, string> = {
  usdt: '$',
  percent: '%',
};

export const TransactionsPageOptionsMode: FC = () => {
  const mode = useGridOptionsStore((state) => state.mode);

  return (
    <ToggleButtonGroup
      color='primary'
      size='small'
      value={mode}
      exclusive
      onChange={(_, mode: IncomeMode) => {
        useGridOptionsStore.setState({ mode });
      }}
    >
      {Object.entries(modes).map(([key, value]) => (
        <ToggleButton key={key} value={key}>
          {value}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
