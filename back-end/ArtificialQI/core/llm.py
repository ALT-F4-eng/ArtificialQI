from dataclasses import dataclass
from datetime import date
from uuid import UUID
from core.llm_config import Config

@dataclass
class Llm:
    id: UUID
    name: str
    config: Config
    last_save_date: date
