from tools.dataset_list_dto import DatasetListDto
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from port.dataset import Dataset

class DatasetListDtoMapper:
    def to_dto(self, datasets:list['Dataset']) -> DatasetListDto:
        return DatasetListDto(datasets).to_dict()

    def to_domain(self, dto:DatasetListDto) -> list['Dataset']:
        from port.dataset import Dataset
        return [Dataset(datasetdto.get_id(), 
                        datasetdto.get_element_n(), 
                        datasetdto.get_name(), 
                        datasetdto.get_first_save(), 
                        datasetdto.is_tmp(), 
                        datasetdto.get_origin_id()) for datasetdto in dto.get_datasets()]