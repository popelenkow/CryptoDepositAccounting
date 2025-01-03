import {
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { getGridTransactionsOptions } from '../../../../api/backend/select/grid';
import { unique } from '../../../../common/unique';
import { useGridOptionsStore } from '../store';

export const TransactionsPageOptionsInstruments: FC = () => {
  const transactions = useQuery(getGridTransactionsOptions()).data ?? [];
  const instruments = useGridOptionsStore((state) => state.instruments);
  const list = transactions
    .map((transaction) => transaction.data.instrument)
    .filter(unique)
    .sort();

  return (
    <FormControl size='small' sx={{ width: '300px' }}>
      <InputLabel>Instruments</InputLabel>
      <Select
        multiple
        value={instruments}
        onChange={(event) => {
          const value = event.target.value;
          if (!Array.isArray(value)) return;
          useGridOptionsStore.setState({ instruments: value });
        }}
        input={<OutlinedInput label='Instruments' />}
        renderValue={(selected) => (
          <Stack direction='row' flexWrap='nowrap' gap={1}>
            {selected.map((value) => (
              <Chip key={value} label={value} size='small' />
            ))}
          </Stack>
        )}
      >
        {list.map((instrument) => (
          <MenuItem key={instrument} value={instrument}>
            <Checkbox checked={instruments.includes(instrument)} />
            <ListItemText primary={instrument} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
