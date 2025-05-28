from pydantic import BaseModel
from models.DatasetDTO import DatasetDTO

class DatasetListDTO(BaseModel):
    dataset_list: list[DatasetDTO]