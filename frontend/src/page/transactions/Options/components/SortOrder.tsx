import {
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Radio,
} from '@mui/material';
import { FC, useRef, useState } from 'react';
import { GridTransactionSortOrder } from '../../../../api/backend/select/grid';
import { useGridOptionsStore } from '../store';

const sortOrders: Record<GridTransactionSortOrder, string> = {
  asc: 'Asc',
  desc: 'Desc',
};

export const TransactionsPageOptionsSortOrder: FC = () => {
  const order = useGridOptionsStore((state) => state.sort.order);
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedText = sortOrders[order];

  return (
    <>
      <ListItemButton ref={ref} onClick={() => setOpen(true)}>
        <ListItemText primary='Order' secondary={selectedText} />
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
        {Object.entries(sortOrders).map(([key, text]) => (
          <MenuItem
            key={key}
            selected={key === order}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              const order = key as GridTransactionSortOrder;
              useGridOptionsStore.setState((state) => ({
                ...state,
                sort: { ...state.sort, order },
              }));
              setOpen(false);
            }}
          >
            <Radio checked={key === order} />
            <ListItemText primary={text} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
