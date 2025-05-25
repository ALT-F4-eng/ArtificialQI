from dataclasses import dataclass
from uuid import UUID
from core.url import Url
from core.key_value_list import KeyValueList

@dataclass
class Config:
    id: UUID
    url: Url
    key_req: str
    key_resp: str
    header: KeyValueList
    body: KeyValueList

