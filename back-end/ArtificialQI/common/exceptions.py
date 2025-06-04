

from uuid import UUID


class DatasetNonExsistentError(Exception):

    def __init__(self, id: UUID):
        super().__init__(f"Non esiste nessun dataset con id: {id}")


class PersistenceError(Exception):

    def __init__(self, msg: str):
        super().__init__(msg)

class DuplicateNameDatasetError(Exception):

    def __init__(self, name: str):
        super().__init__(f"Esiste già un dataset con nome: {name}")


