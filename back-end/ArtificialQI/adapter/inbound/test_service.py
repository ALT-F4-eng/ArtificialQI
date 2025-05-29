from typing import Optional
from uuid import UUID

from common.exceptions import PersistenceException, TestNonExistentException, InvalidTestOperationException
from core.test import Test
from core.test_factory import TestFactory
from port.inbound.test_use_case import TestUseCase
from port.outbound.unit_of_work.test_unit_of_work import ITestUnitOfWork


class DatasetService(TestUseCase):

    def __init__(
        self,
        test_unit_of_work: ITestUnitOfWork
    ):

        self._unit_of_work = test_unit_of_work

    def run_test(self, dataset: UUID, llm: UUID) -> Test:
        return None

    def delete_test(self, id: UUID) -> UUID:
        """
        Elimina un test e i relativi risultati.

        Args:
            id (UUID): Id del test da eliminare.

        Returns:
            UUID: Id del test eliminato.

        Raises:
            TestNonExistentException: Se il test non esiste.
            PersistenceException: Se si verifica un errore durante l'eliminazione dei risultati o del test.
        """

        with self._unit_of_work as uow:

            test_to_del: Optional[Test] = uow.test_repo.get_test_by_id(id)

            if test_to_del is None:
                raise TestNonExistentException(id)

            res_to_del: bool = uow.result_repo.delete_all_from_test(id)

            if not res_to_del:
                raise PersistenceException(
                    "Errore durante l'eliminazione del contenuto del test."
                )

            result: Optional[UUID] = uow.test_repo.delete_test(id)

            if result is None:
                raise PersistenceException("Errore durante l'eliminazione del test.")

            return result

    def update_test(self, id: UUID, name: str) -> Test:
        """
        Aggiorna il nome di un test esistente.

        Args:
            id (UUID): Id del test da aggiornare.
            name (str): Nuovo nome del test.

        Returns:
            Test: Test aggiornato.

        Raises:
            TestNonExistentException: Se il test non esiste.
            InvalidTestOperationException: Se il test non è stato ancora salvato.
            PersistenceException: Se si verifica un errore durante l'aggiornamento.
        """
        with self._unit_of_work as uow:
            test_to_update: Optional[Test] = uow.test_repo.get_test_by_id(id)

            if test_to_update is None:
                raise TestNonExistentException(id)

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

            res: Optional[Test] = uow.test_repo.update_test(updated_test)

            if res is None:
                raise PersistenceException("Errore durante l'aggiornamento del test.")

            return res

    def save(self, id: UUID, name: str) -> Test:
        """
        Salva un test temporaneo assegnandogli un nome definitivo.

        Args:
            id (UUID): Id del test da salvare.
            name (str): Nome da assegnare al test.

        Returns:
            Test: Test salvato.

        Raises:
            TestNonExistentException: Se il test non esiste.
            InvalidTestOperationException: Se il test è già stato salvato.
            PersistenceException: Se si verifica un errore durante l'aggiornamento.
        """
        with self._unit_of_work as uow:
            test_to_save: Optional[Test] = uow.test_repo.get_test_by_id(id)

            if test_to_save is None:
                raise TestNonExistentException(id)

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

            res: Optional[Test] = uow.test_repo.update_test(updated_test)

            if res is None:
                raise PersistenceException("Errore durante l'aggiornamento del test.")

            return res

    def get_all_tests(self, q: str = "") -> list[Test]:
        """
        Restituisce la lista di tutti i test, opzionalmente filtrata da una query.

        Args:
            q (str, opzionale): Query di ricerca per filtrare i test. Default "".

        Returns:
            list[Test]: Lista dei test trovati.

        Raises:
            PersistenceException: Se si verifica un errore durante il recupero.
        """
        with self._unit_of_work as uow
            tests: Optional[list[Test]] = uow.test_repo.get_all_tests(q)

            if tests is None:
                raise PersistenceException("Errore durante l'ottenimento dei test.")

            return tests

    def get_test_by_id(self, id: UUID) -> Test:
        """
        Restituisce un test dato il suo Id.

        Args:
            id (UUID): Id del test da recuperare.

        Returns:
            Test: Test corrispondente all'Id fornito.

        Raises:
            TestNonExistentException: Se il test non esiste.
        """
        with self._unit_of_work as uow:
            test: Optional[Test] = uow.test_repo.get_test_by_id(id)

            if test is None:
                raise TestNonExistentException(id)

            return test
