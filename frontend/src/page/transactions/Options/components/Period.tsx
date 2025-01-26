import {
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Radio,
} from '@mui/material';
import { FC, useRef, useState } from 'react';
import { IncomePeriod, periodNames } from '../../../../common/period';
import { useGridOptionsStore } from '../store';

export const TransactionsPageOptionsPeriod: FC = () => {
  const period = useGridOptionsStore((state) => state.period);
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedText = periodNames[period];

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
        {Object.entries(periodNames).map(([key, text]) => (
          <MenuItem
            key={key}
            selected={key === period}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              const period = key as IncomePeriod;
              useGridOptionsStore.setState({ period });
              setOpen(false);
            }}
          >
            <Radio checked={key === period} />
            <ListItemText primary={text} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
