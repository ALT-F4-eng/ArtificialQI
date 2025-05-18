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

def qa_pair_factory_function(dataset:UUID, question:str, answer:str, id: UUID = UUID.uiid4())->QuestionAnswerPair:
    """
    Crea un'istanza della classe QuestionAnswerPair a partire dalle informazioni fornite.

    Args:
        dataset (UUID): Identificativo del dataset a cui appartiene la coppia domanda-risposta.
        question (str): Testo della domanda.
        answer (str): Testo della risposta attesa.
        id (UUID, opzionale): Identificativo della coppia domanda-risposta. Se non specificato, viene generato automaticamente.

    Returns:
        QuestionAnswerPair: Oggetto che rappresenta una coppia domanda-risposta da associare a un dataset.

    Raises:
        ValueError: 
            - Se 'dataset' è nullo.
            - Se 'question' e 'answer' sono entrambe vuote o composte solo da spazi.
    """

    if not(question and answer):
        raise ValueError
    
    if not dataset:
        raise ValueError
    
    return QuestionAnswerPair(id, dataset, question, answer)
    