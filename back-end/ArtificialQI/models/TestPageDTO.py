from pydantic import BaseModel
from models.TestResultDTO import TestResultDto

class TestPageDTO(BaseModel):
    page_n : int
    result_list: list[TestResultDto]