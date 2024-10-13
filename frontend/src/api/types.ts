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

export type SpotTransactionData = {
  orderId: string;
  type: 'spot';
  method: 'buy' | 'sell';
  amount: number;
  price: number;
  close: 'limit' | 'market';
};
export type SpotTransaction = SpotTransactionData & { id: number };

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
export type DualTransaction = DualTransactionData & { id: number };

export type GridTransactionData = {
  orderId: string;
  type: 'grid';
  symbol: string;
  amount: number;
  price: number;
  priceMin: number;
  priceMax: number;
  priceCurrent: number;
  grids: number;
  leverage: number;
  duration: number;
  trades: number;
  pnl: number;
  close: 'pending' | 'manual' | 'auto';
  method?: undefined;
};
export type GridTransaction = GridTransactionData & { id: number };

export type TransactionData =
  | SpotTransactionData
  | DualTransactionData
  | GridTransactionData;
export type Transaction = SpotTransaction | DualTransaction | GridTransaction;
