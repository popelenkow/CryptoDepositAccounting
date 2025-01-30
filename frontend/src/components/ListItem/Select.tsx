import {
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Radio,
} from '@mui/material';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Item, renderItemText } from './common';

export type ListItemSelectProps<T extends string> = {
  label: string;
  items: Item<T>[];
  selected: T;
  onSelect: (key: T) => void;
};
export const ListItemSelect = <T extends string>(
  props: ListItemSelectProps<T>,
) => {
  const { items, selected, onSelect, label } = props;

  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedItem = items.find((x) => x.key === selected);
  const selectedText = renderItemText(selectedItem?.text, t);

  return (
    <>
      <ListItemButton ref={ref} onClick={() => setOpen(true)}>
        <ListItemText primary={label} secondary={selectedText} />
      </ListItemButton>
      <Menu
        anchorEl={ref.current}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        MenuListProps={{
          sx: {
            width: ref.current?.clientWidth,
          },
        }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.key}
            selected={item.key === selected}
            onClick={() => {
              onSelect(item.key);
              setOpen(false);
            }}
            sx={{ padding: 0 }}
          >
            <Radio size='small' checked={item.key === selected} />
            <ListItemText primary={renderItemText(item.text, t)} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
