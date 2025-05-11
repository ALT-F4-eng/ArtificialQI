from uuid import UUID
from tools.page_num import PageNum #ERA PREVISTA QUESTA CLASSE?
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from port.question_answer_pair import QuestionAnswerPair
    from port.page import Page

class QaUseCase:
    
    def create_qa(self, question:str, answer:str) -> 'QuestionAnswerPair':
        #from port.question_answer_pair import QuestionAnswerPair
        pass

    def get_qa_page(self, p:PageNum, id_dataset:UUID, q:str = '') -> 'Page':
        #from port.question_answer_pair import QuestionAnswerPair
        #from port.page import Page
        pass

    def get_qa_by_id(self, id:UUID) -> 'QuestionAnswerPair':
        #from port.question_answer_pair import QuestionAnswerPair
        pass

    def update_qa(qa:'QuestionAnswerPair') -> 'QuestionAnswerPair':
        #from port.question_answer_pair import QuestionAnswerPair
        pass
    
    def delete_qa(id:UUID) -> UUID:
        #from port.question_answer_pair import QuestionAnswerPair
        pass