from uuid import UUID, uuid4
from dataclasses import dataclass


@dataclass
class QuestionAnswerPair:

    id: UUID
    dataset: UUID
    question: str
    answer: str

    def __hash__(self)->int:
        return hash(self.id)

def qa_pair_factory_function(dataset:UUID, question:str, answer:str, id: UUID=uuid4()) -> QuestionAnswerPair:
    """
    Crea un'istanza della classe QuestionAnswerPair a partire dalle informazioni fornite.

    Preconditions:
 

    Args:
        dataset (UUID): Identificativo del dataset a cui appartiene la coppia domanda-risposta.
        question (str): Testo della domanda.
        answer (str): Testo della risposta attesa.
        id (UUID, opzionale): Identificativo della coppia domanda-risposta. Se non specificato, viene generato automaticamente.

    Returns:
        QuestionAnswerPair: Oggetto che rappresenta una coppia domanda-risposta da associare a un dataset.

    Raises:
        ValueError:
            Se 'question' e 'answer' sono entrambe vuote o composte solo da spazi.
            Se 'id' è none.
    """

    if not (question.strip() or answer.strip()):
        raise ValueError("La domanda e la risposta non possono essere entrambe vuote o composte da soli spazi.")

    return QuestionAnswerPair(
        id=id, dataset=dataset, question=question, answer=answer
    )
