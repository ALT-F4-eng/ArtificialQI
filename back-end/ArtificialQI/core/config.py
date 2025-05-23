from uuid import UUID
from core.url import Url
from core.key_value_list import KeyValueList
from abc import ABC, abstractmethod
from core.http_config import HttpConfig


class Config(ABC):

    @abstractmethod
    def create_config(self, id: UUID, url: Url, key_req: str, key_resp: str, header: KeyValueList, body: KeyValueList ) -> HttpConfig:
        raise NotImplementedError
    
