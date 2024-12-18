import asyncio

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.index import includeRouters
from db.base import initDb
from worker.btc import syncBtcWorker
from worker.price import subscribePrices
from worker.instrumentInfo import syncInstrumentInfos


async def lifespan(app: FastAPI):
    initDb()
    asyncio.create_task(syncBtcWorker())
    subscribePrices()
    syncInstrumentInfos()
    yield


app = FastAPI(lifespan=lifespan, docs_url=None, redoc_url=None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

includeRouters(app)
