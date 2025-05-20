from abc import ABC, abstractmethod
from typing import Optional
from uuid import UUID

from core.test_result import TestResult


class TestResultRepository(ABC):

    @abstractmethod
    def save_results(self, results: list[TestResult]) -> bool:
        raise NotImplementedError

    @abstractmethod
    def get_results(self, test_id: UUID, start: int, offset: int, q: str = "") -> Optional[set[TestResult]]:
        raise NotImplementedError

    @abstractmethod
    def delete_all_from_test(self, test: UUID) -> bool:
        raise NotImplementedError
