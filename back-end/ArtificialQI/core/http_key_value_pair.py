from dataclasses import dataclass
from datetime import date
from uuid import UUID

@dataclass
class HttpKeyValuePair:
    key: str
    value: str
