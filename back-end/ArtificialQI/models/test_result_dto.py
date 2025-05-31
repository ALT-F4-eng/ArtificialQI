from pydantic import BaseModel
from artificialqi.models.qa_dto import QuestionAnswerPairDTO

class TestResultDto(BaseModel):
    qa: QuestionAnswerPairDTO
    is_correct: bool
    similarity_score: float
    llm_answer: str
