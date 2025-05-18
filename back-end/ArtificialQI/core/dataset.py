from uuid import UUID
from datetime import date
from common.exceptions import *
from dataclasses import dataclass


@dataclass
class Dataset:
    id: UUID 
    dim: int 
    name: str
    first_save_date: date 
    last_save_date: date 
    tmp: bool
    origin: UUID

    def __eq__(self, dataset: "Dataset")->bool:
        return self.id == dataset.id 
    
    def __ne__(self, dataset: "Dataset")->bool:
        return not self == dataset 
    
    def is_tmp(self) -> bool:
        return self.tmp and (self.origin is None)
    
    def is_working_copy(self) -> bool:
        return self.tmp and (self.origin is not None)

    def is_saved(self) -> bool:
        return not self.tmp

class DatasetFactory:
    """
        Create a temporary, empty Dataset instance.

        Preconditions:
            - The input must be a non-null UUID.

        Postconditions:
            - Returns a Dataset instance without any elements and marked as temporary.

        Args:
            id (UUID): The id to assign to the new temporary dataset.

        Returns:
            Dataset: A new temporary dataset instance.
    """
    @staticmethod
    def tmp(id: UUID) -> Dataset:
        if id is None:
            raise ValueError
        
        return Dataset(id=id, dim=0, name=None, first_save_date=None, last_save_date=None, tmp=True, origin=None)

    """
    Generate a temporary working copy of an existing dataset.

    Preconditions:
        - 'id' is not None.
        - 'origin' is not None and refers to an existing dataset.
        - 'dim' is not None and is a non-negative integer.

    Postconditions:
        - Returns a new temporary dataset that references the original dataset via 'origin'.

    Args:
        id (UUID): The identifier for the new dataset copy.
        origin (UUID): The identifier of the original dataset.
        dim (int): The dimension of the dataset copy.

    Returns:
        Dataset: A new temporary dataset instance linked to the original dataset.
    """
    @staticmethod
    def working_copy(id: UUID, origin: UUID, dim: int) -> Dataset:
        if dim is None or dim < 0:
            raise ValueError
        
        if origin is None:
            raise ValueError
        
        if id is None:
            raise ValueError
        
        return Dataset(id=id, dim=dim, name=None, first_save_date=None, last_save_date=None, tmp=True, origin=origin)
    
    """
    Generate a saved (non-temporary) dataset with full metadata.

    Preconditions:
        - 'id' is not None.
        - 'name' is not None and not empty or blank.
        - 'first_save_date' and 'last_save_date' are not None.
        - 'first_save_date' is less than or equal to 'last_save_date'.
        - 'dim' is not None and is a non-negative integer.

    Postconditions:
        - Returns a non-temporary dataset with the provided metadata.

    Args:
        id (UUID): The unique identifier for the dataset.
        dim (int): The dimension of the dataset.
        name (str): The name assigned to the dataset.
        first_save_date (date): The date when the dataset was first saved.
        last_save_date (date): The date of the most recent save.

    Returns:
        Dataset: A saved dataset instance.
    """
    @staticmethod
    def saved(id: UUID, dim: int, name: str, first_save_date: date, last_save_date: date) -> Dataset:
        if id is None:
            raise ValueError
        
        if name is None:
            raise ValueError
        
        if not name.strip():
            raise ValueError
        
        if first_save_date is None:
            raise ValueError
        
        if last_save_date is None:
            raise ValueError

        if first_save_date > last_save_date:
            raise ValueError
        
        if dim is None:
            raise ValueError

        if dim < 0:
            raise ValueError

        return Dataset(id=id, dim=dim, name=name, first_save_date=first_save_date, last_save_date=last_save_date, tmp=False, origin=None)