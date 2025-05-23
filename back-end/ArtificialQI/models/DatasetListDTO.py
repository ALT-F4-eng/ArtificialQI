from pydantic import BaseModel
from datetime import date
from models.DatasetDTO import DatasetDTO

class DatasetListDTO(BaseModel):
    dataset_list: list[DatasetDTO]