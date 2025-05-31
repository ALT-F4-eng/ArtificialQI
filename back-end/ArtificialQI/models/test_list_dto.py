from pydantic import BaseModel
from artificialqi.models.test_dto import TestDTO

class TestListDTO(BaseModel):
    test_list: list[TestDTO]