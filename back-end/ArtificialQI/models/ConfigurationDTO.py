from pydantic import BaseModel

class ConfigurationDTO(BaseModel):
    url: str
    key_req: str
    key_resp: str
    body: dict[str, str]
    header: dict[str, str]