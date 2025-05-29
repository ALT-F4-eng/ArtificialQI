
from typing import Any, Callable

from port.outbound.unit_of_work.dataset_unit_of_work import IDatasetUnitOfWork 
from adapter.outbound.qa_sql_alchemy_adapter import SqlAlchemyQaPairAdapter
from adapter.outbound.dataset_sql_alchemy_adapter import SqlAlchemyDatasetAdapter
from adapter.outbound.test_sql_alchemy_adapter import SqlAlchemyTestAdapter
from adapter.outbound.test_result_sql_alchemy_adapter import SqlAlchemyTestResultAdapter


class DatasetUnitOfWork(IDatasetUnitOfWork): 

    def __init__(self, session_factory: Callable[[], Any]):
        self.session_factory = session_factory

    def __enter__(self) -> IDatasetUnitOfWork:

        self.session = self.session_factory()
        self.dataset_repo = SqlAlchemyDatasetAdapter(self.session)
        self.qa_repo = SqlAlchemyQaPairAdapter(self.session)
        self.test_repo = SqlAlchemyTestAdapter(self.session)
        self.result_repo = SqlAlchemyTestResultAdapter(self.session)
        
        return self

    def __exit__(self, exc_type, exc_val, traceback): # type: ignore
        if exc_type is None:
            self.commit()
        else:
            self.rollback()

    def commit(self) -> None:
        raise NotImplementedError

    def rollback(self)->None:
        self.session.rollback()