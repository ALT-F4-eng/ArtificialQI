from core.config import Config
from uuid import UUID, uuid4
from common.exceptions import *
from dataclasses import dataclass
from core.url import Url
from core.key_value_list import KeyValueList

@dataclass
class HttpConfig(Config):
    id: UUID
    url: Url
    key_req: str
    key_resp: str
    header: KeyValueList
    body: KeyValueList

    def create_config(self, id: UUID, url: Url, key_req: str, key_resp: str, header: KeyValueList, body: KeyValueList ) -> Config:
       
        if id is None:
            raise ValueError

        if url is None:
            raise ValueError
        if not isinstance(url, Url):
            raise TypeError

        if not isinstance(key_req, str) or not key_req.strip():
            raise ValueError
        if not isinstance(key_resp, str) or not key_resp.strip():
            raise ValueError

        if header is None:
            raise ValueError
        if not isinstance(header, KeyValueList):
            raise TypeError
        if not header.key_value_list:
            raise ValueError

        if body is None:
            raise ValueError
        if not isinstance(body, KeyValueList):
            raise TypeError
        if not body.key_value_list:
            raise ValueError

        return HttpConfig(id=id, url=url, key_req=key_req, key_resp=key_resp, header=header, body=body)