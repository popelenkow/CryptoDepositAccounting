import { TableBody, TableCell, TableRow } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useGridOptionsStore } from '../../Options/store';
import { useGridList } from '../../useGridList';
import { GridsBodyRow } from './Row';

export const GridsBody: FC = () => {
  const { t } = useTranslation();
  const sort = useGridOptionsStore((options) => options.sort);
  const transactions = useGridList(sort);

  return (
    <TableBody>
      {transactions.map((transaction) => (
        <GridsBodyRow key={transaction.id} transaction={transaction} />
      ))}
      {!transactions.length && (
        <TableRow>
          <TableCell colSpan={100} align='center'>
            {t('page.transactions.table.body.emptyList')}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};
