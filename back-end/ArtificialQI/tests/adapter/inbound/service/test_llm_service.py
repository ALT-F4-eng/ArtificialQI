# # type: ignore

# from unittest.mock import Mock
# from uuid import uuid4, UUID
# import pytest
# from adapter.inbound.llm_service import LlmService
# from port.outbound.llm_repository import LlmRepository
# from port.outbound.test_repository import TestRepository
# from port.outbound.test_result_repository import TestResultRepository
# import pytest
# from unittest.mock import Mock
# from uuid import uuid4
# from core.llm import Llm
# from core.test import Test
# from core.http_config import HttpConfig
# from core.key_value import HttpKeyValuePair
# from common.exceptions import *

# @pytest.fixture
# def mock_dependencies():

#     return {
#         "llm_repo": Mock(LlmRepository),
#         "test_repo": Mock(TestRepository),
#         "result_repo": Mock(TestResultRepository)
#     }

# @pytest.fixture
# def llm_service(mock_dependencies):
    
#     return LlmService(
#         mock_dependencies["dataset_repo"],
#         mock_dependencies["qa_repo"],
#         mock_dependencies["test_repo"],
#         mock_dependencies["result_repo"]
#     )



# def test_get_llm_by_id_no_exist(llm_service):
#     llm_service._llm_repo.get_llm_by_id.return_value = None
#     with pytest.raises(LlmNonExistentException):
#         llm_service.get_llm_by_id(uuid4())


# def test_get_all_llms_empty(llm_service):
#     llm1 = Llm(id=uuid4(), name="TestLlm1", model="gpt", provider="openai")
#     llm2 = Llm(id=uuid4(), name="OtherLlm", model="gpt", provider="openai")
#     llm_service._llm_repo.get_all_llms.return_value = [llm1, llm2]

#     result = llm_service.get_all_llm()
#     assert len(result) == 2

# def test_get_all_llms_filter(llm_service):
#     llms = [
#         Llm(id=uuid4(), name="FirstModel", model="gpt", provider="openai"),
#         Llm(id=uuid4(), name="SecondModel", model="gpt", provider="openai")
#     ]
#     llm_service._llm_repo.get_all_llms.return_value = llms
#     query = "Second"

#     filtered = [llm for llm in llm_service.get_all_llm() if query.lower() in llm.name.lower()]
#     assert filtered == [llms[1]]

# def test_get_all_llms_empty_list(llm_service):
#     llm_service._llm_repo.get_all_llms.return_value = []
#     assert llm_service.get_all_llm() == []


# def test_delete_llm_no_exist(llm_service):
#     llm_service._llm_repo.get_llm_by_id.return_value = None
#     with pytest.raises(LlmNonExistentException):
#         llm_service.delete_llm(uuid4())

# def test_delete_llm_success(llm_service):
#     llm_id = uuid4()
#     llm_service._llm_repo.get_llm_by_id.return_value = Llm(id=llm_id, name="x", model="gpt", provider="openai")
#     test_id = uuid4()
#     llm_service._test_repo.get_tests_from_llm.return_value = [Test(id=test_id, llm_id=llm_id, name="test")]
#     llm_service._result_repo.delete_all_from_test.return_value = True
#     llm_service._test_repo.delete_test.return_value = test_id
#     llm_service._llm_repo.delete_llm.return_value = llm_id

#     result = llm_service.delete_llm(llm_id)
#     assert result == llm_id

# def test_delete_llm_persistance_error(llm_service):
#     llm_id = uuid4()
#     llm_service._llm_repo.get_llm_by_id.return_value = Llm(id=llm_id, name="x", model="gpt", provider="openai")
#     llm_service._test_repo.get_tests_from_llm.return_value = []
#     llm_service._llm_repo.delete_llm.return_value = None
#     with pytest.raises(PersistenceException):
#         llm_service.delete_llm(llm_id)


# def test_create_llm_duplicate(llm_service):
#     from port.outbound.llm_repository import DuplicateLlmException
#     llm_service._llm_repo.create_llm.side_effect = DuplicateLlmException()
#     with pytest.raises(DuplicateLlmException):
#         llm_service.create_llm(Llm(id=uuid4(), name="duplicate", model="gpt", provider="openai"))

# def test_create_llm_persistence_error(llm_service):
#     llm_service._llm_repo.create_llm.return_value = None
#     with pytest.raises(PersistenceException):
#         llm_service.create_llm(Llm(id=uuid4(), name="fail", model="gpt", provider="openai"))


# def test_llm_empty_name():
#     with pytest.raises(InvalidLlmNameException):
#         Llm(id=uuid4(), name="", model="gpt", provider="openai")


# def test_http_config_empty_key():
#     with pytest.raises(InvalidKeyException):
#         HttpConfig(request_key="", response_key="response")

#     with pytest.raises(InvalidKeyException):
#         HttpConfig(request_key="request", response_key="")


# def test_url_invalid():
#     with pytest.raises(InvalidUrlException):
#         Url(value="not a url")


# def test_http_key_value_pair_empty():
#     with pytest.raises(InvalidKeyException):
#         HttpKeyValuePair(key="", value="value")


# def test_update_llm_no_exist(llm_service):
#     llm = Llm(id=uuid4(), name="update", model="gpt", provider="openai")
#     llm_service._llm_repo.get_llm_by_id.return_value = None
#     with pytest.raises(LlmNonExistentException):
#         llm_service.update_llm(llm)

# def test_update_llm_persistence_error(llm_service):
#     llm = Llm(id=uuid4(), name="update", model="gpt", provider="openai")
#     llm_service._llm_repo.get_llm_by_id.return_value = llm
#     llm_service._llm_repo.update_llm.return_value = None
#     with pytest.raises(PersistenceException):
#         llm_service.update_llm(llm)