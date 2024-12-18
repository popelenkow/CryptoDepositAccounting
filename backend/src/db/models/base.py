from pydantic import BaseModel, ConfigDict


class BaseModelWithUndefined(BaseModel):
    model_config = ConfigDict(exclude_none=True, exclude_unset=True)

