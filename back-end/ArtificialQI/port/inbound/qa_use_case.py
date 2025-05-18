from uuid import UUID
from core.question_answer_pair import QuestionAnswerPair
from core.page import Page
from abc import ABC, abstractmethod


class QaUseCase(ABC):
    
    @abstractmethod
    def create_qa(self, question:str, answer:str) -> QuestionAnswerPair:
        raise NotImplementedError
    
    @abstractmethod
    def get_qa_page(self, p:int, id_dataset:UUID, q:str = "") -> Page:
        raise NotImplementedError
    
    @abstractmethod
    def get_qa_by_id(self, id:UUID) -> QuestionAnswerPair:
        raise NotImplementedError
    
    @abstractmethod
    def update_qa(qa:QuestionAnswerPair) -> QuestionAnswerPair:
        raise NotImplementedError

    @abstractmethod 
    def delete_qa(id:UUID) -> UUID:
        raise NotImplementedError
