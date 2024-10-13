from fastapi import APIRouter, FastAPI, Response
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.openapi.utils import get_openapi
from fastapi.routing import APIRoute

swaggerRouter = APIRouter()


@swaggerRouter.get("/docs", include_in_schema=False)
async def getDocs():
    swagger_ui_html = get_swagger_ui_html(
        openapi_url="/openapi.json",
        title="Swagger UI",
    )

    htmlText = (
        swagger_ui_html.body.decode("utf-8")
        + '<link type="text/css" rel="stylesheet" href="https://popelenkow.github.io/SwaggerDark/SwaggerDark.css">'
    )

    return Response(content=htmlText, media_type="text/html")


def renameOperationIds(openapiSchema: dict, routes: list[APIRoute]) -> None:
    for route in routes:
        name = route.endpoint.__name__
        for method in map(str.lower, route.methods or []):
            pathSchema = openapiSchema["paths"].get(route.path, {})
            if method in pathSchema:
                pathSchema[method]["operationId"] = name
                pathSchema[method]["summary"] = name


def generateOpenapi(app: FastAPI) -> dict:
    openapiSchema = get_openapi(
        title=app.title,
        version=app.version,
        description=app.description,
        routes=app.routes,
    )
    renameOperationIds(
        openapiSchema, [route for route in app.routes if hasattr(route, "endpoint")]
    )
    return openapiSchema
