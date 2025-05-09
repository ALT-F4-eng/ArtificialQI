from port.question_answer_pair import QuestionAnswerPair
from tools.question_answer_pair_dto import QuestionAnswerPairDto

class QuestionAnswerPairDtoMapper:
    
    def to_dto(qa: QuestionAnswerPair) -> QuestionAnswerPairDto:
        return QuestionAnswerPairDto(
            id=qa.get_id(),
            question=qa.get_question(),
            answer=qa.get_answer()
        ).to_dict()

    def to_domain(dto: QuestionAnswerPairDto) -> QuestionAnswerPair:
        return QuestionAnswerPair(
            id=dto.get_id(),
            dataset=dto.get_dataset_id(),#NON SAPEVO COME ALTRO FARE
            question=dto.get_question(),
            answer=dto.get_answer()
        )