from uuid import UUID

from pydantic import BaseModel
from core.dataset import Dataset

class DatasetUpdateDto(BaseModel):

    id: UUID
    name: str

    @staticmethod
    def to_domain(dto: "DatasetUpdateDto")->Dataset:
        return Dataset(
            id=dto.id,
            name=dto.name
        )
