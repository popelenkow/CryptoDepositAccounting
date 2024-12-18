import asyncio
import json

from pybit.unified_trading import HTTP

from db.info import getInfo, updateInfo

client = HTTP(testnet=False)


async def syncBtcWorker():
    while True:
        response = client.get_tickers(category="spot", symbol="BTCUSDT")
        btcPrice = response["result"]["list"][0]["lastPrice"]
        info = getInfo()
        info.btcPrice = float(btcPrice)
        updateInfo(info)
        await asyncio.sleep(1)
