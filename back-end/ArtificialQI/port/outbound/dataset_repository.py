from abc import ABC, abstractmethod
from typing import Optional
from uuid import UUID

from artificialqi.core.dataset import Dataset


class DatasetRepository(ABC):

    @abstractmethod
    def delete_dataset(self, id: UUID) -> Optional[UUID]:
        raise NotImplementedError

    @abstractmethod
    def update_dataset(self, dataset: Dataset) -> Optional[Dataset]:
        raise NotImplementedError

    @abstractmethod
    def create_dataset(self, dataset: Dataset) -> Optional[Dataset]:
        raise NotImplementedError

    @abstractmethod
    def get_dataset_by_id(self, id: UUID) -> Optional[Dataset]:
        raise NotImplementedError

    @abstractmethod
    def get_all_datasets(self, q: str) -> Optional[list[Dataset]]:
        raise NotImplementedError

    @abstractmethod
    def delete_with_origin(self, origin: UUID) -> bool:
        raise NotImplementedError