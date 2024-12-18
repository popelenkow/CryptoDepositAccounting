import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FC } from 'react';
import {
  IncomeMode,
  IncomePeriod,
  periodNames,
} from '../../../common/grid/trade';
import {
  GridOptionsSortOrder,
  GridOptionsSortType,
  GridOptionsStatus,
  useGridOptionsStore,
} from './store';

const statuses: Record<GridOptionsStatus, string> = {
  actual: 'Actual',
  history: 'History',
};

const modes: Record<IncomeMode, string> = {
  usdt: '$',
  percent: '%',
};

const sortTypes: Record<GridOptionsSortType, string> = {
  id: 'Id',
  instrument: 'Instrument',
  pricePercent: 'PricePercent',
  duration: 'Duration',
  totalPercent: 'TotalPercent',
  totalUsdt: 'TotalUsdt',
  gridAprPercent: 'GridAprPercent',
  gridAprUsdt: 'GridAprUsdt',
  gridTotalPercent: 'GridTotalPercent',
  gridTotalUsdt: 'GridTotalUsdt',
};

const sortOrders: Record<GridOptionsSortOrder, string> = {
  asc: 'Asc',
  desc: 'Desc',
};

export const TransactionsPageOptions: FC = () => {
  const options = useGridOptionsStore();

  return (
    <Stack gap={4}>
      <Stack direction='row' gap={4}>
        <ToggleButtonGroup
          color='primary'
          size='small'
          value={options.status}
          exclusive
          onChange={(_, status: GridOptionsStatus) => {
            useGridOptionsStore.setState({ status });
          }}
        >
          {Object.entries(statuses).map(([key, value]) => (
            <ToggleButton key={key} value={key}>
              {value}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <ToggleButtonGroup
          color='primary'
          size='small'
          value={options.mode}
          exclusive
          onChange={(_, mode: IncomeMode) => {
            useGridOptionsStore.setState({ mode });
          }}
        >
          {Object.entries(modes).map(([key, value]) => (
            <ToggleButton key={key} value={key}>
              {value}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <ToggleButtonGroup
          color='primary'
          size='small'
          value={options.period}
          exclusive
          onChange={(_, period: IncomePeriod) => {
            useGridOptionsStore.setState({ period });
          }}
        >
          {Object.entries(periodNames).map(([key, value]) => (
            <ToggleButton key={key} value={key}>
              {value}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
      <Stack direction='row' gap={4}>
        <ToggleButtonGroup
          color='primary'
          size='small'
          value={options.sortOrder}
          exclusive
          onChange={(_, sortOrder: GridOptionsSortOrder) => {
            useGridOptionsStore.setState({ sortOrder });
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
          value={options.sortType}
          exclusive
          onChange={(_, sortType: GridOptionsSortType) => {
            useGridOptionsStore.setState({ sortType });
          }}
        >
          {Object.entries(sortTypes).map(([key, value]) => (
            <ToggleButton key={key} value={key}>
              {value}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
};
