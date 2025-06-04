from abc import ABC, abstractmethod
from typing import Optional
from uuid import UUID

from core.dataset import Dataset

class DatasetRepository(ABC):

    @abstractmethod
    def create(self, dataset: Dataset) -> Optional[Dataset]:
        raise NotImplementedError

    @abstractmethod
    def delete(self, id: UUID) -> Optional[UUID]:
        raise NotImplementedError

    @abstractmethod
    def update(self, dataset: Dataset) -> Optional[Dataset]:
        raise NotImplementedError

    @abstractmethod
    def get_all(self) -> Optional[list[Dataset]]:
        raise NotImplementedError
    
    @abstractmethod
    def find_by_name(self, name: str) -> Optional[Dataset]:
        raise NotImplementedError
    
    @abstractmethod
    def get_by_id(self, id: UUID) -> Optional[Dataset]:
        raise NotImplementedError