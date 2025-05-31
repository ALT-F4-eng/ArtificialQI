from uuid import UUID
from artificialqi.core.question_answer_pair import QuestionAnswerPair
from artificialqi.models.qa_dto import QuestionAnswerPairDto


class QaDtoMapper:
    
    @staticmethod
    def to_domain(dto: QuestionAnswerPairDto) -> QuestionAnswerPair:
        return QuestionAnswerPair(
            id=dto.id,
            dataset=dto.dataset,
            question=dto.question or "",
            answer=dto.answer or ""
        )
    
    @staticmethod
    def to_dto(domain: QuestionAnswerPair) -> QuestionAnswerPairDto:
        return QuestionAnswerPairDto(
            id=domain.id,
            dataset=domain.dataset,
            question=domain.question,
            answer=domain.answer
        )