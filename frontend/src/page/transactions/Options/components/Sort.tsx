import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FC } from 'react';
import {
  GridTransactionSortOrder,
  GridTransactionSortType,
} from '../../../../api/backend/select/grid';
import { useGridOptionsStore } from '../store';

const sortOrders: Record<GridTransactionSortOrder, string> = {
  asc: 'Asc',
  desc: 'Desc',
};

const sortTypes: Record<GridTransactionSortType, string> = {
  id: 'Id',
  instrument: 'Instrument',
  pricePercent: 'PricePercent',
  duration: 'Duration',
  totalPercent: 'TotalPercent',
  totalUsdt: 'TotalUsdt',
  gridPeriodPercent: 'GridPeriodPercent',
  gridPeriodUsdt: 'GridPeriodUsdt',
  gridTotalPercent: 'GridTotalPercent',
  gridTotalUsdt: 'GridTotalUsdt',
};

export const TransactionsPageOptionsSort: FC = () => {
  const sort = useGridOptionsStore((state) => state.sort);

  return (
    <>
      <ToggleButtonGroup
        color='primary'
        size='small'
        value={sort.order}
        exclusive
        onChange={(_, order: GridTransactionSortOrder) => {
          useGridOptionsStore.setState({ sort: { ...sort, order } });
        }}
      >
        {Object.entries(sortOrders).map(([key, value]) => (
          <ToggleButton key={key} value={key}>
            {value}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <ToggleButtonGroup
        color='primary'
        size='small'
        value={sort.type}
        exclusive
        onChange={(_, type: GridTransactionSortType) => {
          useGridOptionsStore.setState({ sort: { ...sort, type } });
        }}
      >
        {Object.entries(sortTypes).map(([key, value]) => (
          <ToggleButton key={key} value={key}>
            {value}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
};
