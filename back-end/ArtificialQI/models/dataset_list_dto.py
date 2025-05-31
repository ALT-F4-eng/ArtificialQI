from pydantic import BaseModel
from artificialqi.models.dataset_dto import DatasetDto

class DatasetListDto(BaseModel):
    dataset_list: list[DatasetDto]