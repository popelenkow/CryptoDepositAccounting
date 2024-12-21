import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FC } from 'react';
import { IncomePrediction } from '../../../../common/grid/trade';
import { useGridOptionsStore } from '../store';

const predictions: Record<IncomePrediction, string> = {
  optimistic: 'Optimistic',
  pessimistic: 'Pessimistic',
};

export const TransactionsPageOptionsPrediction: FC = () => {
  const prediction = useGridOptionsStore((state) => state.prediction);

  return (
    <ToggleButtonGroup
      color='primary'
      size='small'
      value={prediction}
      exclusive
      onChange={(_, prediction: IncomePrediction) => {
        useGridOptionsStore.setState({ prediction });
      }}
    >
      {Object.entries(predictions).map(([key, value]) => (
        <ToggleButton key={key} value={key}>
          {value}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
