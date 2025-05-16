from uuid import UUID

class QuestionAnswerPair:
    def __init__(self, id:UUID, dataset:UUID, question:str, answer:str):
        self._id:UUID = id
        self._dataset:UUID = dataset
        self._question:str = question
        self._answer:str = answer
    
    @property
    def id(self) -> UUID:
        return self._id

    @property
    def dataset(self) -> UUID:
        return self._dataset

    @property
    def question(self) -> str:
        return self._question

    @property
    def answer(self) -> str:
        return self._answer
    
    @id.setter
    def id(self, id: UUID) -> None:
        self._id = id

    @dataset.setter
    def dataset(self, dataset: UUID):
        self._dataset = dataset

    @question.setter
    def question(self, question: str) -> None:
        self._question = question

    @answer.setter
    def answer(self, answer: str) -> None:
        self._answer = answer

def qa_pair_factory_function(dataset:UUID, question:str, answer:str, id: UUID = UUID.int)->QuestionAnswerPair:

    if not(question and answer):
        raise Exception
    
    if not dataset:
        raise Exception
    
    return QuestionAnswerPair(id, dataset, question, answer)
    