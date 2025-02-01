import { InstrumentInfo, TransactionData } from '../api/backend/types';
import { warnDefined } from './assert';
import { getDecimalsStep } from './value';

export const findInstrumentInfo = (
  infos: InstrumentInfo[],
  transaction: TransactionData<'grid'>,
): InstrumentInfo =>
  warnDefined(
    infos.find((info) => info.instrument === transaction.instrument),
    {
      id: -1,
      instrument: transaction.instrument,
      priceStep: Math.min(
        getDecimalsStep(transaction.minPrice),
        getDecimalsStep(transaction.maxPrice),
        getDecimalsStep(transaction.startPrice),
        getDecimalsStep(transaction.endPrice),
      ),
      quantityStep: getDecimalsStep(transaction.quantity),
    },
    `Instrument info not found: ${transaction.instrument}`,
  );
