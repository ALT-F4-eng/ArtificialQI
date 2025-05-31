from abc import ABC, abstractmethod
from uuid import UUID

from artificialqi.core.llm import Llm


class LlmUseCase(ABC):

    @abstractmethod
    def create_llm(self, llm: Llm) -> Llm:
        raise NotImplementedError

    @abstractmethod
    def delete_llm(self, id: UUID) -> UUID:
        raise NotImplementedError

    @abstractmethod
    def update_dataset(self, llm: Llm) -> Llm:
        raise NotImplementedError

    @abstractmethod
    def get_all_llms(self) -> list[Llm]:
        raise NotImplementedError

    @abstractmethod
    def get_llm_by_id(self, id: UUID) -> Llm:
        raise NotImplementedError
