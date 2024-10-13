import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SyncIcon from '@mui/icons-material/Sync';
import { LoadingButton } from '@mui/lab';
import { Box, Stack, IconButton, Link } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { importTransactionsOptions } from '../../api/options';
import { GridTransactionData } from '../../api/types';
import { roundTo } from '../../common/value';
import { FutureGrid } from './bybitApi';
import { useBybitApi } from './useActiveTab';
import { average } from './utils';

const getClose = (grid: FutureGrid): GridTransactionData['close'] => {
  if (grid.status === 'RUNNING') {
    return 'pending';
  }
  if (grid.close_detail?.bot_close_code === 'BOT_CLOSE_CODE_CANCELED_AUTO_TP') {
    return 'auto';
  }
  return 'manual';
};

const toTransaction = (grid: FutureGrid): GridTransactionData => {
  const priceMin = Number(grid.min_price);
  const priceMax = Number(grid.max_price);
  const price = Number(grid.entry_price);
  const priceCurrent =
    grid.current_price === '' ? priceMax : Number(grid.current_price);
  const close = getClose(grid);

  return {
    orderId: grid.grid_id,
    type: 'grid',
    symbol: grid.symbol,
    amount: Number(grid.total_investment),
    price: price !== 0 ? price : average(priceMin, priceMax),
    priceMin,
    priceMax,
    priceCurrent,
    grids: Number(grid.cell_num),
    leverage: Number(grid.leverage),
    duration: Number(grid.running_duration),
    trades: Number(grid.arbitrage_num),
    pnl: Number(grid.pnl),
    close,
  };
};

export const ExtensionPopupPage: FC = () => {
  const bybitApi = useBybitApi();

  const importTransactions = useMutation(importTransactionsOptions);
  const [actualLoading, setActualLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [parametersLoading, setParametersLoading] = useState(false);

  return (
    <Box width='400px' padding={4}>
      <Stack direction='row' gap={4} justifyContent='space-between'>
        <Stack gap={2}>
          {bybitApi && (
            <LoadingButton
              variant='contained'
              loading={actualLoading}
              loadingPosition='end'
              endIcon={<SyncIcon />}
              onClick={async () => {
                try {
                  setActualLoading(true);
                  const response = await bybitApi.getBots();
                  const bots = response.result.bots.map((bot) =>
                    toTransaction(bot.future_grid),
                  );
                  bots.reverse();
                  importTransactions.mutate(bots);
                } finally {
                  setActualLoading(false);
                }
              }}
            >
              Sync actual
            </LoadingButton>
          )}
          {bybitApi && (
            <LoadingButton
              variant='contained'
              loading={historyLoading}
              loadingPosition='end'
              endIcon={<SyncIcon />}
              onClick={async () => {
                try {
                  setHistoryLoading(true);
                  const response = await bybitApi.getHistoryBots();
                  const bots = response.result.bots.map((bot) =>
                    toTransaction(bot.future_grid),
                  );
                  bots.reverse();
                  importTransactions.mutate(bots);
                } finally {
                  setHistoryLoading(false);
                }
              }}
            >
              Sync history
            </LoadingButton>
          )}
          {bybitApi && (
            <LoadingButton
              variant='contained'
              loading={parametersLoading}
              loadingPosition='end'
              endIcon={<SyncIcon />}
              onClick={async () => {
                try {
                  setParametersLoading(true);
                  const price = await bybitApi.getGridCurrentPrice();
                  await bybitApi.fillGridParameters({
                    from: roundTo(price * 0.8, 6),
                    to: roundTo(price * 1.2, 6),
                    leverage: 1,
                    grids: 92,
                  });
                } finally {
                  setParametersLoading(false);
                }
              }}
            >
              Autofill new grid
            </LoadingButton>
          )}
        </Stack>
        <Stack>
          <IconButton
            component={Link}
            href='index.html?mode=extensionPage'
            target='_blank'
            rel='noopener noreferrer'
          >
            <OpenInNewIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};
