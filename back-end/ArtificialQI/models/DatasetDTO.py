from pydantic import BaseModel
from uuid import UUID
from datetime import date
from typing import Optional

class DatasetDTO(BaseModel):
    id: UUID
    name: Optional[str]
    last_mod: Optional[date]
    first_save: Optional[date]
    origin_id: Optional[UUID]
    tmp: bool
    max_page: int
    element_n: int