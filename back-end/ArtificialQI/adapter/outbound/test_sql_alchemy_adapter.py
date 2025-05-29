from typing import Optional
from uuid import UUID

from core.test import Test
from port.outbound.test_repository import TestRepository
from adapter.outbound.sql_alchemy_mapper.test import TestModelMapper
from adapter.outbound.sql_alchemy_model.test import TestSqlAlchemyModel
from sqlalchemy.orm import Session
from sqlalchemy import delete, update, select

class SqlAlchemyTestAdapter(TestRepository):

    def __init__(self, session: Session):
        self.session = session


    def get_tests_from_dataset(self, dataset: UUID) -> Optional[list[Test]]:
        pass

    def delete_test(self, id: UUID) -> Optional[UUID]:
        
        res: Optional[UUID] = id

        del_query = delete(TestSqlAlchemyModel).where(TestSqlAlchemyModel.id == id)

        try:
            self.session.execute(del_query).one()
        except Exception:
            res = None

        return res

    def get_test_by_id(self, id: UUID) -> Optional[Test]:
        pass

    def get_all_tests(self, q: str = "") -> Optional[list[Test]]:
        pass

    def update_test(self, test: Test) -> Optional[Test]:

        res: Optional[Test] = test

        update_query = update(TestSqlAlchemyModel).where(TestSqlAlchemyModel.id == test.id).values(
            dataset = test.dataset,
            llm=test.llm,
            execution_date=test.execution_date,
            name=test.name,
            tmp=test.is_tmp()
        )

        try:
            self.session.execute(update_query).one()
        except Exception:
            res = None
        
        return res

    def get_tests_from_llm(self, llm: UUID) -> Optional[list[Test]]:

        res: Optional[list[Test]] = []

        del_query = select(TestSqlAlchemyModel).where(TestSqlAlchemyModel.llm == llm)

        try:
            res = [TestModelMapper.to_domain(res) for res in self.session.execute(del_query).all()]
        except Exception:
            res = None

        return res

