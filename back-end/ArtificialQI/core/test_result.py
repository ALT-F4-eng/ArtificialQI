from core.question_answer_pair import QuestionAnswerPair
from dataclasses import dataclass


@dataclass
class TestResult:

    question_answer_pair: QuestionAnswerPair
    obtained_answer: str
    similarity_score: float 
    is_correct: bool

    def __eq__(self, result: "TestResult") -> bool:
        return self._test_id == result.test_id and self._question_answer_pair.id == result.question_answer_pair.id
    
"""
    Create a TestResult instance from the result of a question-answer evaluation.

    Preconditions:
        - 'obtained_answer' is a non-empty, non-null, non-blank string.
        - 'similarity_score' is a non-null float between 0 and 1 (inclusive).
        - 'is_correct' is a non-null value.

    Postconditions:
        - Returns a TestResult instance encapsulating the evaluation outcome.

    Args:
        question_answer_pair (QuestionAnswerPair): The original question and expected answer pair.
        obtained_answer (str): The answer produced by the llm under test.
        similarity_score (float): A score between 0 and 1 indicating similarity to the expected answer.
        is_correct (bool): Whether the obtained answer is considered correct.

    Returns:
        TestResult: An object representing a single result of an executed test.
"""
def factory_test_result_function(question_answer_pair: QuestionAnswerPair, obtained_answer: str, similarity_score: float, is_correct: bool) -> TestResult:

    if obtained_answer is None or not obtained_answer.strip():
        raise ValueError
    
    if similarity_score is None or (similarity_score < 0 or similarity_score > 1):
        raise ValueError

    if is_correct is None:
        raise ValueError

    return  TestResult(question_answer_pair, obtained_answer, similarity_score, is_correct)
