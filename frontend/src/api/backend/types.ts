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
  dualOffersInfo?: DualOffersInfo | null;
};

export type InstrumentInfo = {
  id: number;
  instrument: string;
  priceStep: number;
  quantityStep: number;
};

export type SpotTransactionData = {
  orderId: string;
  type: 'spot';
  method: 'buy' | 'sell';
  amount: number;
  price: number;
  close: 'limit' | 'market';
};

export type DualTransactionData = {
  orderId: string;
  type: 'dual';
  method: 'buy' | 'sell';
  amount: number;
  price: number;
  duration: number;
  apr: number;
  close: 'pending' | 'earn' | 'exchange';
};

export type GridTransactionData = {
  orderId: string;
  type: 'grid';
  instrument: string;
  amount: number;
  leverage: number;
  totalProfit: number;
  spotProfit: number;
  fundingProfit: number;
  gridProfit: number;
  trades: number;
  grids: number;
  quantity: number;
  minPrice: number;
  maxPrice: number;
  startPrice: number;
  endPrice: number;
  duration: number;
  startTime: string;
  endTime: string;
  detailTime: string;
  detailStatus: 'init' | 'pending' | 'close';
  profitStatus: 'init' | 'infoError' | 'done';
  close: 'pending' | 'manual' | 'auto';
};

type TransactionDataDict = {
  spot: SpotTransactionData;
  dual: DualTransactionData;
  grid: GridTransactionData;
};
export type TransactionDataKey = keyof TransactionDataDict;

export type TransactionData<
  Key extends TransactionDataKey = TransactionDataKey,
> = TransactionDataDict[Key];

export type Transaction<Key extends TransactionDataKey = TransactionDataKey> = {
  id: number;
  data: TransactionData<Key>;
};
