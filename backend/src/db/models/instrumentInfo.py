from db.models.base import BaseModelWithUndefined


class InstrumentInfoData(BaseModelWithUndefined):
    instrument: str
    priceStep: float
    quantityStep: float


class InstrumentInfo(BaseModelWithUndefined):
    id: int
    instrument: str
    priceStep: float
    quantityStep: float
