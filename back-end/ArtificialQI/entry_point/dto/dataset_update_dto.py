from uuid import UUID

from pydantic import BaseModel
from core.dataset import Dataset

class DatasetUpdateDto(BaseModel):

    id: UUID
    name: str

    @staticmethod
    def to_domain(dto: "DatasetUpdateDto")->Dataset:
        return Dataset(
            _id=dto.id,
            _name=dto.name
    )
