import {
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Radio,
} from '@mui/material';
import { FC, useRef, useState } from 'react';
import { GridTransactionSortBy } from '../../../../../api/backend/select/grid';
import { assertNever } from '../../../../../common/assert';
import { useGridOptionsStore } from '../../store';

const categories: Record<GridTransactionSortBy['category'], string> = {
  profit: 'Profit',
  time: 'Time',
  other: 'Other',
};

const createByCategory = (
  category: GridTransactionSortBy['category'],
): GridTransactionSortBy => {
  if (category === 'profit') {
    return { category, type: 'total', mode: 'percent', period: 'lifetime' };
  }
  if (category === 'time') {
    return { category, type: 'duration' };
  }
  if (category === 'other') {
    return { category, type: 'id' };
  }
  return assertNever(category);
};

export const TransactionsPageOptionsSortByCategory: FC = () => {
  const by = useGridOptionsStore((state) => state.sort.by);
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedText = categories[by.category];

  return (
    <>
      <ListItemButton ref={ref} onClick={() => setOpen(true)}>
        <ListItemText primary='Category' secondary={selectedText} />
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
        {Object.entries(categories).map(([key, text]) => (
          <MenuItem
            key={key}
            selected={key === by.category}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              const category = key as GridTransactionSortBy['category'];
              useGridOptionsStore.setState((state) => ({
                ...state,
                sort: { ...state.sort, by: createByCategory(category) },
              }));
              setOpen(false);
            }}
          >
            <Radio checked={key === by.category} />
            <ListItemText primary={text} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
