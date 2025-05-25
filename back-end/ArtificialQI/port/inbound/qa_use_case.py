from abc import ABC, abstractmethod
from uuid import UUID

from core.page import Page
from core.question_answer_pair import QuestionAnswerPair


class QaUseCase(ABC):

    @abstractmethod
    def create_qa(self, question:str, answer:str, dataset:UUID) -> QuestionAnswerPair:
        raise NotImplementedError
    
    @abstractmethod
    def get_qa_page(self, p:int, dataset:UUID, q:str = "") -> Page[QuestionAnswerPair]:
        raise NotImplementedError
    
    @abstractmethod
    def get_qa_by_id(self, id:UUID) -> QuestionAnswerPair:
        raise NotImplementedError
    
    @abstractmethod
    def update_qa(self, qa:QuestionAnswerPair) -> QuestionAnswerPair:
        raise NotImplementedError

    @abstractmethod 
    def delete_qa(self, id:UUID) -> UUID:
        raise NotImplementedError
