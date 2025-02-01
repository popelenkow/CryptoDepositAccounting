import SyncIcon from '@mui/icons-material/Sync';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { importTransactionsOptions } from '../../../api/backend/endpoints';
import { getGridsOptions } from '../../../api/bybit/endpoints';
import { calcTransactionProfits, createTransaction } from '../common/map';
import { useActiveTabId } from '../common/useActiveTab';
import { useGridList } from '../useGridList';

export const SyncActual: FC = () => {
  const { t } = useTranslation();
  const tabId = useActiveTabId();
  const { transactions, infos } = useGridList();

  const importTransactions = useMutation(importTransactionsOptions);
  const getGrids = useMutation(getGridsOptions(tabId));

  if (!tabId) return null;

  return (
    <LoadingButton
      variant='contained'
      loading={importTransactions.isPending || getGrids.isPending}
      loadingPosition='end'
      endIcon={<SyncIcon />}
      onClick={async () => {
        const response = await getGrids.mutateAsync();
        const newTransactions = response.result.bots
          .map((bot) => createTransaction(bot.future_grid, transactions))
          .map((transaction) => calcTransactionProfits(transaction, infos));
        newTransactions.reverse();
        importTransactions.mutate(newTransactions);
      }}
    >
      {t('page.extensionPopup.syncActual')}
    </LoadingButton>
  );
};
