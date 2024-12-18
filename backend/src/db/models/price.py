from typing import Literal

from pydantic import BaseModel, ConfigDict

CoinId = Literal["NEARUSDT", "BTCUSDT", "1000PEPEUSDT"]


class TimestampPrice(BaseModel):
    id: int
    coinId: CoinId
    price: float
    timestamp: int

    model_config = ConfigDict(exclude_unset=True)


class TimestampPriceData(TimestampPrice):
    id: None = None

    def model_dump(self, *args, **kwargs):
        data = super().model_dump(*args, **kwargs)
        data.pop("id", None)
        return data


def parsePrice(data: dict) -> TimestampPrice:
    return TimestampPrice.model_validate(data)


def parsePriceData(data: dict) -> TimestampPriceData:
    return TimestampPriceData.model_validate(data)
