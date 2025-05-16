from uuid import UUID
from datetime import date
from dataclasses import dataclass

@dataclass
class TestStatistics:

    similarity_avg: float
    similarity_std_dev: float
    result_distribution: list[int]
    correct_percentage: float
    
def function_factory_test_statistics(similarity_avg: float, similarity_std_dev: float, result_distribution: list[int], correct_percentage: float) -> TestStatistics:
    

    DISTRIBUTION_BEANS: int = 5

    if similarity_avg is None or similarity_avg < 0:
        raise Exception
    
    if similarity_std_dev is None or similarity_avg < 0:
        raise Exception
    
    if result_distribution is None or len(result_distribution) > DISTRIBUTION_BEANS:
        raise Exception
    
    if correct_percentage is None or (correct_percentage > 1 or correct_percentage < 0):
        raise Exception
    
    return TestStatistics(similarity_avg, similarity_std_dev, result_distribution, correct_percentage)

class Test:

    def __init__(self, id: UUID, dataset: UUID, llm: UUID, index: TestStatistics, tmp: bool, execution_date: date):
        self._id: UUID = id
        self._dataset : UUID = dataset
        self._llm : UUID = llm
        self._index: TestStatistics = index
        self._tmp: bool = tmp
        self._execution_date: date = execution_date

    @property
    def id(self) -> UUID:
        return self._id

    @property
    def dataset(self) -> UUID:
        return self._dataset

    @property
    def llm(self) -> UUID:
        return self._llm

    @property
    def index(self) -> TestStatistics:
        return self._index

    @property
    def tmp(self) -> bool:
        return self._tmp
    
    @property
    def execution_date(self) -> date:
        return self._execution_date
    
    