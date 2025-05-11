from uuid import UUID
from tools.dataset_name import DatasetName
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from port.dataset import Dataset

class DatasetUseCase:

    def copy_dataset(self, id:UUID) -> 'Dataset':
        #from port.dataset import Dataset
        pass

    def create_dataset_tmp(self) -> 'Dataset':
        #from port.dataset import Dataset
        pass

    def delete_dataset(self, id:UUID) -> UUID:
        #from port.dataset import Dataset
        pass

    def update_dataset(self, name:str, id:UUID) -> 'Dataset':
        #from port.dataset import Dataset
        pass

    def get_all_datasets(self, q:str = '') -> list['Dataset']:
        #from port.dataset import Dataset
        pass

    def get_dataset_by_id(self, id:UUID) -> 'Dataset':
        #from port.dataset import Dataset
        pass

    def save_tmp(self, id:UUID, name:str) -> 'Dataset':
        #from port.dataset import Dataset
        pass

    def create_from_json(self, file:str, name:DatasetName) -> 'Dataset': #DATASETNAME DOVE STA NELLA SCHEMATICA DELLE CLASSI?
        #from port.dataset import Dataset
        pass

    def create_working_copy(self, origin: UUID) -> 'Dataset':
        #from port.dataset import Dataset
        pass