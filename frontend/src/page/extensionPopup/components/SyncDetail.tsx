import SyncIcon from '@mui/icons-material/Sync';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { importTransactionsOptions } from '../../../api/backend/endpoints';
import { getGridDetailOptions } from '../../../api/bybit/endpoints';
import { mapSecondsToDays } from '../../../common/time';
import { injectTransactionDetail } from '../common/map';
import { useActiveTabId } from '../common/useActiveTab';
import { useGridList } from '../useGridList';

export const SyncDetail: FC = () => {
  const tabId = useActiveTabId();
  const list = useGridList();

  const importTransactions = useMutation(importTransactionsOptions);
  const getGridDetail = useMutation(getGridDetailOptions(tabId));

  if (!tabId) return null;

  const outdatedTransactions = list.filter((x) => {
    const { close, lastUpdate } = x.data;
    if (close === 'pending') {
      return lastUpdate === 'open';
    }
    return lastUpdate !== 'close';
  });
  const sortedTransactions = list
    .filter((x) => x.data.close === 'pending')
    .sort(
      (a, b) =>
        new Date(a.data.lastUpdate).getTime() -
        new Date(b.data.lastUpdate).getTime(),
    );

  const getText = () => {
    if (outdatedTransactions.length > 0) {
      return `${outdatedTransactions.length} outdated`;
    }
    if (sortedTransactions.length > 0) {
      const today = new Date().getTime();
      const lastUpdate = new Date(
        sortedTransactions[0].data.lastUpdate,
      ).getTime();
      return `${mapSecondsToDays((today - lastUpdate) / 1000).toFixed(2)} days`;
    }
    return '';
  };

  return (
    <LoadingButton
      variant='contained'
      loading={importTransactions.isPending || getGridDetail.isPending}
      loadingPosition='end'
      endIcon={<SyncIcon />}
      onClick={async () => {
        const getTransactions = () => {
          if (outdatedTransactions.length > 0) {
            return outdatedTransactions;
          }
          return sortedTransactions;
        };
        const transactions = getTransactions().slice(0, 5);

        const promise = transactions.map(async (transaction) => {
          const { orderId } = transaction.data;
          const detail = await getGridDetail.mutateAsync(orderId);
          const data = injectTransactionDetail(transaction.data, {
            ...detail.result.detail,
            timestamp: detail.time_now,
          });
          return data;
        });
        const newTransactions = await Promise.all(promise);

        importTransactions.mutate(newTransactions);
      }}
    >
      {`Sync detail (${getText()})`}
    </LoadingButton>
  );
};
