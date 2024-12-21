import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FC } from 'react';
import { IncomePeriod, periodNames } from '../../../../common/period';
import { useGridOptionsStore } from '../store';

export const TransactionsPageOptionsPeriod: FC = () => {
  const period = useGridOptionsStore((state) => state.period);

  return (
    <ToggleButtonGroup
      color='primary'
      size='small'
      value={period}
      exclusive
      onChange={(_, period: IncomePeriod) => {
        useGridOptionsStore.setState({ period });
      }}
    >
      {Object.entries(periodNames).map(([key, value]) => (
        <ToggleButton key={key} value={key}>
          {value}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
