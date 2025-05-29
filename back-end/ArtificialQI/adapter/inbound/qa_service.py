from uuid import UUID, uuid4
from typing import Optional


from common.exceptions import (PersistenceException, QaNonExistentException, PageNonExistentException, DatasetNonExistentException)
from core.page import Page
from port.outbound.qa_unit_of_work import IQaUnitOfWork
from port.inbound.qa_use_case import QaUseCase
from core.question_answer_pair import QuestionAnswerPair, qa_pair_factory_function


class QaService(QaUseCase):
    
    def __init__(self, qa_unit_of_work: IQaUnitOfWork):
        self._unit_of_work:IQaUnitOfWork = qa_unit_of_work
    
    def create_qa(self, question:str, answer:str, dataset:UUID) -> QuestionAnswerPair:
        """
        Crea e salva una nuova qa.

        Args:
            dataset_id (UUID): Id del dataset.
            question (srt): Domanda.
            answer (str): Risposta.

        Returns:
            QuestionAnswerPair: Coppia domanda-risposta creata.

        Raises:
            PersistenceException: Se si verifica un errore durante il salvataggio.
        """

        questionAnswerPair : QuestionAnswerPair = qa_pair_factory_function(
            dataset=dataset, question=question, 
            answer=answer, id=uuid4()
        )
        with self._unit_of_work as uow:
            result: Optional[QuestionAnswerPair] = uow.qa_repo.create_qa(questionAnswerPair)

            if result is None:
                raise PersistenceException("Errore durante la creazione della coppia domanda-risposta.")
            
            return result

    def get_qa_page(self, p:int, dataset:UUID, q:str="") -> Page[QuestionAnswerPair]:
        """
        Recupera un una pagina specificata di un dataset.

        Args:
            dataset_id (UUID): Id del dataset.
            p (int): Numero della pagina del dataset che si vuole ottenere.
            q (str): Stringa per filtrare le coppie domanda-risposta.

        Returns:
            Page: Contiene il numero della pagina e la lista di coppie domanda-risposta che vi appartengono.

        Raises:
            PageNonExistentException: Se non esiste la pagina richiesta per il dataset.
        """
        with self._unit_of_work as uow:
            
            if not uow.dataset_repo.get_dataset_by_id(dataset):
                raise DatasetNonExistentException(dataset)

            offset: int = p * Page.ELEMENT_PER_PAGE

            qa_set: Optional[set[QuestionAnswerPair]] = uow.qa_repo.get_qa_set(dataset, offset, offset + Page.ELEMENT_PER_PAGE, q)

            if qa_set is None:
                raise PageNonExistentException(p)
            
            return Page[QuestionAnswerPair](p, qa_set)
    
    def get_qa_by_id(self, id:UUID) -> QuestionAnswerPair:
        """
        Recupera una coppia domanda-risposta dato il suo identificativo.

        Args:
            id (UUID): Id della coppia domanda-risposta.

        Returns:
            QuestionAnswerPair: Coppia domanda-risposta corrispondente.

        Raises:
            QaNonExistentException: Se la coppia domanda-risposta richiesta non esiste.
        """
        with self._unit_of_work as uow:
            
            questionAnswerPair: Optional[QuestionAnswerPair] = uow.qa_repo.get_qa_by_id(id)

            if questionAnswerPair is None:
                raise QaNonExistentException(id)
            
            return questionAnswerPair
    
    def update_qa(self, qa:QuestionAnswerPair) -> QuestionAnswerPair:
        """
        Aggiorna la coppia domanda-risposta data la sua nuova forma aggiornata.

        Args:
            qa (QuestionAnswerPair): Coppia domanda-risposta aggiornata.

        Returns:
            QuestionAnswerPair: Versione aggiornata della coppia domanda-risposta.

        Raises:
            QaNonExistentException: Se la coppia domanda-risposta da aggiornare non esiste.
            PersistenceException: Se avviene un errori di persistenza durante l'aggiornamento della coppia domanda-risposta.
        """
        with self._unit_of_work as uow:

            qa_current_version: Optional[QuestionAnswerPair] = uow.qa_repo.get_qa_by_id(qa.id)

            if qa_current_version is None:
                raise QaNonExistentException(qa.id)

            res: Optional[QuestionAnswerPair] = uow.qa_repo.update_qa(qa_current_version)

            if res is None:
                raise PersistenceException("Errore di persistenza durante l'aggiornamento della coppia domanda-risposta.")
            
            return res
    
    def delete_qa(self, id:UUID) -> UUID:
        """
        Elimina una domanda-risposta.

        Args:
            id (UUID): Id della coppia domanda-risposta da eliminare.

        Returns:
            UUID: Id della coppia domanda-risposta eliminata.

        Raises:
            QaNonExistentException: Se la coppia domanda-risposta non esiste.
            PersistenceException: Se si verifica un errore durante l'eliminazione della coppia domanda-risposta.
        """
        with self._unit_of_work as uow:

            questionAnswerPair: Optional[QuestionAnswerPair] = uow.qa_repo.get_qa_by_id(id)

            if questionAnswerPair is None:
                raise QaNonExistentException(id)

            res_qa_elim: Optional[UUID] = uow.qa_repo.delete_qa(id)

            if res_qa_elim is None:
                raise PersistenceException(f"Errore durante l'eliminazione della qa {id}.")

            return res_qa_elim
