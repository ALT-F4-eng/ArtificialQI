# # type: ignore

# import pytest
# from core.page import page_factory_function
# from core.page import Page
# from core.question_answer_pair import QuestionAnswerPair


# def _test_negative_page_num(get_qa_set):
#     PAGE_N: int = -1

#     with pytest.raises(ValueError):
#         page_factory_function(
#             page_n=PAGE_N,
#             page_content=get_qa_set
#         )

# def _test_valid_page(get_dataset_page):
#     expected_page: Page[QuestionAnswerPair] = get_dataset_page

#     res_page: Page[QuestionAnswerPair] = page_factory_function(
#         page_n=expected_page.page_n,
#         page_content=expected_page.content
#     )

#     assert expected_page.page_n == res_page.page_n
#     assert expected_page.content == res_page.content
