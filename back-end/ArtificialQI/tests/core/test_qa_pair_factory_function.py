# type: ignore
from uuid import uuid4

import pytest
from core.question_answer_pair import qa_pair_factory_function
from core.question_answer_pair import QuestionAnswerPair

def _test_qa_empty():
    QUESTION: str = ""
    ANSWER: str = ""

    with pytest.raises(ValueError):

        qa_pair_factory_function(
            id=uuid4(),
            dataset=uuid4(),
            question=QUESTION,
            answer=ANSWER
        )

def _test_qa_only_spaces():
    QUESTION: str = " "
    ANSWER: str = "     "

    with pytest.raises(ValueError):

        qa_pair_factory_function(
            id=uuid4(),
            dataset=uuid4(),
            question=QUESTION,
            answer=ANSWER
        )

def _test_q_empty(get_qa_pair):

    expected_qa_pair: QuestionAnswerPair = get_qa_pair
    expected_qa_pair.question = ""

    res_qa_pair: QuestionAnswerPair = qa_pair_factory_function(
        id=expected_qa_pair.id,
        dataset=expected_qa_pair.dataset,
        answer=expected_qa_pair.answer,
        question=expected_qa_pair.question
    )

    assert expected_qa_pair.id == res_qa_pair.id
    assert expected_qa_pair.dataset == res_qa_pair.dataset
    assert expected_qa_pair.answer == res_qa_pair.answer
    assert expected_qa_pair.question == res_qa_pair.question

def _test_a_empty(get_qa_pair):

    expected_qa_pair: QuestionAnswerPair = get_qa_pair
    expected_qa_pair.question = ""

    res_qa_pair: QuestionAnswerPair = qa_pair_factory_function(
        id=expected_qa_pair.id,
        dataset=expected_qa_pair.dataset,
        answer=expected_qa_pair.answer,
        question=expected_qa_pair.question
    )

    assert expected_qa_pair.id == res_qa_pair.id
    assert expected_qa_pair.dataset == res_qa_pair.dataset
    assert expected_qa_pair.answer == res_qa_pair.answer
    assert expected_qa_pair.question == res_qa_pair.question

def _test_a_empty(get_qa_pair):

    expected_qa_pair: QuestionAnswerPair = get_qa_pair
    expected_qa_pair.answer = ""

    res_qa_pair: QuestionAnswerPair = qa_pair_factory_function(
        id=expected_qa_pair.id,
        dataset=expected_qa_pair.dataset,
        answer=expected_qa_pair.answer,
        question=expected_qa_pair.question
    )

    assert expected_qa_pair.id == res_qa_pair.id
    assert expected_qa_pair.dataset == res_qa_pair.dataset
    assert expected_qa_pair.answer == res_qa_pair.answer
    assert expected_qa_pair.question == res_qa_pair.question