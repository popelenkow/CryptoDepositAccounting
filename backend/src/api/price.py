from fastapi import APIRouter

from db.models.price import CoinId, TimestampPrice
from db.price import getPrices

priceRouter = APIRouter(prefix="/api/price")


@priceRouter.get("/list/{coinId}")
def requestGetPrices(coinId: CoinId) -> list[TimestampPrice]:
    return getPrices(coinId)
