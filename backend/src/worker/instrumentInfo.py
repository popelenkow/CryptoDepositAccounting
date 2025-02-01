import json

from pybit.unified_trading import HTTP

from db.instrumentInfo import importInstrumentInfos
from db.models.instrumentInfo import InstrumentInfoData

client = HTTP(testnet=False)


def syncInstrumentInfos():
    allResults = []
    cursor = None

    while True:
        params = {"category": "linear", "limit": 500}
        if cursor:
            params["cursor"] = cursor

        response = client.get_instruments_info(**params)
        result = response["result"]["list"]

        allResults.extend(
            [
                InstrumentInfoData.model_validate(
                    {
                        "instrument": item["symbol"],
                        "priceStep": item["priceFilter"]["tickSize"],
                        "quantityStep": item["lotSizeFilter"]["qtyStep"],
                    }
                )
                for item in result
            ]
        )

        cursor = response["result"].get("nextPageCursor")
        if not cursor:
            break

    importInstrumentInfos(allResults)
