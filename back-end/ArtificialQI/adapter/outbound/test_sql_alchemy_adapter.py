from typing import Optional
from uuid import UUID

from artificialqi.core.test import Test
from artificialqi.port.outbound.test_repository import TestRepository
from artificialqi.adapter.outbound.sql_alchemy_mapper.test import TestModelMapper
from artificialqi.adapter.outbound.sql_alchemy_model.test import TestSqlAlchemyModel
from sqlalchemy.orm import Session
from sqlalchemy import delete, update, select

class SqlAlchemyTestAdapter(TestRepository):

    def __init__(self, session: Session):
        self.session = session

    def get_tests_from_dataset(self, dataset: UUID) -> Optional[list[Test]]:
        
        res: Optional[list[Test]] = []

        get_query = select(TestSqlAlchemyModel).where(TestSqlAlchemyModel.dataset == dataset)
        
        try:
           res = [ TestModelMapper.to_domain(r) for r in self.session.scalars(get_query).all()]

        except Exception:
            res = None

        return res

    def delete_test(self, id: UUID) -> Optional[UUID]:
        
        res: Optional[UUID] = id

        del_query = delete(TestSqlAlchemyModel).where(TestSqlAlchemyModel.id == id)

        try:
            self.session.execute(del_query)
            self.session.flush()
        except Exception:
            res = None

        return res

    def get_test_by_id(self, id: UUID) -> Optional[Test]:

        get_query = select(TestSqlAlchemyModel).where(TestSqlAlchemyModel.id == id)

        try:
            res: Optional[Test] = TestModelMapper.to_domain(self.session.scalars(get_query).one())

        except Exception:
            return None

        return res

    def get_all_tests(self, q: str = "") -> Optional[list[Test]]:
        
        res: Optional[list[Test]] = []

        get_query = select(TestSqlAlchemyModel).where(TestSqlAlchemyModel.name.like(f"%{q}%"))

        try:
            resp = self.session.scalars(get_query).all()
            res = [TestModelMapper.to_domain(r) for r in resp]

        except Exception:
            return None

        return res

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
            self.session.execute(update_query)
            self.session.flush()
        except Exception:
            res = None
        
        return res

    def get_tests_from_llm(self, llm: UUID) -> Optional[list[Test]]:

        res: Optional[list[Test]] = []

        del_query = select(TestSqlAlchemyModel).where(TestSqlAlchemyModel.llm == llm)

        try:
            resp = self.session.scalars(del_query).all()
            res = [TestModelMapper.to_domain(r) for r in resp]
        except Exception:
            res = None

        return res

