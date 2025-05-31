from uuid import UUID
from typing import Optional

from artificialqi.common.exceptions import (PersistenceException, PageNonExistentException, TestNonExistentException)
from artificialqi.core.page import Page
from artificialqi.core.test_result import TestResult
from artificialqi.port.inbound.test_result_use_case import TestResultUseCase
from artificialqi.port.outbound.unit_of_work.test_result_unit_of_work import ITestResultUnitOfWork


class TestResultService(TestResultUseCase):
    
    def __init__(self, test_result_unit_of_work:ITestResultUnitOfWork):
        self._unit_of_work:ITestResultUnitOfWork = test_result_unit_of_work

    def get_result_page(self, test_id: UUID, page_n: int, q: str="") -> Page[TestResult]:
        """
        Recupera un una pagina specificata di un test.

        Args:
            test_id (UUID): Id del test.
            p (int): Numero della pagina.
            q (str): Stringa per filtrare le qa.

        Returns:
            Page: Contiene il numero della pagina e una lista di TestResult

        Raises:
            PersistenceException: Errore durante l'ottenimento dei risultati contenuti nella pagina
            PageNonExistentException: La pagina richiesta non esiste.
            
        """
        with self._unit_of_work as uow:

            if not uow.test_repo.get_test_by_id(test_id):
                raise TestNonExistentException(test_id)

            offset: int = page_n * Page.ELEMENT_PER_PAGE

            test_result_set: Optional[set[TestResult]] = uow.result_repo.get_results(test_id, offset, offset + Page.ELEMENT_PER_PAGE, q)

            if test_result_set is None:
                raise PersistenceException("Errore durante l'ottenimento degli elementi appartenenti alla pagina")
            
            if not len(test_result_set):
                PageNonExistentException(page_n) 
            
            return Page[TestResult](page_n ,test_result_set)