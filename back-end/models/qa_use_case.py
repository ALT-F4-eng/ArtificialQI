from uuid import UUID
from port.question_answer_pair import QuestionAnswerPair

class QaUseCase:
    
    def create_qa(self, question:str, answer:str) -> QuestionAnswerPair:
        pass

    def get_qa_page(self, p:PageNum, id_dataset:UUID, q:str = '') -> Page:
        pass

    def get_qa_by_id(self, id:UUID) -> QuestionAnswerPair:
        pass

    def update_qa(qa:QuestionAnswerPair) -> QuestionAnswerPair:
        pass
    
    def delete_qa(id:UUID) -> UUID:
        pass