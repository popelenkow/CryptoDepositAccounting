import SyncIcon from '@mui/icons-material/Sync';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { importTransactionsOptions } from '../../../api/backend/endpoints';
import {
  getGridDetailOptions,
  getGridHistoryOrdersOptions,
  getGridOrdersOptions,
} from '../../../api/bybit/endpoints';
import { injectTransactionDetail } from '../common/map';
import { useActiveTabId } from '../common/useActiveTab';
import { useGridList } from '../useGridList';

export const SyncDetail: FC = () => {
  const tabId = useActiveTabId();
  const list = useGridList();

  const importTransactions = useMutation(importTransactionsOptions);
  const getGridDetail = useMutation(getGridDetailOptions(tabId));
  const getGridHistoryOrders = useMutation(getGridHistoryOrdersOptions(tabId));
  const getGridOrders = useMutation(getGridOrdersOptions(tabId));

  if (!tabId) return null;

  const openTransactions = list.filter((x) => {
    const { close, detailTimestamp } = x.data;
    if (close === 'pending') {
      return detailTimestamp === 'open';
    }
    return detailTimestamp !== 'close';
  });

  return (
    <LoadingButton
      variant='contained'
      loading={
        importTransactions.isPending ||
        getGridDetail.isPending ||
        getGridHistoryOrders.isPending ||
        getGridOrders.isPending
      }
      loadingPosition='end'
      endIcon={<SyncIcon />}
      onClick={async () => {
        const transactions = openTransactions.slice(0, 5);

        const promise = transactions.map(async (transaction) => {
          const { orderId } = transaction.data;
          const detail = await getGridDetail.mutateAsync(orderId);
          const historyOrders = await getGridHistoryOrders.mutateAsync(orderId);
          const orders =
            detail.result.detail.status === 'RUNNING'
              ? await getGridOrders.mutateAsync(orderId)
              : undefined;
          const data = injectTransactionDetail(
            transaction.data,
            detail.result.detail,
            historyOrders.result.pairs,
            orders?.result,
          );
          return data;
        });
        const newTransactions = await Promise.all(promise);

        importTransactions.mutate(newTransactions);
      }}
    >
      {`Sync detail (${openTransactions.length})`}
    </LoadingButton>
  );
};
