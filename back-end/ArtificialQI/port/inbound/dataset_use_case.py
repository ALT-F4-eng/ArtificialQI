

from abc import ABC, abstractmethod
from uuid import UUID

from core.dataset import Dataset


class DatasetUseCase(ABC):
    
    @abstractmethod
    def create(self, name: str) -> Dataset:
        raise NotImplementedError
    
    @abstractmethod
    def delete(self, id: UUID) -> UUID:
        raise NotImplementedError
    
    @abstractmethod
    def update(self, dataset: Dataset) -> Dataset:
        raise NotImplementedError
    
    @abstractmethod
    def get_all(self) -> list[Dataset]:
        raise NotImplementedError