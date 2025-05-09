from uuid import UUID
from port.dataset import Dataset

class DatasetUseCase:

    def copy_dataset(self, id:UUID) -> Dataset:
        pass

    def create_dataset_tmp(self) -> Dataset:
        pass

    def delete_dataset(self, id:UUID) -> UUID:
        pass

    def update_dataset(self, name:str, id:UUID) -> Dataset:
        pass

    def get_all_dataset(self, q:str = '') -> list[Dataset]:
        pass

    def get_dataset_by_id(self, id:UUID) -> Dataset:
        pass

    def save_tmp(self, id:UUID, name:str) -> Dataset:
        pass

    def create_from_json(self, file:str, name:DatasetName) -> Dataset: #DATASETNAME DOVE STA NELLA SCHEMATICA DELLE CLASSI?
        pass

    def create_working_copy(self, origin: UUID) -> Dataset:
        pass