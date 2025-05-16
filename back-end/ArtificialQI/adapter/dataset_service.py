from port.inbound.dataset_use_case import DatasetUseCase
from port.outbound.dataset_repository import DatasetRepository
from port.outbound.question_answer_pair_repository import QuestionAnswerPairRepository
from port.outbound.test_repository import TestRepository
from port.outbound.test_result_repository import TestResultRepository
from core.dataset import Dataset, DatasetFactory
from core.test import Test 
from uuid import UUID, uuid4
from typing import Optional
from datetime import date
from common.exceptions import *
from typing import IO

class DatasetService(DatasetUseCase):

    def __init__(self, dataset_repo:DatasetRepository, qa_repo:QuestionAnswerPairRepository, test_repo:TestRepository, result_repo: TestResultRepository):
        self._dataset_repo:DatasetRepository = dataset_repo
        self._qa_repo:QuestionAnswerPairRepository = qa_repo
        self._test_repo:TestRepository = test_repo
        self._result_repo: TestResultRepository = result_repo
    

    @staticmethod
    def generate_name(name: str) -> str:
        """
        Genera un nome di dataset valido per una copia.

        Preconditions:
            - Il nome ricevuto in input deve essere valido ovvero non vuoto o composto da soli spazi.

        Postconditions:
            - Restituisce un nome di dataset che può essere utilizzato in modo sicuro per una copia.

        Args:
            name (str): Nome del dataset originale che deve essere copiato.

        Returns:
            str: Un nuovo nome di dataset basato sul nome ricevuto in input seguito dal suffisso  '-copy-<UUID>'.
        """
        if name is None or not name.strip():
            raise ValueError
        
        return f"{name}-copy-{uuid4()}"


    def copy_dataset(self, id:UUID) -> Dataset:

        """
        Crea una copia del dataset identificato dall'id ricevuto in input.

        Preconditions:
            - Esiste un dataset identificato dall'id indicato.
            - Il dataset da copiare non è una working copy o un dataset temporaneo.
            - Il meotodo generate_name genera un nome di dataset valido.

        Postconditions:
            - Viene creata una copia del dataset indicato.
            - La copia creata contiene gli stessi elementi del dataset originario.

        Args:
            - id (UUID): id del dataset da copiare.
        
        Returns:
            - Dataset: La copia del dataset appena creata.

        Raises:
            - InvalidDatasetOperationException
            - DatasetNonExistentException
            - PersistenceException
        """

        # Controlla che il dataset da copiare esiste
        dataset: Optional[Dataset] = self._dataset_repo.get_dataset_by_id(id)

        if dataset is None:
            raise DatasetNonExistentException(f"Il dataset con ID {id} non esiste.")
        
        # Controllo che il dataset da copiare sia salvato ovvero non sia una working copy o temporaneo
        if not dataset.is_saved():
            raise InvalidDatasetOperationException("Non è possibile creare una copia di un dataset non salvato.")
        
        # Copia i metadati del dataset
        copy: Dataset = DatasetFactory.saved(uuid4(), dataset.dim, DatasetService.generate_name(dataset.name), date.today(), date.today())

        result: Optional[Dataset] = self._dataset_repo.create_dataset(copy)

        if result is None:
            raise PersistenceException("Errore durante il salvataggio del nuovo dataset.")
        
        # Se il dataset da copiare non è vuoto copia il suo contenuto
        if copy.dim > 0:

            qa_copy_operation : bool = self._qa_repo.copy_all_from_dataset(id, copy.id)

            if not qa_copy_operation:
                raise PersistenceException("Errore durante la copiatura del contenuto del dataset.")

        return result
    
    def create_dataset_tmp(self) -> Dataset:
        """
        Crea un nuovo dataset temporaneo vuoto.        

        Postconditions:
            - Viene creato un nuovo dataset temporaneo. 
        
        Returns:
            - Dataset: Il dataset temporaneo appena creato.

        Raises:
            - PersistenceException
        """

        # Creazione di un nuovo dataset temporaneo
        dataset: Dataset = DatasetFactory.tmp(uuid4(), 0)

        # Salvataggio del dataset temporaneo e controllo dell'esito dell'operazione
        result: Optional[Dataset] = self._dataset_repo.create_dataset(dataset)

        if result is None:
            raise PersistenceException("Errore durante la creazione del dataset.")
        
        return result
    
    
    def delete_dataset(self, id:UUID) -> UUID:
        """
        Elimina il dataset identificato dall'id indicato.

        Preconditions:
            - Esiste un dataset identificato dall'id indicato.

        Postconditions:
            - Vengono eliminati i metadati riguardanti il dataset.
            - Viene eliminato il contenuto del dataset.
            - Vengono eliminati i metadati dei test eseguiti utilizzando il dataset.
            - Vengono eliminati i risultati contenuti nei test.

        Args:
            - id (UUID): id del dataset da eliminare.
        
        Returns:
            - UUID: id del dataset eliminato.

        Raises:
            - DatasetNonExistentException
            - PersistenceException 
        """

        # Controllo che il dataset da eliminare esista
        dataset: Optional[Dataset] = self._dataset_repo.get_dataset_by_id(id)

        if dataset is None:
            raise DatasetNonExistentException(f"Il dataset con ID {id} non esiste.")
        
        # Ottiene tutti i test associati al dataset e controlla l'esito dell'operaziione
        related_tests: Optional[list[Test]]= self._test_repo.get_tests_from_dataset(dataset.id)

        if related_tests is None:
            raise PersistenceException(f"Errore durante l'ottenimento dei test associati al dataset con ID {id}.")
        
        # Per ogni test associato elimina il test ed il suo contenuto
        for test in related_tests:

            if not self._result_repo.delete_all_from_test(test.id):
                raise PersistenceException(f"Errore durante l'eliminazione dei risultati del test {test.id}.")
            
            if self._test_repo.delete_test(test.id) is None:
                raise PersistenceException(f"Errore durante l'eliminazione del del test {test.id}.")

        # Elimina il contenuto del dataset
        res_qa_elim: Optional[UUID] = self._qa_repo.delete_all_from_dataset(dataset.id)

        if res_qa_elim is None:
            raise PersistenceException(f"Errore durante l'eliminazione del contenuto del dataset {id}.")

        # Elimina i metadati associati al dataset
        res_dataset_elim: Optional[UUID] = self._dataset_repo.delete_dataset(dataset.id)

        if res_dataset_elim is None:
            raise PersistenceException(f"Errore durante l'eliminazione del dataset {id}.")

        return res_dataset_elim

    def update_dataset(self, name:str, id:UUID) -> Dataset:
        """
        Aggiorna il nome del dataset identificato dall'id indicato, utilizzando il nome ricevuto.

        Preconditions:
            - Esiste un dataset identificato dall'id ricevuto.
            - Il dataset da aggiornare non è una working copy o un temporaneo.
            - Il nuovo nome ricevuto è valido ovvero non è vuoto o composto da soli spazi.

        Postconditions:
            - Il nome del dataset viene aggiornato.

        Args:
            - id (UUID): id del dataset da aggiornare.
            - name (str): Nuovo nome del dataset.
        
        Returns:
            - Dataset: Il dataset aggiornato.

        Raises:
            - DatasetNonExistentException
            - PersistenceException
            - InvalidDatasetOperationException
        """

        # Ottiene il dataset da aggiornare e controlla che l'operazione sia andata a buon fine
        dataset_to_update: Optional[Dataset] = self._dataset_repo.get_dataset_by_id(id)

        if dataset_to_update is None:
            raise DatasetNonExistentException(f"Non esiste un dataset con id {id}.")

        if not dataset_to_update.is_saved():
            raise InvalidDatasetOperationException("Non è possibile rinominare un dataset temporaneo.")

        # Costruisce un nuovo dataset che rappresenta il dataset aggiornato
        updated_dataset: Dataset = DatasetFactory.saved(
            id, dataset_to_update.dim, name, dataset_to_update.first_save_date, date.today()
        )

        # Aggiorna il dataset e controlla che l'operazione sia andata a buon fine
        res: Optional[Dataset] = self._dataset_repo.update_dataset(updated_dataset)

        if res is None:
            raise PersistenceException("Errore di persistenza durante l'aggiornamento del dataset.")
        
        return res

    def get_all_datasets(self, q:str = '') -> list[Dataset]:
        """
        Restituisce la lista dei dataset salvati che contengono 'q' nel proprio nome.

        Args:
            - q (str): Query da utilizzare per filtrare la ricerca.
        
        Returns:
            - list[Dataset]: Lista dei dataset risultante dalla ricerca.

        Raises:
            - PersistenceException
        """

        # Ottiene i dataset e controlla che l'operazione sia andata a buon fine
        datasets: Optional[list[Dataset]] = self._dataset_repo.get_all_datasets(q)

        if datasets is None:
            raise PersistenceException("Errore di persistenza durante l'ottenimento dei dataset salvati.")
        
        return datasets
        

    def get_dataset_by_id(self, id:UUID) -> Dataset:
        """
        Restituisce il dataset identificato dall'id dato.

        Preconditions:
            - Esiste un dataset identificato dall'id dato.

        Args:
            - id (UUID): id del dataset da ottenere.
        
        Returns:
            - Dataset: Dataset identificato dall'id.

        Raises:
            - DatasetNonExistentException
        """

        # Ottenimento dataset identificato dall'id e controllo della sua esistenza
        dataset: Dataset = self._dataset_repo.get_dataset_by_id(id)

        if dataset is None:
            raise DatasetNonExistentException(f"Non esiste nessun dataset identificato dall'id {id}.")
        
        return dataset
    
    def save_tmp(self, id:UUID, name:str) -> Dataset:
        """
        Salva il dataset temporaneo identificato dall'id ricevuto a cui assegna il nome dato.

        Preconditions:
            - Esiste un dataset identificato dall'id dato.
            - Il dataset è temporaneo.
            - Il nome ricevuto è un nome di dataset valido ovvero non è vuoto o composto da soli spazi.

        Args:
            - id (UUID): id del dataset temporaneo da salvare.
        
        Returns:
            - Dataset: Dataset salvato.

        Raises:
            - DatasetNonExistentException
            - InvalidDatasetOperationException
            - PersistenceException
        """

        # Ottenimento del dataset e controllo della sua esistenza
        dataset_to_save: Dataset = self._dataset_repo.get_dataset_by_id(id)

        if dataset_to_save is None:
            raise DatasetNonExistentException("Il dataset temporaneo da salvare non esiste.")
        
        # Controllo che il dataset da salvare sia temporaneo
        if not dataset_to_save.is_tmp():
            raise InvalidDatasetOperationException("Il dataset da salvare deve essere temporaneo.")
        

        saved_dataset: Dataset = DatasetFactory.saved(dataset_to_save.id, dataset_to_save.dim, name, date.today(), date.today())

        # Aggiornamento dataset da temporaneo a salvato con controllo del risultato dell'operazione
        res: Optional[Dataset] = self._dataset_repo.update_dataset(saved_dataset)

        if res is None:
            raise PersistenceException(f"Errore di persistenza durante il salvataggio del dataset.")
        
        return res
        
    
    def create_from_json(self, file:IO[bytes], name:str) -> Dataset: 
        pass

    def save_working_copy(self, id:UUID) -> Dataset:
        """
        Salva il dataset working copy identificato dall'id ricevuto.

        Preconditions:
            - Esiste un dataset identificato dall'id dato.
            - Il dataset è una working copy di un dataset salvato.

        Args:
            - id (UUID): id della working copy da salvare.
        
        Returns:
            - Dataset: Dataset salvato.

        Raises:
            - DatasetNonExistentException
            - PersistenceException
            - InvalidDatasetOperationException
        """

        # Controllo che la working copy esista e che sia effettivamente una working copy
        dataset_to_save: Optional[Dataset] = self._dataset_repo.get_dataset_by_id(id)

        if dataset_to_save is None:
            raise DatasetNonExistentException("Il dataset da salvare non esiste.")


        if not dataset_to_save.is_working_copy():
            raise InvalidDatasetOperationException("Il dataset da salvare deve essere una copia di lavoro di un dataset salvato.")

        
        # Controllo che il dataset salvato da cui è stata originata la working copy esista
        origin_to_update: Optional[Dataset] = self._dataset_repo.get_dataset_by_id(dataset_to_save.origin)

        if origin_to_update is None:
            raise PersistenceException(f"Errore di persistenza durante il salvataggio del dataset.")


        # Eliminazione del dataset di origine
        self.delete_dataset(origin_to_update.id)
        
        # Aggiornamento della working copy a dataset salvato e controllo del risultato dell'operazione
        updated_dataset: Dataset = DatasetFactory.saved(dataset_to_save.id, dataset_to_save.dim, origin_to_update.name, origin_to_update.first_save_date, date.today())
       
        res: Optional[Dataset] = self._dataset_repo.update_dataset(updated_dataset)

        if res is None:
            raise PersistenceException(f"Errore di persistenza durante il salvataggio del dataset.")
        
        return res

    def create_working_copy(self, origin: UUID) -> Dataset:
        """
        Crea una working copy per il dataset identificato dall'id ricevuto.

        Preconditions:
            - Esiste un dataset identificato dall'id dato.
            - Il dataset è un dataset salvato.

        Args:
            - id (UUID): id dell dataset salvare per cui generare una working copy.
        
        Returns:
            - Dataset: Working copy appena creata.

        Raises:
            - PersistenceException
            - InvalidDatasetOperationException
            - DatasetNonExistentException
        """

        # Controllo che il dataset per cui creare una working copy esista e sia un dataset salvato
        origin_dataset: Optional[Dataset] = self._dataset_repo.get_dataset_by_id(origin)

        if origin_dataset is None:
            raise DatasetNonExistentException(f"Non esiste un dataset salvato con id {origin}")

        if not origin_dataset.is_saved():
            raise InvalidDatasetOperationException("Il dataset di origine deve essere un dataset salvato.")
        
        # Creazione working copy 
        working_copy: Dataset = DatasetFactory.working_copy(uuid4(), origin_dataset.id, origin_dataset.dim)

        res: Optional[Dataset] = self._dataset_repo.create_dataset(working_copy)

        if not res:
            raise PersistenceException(f"Errore di persistenza durante la creazione del dataset.")


        # Copiatura degli elementi contenuti nel dataset salvato originario
        res_copy_content: bool = self._qa_repo.copy_all_from_dataset(origin_dataset.src, working_copy.id)

        if not res_copy_content:
            raise PersistenceException(f"Errore di persistenza durante la creazione del dataset.")
        
        return res