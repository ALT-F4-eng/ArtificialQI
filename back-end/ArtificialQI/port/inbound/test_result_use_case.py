from abc import ABC, abstractmethod
from uuid import UUID

from core.page import Page
from core.test_result import TestResult


class TestResultUseCase(ABC):

    @abstractmethod
    def get_result_page(self, test_id: UUID, page_n: int, q:str="") -> Page[TestResult]:
        raise NotImplementedError