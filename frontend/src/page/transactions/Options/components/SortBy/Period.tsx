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

const periods: Record<GridTransactionSortByProfit['period'], string> = {
  lifetime: 'Lifetime',
  daily: 'Daily',
};

export const TransactionsPageOptionsSortByPeriod: FC = () => {
  const by = useGridOptionsStore((state) => state.sort.by);
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  if (by.category !== 'profit') {
    return null;
  }

  const selectedText = periods[by.period];

  return (
    <>
      <ListItemButton ref={ref} onClick={() => setOpen(true)}>
        <ListItemText primary='Period' secondary={selectedText} />
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
        {Object.entries(periods).map(([key, text]) => (
          <MenuItem
            key={key}
            selected={key === status}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              const period = key as GridTransactionSortByProfit['period'];
              useGridOptionsStore.setState((state) => ({
                ...state,
                sort: {
                  ...state.sort,
                  by: {
                    ...by,
                    period,
                  },
                },
              }));
              setOpen(false);
            }}
          >
            <Radio checked={key === by.period} />
            <ListItemText primary={text} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
