
from datetime import date
from uuid import UUID, uuid4

class Dataset:

    def __init__(self, _name: str, _id: UUID = uuid4(), _creation_date: date = date.today()):
        self.name = _name
        self._id = _id
        self.creation_date = _creation_date

    def __eq__(self, dataset: object):

        if not isinstance(dataset, Dataset):
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

        self._name = n.strip() 

    @creation_date.setter
    def creation_date(self, d: date):
        if d > date.today():
            raise ValueError("La data di creazione del dataset non può essere futura.")

        self._creation_date = d 

    