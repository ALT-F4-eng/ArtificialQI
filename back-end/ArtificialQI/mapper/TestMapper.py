from uuid import UUID
from core.test import Test
from core.test_statistics import TestStatistics
from models.TestDTO import TestDTO



def test_to_testdto(test: Test, llm_name: str, max_page: int) -> TestDTO:
    return TestDTO(
        id=test.id,
        name=test.name,
        llm_name=llm_name,
        exec_date=test.execution_date,
        tmp=test.tmp,
        max_page=max_page,
        avg_similarity=test.index.similarity_avg,
        std_dev_similarity=test.index.similarity_std_dev,
        correct_percentage=test.index.correct_percentage,
        distribution=test.index.result_distribution
    )

def testdto_to_test(dto: TestDTO, dataset_id: UUID, llm_id: UUID) -> Test:
    stats = TestStatistics(
        similarity_avg=dto.avg_similarity,
        similarity_std_dev=dto.std_dev_similarity,
        correct_percentage=dto.correct_percentage,
        result_distribution=dto.distribution
    )
    return Test(
        id=dto.id,
        dataset=dataset_id,
        llm=llm_id,
        index=stats,
        tmp=dto.tmp,
        name=dto.name,
        execution_date=dto.exec_date
    )