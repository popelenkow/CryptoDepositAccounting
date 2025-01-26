import {
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Radio,
} from '@mui/material';
import { FC, useRef, useState } from 'react';
import { GridTransactionSortByProfit } from '../../../../../api/backend/select/grid';
import { useGridOptionsStore } from '../../store';

const modes: Record<GridTransactionSortByProfit['mode'], string> = {
  percent: 'Percent',
  usdt: 'USDT',
};

export const TransactionsPageOptionsSortByMode: FC = () => {
  const by = useGridOptionsStore((state) => state.sort.by);
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  if (by.category !== 'profit') {
    return null;
  }

  const selectedText = modes[by.mode];

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
            selected={key === status}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              const mode = key as GridTransactionSortByProfit['mode'];
              useGridOptionsStore.setState((state) => ({
                ...state,
                sort: {
                  ...state.sort,
                  by: {
                    ...by,
                    mode,
                  },
                },
              }));
              setOpen(false);
            }}
          >
            <Radio checked={key === by.mode} />
            <ListItemText primary={text} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
