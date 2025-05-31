from abc import ABC, abstractmethod
from artificialqi.port.outbound.dataset_repository import DatasetRepository
from artificialqi.port.outbound.qa_repository import QuestionAnswerPairRepository

class IQaUnitOfWork(ABC):

    dataset_repo: DatasetRepository
    qa_repo: QuestionAnswerPairRepository

    def __enter__(self) -> "IQaUnitOfWork":
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