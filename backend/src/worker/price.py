from pybit.unified_trading import WebSocket

from db.models.price import CoinId, TimestampPriceData
from db.price import addPrice


def subscribePrice(ws: WebSocket, coinId: CoinId):
    last: TimestampPriceData = None

    def handlePrice(message: dict):
        nonlocal last
        data = TimestampPriceData(
            coinId=coinId,
            price=float(message["data"]["lastPrice"]),
            timestamp=int(message["ts"]),
        )

        if last is not None and (
            last.price == data.price or data.timestamp - last.timestamp < 1000
        ):
            return

        last = data
        addPrice(data)

    try:
        print(f"Subscribe to: {coinId}")
        ws.subscribe(topic=f"tickers.{coinId}", symbol="", callback=handlePrice)
    except Exception as error:
        print(f"Failed to subscribe to {coinId}: {error}")


def subscribePrices():
    try:
        ws = WebSocket(channel_type="linear", testnet=False)

        subscribePrice(ws, "NEARUSDT")
        subscribePrice(ws, "1000PEPEUSDT")

    except Exception as error:
        print(f"WebSocket error occurred: {error}")
