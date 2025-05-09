from port.dataset import Dataset
from tools.dataset_dto import DatasetDto

class DatasetDtoMapper:
    def __init__(self):
        self.page_size = 10 #BO, NON SO

    def to_dto(self, dataset: Dataset) -> DatasetDto:
        total_elements = dataset.get_dim()
        max_page = (total_elements + self.page_size - 1) // self.page_size
        return DatasetDto(
            dataset.get_id(),
            dataset.get_name(),
            dataset.get_first_save_date(),
            dataset.get_first_save_date(),
            dataset.get_origin(),
            dataset.is_tmp(),
            max_page,
            total_elements
        ).to_dict()
    
    def to_domain(self, dto:DatasetDto) -> Dataset:
        return Dataset(
            id=dto.get_id(),
            dim=dto.get_element_n(),
            name=dto.get_name(),
            first_save_date=dto.get_first_save(),
            tmp=dto.is_tmp(),
            origin=dto.get_origin_id()
        )