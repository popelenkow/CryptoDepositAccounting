import asyncio
import json
from pybit.unified_trading import HTTP

from db.info import getInfo, updateInfo

client = HTTP(testnet=False)


async def syncBtcWorker():
    response = client.get_instruments_info(
      category="linear"
    )
    with open("response.json", "w", encoding="utf-8") as json_file:
      json.dump(response, json_file, indent=4, ensure_ascii=False)


    while True:
        response = client.get_tickers(category="spot", symbol="BTCUSDT")
        btcPrice = response["result"]["list"][0]["lastPrice"]
        info = getInfo()
        info.btcPrice = float(btcPrice)
        updateInfo(info)
        await asyncio.sleep(1)
