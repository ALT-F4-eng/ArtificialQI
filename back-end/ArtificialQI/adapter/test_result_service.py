from port.inbound.test_result_use_case import TestResultUseCase
from uuid import UUID, uuid4
from typing import Optional
from common.exceptions import *
from core.page import Page
from core.test_result import TestResult
from port.outbound.test_result_repository import TestResultRepository


class TestResultService(TestResultUseCase):
    
    def __init__(self, test_result_repo:TestResultRepository):
        self.test_result_repo:TestResultRepository = test_result_repo

    def get_result_page(self, test_id: UUID, start: int, q: str) -> Page:
        """
        Recupera un una pagina specificata di un test.

        Args:
            test_id (UUID): ID del test.
            p (int): numero della pagina.
            q (str): stringa per filtrare le qa.

        Returns:
            Page: contiene il numero della pagina e una lista di TestResult

        Raises:
            
        """

        test_result_set: Optional[set[TestResult]] = self.test_result_repo.get_results(test_id, start, 25, q)

        if test_result_set is None:
            raise TestNonExistentException(f"Non esiste la pagina del test.")
        
        return Page(start,test_result_set)