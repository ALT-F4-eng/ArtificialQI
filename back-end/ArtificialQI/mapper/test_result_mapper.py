from artificialqi.core.test_result import TestResult, test_result_factory_function
from artificialqi.models.test_result_dto import TestResultDTO
from artificialqi.mapper.qa_mapper import QaDtoMapper
from uuid import uuid4, UUID

class TestResultMapper:

    @staticmethod
    def to_dto(domain: TestResult) -> TestResultDTO:
        return TestResultDTO(
            qa=QaDtoMapper.to_dto(domain.question_answer_pair),
            is_correct=domain.is_correct,
            similarity_score=domain.similarity_score,
            llm_answer=domain.obtained_answer
        )

    @staticmethod
    def to_domain(dto: TestResultDTO, id: UUID) -> TestResult:
        return test_result_factory_function(
            test_id= id or uuid4(),
            question_answer_pair=QaDtoMapper.to_domain(dto.qa),
            obtained_answer=dto.llm_answer,
            similarity_score=dto.similarity_score,
            is_correct=dto.is_correct
        )