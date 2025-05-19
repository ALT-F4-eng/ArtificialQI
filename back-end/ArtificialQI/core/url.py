from dataclasses import dataclass
from datetime import date
from uuid import UUID

@dataclass
class Url:
    domain: str
    patch: str
    questy: str
