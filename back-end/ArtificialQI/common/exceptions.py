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
