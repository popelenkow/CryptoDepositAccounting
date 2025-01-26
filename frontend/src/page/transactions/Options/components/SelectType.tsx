import {
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Radio,
} from '@mui/material';
import { FC, useRef, useState } from 'react';
import { GridTransactionSelectType } from '../../../../api/backend/select/grid';
import { useGridOptionsStore } from '../store';

const selectTypes: Record<GridTransactionSelectType, string> = {
  all: 'All',
  highest: 'Highest',
  lowest: 'Lowest',
};

export const TransactionsPageOptionsSelectType: FC = () => {
  const selectType = useGridOptionsStore((state) => state.selectType);
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedText = selectTypes[selectType];

  return (
    <>
      <ListItemButton ref={ref} onClick={() => setOpen(true)}>
        <ListItemText primary='Select Type' secondary={selectedText} />
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
        {Object.entries(selectTypes).map(([key, text]) => (
          <MenuItem
            key={key}
            selected={key === selectType}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              const selectType = key as GridTransactionSelectType;
              useGridOptionsStore.setState({ selectType });
              setOpen(false);
            }}
          >
            <Radio checked={key === selectType} />
            <ListItemText primary={text} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
