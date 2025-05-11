from tools.question_answer_pair_dto import QuestionAnswerPairDto

class TestResultDto:
    def __init__(self, qa:QuestionAnswerPairDto, is_correct:bool, similarity_score:float, llm_answer:str):#non c'è il double in python
        self.qa = qa
        self.is_correct = is_correct
        self.similarity_score = similarity_score
        self.llm_answer = llm_answer
    
    def get_qa(self) -> QuestionAnswerPairDto:
        return self.qa

    def get_is_correct(self) -> bool:
        return self.is_correct

    def get_similarity_score(self) -> float:
        return self.similarity_score

    def get_llm_answer(self) -> str:
        return self.llm_answer

    def to_dict(self) -> dict:
        return {
            'qa': self.qa.to_dict() if hasattr(self.qa, 'to_dict') else self.qa,
            'is_correct': self.is_correct,
            'similarity_score': self.similarity_score,
            'llm_answer': self.llm_answer
        }