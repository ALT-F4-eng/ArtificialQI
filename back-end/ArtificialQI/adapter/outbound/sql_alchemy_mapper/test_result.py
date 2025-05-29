# type: ignore

from adapter.outbound.sql_alchemy_model.test_result import TestResultSqlAlchemyModel 
from adapter.outbound.sql_alchemy_mapper.qa import QuestionAnswerModelMapper  
from core.test_result import TestResult, test_result_factory_function

class TestResultModelMapper:

    @staticmethod
    def to_domain(model: TestResultSqlAlchemyModel) -> TestResult:
        return test_result_factory_function(
            question_answer_pair=QuestionAnswerModelMapper.to_domain(model.qa_ref),
            obtained_answer=model.obtained_answer,
            similarity_score=model.similarity_score,
            is_correct=model.is_correct,
            test_id=model.test
        )


    @staticmethod
    def from_domain(domain: TestResult) -> TestResultSqlAlchemyModel:
        
        return TestResultSqlAlchemyModel(
            test=domain.test_id,
            qa=domain.question_answer_pair.id,
            obtained_answer=domain.obtained_answer,
            similarity_score=domain.similarity_score,
            is_correct=domain.is_correct
        )