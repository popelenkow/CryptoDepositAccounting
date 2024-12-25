from fastapi import APIRouter, HTTPException, Request

from db.info import getInfo, updateInfo
from db.models.info import DualOffer, DualOffersInfo, Info
from utils.dual.offer import parseDualOffersHtml
from utils.time import getCurrentDualStartTime, getCurrentTime

infoRouter = APIRouter(prefix="/api/info")


@infoRouter.get("")
def requestGetInfo() -> Info:
    return getInfo()


@infoRouter.post(
    "/dualOffers/html",
    description="[Bybit Dual Asset Mining](https://www.bybit.com/en/earn/dual-asset-mining)",
    openapi_extra={
        "requestBody": {
            "content": {
                "text/plain": {
                    "schema": {"type": "string", "example": "<tbody>...</tbody>"}
                }
            },
            "required": True,
        }
    },
)
async def requestUpdateDualOffersByHtml(request: Request) -> list[DualOffer]:
    try:
        rawHtml = await request.body()
        html = rawHtml.decode("utf-8")
        dualOffers = parseDualOffersHtml(html)
        info = getInfo()
        info.dualOffersInfo = DualOffersInfo(
            offers=dualOffers,
            currentTime=getCurrentTime(),
            startTime=getCurrentDualStartTime(),
        )
        updateInfo(info)

        return dualOffers
    except Exception as error:
        raise HTTPException(status_code=400, detail=str(error))
