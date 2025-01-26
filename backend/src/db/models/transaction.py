from typing import List, Literal, Optional, Union

from pydantic import RootModel

from db.models.base import BaseModelWithUndefined


class SpotTransactionData(BaseModelWithUndefined):
    orderId: str
    type: Literal["spot"]
    method: Literal["buy", "sell"]
    amount: float
    price: float
    close: Literal["limit", "market"]


class DualTransactionData(BaseModelWithUndefined):
    orderId: str
    type: Literal["dual"]
    method: Literal["buy", "sell"]
    amount: float
    price: float
    duration: float
    apr: float
    close: Literal["pending", "earn", "exchange"]


class GridTransactionData(BaseModelWithUndefined):
    orderId: str
    type: Literal["grid"]
    instrument: str
    amount: float
    minPrice: float
    maxPrice: float
    currentPrice: float
    startPrice: float
    endPrice: float
    startTime: str
    endTime: str
    grids: int
    leverage: float
    duration: float
    trades: int
    total: float
    funding: float
    close: Literal["pending", "manual", "auto"]
    lastUpdate: Union[str, Literal["open", "close"]]


TransactionDataUnion = Union[
    SpotTransactionData,
    DualTransactionData,
    GridTransactionData,
]


class TransactionData(RootModel[TransactionDataUnion]):
    def __getattr__(self, name):
        if hasattr(self.root, name):
            return getattr(self.root, name)
        raise AttributeError(
            f"'{type(self).__name__}' object has no attribute '{name}'"
        )


class Transaction(BaseModelWithUndefined):
    id: int
    data: TransactionData
