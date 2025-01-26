import {
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Radio,
} from '@mui/material';
import { FC, useRef, useState } from 'react';
import { IncomePrediction } from '../../../../common/grid/trade';
import { useGridOptionsStore } from '../store';

const predictions: Record<IncomePrediction, string> = {
  optimistic: 'Optimistic',
  pessimistic: 'Pessimistic',
};

export const TransactionsPageOptionsPrediction: FC = () => {
  const prediction = useGridOptionsStore((state) => state.prediction);
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedText = predictions[prediction];

  return (
    <>
      <ListItemButton ref={ref} onClick={() => setOpen(true)}>
        <ListItemText primary='Prediction' secondary={selectedText} />
      </ListItemButton>
      <Menu
        anchorEl={ref.current}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        MenuListProps={{
          sx: {
            width: ref.current?.clientWidth ?? 'auto',
          },
        }}
      >
        {Object.entries(predictions).map(([key, text]) => (
          <MenuItem
            key={key}
            selected={key === prediction}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              const prediction = key as IncomePrediction;
              useGridOptionsStore.setState({ prediction });
              setOpen(false);
            }}
          >
            <Radio checked={key === prediction} />
            <ListItemText primary={text} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
