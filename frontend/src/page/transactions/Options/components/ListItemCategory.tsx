import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import { FC, ReactNode, useState } from 'react';

export type ListItemCategoryProps = {
  label: string;
};
type Props = ListItemCategoryProps & { children: ReactNode };

export const ListItemCategory: FC<Props> = (props) => {
  const { label, children } = props;

  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItemButton
        onClick={() => setOpen(!open)}
        sx={{
          backgroundColor: (theme) => theme.palette.background.paperL01,
        }}
      >
        <ListItemText primary={label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open}>
        <List disablePadding>{children}</List>
      </Collapse>
    </>
  );
};
