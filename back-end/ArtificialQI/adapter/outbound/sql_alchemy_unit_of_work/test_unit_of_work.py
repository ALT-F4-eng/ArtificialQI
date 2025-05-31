
from typing import Any, Callable

from artificialqi.port.outbound.unit_of_work.test_unit_of_work import ITestUnitOfWork 

from adapter.outbound.llm_sql_alchemy_adapter import SqlAlchemyLlmAdapter
from artificialqi.adapter.outbound.test_sql_alchemy_adapter import SqlAlchemyTestAdapter
from artificialqi.adapter.outbound.test_result_sql_alchemy_adapter import SqlAlchemyTestResultAdapter


class TestUnitOfWork(ITestUnitOfWork): 

    def __init__(self, session_factory: Callable[[], Any]):
        self.session_factory = session_factory

    def __enter__(self) -> ITestUnitOfWork:

        self.session = self.session_factory()
        self.llm_repo = SqlAlchemyLlmAdapter(self.session)
        self.test_repo = SqlAlchemyTestAdapter(self.session)
        self.result_repo = SqlAlchemyTestResultAdapter(self.session)
        
        return self

    def __exit__(self, exc_type, exc_val, traceback): # type: ignore
        if exc_type is None:
            self.commit()
        else:
            self.rollback()

    def commit(self) -> None:
        self.session.commit()

    def rollback(self)->None:
        self.session.rollback()