from typing import Optional
from uuid import UUID

from core.llm import Llm
from port.outbound.test_repository import TestRepository
from sqlalchemy.orm import Session

class SqlAlchemyTestAdapter(TestRepository):

    def __init__(self, session: Session):
        self.session = session


    def get_tests_from_dataset(self, dataset: UUID) -> Optional[list[Test]]:
        pass

    def delete_test(self, id: UUID) -> Optional[UUID]:
        pass

    def get_test_by_id(self, id: UUID) -> Optional[Test]:
        pass

    def get_all_tests(self, q: str = "") -> Optional[list[Test]]:
        pass

    def update_test(self, test: Test) -> Optional[Test]:
        pass

    def get_tests_from_llm(self, llm: UUID) -> Optional[list[Test]]:
        pass
