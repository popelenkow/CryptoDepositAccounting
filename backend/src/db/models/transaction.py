from typing import Literal, Union

from pydantic import BaseModel, ConfigDict


class BuyDualTransaction(BaseModel):
    id: int
    orderId: str
    type: Literal["dual"]
    method: Literal["buy"]
    amount: float
    price: float
    duration: float
    apr: float
    close: Literal["pending", "earn", "buy"]

    model_config = ConfigDict(exclude_unset=True)


class BuyDualTransactionData(BuyDualTransaction):
    id: None = None

    def model_dump(self, *args, **kwargs):
        data = super().model_dump(*args, **kwargs)
        data.pop("id", None)
        return data


class SellDualTransaction(BaseModel):
    id: int
    orderId: str
    type: Literal["dual"]
    method: Literal["sell"]
    amount: float
    price: float
    duration: float
    apr: float
    close: Literal["pending", "earn", "sell"]

    model_config = ConfigDict(exclude_unset=True)


class SellDualTransactionData(SellDualTransaction):
    id: None = None

    def model_dump(self, *args, **kwargs):
        data = super().model_dump(*args, **kwargs)
        data.pop("id", None)
        return data


class BuySpotTransaction(BaseModel):
    id: int
    orderId: str
    type: Literal["spot"]
    method: Literal["buy"]
    amount: float
    price: float
    close: Literal["limit", "market"]

    model_config = ConfigDict(exclude_unset=True)


class BuySpotTransactionData(BuySpotTransaction):
    id: None = None

    def model_dump(self, *args, **kwargs):
        data = super().model_dump(*args, **kwargs)
        data.pop("id", None)
        return data


class SellSpotTransaction(BaseModel):
    id: int
    orderId: str
    type: Literal["spot"]
    method: Literal["sell"]
    amount: float
    price: float
    close: Literal["limit", "market"]

    model_config = ConfigDict(exclude_unset=True)


class SellSpotTransactionData(SellSpotTransaction):
    id: None = None

    def model_dump(self, *args, **kwargs):
        data = super().model_dump(*args, **kwargs)
        data.pop("id", None)
        return data


Transaction = Union[
    BuyDualTransaction, SellDualTransaction, BuySpotTransaction, SellSpotTransaction
]
TransactionData = Union[
    BuyDualTransactionData,
    SellDualTransactionData,
    BuySpotTransactionData,
    SellSpotTransactionData,
]


def parseTransaction(data: dict) -> Transaction:
    if data.get("type") == "dual" and data.get("method") == "buy":
        return BuyDualTransaction.model_validate(data)
    if data.get("type") == "dual" and data.get("method") == "sell":
        return SellDualTransaction.model_validate(data)
    if data.get("type") == "spot" and data.get("method") == "buy":
        return BuySpotTransaction.model_validate(data)
    if data.get("type") == "spot" and data.get("method") == "sell":
        return SellSpotTransaction.model_validate(data)
    raise ValueError(f"Invalid project data: {data}")


def parseTransactionData(data: dict) -> TransactionData:
    if data.get("type") == "dual" and data.get("method") == "buy":
        return BuyDualTransactionData.model_validate(data)
    if data.get("type") == "dual" and data.get("method") == "sell":
        return SellDualTransactionData.model_validate(data)
    if data.get("type") == "spot" and data.get("method") == "buy":
        return BuySpotTransactionData.model_validate(data)
    if data.get("type") == "spot" and data.get("method") == "sell":
        return SellSpotTransactionData.model_validate(data)
    raise ValueError(f"Invalid project data: {data}")
