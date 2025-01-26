import {
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Radio,
} from '@mui/material';
import { FC, useRef, useState } from 'react';
import {
  GridTransactionSortBy,
  GridTransactionSortByOther,
  GridTransactionSortByProfit,
  GridTransactionSortByTime,
} from '../../../../../api/backend/select/grid';
import { assertNever } from '../../../../../common/assert';
import { useGridOptionsStore } from '../../store';

const profitTypes: Record<GridTransactionSortByProfit['type'], string> = {
  total: 'Total',
  spot: 'Spot',
  funding: 'Funding',
  grid: 'Grid',
};

const timeTypes: Record<GridTransactionSortByTime['type'], string> = {
  duration: 'Duration',
};

const otherTypes: Record<GridTransactionSortByOther['type'], string> = {
  id: 'Id',
  instrument: 'Instrument',
  pricePercent: 'Price Percent',
};

const getTypes = (category: GridTransactionSortBy['category']) => {
  if (category === 'profit') return profitTypes;
  if (category === 'time') return timeTypes;
  if (category === 'other') return otherTypes;
  return assertNever(category);
};

export const TransactionsPageOptionsSortByType: FC = () => {
  const by = useGridOptionsStore((state) => state.sort.by);
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const types = getTypes(by.category);
  type Type = keyof typeof types;
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const type = by.type as Type;
  const selectedText = types[type];

  return (
    <>
      <ListItemButton ref={ref} onClick={() => setOpen(true)}>
        <ListItemText primary='Type' secondary={selectedText} />
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
        {Object.entries(types).map(([key, text]) => (
          <MenuItem
            key={key}
            selected={key === type}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              const type = key as Type;
              useGridOptionsStore.setState((state) => ({
                ...state,
                sort: {
                  ...state.sort,
                  by: {
                    ...by,
                    type,
                  },
                },
              }));
              setOpen(false);
            }}
          >
            <Radio checked={key === by.type} />
            <ListItemText primary={text} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
