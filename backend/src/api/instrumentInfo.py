from fastapi import APIRouter

from db.instrumentInfo import getInstrumentInfos
from db.models.instrumentInfo import InstrumentInfo

instrumentInfoRouter = APIRouter(prefix="/api/instrumentInfo")


@instrumentInfoRouter.get("/list")
def requestGetInstrumentInfos() -> list[InstrumentInfo]:
    return getInstrumentInfos()
