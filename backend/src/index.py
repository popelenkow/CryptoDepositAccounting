import asyncio
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from api.index import includeRouters
from common.path import frontendPath
from db.base import initDb
from worker.btc import syncBtcWorker
from worker.instrumentInfo import syncInstrumentInfos
from worker.price import subscribePrices


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

if os.path.exists(frontendPath):
    app.mount("/", StaticFiles(directory=frontendPath, html=True), name="frontend")
else:
    print("Run without frontend files")
