from pydantic import BaseModel
from artificialqi.models.dataset_dto import DatasetDTO

class DatasetListDTO(BaseModel):
    dataset_list: list[DatasetDTO]