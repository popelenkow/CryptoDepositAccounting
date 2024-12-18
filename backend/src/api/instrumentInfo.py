from fastapi import APIRouter

from db.models.instrumentInfo import InstrumentInfo
from db.instrumentInfo import (
    getInstrumentInfos
)

instrumentInfoRouter = APIRouter(prefix="/api/instrumentInfo")

@instrumentInfoRouter.get("/list")
def requestGetInstrumentInfos() -> list[InstrumentInfo]:
    return getInstrumentInfos()
