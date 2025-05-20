class PersistenceException(Exception):

    def __init__(self, msg: str):
        super().__init__(msg)


class DatasetNonExistentException(Exception):

    def __init__(self, msg: str):
        super().__init__(msg)


class InvalidDatasetOperationException(Exception):

    def __init__(self, msg: str):
        super().__init__(msg)


class TestNonExistentException(Exception):

    def __init__(self, msg: str):
        super().__init__(msg)


class InvalidTestOperationException(Exception):

    def __init__(self, msg: str):
        super().__init__(msg)

class InvalidDatasetDimensionException(Exception):

    def __init__(self, msg: str = "La dimensione di un dataset non può essere negativa."):
        super().__init__(msg)

class QaNonExistentException(Exception):

    def __init__(self, msg: str):
        super().__init__(msg)

class LlmNonExistentException(Exception):

    def __init__(self, msg: str):
        super().__init__(msg)