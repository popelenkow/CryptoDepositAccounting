from typing import Literal, Union

from pydantic import BaseModel, ConfigDict

class SpotTransaction(BaseModel):
    id: int
    orderId: str
    type: Literal["spot"]
    method: Literal["buy", "sell"]
    amount: float
    price: float
    close: Literal["limit", "market"]

    model_config = ConfigDict(exclude_unset=True)


class SpotTransactionData(SpotTransaction):
    id: None = None

    def model_dump(self, *args, **kwargs):
        data = super().model_dump(*args, **kwargs)
        data.pop("id", None)
        return data

class DualTransaction(BaseModel):
    id: int
    orderId: str
    type: Literal["dual"]
    method: Literal["buy", "sell"]
    amount: float
    price: float
    duration: float
    apr: float
    close: Literal["pending", "earn", "exchange"]

    model_config = ConfigDict(exclude_unset=True)


class DualTransactionData(DualTransaction):
    id: None = None

    def model_dump(self, *args, **kwargs):
        data = super().model_dump(*args, **kwargs)
        data.pop("id", None)
        return data
      
class GridTransaction(BaseModel):
    id: int
    orderId: str
    type: Literal["grid"]
    symbol: str
    amount: float
    price: float
    priceMin: float
    priceMax: float
    priceCurrent: float
    grids: int
    leverage: float
    duration: float
    trades: int
    pnl: float
    close: Literal["pending", 'manual' , 'auto']

    model_config = ConfigDict(exclude_unset=True)


class GridTransactionData(GridTransaction):
    id: None = None

    def model_dump(self, *args, **kwargs):
        data = super().model_dump(*args, **kwargs)
        data.pop("id", None)
        return data

Transaction = Union[
    SpotTransaction, DualTransaction, GridTransaction
]
TransactionData = Union[
   SpotTransactionData,
    DualTransactionData,
    GridTransactionData
]


def parseTransaction(data: dict) -> Transaction:
    if data.get("type") == "spot":
          return SpotTransaction.model_validate(data)
    if data.get("type") == "dual":
          return DualTransaction.model_validate(data)
    if data.get("type") == "grid":
          return GridTransaction.model_validate(data)
    raise ValueError(f"Invalid project data: {data}")


def parseTransactionData(data: dict) -> TransactionData:
    if data.get("type") == "spot":
        return SpotTransactionData.model_validate(data)
    if data.get("type") == "dual":
        return DualTransactionData.model_validate(data)
    if data.get("type") == "grid":
        return GridTransactionData.model_validate(data)
    raise ValueError(f"Invalid project data: {data}")
