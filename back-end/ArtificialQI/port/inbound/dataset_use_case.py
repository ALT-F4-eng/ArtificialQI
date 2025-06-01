from abc import ABC, abstractmethod
from uuid import UUID
from typing import BinaryIO

from artificialqi.port.outbound.file_qa_reader import IQuestionAnswerFileReader
from artificialqi.core.dataset import Dataset


class DatasetUseCase(ABC):

    @abstractmethod
    def copy_dataset(self, id: UUID) -> Dataset:
        raise NotImplementedError

    @abstractmethod
    def create_dataset_tmp(self) -> Dataset:
        raise NotImplementedError

    @abstractmethod
    def delete_dataset(self, id: UUID) -> UUID:
        raise NotImplementedError

    @abstractmethod
    def update_dataset(self, name: str, id: UUID) -> Dataset:
        raise NotImplementedError

    @abstractmethod
    def get_all_datasets(self, q: str = "") -> list[Dataset]:
        raise NotImplementedError

    @abstractmethod
    def get_dataset_by_id(self, id: UUID) -> Dataset:
        raise NotImplementedError

    @abstractmethod
    def save_tmp(self, id: UUID, name: str) -> Dataset:
        raise NotImplementedError

    @abstractmethod
    def save_working_copy(self, id: UUID) -> Dataset:
        raise NotImplementedError

    @abstractmethod
    def create_from_file(self, file_stream: BinaryIO, name: str,  file_reader: IQuestionAnswerFileReader) -> Dataset:
        raise NotImplementedError

    @abstractmethod
    def create_working_copy(self, origin: UUID) -> Dataset:
        raise NotImplementedError
