from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from port.question_answer_pair import QuestionAnswerPair

class DatasetPageDto:
    def __init__(self, page_n:int, qa_set:'QuestionAnswerPair'):
        self.page_n:int = page_n
        self.qa_set:list['QuestionAnswerPair'] = qa_set
    
    def get_page_n(self) -> int:
        return self.page_n
    
    def get_qa_set(self) -> list['QuestionAnswerPair']:
        return self.qa_set
    
    def to_dict(self) -> dict:
        return {
            'page_n':self.page_n,
            'qa_set':self.qa_set
        }