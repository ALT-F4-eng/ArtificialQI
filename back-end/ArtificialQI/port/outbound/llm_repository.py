from abc import ABC, abstractmethod
from typing import Optional
from uuid import UUID

from core.llm import Llm


class LlmRepository(ABC):

    @abstractmethod
    def delete_llm(self, id: UUID) -> Optional[UUID]:
        raise NotImplementedError

    @abstractmethod
    def update_llm(self, llm: Llm) -> Optional[Llm]:
        raise NotImplementedError

    @abstractmethod
    def create_llm(self, llm: Llm) -> Optional[Llm]:
        raise NotImplementedError

    @abstractmethod
    def get_llm_by_id(self, id: UUID) -> Optional[Llm]:
        raise NotImplementedError

    @abstractmethod
    def get_all_llms(self) -> Optional[list[Llm]]:
        raise NotImplementedError
