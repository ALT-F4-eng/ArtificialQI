from pydantic import BaseModel
from models.LlmDTO import LlmDTO

class LlmListDTO(BaseModel):
    llm_list: list[LlmDTO]