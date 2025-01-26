import {
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Radio,
} from '@mui/material';
import { FC, useState, useRef } from 'react';
import { GridTransactionStatus } from '../../../../api/backend/select/grid';
import { useGridOptionsStore } from '../store';

const statuses: Record<GridTransactionStatus, string> = {
  all: 'All',
  actual: 'Actual',
  history: 'History',
};

export const TransactionsPageOptionsStatus: FC = () => {
  const status = useGridOptionsStore((state) => state.status);
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedText = statuses[status];

  return (
    <>
      <ListItemButton ref={ref} onClick={() => setOpen(true)}>
        <ListItemText primary='Status' secondary={selectedText} />
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
        {Object.entries(statuses).map(([key, text]) => (
          <MenuItem
            key={key}
            selected={key === status}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              const status = key as GridTransactionStatus;
              useGridOptionsStore.setState({ status });
              setOpen(false);
            }}
          >
            <Radio checked={key === status} />
            <ListItemText primary={text} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
