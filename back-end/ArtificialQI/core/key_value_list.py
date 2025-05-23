from dataclasses import dataclass
from datetime import date
from uuid import UUID
from core.http_key_value_pair import HttpKeyValuePair

@dataclass
class KeyValueList:
    key_value_list: set[HttpKeyValuePair]

def key_value_list_factory_function(key_value_list: set[HttpKeyValuePair]) -> KeyValueList:

    if key_value_list is None:
        raise ValueError
        
    if not isinstance(key_value_list, set):
        raise TypeError
        
    if len(key_value_list) == 0:
        raise ValueError
        
    for pair in key_value_list:
        if not isinstance(pair, HttpKeyValuePair):
            raise TypeError
        if not isinstance(pair.key, str) or not pair.key.strip():
            raise ValueError
        if not isinstance(pair.value, str) or not pair.value.strip():
            raise ValueError

    return KeyValueList(
        key_value_list=key_value_list
    )