from dataclasses import dataclass
from core.http_key_value_pair import HttpKeyValuePair

@dataclass
class KeyValueList:
    key_value_list: set[HttpKeyValuePair]
