from dataclasses import dataclass

@dataclass
class HttpKeyValuePair:
    key: str
    value: str

def http_key_value_pair_factory_function(key: str, value: str) -> HttpKeyValuePair:

    if not (key.strip() or value.strip()):
        raise ValueError

    return HttpKeyValuePair(
        key=key, value=value
    )
