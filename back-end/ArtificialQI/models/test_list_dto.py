from pydantic import BaseModel
from artificialqi.models.test_dto import TestDto

class TestListDto(BaseModel):
    test_list: list[TestDto]