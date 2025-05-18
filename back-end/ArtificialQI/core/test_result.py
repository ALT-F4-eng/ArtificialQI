from dataclasses import dataclass
from uuid import UUID

from core.question_answer_pair import QuestionAnswerPair


@dataclass
class TestResult:

    test_id: UUID
    question_answer_pair: QuestionAnswerPair
    obtained_answer: str
    similarity_score: float
    is_correct: bool

    def __eq__(self, result: "TestResult") -> bool:
        return (
            self._test_id == result.test_id
            and self._question_answer_pair.id == result.question_answer_pair.id
        )


def factory_test_result_function(
    question_answer_pair: QuestionAnswerPair,
    obtained_answer: str,
    similarity_score: float,
    is_correct: bool,
    test_id: UUID,
) -> TestResult:
    """
    Crea un'istanza della classe TestResult a partire dalla valutazione di una coppia domanda-risposta.

    Args:
        - question_answer_pair (QuestionAnswerPair): Oggetto contenente la domanda e la risposta attesa.
        - obtained_answer (str): Risposta fornita dal modello da testare.
        - similarity_score (float): Valore di similarità (tra 0 e 1) tra la risposta attesa e quella ottenuta.
        - is_correct (bool): Indica se la risposta ottenuta è considerata corretta.
        test_id (UUID): Identificativo univoco del test a cui il risultato appartiene.

    Returns:
        TestResult: Oggetto che rappresenta un singolo risultato di test.

    Raises:
        - ValueError:
            - Se 'question_answer_pair' è nullo.
            - Se 'obtained_answer' è una stringa vuota o composta solo da spazi.
            - Se 'similarity_score' non è un float compreso tra 0 e 1.
            - Se 'is_correct' è nullo.
            - Se 'test_id' è nullo.
    """

    if question_answer_pair is None:
        raise ValueError

    if obtained_answer is None or not obtained_answer.strip():
        raise ValueError

    if similarity_score is None or (similarity_score < 0 or similarity_score > 1):
        raise ValueError

    if is_correct is None:
        raise ValueError

    if test_id is None:
        raise ValueError

    return TestResult(
        test_id, question_answer_pair, obtained_answer, similarity_score, is_correct
    )
