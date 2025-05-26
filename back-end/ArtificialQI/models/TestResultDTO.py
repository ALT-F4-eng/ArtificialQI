from pydantic import BaseModel
from models.QuestionAnswerPairDTO import QuestionAnswerPairDTO

class TestResultDto(BaseModel):
    qa: QuestionAnswerPairDTO
    is_correct: bool
    similarity_score: float
    llm_answer: str
