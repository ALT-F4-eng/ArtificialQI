from artificialqi.core.dataset import Dataset
from artificialqi.mapper.dataset_mapper import DatasetDtoMapper
from artificialqi.models.dataset_list_dto import DatasetListDTO

class DatasetListDtoMapper:
    
    @staticmethod
    def to_dto( domain: list[Dataset]) -> DatasetListDTO:
        return DatasetListDTO(
            dataset_list = [DatasetDtoMapper.to_dto(dataset) for dataset in domain]
        )