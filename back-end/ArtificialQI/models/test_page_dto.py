from pydantic import BaseModel
from artificialqi.models.test_result_dto import TestResultDto

class TestPageDto(BaseModel):
    page_n : int
    result_list: list[TestResultDto]