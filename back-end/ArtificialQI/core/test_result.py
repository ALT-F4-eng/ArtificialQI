from dataclasses import dataclass
from uuid import UUID

from artificialqi.core.question_answer_pair import QuestionAnswerPair


@dataclass
class TestResult:

    test_id: UUID
    question_answer_pair: QuestionAnswerPair
    obtained_answer: str
    similarity_score: float
    is_correct: bool

    def __eq__(self, result: object) -> bool:

        if not isinstance(result, "TestResult"):
            return False

        return (
            self.test_id == result.test_id
            and 
            self.question_answer_pair.id == result.question_answer_pair.id
        )
    
    def __hash__(self)->int:
        return hash((self.test_id, self.question_answer_pair.id))


@staticmethod
def test_result_factory_function(
    question_answer_pair: QuestionAnswerPair,
    obtained_answer: str,
    similarity_score: float,
    is_correct: bool,
    test_id: UUID,
) -> TestResult:
    """
    Crea un'istanza della classe TestResult a partire dalla valutazione di una coppia domanda-risposta.

    Args:
        question_answer_pair (QuestionAnswerPair): Oggetto contenente la domanda e la risposta attesa.
        obtained_answer (str): Risposta fornita dal modello da testare.
        similarity_score (float): Valore di similarità (tra 0 e 1) tra la risposta attesa e quella ottenuta.
        is_correct (bool): Indica se la risposta ottenuta è considerata corretta.
        test_id (UUID): Identificativo univoco del test a cui il risultato appartiene.

    Returns:
        TestResult: Oggetto che rappresenta un singolo risultato di test.

    Raises:
        ValueError:
            Se 'obtained_answer' è una stringa vuota o composta solo da spazi.
            Se 'similarity_score' non è un float compreso tra 0 e 1.
  
    """

    if not obtained_answer.strip():
        raise ValueError("La risposta non può essere vuota o composta da soli spazi.")

    if similarity_score < 0 or similarity_score > 1:
        raise ValueError("Il valore di similarità deve essere compreso nel range [0,1].")


    return TestResult(
        test_id=test_id, question_answer_pair=question_answer_pair, obtained_answer=obtained_answer, similarity_score=similarity_score, is_correct=is_correct
    )
