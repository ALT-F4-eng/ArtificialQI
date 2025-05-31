from abc import ABC, abstractmethod
from typing import Optional
from uuid import UUID

from artificialqi.core.test_result import TestResult


class TestResultRepository(ABC):

    @abstractmethod
    def save_results(self, results: list[TestResult]) -> bool:
        raise NotImplementedError

    @abstractmethod
    def get_results(self, test: UUID, offset: int, end: int, q: str = "") -> Optional[set[TestResult]]:
        raise NotImplementedError

    @abstractmethod
    def delete_all_from_test(self, test: UUID) -> bool:
        raise NotImplementedError
