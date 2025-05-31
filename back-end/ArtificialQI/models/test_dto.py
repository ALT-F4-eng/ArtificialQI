from pydantic import BaseModel
from uuid import UUID
from datetime import date

class TestDto(BaseModel):
    id: UUID
    name: str | None
    llm_name: str 
    exec_date: date
    tmp: bool
    max_page: int
    avg_similarity: float
    std_dev_similarity: float
    correct_percentage: float
    distribution: list[int]
