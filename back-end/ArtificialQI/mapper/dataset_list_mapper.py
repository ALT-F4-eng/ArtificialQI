from artificialqi.core.dataset import Dataset
from artificialqi.mapper.dataset_mapper import DatasetDtoMapper
from artificialqi.models.dataset_list_dto import DatasetListDto

class DatasetListDtoMapper:
    
    @staticmethod
    def to_dto( domain: list[Dataset]) -> DatasetListDto:
        return DatasetListDto(
            dataset_list = [DatasetDtoMapper.to_dto(dataset) for dataset in domain]
        )