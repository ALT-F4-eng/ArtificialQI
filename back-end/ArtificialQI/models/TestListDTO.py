from pydantic import BaseModel
from models.TestDTO import TestDTO

class TestListDTO(BaseModel):
    test_list: list[TestDTO]