from uuid import UUID

class PersistenceException(Exception):

    def __init__(self, msg: str):
        super().__init__(msg)


class DatasetNonExistentException(Exception):

    def __init__(self, id: UUID):
        super().__init__(f"Non esiste un dataset con id {id}.")


class InvalidDatasetOperationException(Exception):

    def __init__(self, msg: str):
        super().__init__(msg)

class TestNonExistentException(Exception):

    def __init__(self, id: UUID):
        super().__init__(f"Non esiste un test con id {id}.")

class InvalidTestOperationException(Exception):

    def __init__(self, msg: str):
        super().__init__(msg)

class QaNonExistentException(Exception):

     def __init__(self, id: UUID):
        super().__init__(f"Non esiste una coppia domanda risposta con id {id}.")

class LlmNonExistentException(Exception):

    def __init__(self, id: UUID):
        super().__init__(f"Non esiste un llm con id {id}.")
    
class PageNonExistentException(Exception):

    def __init__(self, n: int):
        super().__init__(f"La pagina numero {n} non esiste.")
    