import {
  Checkbox,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FC, useRef, useState } from 'react';
import { getGridTransactionsOptions } from '../../../../api/backend/select/grid';
import { unique } from '../../../../common/unique';
import { useGridOptionsStore } from '../store';

const toggleInstrument = (instruments: string[], instrument: string) =>
  instruments.includes(instrument)
    ? instruments.filter((x) => x !== instrument)
    : [...instruments, instrument];

export const TransactionsPageOptionsInstruments: FC = () => {
  const transactions = useQuery(getGridTransactionsOptions()).data ?? [];
  const instruments = useGridOptionsStore((state) => state.instruments);
  const allInstruments = transactions
    .map((transaction) => transaction.data.instrument)
    .filter(unique)
    .sort();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedText = instruments.length > 0 ? instruments.join(', ') : 'All';

  return (
    <>
      <ListItemButton ref={ref} onClick={() => setOpen(true)}>
        <ListItemText primary='Instruments' secondary={selectedText} />
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
        {allInstruments.map((instrument) => (
          <MenuItem
            key={instrument}
            selected={instruments.includes(instrument)}
            onClick={() => {
              useGridOptionsStore.setState({
                instruments: toggleInstrument(instruments, instrument),
              });
            }}
          >
            <Checkbox checked={instruments.includes(instrument)} />
            <ListItemText primary={instrument} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
