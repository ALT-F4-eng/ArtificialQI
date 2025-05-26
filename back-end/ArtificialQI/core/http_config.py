from core.comunication_config import ComunicationConfig
from uuid import UUID
from common.exceptions import *
from dataclasses import dataclass
from core.key_value_list import KeyValueList

@dataclass
class HttpConfig(ComunicationConfig):

    id: UUID
    url: str
    key_req: str
    key_resp: str
    header: KeyValueList
    body: KeyValueList

def http_config_function_factory(id: UUID, url: str, key_req: str, key_resp: str, header: KeyValueList, body: KeyValueList ) -> HttpConfig:
    # TO DO

    return HttpConfig(id=id, url=url, key_req=key_req, key_resp=key_resp, header=header, body=body)