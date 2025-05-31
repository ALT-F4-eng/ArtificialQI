from pydantic import BaseModel
from uuid import UUID
from typing import Optional

class QuestionAnswerPairDTO(BaseModel):
    id: Optional[UUID]
    question: Optional[str]
    answer: Optional[str]
    dataset: UUID