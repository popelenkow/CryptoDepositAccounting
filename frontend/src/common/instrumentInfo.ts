import { InstrumentInfo } from '../api/backend/types';
import { warnDefined } from './assert';

export const findInstrumentInfo = (
  infos: InstrumentInfo[],
  instrument: string,
): InstrumentInfo =>
  warnDefined(
    infos.find((info) => info.instrument === instrument),
    {
      id: -1,
      instrument,
      priceStep: 1,
      quantityStep: 1,
    },
    `Instrument info not found: ${instrument}`,
  );
