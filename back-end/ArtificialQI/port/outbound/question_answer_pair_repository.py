from abc import ABC, abstractmethod
from typing import Optional
from uuid import UUID

from core.question_answer_pair import QuestionAnswerPair


class QuestionAnswerPairRepository(ABC):

    @abstractmethod
    def update_qa(self, qa: QuestionAnswerPair) -> Optional[QuestionAnswerPair]:
        raise NotImplementedError

    @abstractmethod
    def create_qa(self, qa: QuestionAnswerPair) -> Optional[QuestionAnswerPair]:
        raise NotImplementedError

    @abstractmethod
    def delete_qa(self, qa: UUID) -> Optional[UUID]:
        raise NotImplemented
    
    @abstractmethod
    def delete_all_from_dataset(self, dataset: UUID) -> Optional[UUID]:
        raise NotImplementedError

    @abstractmethod
    def copy_all_from_dataset(self, src_dataset: UUID, dst_dataset: UUID) -> bool:
        raise NotImplementedError

    @abstractmethod
    def get_qa_set(self, dataset: UUID, start: int, offset: int, q: str = "") -> Optional[set[QuestionAnswerPair]]:
        raise NotImplemented
    
    @abstractmethod 
    def get_qa_by_id(self, id: UUID) -> Optional[QuestionAnswerPair]:
        raise NotImplementedError
