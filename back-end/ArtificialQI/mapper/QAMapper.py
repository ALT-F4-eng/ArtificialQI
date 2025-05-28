from uuid import UUID
from core.question_answer_pair import QuestionAnswerPair
from models.QuestionAnswerPairDTO import QuestionAnswerPairDTO



def qadto_to_qa(dto: QuestionAnswerPairDTO, dataset_id: UUID) -> QuestionAnswerPair:
    return QuestionAnswerPair(
        id=dto.id,
        dataset=dataset_id,
        question=dto.question or "",
        answer=dto.answer or ""
    )

def qa_to_qadto(domain: QuestionAnswerPair) -> QuestionAnswerPairDTO:
    return QuestionAnswerPairDTO(
        id=domain.id,
        question=domain.question,
        answer=domain.answer
    )