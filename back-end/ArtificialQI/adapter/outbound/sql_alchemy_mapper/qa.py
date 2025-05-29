from adapter.outbound.sql_alchemy_model.qa import QuestionAnswerSqlAlchemyModel
from core.question_answer_pair import QuestionAnswerPair, qa_pair_factory_function

class QuestionAnswerModelMapper:

    @staticmethod
    def to_domain(model: QuestionAnswerSqlAlchemyModel) -> QuestionAnswerPair:

        return qa_pair_factory_function(
            id=model.id,
            dataset=model.dataset,
            answer=model.answer,
            question=model.question
        )

    @staticmethod
    def from_domain(domain: QuestionAnswerPair) -> QuestionAnswerSqlAlchemyModel:

        return QuestionAnswerSqlAlchemyModel(
            id=domain.id,
            dataset=domain.dataset,
            answer=domain.answer,
            question=domain.question
        )