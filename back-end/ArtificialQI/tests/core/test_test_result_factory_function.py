# # type: ignore

# from uuid import uuid4

# import pytest
# from core.test_result import test_result_factory_function, TestResult


# def _test_empty_obtained_answer(get_qa_pair):

#     OBTAINED_ANSWER: str = ""

#     with pytest.raises(ValueError):
#         test_result_factory_function(
#             question_answer_pair = get_qa_pair,
#             obtained_answer = OBTAINED_ANSWER,
#             similarity_score = 0.1,
#             is_correct = False,
#             test_id = uuid4(),
#         )

# def _test_only_spaces_obtained_answer(get_qa_pair):

#     OBTAINED_ANSWER: str = "    "

#     with pytest.raises(ValueError):
#         test_result_factory_function(
#             question_answer_pair = get_qa_pair,
#             obtained_answer = OBTAINED_ANSWER,
#             similarity_score = 0.1,
#             is_correct = False,
#             test_id = uuid4(),
#         )

# def _test_less_than_zero_similarity_score(get_qa_pair):

#     SIMILARITY_SCORE: float = -0.1

#     with pytest.raises(ValueError):
#         test_result_factory_function(
#             question_answer_pair = get_qa_pair,
#             obtained_answer = "prova",
#             similarity_score = SIMILARITY_SCORE,
#             is_correct = False,
#             test_id = uuid4(),
#         )

# def _test_greater_than_one_similarity_score(get_qa_pair):

#     SIMILARITY_SCORE: float = 1.1

#     with pytest.raises(ValueError):
#         test_result_factory_function(
#             question_answer_pair = get_qa_pair,
#             obtained_answer = "prova",
#             similarity_score = SIMILARITY_SCORE,
#             is_correct = False,
#             test_id = uuid4(),
#         )

# def _test_valid_test_result(get_test_result):

#     expected_test_result: TestResult = get_test_result

#     res_test_result: TestResult = test_result_factory_function(
#         question_answer_pair = expected_test_result.question_answer_pair,
#         obtained_answer = expected_test_result.obtained_answer,
#         similarity_score = expected_test_result.similarity_score,
#         is_correct = expected_test_result.is_correct,
#         test_id = expected_test_result.test_id,
#     )

#     assert expected_test_result.question_answer_pair == res_test_result.question_answer_pair
#     assert expected_test_result.obtained_answer == res_test_result.obtained_answer
#     assert expected_test_result.similarity_score == res_test_result.similarity_score
#     assert expected_test_result.is_correct == res_test_result.is_correct
#     assert expected_test_result.test_id == res_test_result.test_id
