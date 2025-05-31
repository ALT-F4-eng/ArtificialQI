from pydantic import BaseModel
from artificialqi.models.qa_dto import QuestionAnswerPairDto

class TestResultDto(BaseModel):
    qa: QuestionAnswerPairDto
    is_correct: bool
    similarity_score: float
    llm_answer: str
