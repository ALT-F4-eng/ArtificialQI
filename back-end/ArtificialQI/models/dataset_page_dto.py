from pydantic import BaseModel
from artificialqi.models.qa_dto import QuestionAnswerPairDto

class DatsetPageDto(BaseModel):
    page_n: int
    qa_set: set[QuestionAnswerPairDto]
