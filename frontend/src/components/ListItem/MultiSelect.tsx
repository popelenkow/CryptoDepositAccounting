import {
  Checkbox,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Item, renderItemText } from './common';

const toggle = <T extends string>(list: T[], key: T) =>
  list.includes(key) ? list.filter((x) => x !== key) : [...list, key];

export type ListItemMultiSelectProps<T extends string> = {
  label: string;
  emptySelectedText: string;
  items: Item<T>[];
  selected: T[];
  onSelect: (key: T[]) => void;
};
export const ListItemMultiSelect = <T extends string>(
  props: ListItemMultiSelectProps<T>,
) => {
  const { label, emptySelectedText, items, selected, onSelect } = props;

  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedItems = items.filter((x) => selected.includes(x.key));
  const selectedText = selectedItems
    .map((x) => renderItemText(x.text, t))
    .join(', ');

  return (
    <>
      <ListItemButton ref={ref} onClick={() => setOpen(true)}>
        <ListItemText
          primary={label}
          secondary={selectedText || emptySelectedText}
        />
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
            selected={selected.includes(item.key)}
            onClick={() => {
              onSelect(toggle(selected, item.key));
            }}
          >
            <Checkbox checked={selected.includes(item.key)} />
            <ListItemText primary={renderItemText(item.text, t)} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
