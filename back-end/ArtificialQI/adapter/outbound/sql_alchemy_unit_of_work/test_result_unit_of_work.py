
from typing import Any, Callable

from port.outbound.unit_of_work.test_result_unit_of_work import ITestResultUnitOfWork 

from adapter.outbound.test_sql_alchemy_adapter import SqlAlchemyTestAdapter
from adapter.outbound.test_result_sql_alchemy_adapter import SqlAlchemyTestResultAdapter


class TestResultUnitOfWork(ITestResultUnitOfWork): 

    def __init__(self, session_factory: Callable[[], Any]):
        self.session_factory = session_factory

    def __enter__(self) -> ITestResultUnitOfWork:
        
        self.session = self.session_factory()
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