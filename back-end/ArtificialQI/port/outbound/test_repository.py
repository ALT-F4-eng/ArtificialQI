from abc import ABC, abstractmethod
from typing import Optional
from uuid import UUID

from core.test import Test


class TestRepository(ABC):

    @abstractmethod
    def get_tests_from_dataset(self, dataset: UUID) -> Optional[list[Test]]:
        raise NotImplementedError

    @abstractmethod
    def delete_test(self, id: UUID) -> Optional[UUID]:
        raise NotImplementedError

    @abstractmethod
    def get_test_by_id(self, id: UUID) -> Optional[Test]:
        raise NotImplementedError

    @abstractmethod
    def get_all_tests(self, q: str = "") -> Optional[list[Test]]:
        raise NotImplementedError

    @abstractmethod
    def update_test(self, test: Test) -> Optional[Test]:
        raise NotImplementedError
    
    @abstractmethod
    def get_tests_from_llm(self, llm: UUID) -> Optional[list[Test]]:
        raise NotImplementedError
