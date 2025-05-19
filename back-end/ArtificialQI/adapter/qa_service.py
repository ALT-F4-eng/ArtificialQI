from port.inbound.qa_use_case import QaUseCase
from port.outbound.dataset_repository import DatasetRepository
from port.outbound.question_answer_pair_repository import QuestionAnswerPairRepository
from core.question_answer_pair import QuestionAnswerPair, qa_pair_factory_function
from uuid import UUID, uuid4
from typing import Optional
from common.exceptions import *
from typing import IO
from core.page import Page


class QaService(QaUseCase):
    
    def __init__(self, qa_repo:QuestionAnswerPairRepository , dataset_repo:DatasetRepository):
        self.qa_repo:QuestionAnswerPairRepository = qa_repo
        self.dataset_repo:DatasetRepository = dataset_repo

    
    def create_qa(self, question: str, answer: str, dataset_id:UUID) -> QuestionAnswerPair:
        """
        Crea e salva una nuova qa.

        Args:
            dataset_id (UUID): ID del dataset.
            question (srt): domanda.
            answer (str): risposta.

        Returns:
            QuestionAnswerPair.

        Raises:
            PersistenceException: Se si verifica un errore durante il salvataggio.
        """

        # Creazione di una nuova qa
        questionAnswerPair : QuestionAnswerPair = qa_pair_factory_function(dataset_id, question, answer, uuid4())

        # Salvataggio della qa su db
        result: Optional[QuestionAnswerPair] = self.qa_repo.create_qa(questionAnswerPair)

        if result is None:
            raise PersistenceException("Errore durante la creazione della qa.")
        
        return result

    def get_qa_page(self, p: int, dataset_id: UUID, q: str) -> Page:
        """
        Recupera un una pagina specificata di un dataset.

        Args:
            dataset_id (UUID): ID del dataset.
            p (int): numero della pagina.
            q (str): stringa per filtrare le qa.

        Returns:
            Page: contiene il numero della pagina e una lista di qa

        Raises:
            
        """

        questionAnswerPair_set: Optional[set[QuestionAnswerPair]] = self.qa_repo.get_qa_set(dataset_id, p, 25, q)

        if questionAnswerPair_set is None:
            raise QaNonExistentException(f"Non esiste nessuna qa.")
        
        return Page(p,questionAnswerPair_set)
    
    def get_qa_by_id(self, id:UUID) -> QuestionAnswerPair:
        """
        Recupera una qa dato il suo identificativo.

        Args:
            id (UUID): ID della qa.

        Returns:
            QuestionAnswerPair: QA corrispondente.

        Raises:
            QaNonExistentException: Se la qa non esiste.
        """

        questionAnswerPair: Optional[QuestionAnswerPair] = self.qa_repo.get_qa_by_id(id)

        if questionAnswerPair is None:
            raise DatasetNonExistentException(f"Non esiste la qa con identificativo {id}.")
        
        return questionAnswerPair
    
    def update_qa(self, dataset_id: UUID, question: str, answer: str, id:UUID) -> QuestionAnswerPair:
        """
        Aggiorna una qa salvata.

        """

        # Ottiene la qa da aggiornare e controlla che l'operazione sia andata a buon fine
        qa_to_update: Optional[QuestionAnswerPair] = self.qa_repo.get_qa_by_id(id)

        if qa_to_update is None:
            raise QaNonExistentException(f"Non esiste una qa con id {id}.")

        # Costruisce una nuova qa che rappresenta la qa aggiornata
        updated_qa: QuestionAnswerPair = qa_pair_factory_function(dataset_id,question,answer,id)

        # Aggiorna la qa e controlla che l'operazione sia andata a buon fine
        res: Optional[QuestionAnswerPair] = self.qa_repo.update_qa(updated_qa)

        if res is None:
            raise PersistenceException("Errore di persistenza durante l'aggiornamento della qa.")
        
        return res
    
    def delete_qa(self, id:UUID) -> UUID:
        """
        Elimina una qa.

        Args:
            id (UUID): Identificativo della qa da eliminare.

        Returns:
            UUID: ID della qa eliminato.

        Raises:
            QaNonExistentException: Se la qa non esiste.
            PersistenceException: Se si verifica un errore durante l'eliminazione dei dati associati.
        """

        # Controllo che la qa da eliminare esista
        questionAnswerPair: Optional[QuestionAnswerPair] = self.qa_repo.get_qa_by_id(id)

        if questionAnswerPair is None:
            raise QaNonExistentException(f"La qa con ID {id} non esiste.")

        # Elimina la qa dal repo
        res_qa_elim: Optional[UUID] = self.qa_repo.delete_qa(id)

        if res_qa_elim is None:
            raise PersistenceException(f"Errore durante l'eliminazione della qa {id}.")

        return res_qa_elim