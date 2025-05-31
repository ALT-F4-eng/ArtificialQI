from abc import ABC, abstractmethod

from artificialqi.port.outbound.dataset_repository import DatasetRepository
from artificialqi.port.outbound.qa_repository import QuestionAnswerPairRepository
from artificialqi.port.outbound.test_repository import TestRepository
from artificialqi.port.outbound.test_result_repository import TestResultRepository


class IDatasetUnitOfWork(ABC):

    dataset_repo: DatasetRepository
    qa_repo: QuestionAnswerPairRepository
    test_repo: TestRepository
    result_repo: TestResultRepository    

    def __enter__(self) -> "IDatasetUnitOfWork":
        return self

    def __exit__(self, exc_type, exc_val, traceback): # type: ignore
        if exc_type is None:
            self.commit()
        else:
            self.rollback()

    @abstractmethod
    def commit(self) -> None:
        raise NotImplementedError

    @abstractmethod
    def rollback(self)->None:
        raise NotImplementedError