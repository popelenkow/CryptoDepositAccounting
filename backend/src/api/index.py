from fastapi import FastAPI

from api.info import infoRouter
from api.instrumentInfo import instrumentInfoRouter
from api.swagger import generateOpenapi, swaggerRouter
from api.transaction import transactionRouter


def includeRouters(app: FastAPI):
    app.include_router(infoRouter)
    app.include_router(instrumentInfoRouter)
    app.include_router(transactionRouter)
    app.include_router(swaggerRouter)

    def openapi() -> dict:
        if not app.openapi_schema:
            app.openapi_schema = generateOpenapi(app)
        return app.openapi_schema

    app.openapi = openapi
