from dataclasses import dataclass
from datetime import date
from uuid import UUID
from core.http_key_value_pair import HttpKeyValuePair

@dataclass
class KeyValueList:
    key_value_list: set[HttpKeyValuePair]
