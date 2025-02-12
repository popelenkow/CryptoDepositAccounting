import SyncIcon from '@mui/icons-material/Sync';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { importTransactionsOptions } from '../../../api/backend/endpoints';
import {
  getGridDetailOptions,
  getGridHistoryOrdersOptions,
} from '../../../api/bybit/endpoints';
import { mapSecondsToDays } from '../../../common/time';
import { calcTransactionProfits, injectTransactionDetail } from '../common/map';
import { useActiveTabId } from '../common/useActiveTab';
import { useGridList } from '../useGridList';

export const SyncDetail: FC = () => {
  const { t } = useTranslation();
  const tabId = useActiveTabId();
  const { transactions, infos } = useGridList();

  const importTransactions = useMutation(importTransactionsOptions);
  const getGridDetail = useMutation(getGridDetailOptions(tabId));
  const getGridHistoryOrders = useMutation(getGridHistoryOrdersOptions(tabId));

  if (!tabId) return null;

  const outdatedTransactions = transactions.filter((x) => {
    const { close, detailStatus } = x.data;
    if (close === 'pending') {
      return detailStatus === 'init';
    }
    return detailStatus !== 'close';
  });
  const sortedTransactions = transactions
    .filter((x) => x.data.close === 'pending')
    .sort(
      (a, b) =>
        new Date(a.data.detailTime).getTime() -
        new Date(b.data.detailTime).getTime(),
    );

  const getText = () => {
    if (outdatedTransactions.length > 0) {
      const value = outdatedTransactions.length;
      return t('page.extensionPopup.syncDetail.outdated', { value });
    }
    if (sortedTransactions.length > 0) {
      const today = new Date().getTime();
      const lastUpdate = new Date(
        sortedTransactions[0].data.detailTime,
      ).getTime();
      const value = mapSecondsToDays((today - lastUpdate) / 1000).toFixed(2);
      return t('page.extensionPopup.syncDetail.days', { value });
    }
    return t('page.extensionPopup.syncDetail.none');
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

        const promise = getTransactions()
          .slice(0, 5)
          .map(async (transaction) => {
            const { orderId } = transaction.data;
            const detail = await getGridDetail.mutateAsync(orderId);
            const orders = await getGridHistoryOrders.mutateAsync(orderId);
            const data = injectTransactionDetail(transaction.data, {
              ...detail.result.detail,
              timestamp: detail.time_now,
              quantity: orders.result.pairs[0].open_order.quantity,
            });
            const result = calcTransactionProfits(data, infos);
            return result;
          });
        const newTransactions = await Promise.all(promise);
        importTransactions.mutate(newTransactions);
      }}
    >
      {t('page.extensionPopup.syncDetail.button', { text: getText() })}
    </LoadingButton>
  );
};
