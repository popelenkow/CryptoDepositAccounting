import json

from pybit.unified_trading import HTTP
from db.models.instrumentInfo import InstrumentInfoData
from db.instrumentInfo import importInstrumentInfos

client = HTTP(testnet=False)


def syncInstrumentInfos():
    response = client.get_instruments_info(category="linear")
    result = response["result"]["list"]
    result = [
        InstrumentInfoData.model_validate({
            "instrument": item["symbol"],
            "priceStep": item["priceFilter"]["tickSize"],
            "quantityStep": item["lotSizeFilter"]["qtyStep"]
        })
        for item in response["result"]["list"]
    ]
    importInstrumentInfos(result)
