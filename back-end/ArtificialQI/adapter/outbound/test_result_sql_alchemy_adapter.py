from typing import Optional
from uuid import UUID

from core.test_result import TestResult
from port.outbound.test_result_repository import TestResultRepository
from sqlalchemy.orm import Session
from sqlalchemy import func, select, delete
from adapter.outbound.sql_alchemy_mapper.test_result import TestResultModelMapper
from adapter.outbound.sql_alchemy_model.test_result import TestResultSqlAlchemyModel


class SqlAlchemyTestResultAdapter(TestResultRepository):

    def __init__(self, session: Session):
        self.session = session

    def save_results(self, results: list[TestResult]) -> bool:
        
        res: bool = True 

        try:
            for r in results:
                self.session.add(TestResultModelMapper.from_domain(r))
        except Exception:
            res = False

        return res

    def get_results(self, test: UUID, start: int, offset: int, q: str = "") -> Optional[set[TestResult]]:

        get_query = select(TestResultSqlAlchemyModel).where(
            (TestResultSqlAlchemyModel.test_ref.id == test) &
            (
                (func.lower(TestResultSqlAlchemyModel.qa_ref.question).like(f"%{q.lower()}%")) |
                (func.lower(TestResultSqlAlchemyModel.qa_ref.answer).like(f"%{q.lower()}%")) |
                (func.lower(TestResultSqlAlchemyModel.obtained_answer).like(f"%{q.lower()}%"))
            ) 
        ).offset(start).limit(offset)

        try:
            res_list = self.session.scalars(get_query).all()
        except Exception:
            return None
        
        res_set: set[TestResult] = {TestResultModelMapper.to_domain(res) for res in res_list}

        return res_set

    def delete_all_from_test(self, test: UUID) -> bool:
        
        del_query = delete(TestResultSqlAlchemyModel).where(TestResultSqlAlchemyModel.test == test)

        try:
            self.session.execute(del_query).one()
        except Exception:
            return False
        
        return True
        


