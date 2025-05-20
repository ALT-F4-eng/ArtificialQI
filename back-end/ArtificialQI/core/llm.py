from dataclasses import dataclass
from datetime import date
from uuid import UUID
from core.llm_config import Config

@dataclass
class Llm:
    id: UUID
    name: str
    config: Config
    last_mod: date

def llm_factory_function(id: UUID, name:str, config:Config, last_mod: date) -> Llm:

    if id is None:
        raise ValueError

    if config is None:
        raise ValueError

    return Llm(
        id=id, name=name, config=config, last_mod=last_mod
    )