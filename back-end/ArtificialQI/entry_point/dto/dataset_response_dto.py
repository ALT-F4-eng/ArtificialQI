from uuid import UUID
from datetime import date

from core.dataset import Dataset
from pydantic import BaseModel

class DatasetResponseDto(BaseModel):

    id: UUID
    name: str
    creation_date: date

    @staticmethod
    def to_dto(domain: Dataset)->"DatasetResponseDto":
        return DatasetResponseDto(
            id=domain.id,
            name=domain.name,
            creation_date=domain.creation_date
        )


class DatasetResponseListDto(BaseModel):

    datasets: list[DatasetResponseDto]

    @staticmethod
    def to_dto(domain: list[Dataset])->"DatasetResponseListDto":
        return DatasetResponseListDto(datasets=[DatasetResponseDto.to_dto(d) for d in domain])
