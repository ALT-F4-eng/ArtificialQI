from pydantic import BaseModel

class DatasetCreateDto(BaseModel):
    name: str
