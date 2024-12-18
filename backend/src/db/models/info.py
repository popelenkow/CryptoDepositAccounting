from typing import List

from pydantic import BaseModel, ConfigDict


class DualOffer(BaseModel):
    price: float
    offset: float
    apr: float
    duration: int

    model_config = ConfigDict(exclude_unset=True)


class DualOffersInfo(BaseModel):
    currentTime: str
    startTime: str
    offers: List[DualOffer]

    model_config = ConfigDict(exclude_unset=True)


class Info(BaseModel):
    btcPrice: float
    dualOffersInfo: DualOffersInfo | None = None

    model_config = ConfigDict(exclude_unset=True)


def parseInfo(data: dict) -> Info:
    return Info.model_validate(data)
