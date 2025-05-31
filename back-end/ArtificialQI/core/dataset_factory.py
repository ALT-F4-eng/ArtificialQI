from datetime import date
from uuid import UUID
from artificialqi.core.dataset import Dataset

class DatasetFactory:

    @staticmethod
    def tmp(id: UUID, dim: int = 0) -> Dataset:
        """
        Crea un'istanza temporanea e vuota di Dataset.

        Args:
            id (UUID) : Identificatore da assegnare al dataset temporaneo.

        Returns:
            Dataset: Nuova istanza temporanea di Dataset.

        Raises:
            ValueError: 
                Se la dimensione del dataset è negativa.
        """
        
        if dim < 0:
            raise ValueError("La dimensione di un dataset deve essere positiva.")

        return Dataset(
            id=id,
            dim=dim,
            name=None,
            first_save_date=None,
            last_save_date=None,
            tmp=True,
            origin=None
        )

    

    @staticmethod
    def working_copy(id: UUID, origin: UUID, dim: int=0) -> Dataset:
        """
        Crea una copia di lavoro temporanea di un dataset esistente.

        Args:
            id (UUID): Identificatore della copia di lavoro del dataset.
            origin (UUID): Identificatore del dataset originale.
            dim (int): Dimensione della copia di lavoro.

        Returns:
            Dataset: Nuova copia temporanea collegata al dataset di origine.

        Raises:
            ValueError: 
                Se la dimensione del dataset è negativa.
                Se l'origine è uguale all'id della working copy.
        """

        if dim < 0:
            raise ValueError("La dimensione di un dataset deve essere positiva.")
        
        if id == origin:
            raise ValueError("Un dataset working copy non può avere se stesso come origine.")
        
        return Dataset(
            id=id,
            dim=dim,
            name=None,
            first_save_date=None,
            last_save_date=None,
            tmp=True,
            origin=origin,
        )


    @staticmethod
    def saved(
        id: UUID, dim: int, name: str, first_save_date: date, last_save_date: date
    ) -> Dataset:
        """
        Crea un dataset salvato (non temporaneo) con metadati completi.

        Args:
            id (UUID): Identificatore univoco del dataset.
            dim (int): Dimensione del dataset.
            name (str): Nome del dataset.
            first_save_date (date): Data del primo salvataggio.
            last_save_date (date): Data dell'ultimo salvataggio.

        Returns:
            Dataset: Nuova istanza salvata di Dataset.

        Raises:
            ValueError: 
                Se la 'dim' del dataset è negativa.
                Se il 'name' è vuoto o composto da solo spazi.
                Se la 'first_save_date' è maggiore di 'last_save_date' o è futura.
                Se la 'first_save_date' non è già passata o corrente.
        """
        if not name.strip():
            raise ValueError("Il nome di un dataset non può essere vuoto o composto da soli spazi")

        if first_save_date > last_save_date:
            raise ValueError("La data di primo salvataggio deve essere minore o uguale alla data di ultimo salvataggio.")
        
        if first_save_date > date.today():
            raise ValueError("La data di primo salvataggio non può essere futura.")
        
        if last_save_date > date.today():
            raise ValueError("La data di ultimo salvataggio non può essere futura.")

        if dim < 0:
            raise ValueError("La dimensione di un dataset deve essere positiva.")

        return Dataset(
            id=id,
            dim=dim,
            name=name,
            first_save_date=first_save_date,
            last_save_date=last_save_date,
            tmp=False,
            origin=None,
        )
