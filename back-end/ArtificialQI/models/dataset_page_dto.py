from pydantic import BaseModel
from artificialqi.models.qa_dto import QuestionAnswerPairDTO

class DatsetPageDTO(BaseModel):
    page_n: int
    qa_set: set[QuestionAnswerPairDTO]
