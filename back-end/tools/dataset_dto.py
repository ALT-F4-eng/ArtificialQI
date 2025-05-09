from uuid import UUID
from datetime import date

class DatasetDto:
    def __init__(self, id:UUID, name:str, last_mod:date, first_save:date, origin_id:UUID, tmp:bool, max_page:int, element_n:int):
        self.id = id
        self.name = name
        self.last_mod = last_mod
        self.first_save = first_save
        self.origin_id = origin_id
        self.tmp = tmp
        self.max_page = max_page
        self.element_n = element_n    

    def get_id(self) -> UUID:
        return self._id

    def get_name(self) -> str:
        return self._name

    def get_last_mod(self) -> date:
        return self._last_mod

    def get_first_save(self) -> date:
        return self._first_save

    def get_origin_id(self) -> UUID:
        return self._origin_id

    def is_tmp(self) -> bool:
        return self._tmp

    def get_max_page(self) -> int:
        return self._max_page

    def get_element_n(self) -> int:
        return self._element_n
    
    def to_dict(self) -> dict:
        return {
            "id": str(self.id),
            "name": self.name,
            "last_mod": self.last_mod.isoformat(),
            "first_save": self.first_save.isoformat(),
            "origin_id": str(self.origin_id),
            "tmp": self.tmp,
            "max_page": self.max_page,
            "element_n": self.element_n,
        }