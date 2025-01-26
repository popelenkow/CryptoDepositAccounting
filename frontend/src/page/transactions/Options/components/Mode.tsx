import {
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Radio,
} from '@mui/material';
import { FC, useRef, useState } from 'react';
import { IncomeMode } from '../../../../common/grid/trade';
import { useGridOptionsStore } from '../store';

const modes: Record<IncomeMode, string> = {
  usdt: 'USDT',
  percent: 'Percent',
};

export const TransactionsPageOptionsMode: FC = () => {
  const mode = useGridOptionsStore((state) => state.mode);
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedText = modes[mode];

  return (
    <>
      <ListItemButton ref={ref} onClick={() => setOpen(true)}>
        <ListItemText primary='Mode' secondary={selectedText} />
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
        {Object.entries(modes).map(([key, text]) => (
          <MenuItem
            key={key}
            selected={key === mode}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              const mode = key as IncomeMode;
              useGridOptionsStore.setState({ mode });
              setOpen(false);
            }}
            dense
          >
            <Radio size='small' checked={key === mode} />
            <ListItemText primary={text} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
