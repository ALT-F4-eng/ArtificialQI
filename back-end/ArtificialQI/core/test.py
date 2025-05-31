from dataclasses import dataclass
from datetime import date
from uuid import UUID

from artificialqi.core.test_statistics import TestStatistics


@dataclass
class Test:

    id: UUID
    dataset: UUID
    llm: UUID
    index: TestStatistics
    tmp: bool
    name: str|None
    execution_date: date

    def __eq__(self, test: object) -> bool:
        if not isinstance(test, Test):
            return False
        
        return self.id == test.id
    
    def is_tmp(self) -> bool:
        return self.tmp

