from dataclasses import dataclass
from datetime import date
from uuid import UUID

@dataclass
class Dataset:
    id: UUID
    dim: int
    name: str|None
    first_save_date: date|None
    last_save_date: date|None
    tmp: bool
    origin: UUID|None

    def __eq__(self, dataset: object) -> bool:
        "Controllo di uguaglianza sugli id"

        if not isinstance(dataset, Dataset):
            return False
        
        return self.id == dataset.id
    
    def is_tmp(self) -> bool:
        "Restituisce True se il dataset è temporaneo"
        return self.tmp and (self.origin is None)

    def is_working_copy(self) -> bool:
        "Restituisce True se il dataset è una copia di lavoro di un altro dataset"
        return self.tmp and (self.origin is not None)

    def is_saved(self) -> bool:
        "Restituisce True se il dataset è salvato"
        return not self.tmp

