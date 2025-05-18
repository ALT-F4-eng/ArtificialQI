from abc import ABC, abstractmethod
from uuid import UUID

from core.test import Test


class TestUseCase(ABC):

    @abstractmethod
    def run_test(self, dataset: UUID, llm: UUID) -> Test:
        raise NotImplementedError

    @abstractmethod
    def delete_test(self, id: UUID) -> UUID:
        raise NotImplementedError

    @abstractmethod
    def update_test(self, id: UUID, name: str) -> Test:
        raise NotImplementedError

    @abstractmethod
    def save(self, id: UUID) -> Test:
        raise NotImplementedError

    @abstractmethod
    def get_all_tests(self, q: str = "") -> list[Test]:
        raise NotImplementedError

    @abstractmethod
    def get_test_by_id(self, id: UUID) -> Test:
        raise NotImplementedError
