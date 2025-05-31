from pydantic import BaseModel
from artificialqi.models.llm_dto import LlmDTO

class LlmListDTO(BaseModel):
    llm_list: list[LlmDTO]