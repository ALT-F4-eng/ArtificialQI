from uuid import UUID

class QuestionAnswerPairDto:
    def __init__(self,id: UUID, dataset: UUID, question: str, answer: str):
        self.id: UUID = id
        self.dataset:UUID = dataset #NON SAPEVO COME ALTRO FARE
        self.question: str = question
        self.answer: str = answer

    def get_id(self) -> UUID:
        return self.id
    
    def get_dataset_id(self) -> UUID:
        return self.dataset

    def get_question(self) -> str:
        return self.question

    def get_answer(self) -> str:
        return self.answer
    
    def to_dict(self) -> dict:
        return {
            "id":self.id,
            "question":self.question,
            "answer":self.answer
        }