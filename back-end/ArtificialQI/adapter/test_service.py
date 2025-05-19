from typing import Optional
from uuid import UUID

from common.exceptions import PersistenceException, TestNonExistentException, InvalidTestOperationException
from core.test import Test, TestFactory
from port.inbound.test_use_case import TestUseCase
from port.outbound.dataset_repository import DatasetRepository
from port.outbound.question_answer_pair_repository import QuestionAnswerPairRepository
from port.outbound.test_repository import TestRepository
from port.outbound.test_result_repository import TestResultRepository


class DatasetService(TestUseCase):

    def __init__(
        self,
        dataset_repo: DatasetRepository,
        qa_repo: QuestionAnswerPairRepository,
        test_repo: TestRepository,
        result_repo: TestResultRepository,
    ):

        self._dataset_repo: DatasetRepository = dataset_repo
        self._qa_repo: QuestionAnswerPairRepository = qa_repo
        self._test_repo: TestRepository = test_repo
        self._result_repo: TestResultRepository = result_repo

    def run_test(self, dataset: UUID, llm: UUID) -> Test:
        pass

    def delete_test(self, id: UUID) -> UUID:

        test_to_del: Optional[Test] = self._test_repo.get_test_by_id(id)

        if test_to_del is None:
            raise TestNonExistentException(f"Non esiste nessun test con id {id}.")

        res_to_del: bool = self._result_repo.delete_all_from_test(id)

        if not res_to_del:
            raise PersistenceException(
                "Errore durante l'eliminazione del contenuto del test."
            )

        result: Optional[UUID] = self._test_repo.delete_test(id)

        if result is None:
            raise PersistenceException("Errore durante l'eliminazione del test.")

        return result

    def update_test(self, id: UUID, name: str) -> Test:

        test_to_update: Optional[Test] = self._test_repo.get_test_by_id(id)

        if test_to_update is None:
            raise TestNonExistentException(f"Non esiste nessun test con id {id}.")

        if test_to_update.is_tmp():
            raise InvalidTestOperationException(
                "Non è possibile rinominare un test non salvato."
            )

        updated_test: Test = TestFactory.saved(
            id=test_to_update.id,
            dataset=test_to_update.dataset,
            llm=test_to_update.llm,
            index=test_to_update.index,
            name=name,
            execution_date=test_to_update.execution_date,
        )

        res: Optional[Test] = self._test_repo.update_test(updated_test)

        if res is None:
            raise PersistenceException("Errore durante l'aggiornamento del test.")

        return res

    def save(self, id: UUID, name: str) -> Test:

        test_to_save: Optional[Test] = self._test_repo.get_test_by_id(id)

        if test_to_save is None:
            raise TestNonExistentException(f"Non esiste nessun test con id {id}.")

        if not test_to_save.is_tmp():
            raise InvalidTestOperationException("Il test è già salvato.")

        updated_test: Test = TestFactory.saved(
            id=test_to_save.id,
            dataset=test_to_save.dataset,
            llm=test_to_save.llm,
            index=test_to_save.index,
            name=name,
            execution_date=test_to_save.execution_date,
        )

        res: Optional[Test] = self._test_repo.update_test(updated_test)

        if res is None:
            raise PersistenceException("Errore durante l'aggiornamento del test.")

        return res

    def get_all_tests(self, q: str = "") -> list[Test]:

        tests: Optional[list[Test]] = self._test_repo.get_all_tests(q)

        if tests is None:
            raise PersistenceException("Errore durante l'ottenimento dei test.")

        return tests

    def get_test_by_id(self, id: UUID) -> Test:

        test: Optional[Test] = self._test_repo.get_test_by_id(id)

        if test is None:
            raise TestNonExistentException(f"Non esiste nessun test con id {id}.")

        return test
