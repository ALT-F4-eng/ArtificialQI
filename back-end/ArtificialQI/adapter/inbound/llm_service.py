from uuid import UUID
from typing import Optional
from common.exceptions import *
from core.llm import Llm
from core.test import Test
from port.inbound.llm_use_case import LlmUseCase
from port.outbound.unit_of_work.llm_unit_of_work import ILlmUnitOfWork


class LlmService(LlmUseCase):
    
    def __init__(self, llm_unit_of_work: ILlmUnitOfWork):
        """
        Inizializza il servizio LLM con i repository necessari.

        Args:
            llm_unit_of_work (ILlmUnitOfWork): Unit of work per la gestione dei LLM.
        """
        self._unit_of_work: ILlmUnitOfWork = llm_unit_of_work

    
    def create_llm(self, llm: Llm) -> Llm:
        """
        Crea un nuovo LLM e lo salva nel repository.

        Args:
            llm (Llm): LLM da creare.

        Returns:
            Llm: LLM creato.

        Raises:
            PersistenceException: Se si verifica un errore durante la creazione.
        """
        with self._unit_of_work as uow:

            result: Optional[Llm] = uow.llm_repo.create_llm(llm)

            if result is None:
                raise PersistenceException("Errore durante la creazione del llm.")
            
            return result

    
    def get_llm_by_id(self, id: UUID) -> Llm:
        """
        Restituisce un LLM dato il suo Id.

        Args:
            id (UUID): Id del LLM.

        Returns:
            Llm: LLM trovato.

        Raises:
            LlmNonExistentException: Se il LLM con l'ID fornito non esiste.
        """
        with self._unit_of_work as uow:
            llm: Optional[Llm] = uow.llm_repo.get_llm_by_id(id)

            if llm is None:
                raise LlmNonExistentException(id)
            
            return llm
    
    def get_all_llm(self) -> list[Llm]:
        """
        Restituisce la lista di tutti i LLM salvati.

        Returns:
            list[Llm]: Lista dei LLM esistenti.

        Raises:
            PersistenceException: Se si verifica un errore durante il recupero.
        """
        with self._unit_of_work as uow:
            llms: Optional[list[Llm]] = uow.llm_repo.get_all_llms()

            if llms is None:
                raise PersistenceException(
                    "Errore di persistenza durante l'ottenimento degli llm salvati."
                )

            return llms
    
    def update_llm(self, llm: Llm) -> Llm:
        """
        Aggiorna un LLM esistente.

        Args:
            llm (Llm): LLM con i dati aggiornati.

        Returns:
            Llm: LLM aggiornato.

        Raises:
            LlmNonExistentException: Se il LLM da aggiornare non esiste.
            PersistenceException: Se si verifica un errore durante l'aggiornamento.
        """
        with self._unit_of_work as uow:
            llm_to_update: Optional[Llm] = uow.llm_repo.get_llm_by_id(llm.id)

            if llm_to_update is None:
                raise LlmNonExistentException(llm.id)

            res: Optional[Llm] = uow.llm_repo.update_llm(llm)

            if res is None:
                raise PersistenceException("Errore di persistenza durante l'aggiornamento del llm.")
        
        return res
    
    def delete_llm(self, id: UUID) -> UUID:
        """
        Elimina un LLM e i relativi test e risultati associati.

        Args:
            id (UUID): Id del LLM da eliminare.

        Returns:
            UUID: Id del LLM eliminato.

        Raises:
            LlmNonExistentException: Se il LLM da eliminare non esiste.
            PersistenceException: Se si verifica un errore durante l'eliminazione del LLM, 
              dei test o dei risultati associati.
        """
        with self._unit_of_work as uow:
            llm_to_del: Optional[Llm] = uow.llm_repo.get_llm_by_id(id)

            if llm_to_del is None:
                raise LlmNonExistentException(id)
            
            llm_realted_tests: Optional[list[Test]] = uow.test_repo.get_tests_from_llm(id)

            if llm_realted_tests is None:
                raise PersistenceException(
                    f"Errore durante l'ottenimento dei test associati al llm con id {id}."
                )

            for test in llm_realted_tests:

                if not uow.result_repo.delete_all_from_test(test.id):
                    raise PersistenceException(
                        f"Errore durante l'eliminazione dei risultati del test {test.id}."
                    )

                if uow.test_repo.delete_test(test.id) is None:
                    raise PersistenceException(
                        f"Errore durante l'eliminazione del del test {test.id}."
                    )

            res_llm_elim: Optional[UUID] = uow.llm_repo.delete_llm(id)

            if res_llm_elim is None:
                raise PersistenceException("Errore durante l'eliminazione del llm.")

            return res_llm_elim
