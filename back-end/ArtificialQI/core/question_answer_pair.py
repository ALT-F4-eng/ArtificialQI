from uuid import UUID, uuid4
from dataclasses import dataclass


@dataclass
class QuestionAnswerPair:

    id: UUID
    dataset: UUID
    question: str
    answer: str



    @dataset.setter
    def dataset(self, dataset: UUID):
        self._dataset = dataset

    @question.setter
    def question(self, question: str) -> None:
        self._question = question

    @answer.setter
    def answer(self, answer: str) -> None:
        self._answer = answer

def qa_pair_factory_function(dataset:UUID, question:str, answer:str, id: UUID) -> QuestionAnswerPair:
    """
    Crea un'istanza della classe QuestionAnswerPair a partire dalle informazioni fornite.

    Args:
        - dataset (UUID): Identificativo del dataset a cui appartiene la coppia domanda-risposta.
        - question (str): Testo della domanda.
        - answer (str): Testo della risposta attesa.
        - id (UUID, opzionale): Identificativo della coppia domanda-risposta. Se non specificato, viene generato automaticamente.

    Returns:
        QuestionAnswerPair: Oggetto che rappresenta una coppia domanda-risposta da associare a un dataset.

    Raises:
        - ValueError:
            - Se 'dataset' è none.
            - Se 'question' e 'answer' sono entrambe vuote o composte solo da spazi.
            - Se 'id' pè none.
    """
    if id is None:
        raise ValueError

    if not (question.strip() or answer.strip()):
        raise ValueError

    if not dataset:
        raise ValueError

    return QuestionAnswerPair(
        id=id, dataset=dataset, question=question, answer=answer
    )
