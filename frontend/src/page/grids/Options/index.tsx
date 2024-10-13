import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FC } from 'react';
import { GridsOptionsInfo } from './Info';
import {
  GridOptionsMode,
  GridOptionsSortOrder,
  GridOptionsSortType,
  GridOptionsStatus,
  useGridOptionsStore,
} from './store';

const statuses: Record<GridOptionsStatus, string> = {
  actual: 'Actual',
  history: 'History',
};

const modes: Record<GridOptionsMode, string> = {
  $: '$',
  '%': '%',
};

const sortTypes: Record<GridOptionsSortType, string> = {
  id: 'Id',
  priceCurrentPercent: 'PriceCurrentPercent',
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

export const GridsOptions: FC = () => {
  const options = useGridOptionsStore();

  return (
    <Stack direction='row' justifyContent='space-between'>
      <Stack>
        <Stack direction='column' gap={2}>
          <Stack direction='row' gap={2}>
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
              onChange={(_, mode: GridOptionsMode) => {
                useGridOptionsStore.setState({ mode });
              }}
            >
              {Object.entries(modes).map(([key, value]) => (
                <ToggleButton key={key} value={key}>
                  {value}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Stack>
          <Stack direction='row' gap={2}>
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
          </Stack>
        </Stack>
      </Stack>
      <GridsOptionsInfo />
    </Stack>
  );
};
