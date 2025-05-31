from pydantic import BaseModel
from artificialqi.models.llm_dto import LlmDto

class LlmListDto(BaseModel):
    llm_list: list[LlmDto]