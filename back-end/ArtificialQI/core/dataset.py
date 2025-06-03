
from datetime import date
from uuid import UUID, uuid4

class Dataset:

    def __init__(self, name: str, id: UUID = uuid4(), creation_date: date = date.today()):
        self._name = name
        self._id = id
        self._creation_date = creation_date

    def __eq__(self, dataset: object):

        if not isinstance(dataset, "Dataset"):
            return False
        
        return dataset.id == self.id
    
    @property
    def name(self):
        return self._name
    
    @property 
    def id(self):
        return self._id
    
    @property 
    def creation_date(self):
        return self._creation_date

    @name.setter
    def name(self, n: str):
        if not n.strip():
            raise ValueError("Il nome di un dataset non può essere vuoto o composto da soli spazi.")

        self._name = n 

    @creation_date.setter
    def creation_date(self, d: date):
        if not d > date.today():
            raise ValueError("La data di creazione del dataset non può essere futura.")

        self._creation_date = d 

    