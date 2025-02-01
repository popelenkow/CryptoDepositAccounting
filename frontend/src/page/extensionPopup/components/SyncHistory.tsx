import SyncIcon from '@mui/icons-material/Sync';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { importTransactionsOptions } from '../../../api/backend/endpoints';
import { getHistoryGridsOptions } from '../../../api/bybit/endpoints';
import { calcTransactionProfits, createTransaction } from '../common/map';
import { useActiveTabId } from '../common/useActiveTab';
import { useGridList } from '../useGridList';

export const SyncHistory: FC = () => {
  const { t } = useTranslation();
  const tabId = useActiveTabId();
  const { transactions, infos } = useGridList();

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
        const newTransactions = response.result.bots
          .filter(
            (bot) =>
              bot.future_grid.close_detail?.bot_close_code !==
              'BOT_CLOSE_CODE_FAILED_INITIATION',
          )
          .map((bot) => createTransaction(bot.future_grid, transactions))
          .map((transaction) => calcTransactionProfits(transaction, infos));
        newTransactions.reverse();
        importTransactions.mutate(newTransactions);
      }}
    >
      {t('page.extensionPopup.syncHistory')}
    </LoadingButton>
  );
};
