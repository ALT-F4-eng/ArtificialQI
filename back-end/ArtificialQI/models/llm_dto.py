from pydantic import BaseModel
from uuid import UUID
from datetime import date
from artificialqi.models.configuration_dto import ConfigurationDTO

class LlmDTO(BaseModel):
    id: UUID
    name: str
    last_mod: date
    configuration: ConfigurationDTO