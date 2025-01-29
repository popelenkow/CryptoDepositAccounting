import { TableCell, TableRow } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { periodNames } from '../../../../common/period';
import { useGridOptionsStore } from '../../Options/store';

export const GridsHeadRow: FC = () => {
  const { t } = useTranslation();
  const period = useGridOptionsStore((state) => state.period);

  return (
    <TableRow>
      <TableCell align='right' width='1%'>
        {t('page.transactions.table.head.instrument')}
      </TableCell>
      <TableCell align='right'>
        {t('page.transactions.table.head.deposit')}
      </TableCell>
      <TableCell align='right'>
        {t('page.transactions.table.head.price')}
      </TableCell>
      <TableCell align='right'>
        {t('page.transactions.table.head.time')}
      </TableCell>
      <TableCell align='right'>
        {periodNames[period](t)} {t('page.transactions.table.head.profit')}
      </TableCell>
      <TableCell align='right'>
        {t('page.transactions.table.head.totalProfit')}
      </TableCell>
    </TableRow>
  );
};
