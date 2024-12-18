import SyncIcon from '@mui/icons-material/Sync';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { getHistoryGridsOptions } from '../../../api/bybit/endpoints';
import { importTransactionsOptions } from '../../../api/endpoints';
import { createTransaction } from '../common/map';
import { useActiveTabId } from '../common/useActiveTab';
import { useGridList } from '../useGridList';

export const SyncHistory: FC = () => {
  const tabId = useActiveTabId();
  const list = useGridList();

  const importTransactions = useMutation(importTransactionsOptions);
  const getHistoryGrids = useMutation(getHistoryGridsOptions(tabId));

  if (!tabId) return null;

  return (
    <LoadingButton
      variant='contained'
      loading={importTransactions.isPending || getHistoryGrids.isPending}
      loadingPosition='end'
      endIcon={<SyncIcon />}
      onClick={async () => {
        const response = await getHistoryGrids.mutateAsync();
        const bots = response.result.bots.map((bot) =>
          createTransaction(bot.future_grid, list),
        );
        bots.reverse();
        importTransactions.mutate(bots);
      }}
    >
      Sync history
    </LoadingButton>
  );
};
