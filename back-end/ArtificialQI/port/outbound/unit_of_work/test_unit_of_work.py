from abc import ABC, abstractmethod

from port.outbound.dataset_repository import DatasetRepository
from port.outbound.qa_repository import QuestionAnswerPairRepository
from port.outbound.test_repository import TestRepository
from port.outbound.test_result_repository import TestResultRepository


class ITestUnitOfWork(ABC):

    dataset_repo: DatasetRepository
    qa_repo: QuestionAnswerPairRepository
    test_repo: TestRepository
    result_repo: TestResultRepository    

    def __enter__(self) -> "ITestUnitOfWork":
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