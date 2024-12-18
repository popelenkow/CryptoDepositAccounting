from sqlite3 import Cursor

from db.base import dbTables, withDbTransaction
from db.models.price import CoinId, TimestampPrice, TimestampPriceData, parsePrice


@withDbTransaction
def addPrice(data: TimestampPriceData, *, cursor: Cursor) -> TimestampPrice:
    cursor.execute(
        f"""
        INSERT INTO {dbTables.price} (coinId, price, timestamp) VALUES (?, ?, ?)
        """,
        (data.coinId, data.price, data.timestamp),
    )
    id = cursor.lastrowid
    return parsePrice({**data.model_dump(), "id": id})


@withDbTransaction
def getPrices(coinId: CoinId, *, cursor: Cursor) -> list[TimestampPrice]:
    cursor.execute(
        f"""
        SELECT * 
        FROM {dbTables.price} 
        WHERE coinId = ?
        ORDER BY timestamp DESC
        """,
        (coinId,),
    )

    rows = cursor.fetchall()

    return [parsePrice(dict(row)) for row in rows]
