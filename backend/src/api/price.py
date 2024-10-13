from fastapi import APIRouter

from db.models.price import CoinId, TimestampPrice
from db.price import (
    getPrices,
)

transactionRouter = APIRouter(prefix="/api/price")

@transactionRouter.get("/list/{coinId}")
def requestGetTransactions(coinId: CoinId) -> list[TimestampPrice]:
    return getPrices(coinId)
