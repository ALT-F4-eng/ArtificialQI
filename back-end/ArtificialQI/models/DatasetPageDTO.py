from pydantic import BaseModel
from models.QuestionAnswerPairDTO import QuestionAnswerPairDTO

class DatsetPageDTO(BaseModel):
    Page_n: int
    qa_set: set[QuestionAnswerPairDTO]
