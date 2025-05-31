# # type: ignore

# from uuid import uuid4
# from datetime import date, timedelta

# import pytest
# from core.test_factory import TestFactory
# from core.test import Test

# class _TestTestFactoryTmpMethod:
    
#     def _test_future_execution_date(self, get_index_test):

#         future_execution_date: date = date.today() + timedelta(days=1)
        
#         with pytest.raises(ValueError):
#             TestFactory.tmp(
#                 id=uuid4(),
#                 dataset=uuid4(),
#                 llm=uuid4(),
#                 index=get_index_test,
#                 execution_date= future_execution_date
#             )
    
#     def _test_valid_test(self, get_tmp_test):

#         expected_test: Test = get_tmp_test

#         result_test: Test = TestFactory.tmp(
#             id=expected_test.id,
#             dataset=expected_test.dataset,
#             llm=expected_test.llm,
#             index=expected_test.index,
#             execution_date=expected_test.execution_date
#         )

#         assert expected_test.id == result_test.id
#         assert expected_test.dataset == result_test.dataset
#         assert expected_test.llm == result_test.llm
#         assert expected_test.index == result_test.index
#         assert expected_test.execution_date == result_test.execution_date
#         assert expected_test.name == result_test.name

# class _TestTestFactorySavedMethod:
    
#     def _test_future_execution_date(self, get_index_test):

#         future_execution_date: date = date.today() + timedelta(days=1)
        
#         with pytest.raises(ValueError):
#             TestFactory.saved(
#                 id=uuid4(),
#                 dataset=uuid4(),
#                 llm=uuid4(),
#                 index=get_index_test,
#                 execution_date= future_execution_date,
#                 name="prova"
#             )
    
    
#     def _test_empty_name(self, get_index_test):

#         NAME: str = ""
        
#         with pytest.raises(ValueError):
#             TestFactory.saved(
#                 id=uuid4(),
#                 dataset=uuid4(),
#                 llm=uuid4(),
#                 index=get_index_test,
#                 execution_date= date.today(),
#                 name=NAME
#             )
    
#     def _test_only_space_name(self, get_index_test):

#         NAME: str = "   "
        
#         with pytest.raises(ValueError):
#             TestFactory.saved(
#                 id=uuid4(),
#                 dataset=uuid4(),
#                 llm=uuid4(),
#                 index=get_index_test,
#                 execution_date= date.today(),
#                 name=NAME
#             )

    
#     def _test_valid_test(self, get_saved_test):

#         expected_test: Test = get_saved_test

#         result_test: Test = TestFactory.saved(
#             id=expected_test.id,
#             dataset=expected_test.dataset,
#             llm=expected_test.llm,
#             index=expected_test.index,
#             execution_date=expected_test.execution_date,
#             name= expected_test.name
#         )

#         assert expected_test.id == result_test.id
#         assert expected_test.dataset == result_test.dataset
#         assert expected_test.llm == result_test.llm
#         assert expected_test.index == result_test.index
#         assert expected_test.execution_date == result_test.execution_date
#         assert expected_test.name == result_test.name
