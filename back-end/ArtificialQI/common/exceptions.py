
class PersistenceException(Exception):
    
    def __init__(self, msg: str):
        super().__init__(msg)

class DatasetNonExistentException(Exception):

    def __init__(self, msg: str):
        super().__init__(msg)

class InvalidDatasetOperationException(Exception):

    def __init__(self, msg: str):
        super().__init__(msg)

class InvalidDatasetNameException(Exception):

    def __init__(self, msg: str = "Il nome di un dataset non può essere vuoto."):
        super().__init__(msg)

class InvalidDatasetSavedDateException(Exception):

    def __init__(self, msg: str="La data dell'ultimo salvataggio non può essere minore della data del primo salvataggio."):
        super().__init__(msg)

class InvalidDatasetDimensionException(Exception):

    def __init__(self, msg: str = "La dimensione di un dataset non può essere negativa."):
        super().__init__(msg)

class QaNonExistentException(Exception):

    def __init__(self, msg: str):
        super().__init__(msg)