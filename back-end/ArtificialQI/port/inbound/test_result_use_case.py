from abc import ABC, abstractmethod

from core.page import Page


class TestResultUseCase(ABC):

    @abstractmethod
    def get_result_page(self, page: int, q:str="") -> Page:
        raise NotImplementedError