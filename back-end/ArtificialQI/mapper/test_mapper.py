from uuid import UUID
from artificialqi.core.test import Test
from artificialqi.core.test_statistics import test_statistics_factory_function
from artificialqi.models.test_dto import TestDTO
from artificialqi.core.llm import Llm
from artificialqi.core.dataset import Dataset
from artificialqi.core.test_factory import TestFactory


class TestDtoMapper:

    @staticmethod
    def to_dto(test: Test, llm: Llm, test_set: Dataset) -> TestDTO:
        return TestDTO(
            id=test.id,
            name=test.name,
            llm_name=llm.name,
            exec_date=test.execution_date,
            tmp=test.tmp,
            max_page=test_set.dim,
            avg_similarity=test.index.similarity_avg,
            std_dev_similarity=test.index.similarity_std_dev,
            correct_percentage=test.index.correct_percentage,
            distribution=test.index.result_distribution
        )
    
    @staticmethod
    def to_domain(dto: TestDTO, dataset_id: UUID, llm_id: UUID) -> Test:
        stats = test_statistics_factory_function(
            similarity_avg=dto.avg_similarity,
            similarity_std_dev=dto.std_dev_similarity,
            correct_percentage=dto.correct_percentage,
            result_distribution=dto.distribution
        )

        if dto.tmp:
            return TestFactory.tmp(
                id=dto.id,
                dataset=dataset_id,
                llm=llm_id,
                index=stats,
                execution_date=dto.exec_date
            )
        else:
            return TestFactory.saved(
                id=dto.id,
                dataset=dataset_id,
                llm=llm_id,
                index=stats,
                execution_date=dto.exec_date,
                name=dto.name
            )

