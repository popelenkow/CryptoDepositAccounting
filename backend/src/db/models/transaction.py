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
    leverage: float
    totalProfit: float
    spotProfit: float
    fundingProfit: float
    gridProfit: float
    trades: int
    grids: int
    quantity: float
    minPrice: float
    maxPrice: float
    startPrice: float
    endPrice: float
    duration: float
    startTime: str
    endTime: str
    detailTime: str
    detailStatus: Literal["init", "pending", "close"]
    profitStatus: Literal["init", "infoError", "done"]
    close: Literal["pending", "manual", "auto"]


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
