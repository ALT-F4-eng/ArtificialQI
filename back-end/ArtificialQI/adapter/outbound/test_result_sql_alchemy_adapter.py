from typing import Optional
from uuid import UUID

from artificialqi.core.test_result import TestResult
from artificialqi.port.outbound.test_result_repository import TestResultRepository
from artificialqi.adapter.outbound.sql_alchemy_mapper.test_result import TestResultModelMapper
from artificialqi.adapter.outbound.sql_alchemy_model.test_result import TestResultSqlAlchemyModel
from sqlalchemy.orm import Session
from sqlalchemy import func, select, delete


class SqlAlchemyTestResultAdapter(TestResultRepository):

    def __init__(self, session: Session):
        self.session = session

    def save_results(self, results: list[TestResult]) -> bool:
        
        res: bool = True 

        try:
            [self.session.add(TestResultModelMapper.from_domain(r)) for r in results]
            self.session.flush()
        except Exception:
            res = False

        return res

    def get_results(self, test: UUID, offset: int, end: int, q: str = "") -> Optional[set[TestResult]]:

        res_set: Optional[set[TestResult]] = set()

        get_query = select(TestResultSqlAlchemyModel).where(
            (TestResultSqlAlchemyModel.test == test) &
            (
                (func.lower(TestResultSqlAlchemyModel.qa_ref.question).like(f"%{q.lower()}%")) |
                (func.lower(TestResultSqlAlchemyModel.qa_ref.answer).like(f"%{q.lower()}%")) |
                (func.lower(TestResultSqlAlchemyModel.obtained_answer).like(f"%{q.lower()}%"))
            ) 
        ).offset(offset).limit(end)

        try:
            res_list = self.session.scalars(get_query).all()
            res_set  = {TestResultModelMapper.to_domain(res) for res in res_list}
        except Exception:
            res_set = None

        return res_set

    def delete_all_from_test(self, test: UUID) -> bool:
        
        del_query = delete(TestResultSqlAlchemyModel).where(TestResultSqlAlchemyModel.test == test)

        try:
            self.session.execute(del_query)
            self.session.flush()
        except Exception:
            return False
        
        return True
        


