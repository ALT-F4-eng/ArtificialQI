from datetime import date
from typing import Optional
from uuid import UUID, uuid4

from artificialqi.core.question_answer_pair import (qa_pair_factory_function, QuestionAnswerPair)
from artificialqi.common.exceptions import (DatasetNonExistentException,
                                            InvalidDatasetOperationException,                        PersistenceException)
from artificialqi.core.dataset import Dataset
from artificialqi.core.dataset_factory import DatasetFactory
from artificialqi.core.test import Test
from artificialqi.port.inbound.dataset_use_case import DatasetUseCase
from artificialqi.port.outbound.unit_of_work.dataset_unit_of_work import IDatasetUnitOfWork
from artificialqi.port.outbound.file_qa_reader import IQuestionAnswerFileReader



class DatasetService(DatasetUseCase):

    def __init__(
        self,
        dataset_unit_of_work : IDatasetUnitOfWork 
    ):

        self._unit_of_work = dataset_unit_of_work

    @staticmethod
    def generate_name(name: str) -> str:
        """
        Genera un nome valido per una copia di dataset, aggiungendo un suffisso unico.

        Args:
            name (str): Nome del dataset originale.

        Returns:
            str: Nuovo nome con suffisso '-copy-<UUID>'.

        Raises:
            ValueError: Se il nome è none o composto solo da spazi.
        """
        if not name.strip():
            raise ValueError("Il nome del dataset è invalido")

        return f"{name}-copy-{uuid4()}"

    def copy_dataset(self, id: UUID) -> Dataset:
        """
        Crea una copia di un dataset esistente, compresi i suoi elementi.

        Args:
            id (UUID): Identificativo del dataset da copiare.

        Returns:
            Dataset: Copia del dataset appena creata.

        Raises:
            DatasetNonExistentException: Se il dataset non esiste.
            InvalidDatasetOperationException: Se il dataset non è salvato.
            PersistenceException: Se si verifica un errore durante il salvataggio della copia o la duplicazione del contenuto.
            ValueError: Se si verifica un errore durante la costruzione della copia del dataset.
        """
        with self._unit_of_work as uow:

            dataset: Optional[Dataset] = uow.dataset_repo.get_dataset_by_id(id)

            if dataset is None:
                raise DatasetNonExistentException(id)

            if not dataset.is_saved():
                raise InvalidDatasetOperationException(
                    "Non è possibile creare una copia di un dataset non salvato."
                )

            try:
                copy: Dataset = DatasetFactory.saved(
                    id=uuid4(),
                    dim=dataset.dim,
                    name=DatasetService.generate_name(str(dataset.name)),
                    first_save_date=date.today(),
                    last_save_date=date.today(),
                )
            except ValueError as ve:
                raise ve


            result: Optional[Dataset] = uow.dataset_repo.create_dataset(copy)


            if result is None:
                raise PersistenceException(
                    "Errore durante il salvataggio del nuovo dataset."
                )

            if copy.dim > 0:

                qa_copy_operation: bool = uow.qa_repo.copy_all_from_dataset(id, copy.id)

                if not qa_copy_operation:
                    raise PersistenceException(
                        "Errore durante la copiatura del contenuto del dataset."
                    )

            return result

    def create_dataset_tmp(self) -> Dataset:
        """
        Crea e salva un nuovo dataset temporaneo vuoto.

        Returns:
            Dataset: Dataset temporaneo creato.

        Raises:
            PersistenceException: Se si verifica un errore durante il salvataggio.
        """
        with self._unit_of_work as uow:

            dataset: Dataset = DatasetFactory.tmp(id=uuid4(), dim=0)

            result: Optional[Dataset] = uow.dataset_repo.create_dataset(dataset)

            if result is None:
                raise PersistenceException("Errore durante la creazione del dataset.")

            return result
        
    def _delete_dataset_internal(self, id: UUID, uow: IDatasetUnitOfWork) -> UUID:
        """
        Elimina un dataset, il suo contenuto, i test associati e i relativi risultati.
        Questo è un metodo interno, pensato per essere chiamato all'interno di una UoW già aperta.

        Args:
            id (UUID): Identificativo del dataset da eliminare.

        Returns:
            UUID: ID del dataset eliminato.

        Raises:
            DatasetNonExistentException: Se il dataset non esiste.
            PersistenceException: Se si verifica un errore durante l'eliminazione dei dati associati.
        """
        dataset: Optional[Dataset] = uow.dataset_repo.get_dataset_by_id(id)

        if dataset is None:
            raise DatasetNonExistentException(id)
        
        if dataset.is_saved():
            uow.dataset_repo.delete_with_origin(dataset.id)

        related_tests: Optional[list[Test]] = uow.test_repo.get_tests_from_dataset(
            dataset.id
        )

        if related_tests is None:
            raise PersistenceException(
                f"Errore durante l'ottenimento dei test associati al dataset con ID {id}."
            )

        for test in related_tests:
            if not uow.result_repo.delete_all_from_test(test.id):
                raise PersistenceException(
                    f"Errore durante l'eliminazione dei risultati del test {test.id}."
                )

            if uow.test_repo.delete_test(test.id) is None:
                raise PersistenceException(
                    f"Errore durante l'eliminazione del del test {test.id}."
                )

        res_qa_elim: Optional[UUID] = uow.qa_repo.delete_all_from_dataset(dataset.id)

        if res_qa_elim is None:
            raise PersistenceException(
                f"Errore durante l'eliminazione del contenuto del dataset {id}."
            )

        res_dataset_elim: Optional[UUID] = uow.dataset_repo.delete_dataset(dataset.id)

        if res_dataset_elim is None:
            raise PersistenceException(
                f"Errore durante l'eliminazione del dataset {id}."
            )

        return res_dataset_elim

    def delete_dataset(self, id: UUID) -> UUID:
        """
        Elimina un dataset, il suo contenuto, i test associati e i relativi risultati.

        Args:
            id (UUID): Identificativo del dataset da eliminare.

        Returns:
            UUID: ID del dataset eliminato.

        Raises:
            DatasetNonExistentException: Se il dataset non esiste.
            PersistenceException: Se si verifica un errore durante l'eliminazione dei dati associati.
        """
        with self._unit_of_work as uow:
            return self._delete_dataset_internal(id, uow)

    def update_dataset(self, name: str, id: UUID) -> Dataset:
        """
        Aggiorna il nome di un dataset salvato.

        Args:
            name (str): Nuovo nome del dataset.
            id (UUID): Identificativo del dataset da aggiornare.

        Returns:
            Dataset: Dataset aggiornato.

        Raises:
            DatasetNonExistentException: Se il dataset non esiste.
            InvalidDatasetOperationException: Se il dataset è temporaneo o non salvato.
            PersistenceException: Se si verifica un errore durante l'aggiornamento.
        """
        with self._unit_of_work as uow:

            dataset_to_update: Optional[Dataset] = uow.dataset_repo.get_dataset_by_id(id)

            if dataset_to_update is None:
                raise DatasetNonExistentException(id)

            if not dataset_to_update.is_saved():
                raise InvalidDatasetOperationException(
                    "Non è possibile rinominare un dataset temporaneo."
                )

            updated_dataset: Dataset = DatasetFactory.saved(
                id=id,
                dim=dataset_to_update.dim,
                name=name,
                first_save_date=dataset_to_update.first_save_date, # type: ignore
                last_save_date=date.today(),
            )

            res: Optional[Dataset] = uow.dataset_repo.update_dataset(updated_dataset)

            if res is None:
                raise PersistenceException(
                    "Errore di persistenza durante l'aggiornamento del dataset."
                )

            return res

    def get_all_datasets(self, q: str = "") -> list[Dataset]:
        """
        Recupera tutti i dataset salvati, opzionalmente filtrati per nome.

        Args:
            q (str): Filtro opzionale per il nome del dataset.

        Returns:
            list[Dataset]: Elenco dei dataset trovati.

        Raises:
            PersistenceException: Se si verifica un errore durante l'accesso ai dati.
        """

        with self._unit_of_work as uow:

            datasets: Optional[list[Dataset]] = uow.dataset_repo.get_all_datasets(q)

            if datasets is None:
                raise PersistenceException(
                    "Errore di persistenza durante l'ottenimento dei dataset salvati."
                )

            return datasets

    def get_dataset_by_id(self, id: UUID) -> Dataset:
        """
        Recupera un dataset dato il suo identificativo.

        Args:
            id (UUID): ID del dataset.

        Returns:
            Dataset: Dataset corrispondente.

        Raises:
            DatasetNonExistentException: Se il dataset non esiste.
        """
        with self._unit_of_work as uow:
            dataset: Optional[Dataset] = uow.dataset_repo.get_dataset_by_id(id)

            if dataset is None:
                raise DatasetNonExistentException(id)

            return dataset

    def save_tmp(self, id:UUID, name: str) -> Dataset:
        """
        Salva un dataset temporaneo come dataset definitivo, assegnando un nome.

        Args:
            id (UUID): ID del dataset temporaneo.
            name (str): Nome da assegnare al dataset.

        Returns:
            Dataset: Dataset salvato.

        Raises:
            DatasetNonExistentException: Se il dataset non esiste.
            InvalidDatasetOperationException: Se il dataset non è temporaneo.
            PersistenceException: Se si verifica un errore durante il salvataggio.
            ValueError: Se la costruzione del nuovo dataset salvato non va a buon fine.
        """
        with self._unit_of_work as uow:
            dataset_to_save: Optional[Dataset] = uow.dataset_repo.get_dataset_by_id(id)

            if dataset_to_save is None:
                raise DatasetNonExistentException(id)

            if not dataset_to_save.is_tmp():
                raise InvalidDatasetOperationException(
                    "Il dataset da salvare deve essere temporaneo."
                )

            saved_dataset: Dataset = DatasetFactory.saved(
                id=dataset_to_save.id,
                dim=dataset_to_save.dim,
                name=name,
                first_save_date=date.today(),
                last_save_date=date.today(),
            )

            res: Optional[Dataset] = uow.dataset_repo.update_dataset(saved_dataset)

            if res is None:
                raise PersistenceException(
                    "Errore di persistenza durante il salvataggio del dataset."
                )

            return res

    def create_from_file(self, file_path: str, name: str,  file_reader: IQuestionAnswerFileReader) -> Dataset:
        """
        Crea un nuovo dataset savlato a partire da un file contenente coppie domanda-risposta.

        Args:
            source_reader (IDataSourceReader): Un'istanza di un lettore di dati che implementa IDataSourceReader
            file_path (str): Percorso del file contenente i dati.
            name (str): Nome da assegnare al nuovo dataset.

        Returns:
            Dataset: Il dataset creato e popolato.

        Raises:
            FileNotFoundError: Se il file specificato non esiste.
            ValueError: Se i dati nel file non sono validi per la creazione di oggetti.
            PersistenceException: Se si verifica un errore durante la creazione del dataset 
            o delle coppie domanda-risposta.

        """

        try:
            dataset_to_create: Dataset = DatasetFactory.saved(
                id=uuid4(),
                dim=0,
                name=name,
                first_save_date=date.today(),
                last_save_date=date.today()
            )
        except ValueError as ex:
            raise ex
        
        with self._unit_of_work as uow:

            create_result: Optional[Dataset] = uow.dataset_repo.create_dataset(dataset_to_create)

            if create_result is None:
                raise PersistenceException("Errore durante la creazione del nuovo dataset")
            
         
            record_count = 0

            
            try:
                for record in file_reader.read_qa_pairs(file_path):

                    qa: QuestionAnswerPair = qa_pair_factory_function(
                        dataset= dataset_to_create.id,
                        question= record["question"],
                        answer=record["answer"]
                    )

                    res_qa_creation: Optional[QuestionAnswerPair] = uow.qa_repo.create_qa(qa)

                    if res_qa_creation is None:
                        raise PersistenceException("Errore durante il salvataggio delle coppie domanda-risposta.")
                    
                    record_count += 1

            except Exception as ex:
                raise ex
            
            return DatasetFactory.saved(
                id= dataset_to_create.id,
                dim=record_count,
                name=dataset_to_create.name, # type: ignore
                first_save_date=dataset_to_create.first_save_date, # type: ignore
                last_save_date=dataset_to_create.last_save_date # type: ignore
                )

    def save_working_copy(self, id: UUID) -> Dataset:
        """
        Salva una working copy, sovrascrivendo il dataset salvato da cui deriva.

        Args:
            id (UUID): ID della working copy.

        Returns:
            Dataset: Dataset salvato.

        Raises:
            DatasetNonExistentException: Se la working copy non esiste.
            InvalidDatasetOperationException: Se il dataset non è una working copy.
            PersistenceException: Se si verifica un errore durante il salvataggio.
        """
        with self._unit_of_work as uow:
            dataset_to_save: Optional[Dataset] = uow.dataset_repo.get_dataset_by_id(id)

            if dataset_to_save is None:
                raise DatasetNonExistentException(id)

            if not dataset_to_save.is_working_copy():
                raise InvalidDatasetOperationException(
                    "Il dataset da salvare deve essere una copia di lavoro di un dataset salvato."
                )

            origin_to_update: Optional[Dataset] = uow.dataset_repo.get_dataset_by_id(
                dataset_to_save.origin # type: ignore
            )

            if origin_to_update is None:
                raise DatasetNonExistentException(id)


            updated_dataset: Dataset = DatasetFactory.saved(
                id=dataset_to_save.id,
                dim=dataset_to_save.dim,
                name=origin_to_update.name, # type: ignore
                first_save_date=origin_to_update.first_save_date, # type: ignore
                last_save_date=date.today(),
            )

            res: Optional[Dataset] = uow.dataset_repo.update_dataset(updated_dataset)

            if res is None:
                raise PersistenceException(
                    "Errore di persistenza durante il salvataggio del dataset."
                )
            
            try:
                self._delete_dataset_internal(origin_to_update.id, uow)
            except DatasetNonExistentException as ex:
                raise ex
            except PersistenceException as ex:
                raise ex

            return res

    def create_working_copy(self, origin: UUID) -> Dataset:
        """
        Crea una working copy da un dataset salvato esistente.

        Args:
            origin (UUID): ID del dataset salvato da cui derivare la working copy.

        Returns:
            Dataset: Working copy creata.

        Raises:
            DatasetNonExistentException: Se il dataset di origine non esiste.
            InvalidDatasetOperationException: Se il dataset di origine non è salvato.
            PersistenceException: Se si verifica un errore durante la creazione o la duplicazione dei contenuti.
        """

        with self._unit_of_work as uow:

            origin_dataset: Optional[Dataset] = uow.dataset_repo.get_dataset_by_id(origin)

            if origin_dataset is None:
                raise DatasetNonExistentException(origin)

            if not origin_dataset.is_saved():
                raise InvalidDatasetOperationException(
                    "Il dataset di origine deve essere un dataset salvato."
                )

            working_copy: Dataset = DatasetFactory.working_copy(
                id=uuid4(), origin=origin_dataset.id, dim=origin_dataset.dim
            )

            res: Optional[Dataset] = uow.dataset_repo.create_dataset(working_copy)

            if not res:
                raise PersistenceException(
                    "Errore di persistenza durante la creazione del dataset."
                )

            res_copy_content: bool = uow.qa_repo.copy_all_from_dataset(
                origin_dataset.id, working_copy.id
            )

            if not res_copy_content:
                raise PersistenceException(
                    "Errore di persistenza durante la creazione del dataset."
                )

            return res