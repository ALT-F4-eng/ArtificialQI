from dataclasses import dataclass
from core.http_key_value_pair import HttpKeyValuePair

@dataclass
class KeyValueList:
    key_value_list: set[HttpKeyValuePair]

def key_value_list_factory_function(key_value_list: set[HttpKeyValuePair]) -> KeyValueList:
    

    return KeyValueList(
        key_value_list=key_value_list
    )