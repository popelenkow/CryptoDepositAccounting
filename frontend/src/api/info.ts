import { request } from './request';

export type DualOffer = {
  price: number;
  offset: number;
  apr: number;
  duration: number;
};

export type DualOffersInfo = {
  currentTime: string;
  startTime: string;
  offers: DualOffer[];
};

export type Info = {
  btcPrice: number;
  dualOffersInfo?: DualOffersInfo;
};

export const requestGetInfo = () =>
  request<Info>({
    method: 'get',
    endpoint: '/info',
  });

export const requestUpdateDualOffersByHtml = (textBody: string) =>
  request<DualOffer[]>({
    method: 'post',
    endpoint: '/info/dualOffers/html',
    textBody,
  });
