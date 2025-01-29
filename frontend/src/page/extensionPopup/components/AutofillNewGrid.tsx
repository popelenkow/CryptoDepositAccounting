import SyncIcon from '@mui/icons-material/Sync';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  fillGridParametersOptions,
  getGridCurrentPriceOptions,
} from '../../../api/bybit/endpoints';
import { roundTo } from '../../../common/value';
import { useActiveTabId } from '../common/useActiveTab';

export const AutofillNewGrid: FC = () => {
  const { t } = useTranslation();
  const tabId = useActiveTabId();

  const getGridCurrentPrice = useMutation(getGridCurrentPriceOptions(tabId));
  const fillGridParameters = useMutation(fillGridParametersOptions(tabId));

  if (!tabId) return null;

  return (
    <LoadingButton
      variant='contained'
      loading={getGridCurrentPrice.isPending || fillGridParameters.isPending}
      loadingPosition='end'
      endIcon={<SyncIcon />}
      onClick={async () => {
        const price = await getGridCurrentPrice.mutateAsync();
        await fillGridParameters.mutateAsync({
          from: roundTo(price * 0.8, 6),
          to: roundTo(price * 1.2, 6),
          leverage: 1,
          grids: 92,
        });
      }}
    >
      {t('page.extensionPopup.autofillNewGrid')}
    </LoadingButton>
  );
};
