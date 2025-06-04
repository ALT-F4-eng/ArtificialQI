from uuid import UUID, uuid4
from datetime import date
from typing import Optional

from common.exceptions import PersistenceError, DatasetNonExsistentError, DuplicateNameDatasetError
from port.inbound.dataset_use_case import DatasetUseCase
from port.outbound.dataset_repository import DatasetRepository
from core.dataset import Dataset

class DatasetService(DatasetUseCase):
        
    def __init__(self, dataset_repo: DatasetRepository):
        self._dataset_repo = dataset_repo

    def create(self, name: str) -> Dataset:
        to_create: Dataset = Dataset(
            _name=name,
            _id=uuid4(),
            _creation_date=date.today()
        )

        dataset_exists: Optional[Dataset] = self._dataset_repo.find_by_name(name)

        if not dataset_exists is None:
            raise DuplicateNameDatasetError(name)
        
        created_dataset: Optional[Dataset] = self._dataset_repo.create(to_create)

        if created_dataset is None:
            raise PersistenceError("Errore durante la creazione del dataset.")
        
        return created_dataset
    
    def delete(self, id: UUID) -> UUID:
        
        to_delete: Optional[Dataset] = self._dataset_repo.get_by_id(id)

        if to_delete is None:
            raise DatasetNonExsistentError(id)
        
        delete_res: Optional[UUID] = self._dataset_repo.delete(id)

        if delete_res is None:
            raise PersistenceError("Errore durante l'eliminazione del dataset.")
        
        return id
    
    def update(self, dataset: Dataset) -> Dataset:

        to_update: Optional[Dataset] = self._dataset_repo.get_by_id(dataset.id)

        if to_update is None:
            raise DatasetNonExsistentError(dataset.id)
        
        update_res: Optional[Dataset] = self._dataset_repo.update(dataset)

        if update_res is None:
            raise PersistenceError("Errore durante l'aggiornamento del dataset.")
        
        return update_res
    
    def get_all(self) -> list[Dataset]:
        
        datasets: Optional[list[Dataset]] = self._dataset_repo.get_all()

        if datasets is None:
            raise PersistenceError("Errore durante l'ottenimento dei dataset.")
        
        return datasets