# from unittest.mock import Mock
# from unittest.mock import MagicMock
# from uuid import uuid4
# import pytest
# from core.question_answer_pair import qa_pair_factory_function
# from core.page import Page
# from adapter.inbound.qa_service import QaService
# from port.outbound.dataset_repository import DatasetRepository
# from port.outbound.question_answer_pair_repository import QuestionAnswerPairRepository
# from common.exceptions import (
#     DuplicateQuestionAnswerException,
#     InvalidDatasetOperationException,
#     DatasetNonExistentException,
#     PersistenceException,
#     QaNonExistentException,
#     PageNonExistentException,
#     InvalidQuestionAnswerException,
#     QaPageNonExistentException
# )

# @pytest.fixture
# def mock_dependencies():

#     return {
#         "qa_repo": Mock(QuestionAnswerPairRepository),
#         "dataset_repo": Mock(DatasetRepository)
#     }

# @pytest.fixture
# def qa_service(mock_dependencies):
    
#     return QaService(
#         mock_dependencies["dataset_repo"],
#         mock_dependencies["qa_repo"]
#     )



# def test_create_qa_duplicate(qa_service, mock_qa_repo):
#     dataset_id = uuid4()
#     question = "What is AI?"
#     answer = "Artificial Intelligence"
#     mock_qa_repo.qa_exists.return_value = True

#     with pytest.raises(DuplicateQuestionAnswerException):
#         qa_service.create_qa(question, answer, dataset_id)

# def test_create_qa_invalid_dataset(qa_service, mock_dataset_repo):
#     dataset_id = uuid4()
#     mock_dataset_repo.get_dataset_by_id.return_value = None

#     with pytest.raises(DatasetNonExistentException):
#         qa_service.create_qa("Q", "A", dataset_id)

# def test_create_qa_invalid_dataset_state(qa_service, mock_dataset_repo):
#     dataset_id = uuid4()
#     mock_dataset_repo.get_dataset_by_id.return_value = MagicMock(is_temp=False, is_working_copy=False)

#     with pytest.raises(InvalidDatasetOperationException):
#         qa_service.create_qa("Q", "A", dataset_id)

# def test_create_qa_persistence_error(qa_service, mock_qa_repo, mock_dataset_repo):
#     dataset_id = uuid4()
#     mock_dataset_repo.get_dataset_by_id.return_value = MagicMock(is_temp=True)
#     mock_qa_repo.create_qa.return_value = None

#     with pytest.raises(PersistenceException):
#         qa_service.create_qa("Q", "A", dataset_id)


# def test_update_qa_not_found(qa_service, mock_qa_repo):
#     qa_id = uuid4()
#     mock_qa_repo.get_qa_by_id.return_value = None

#     qa = MagicMock(id=qa_id)
#     with pytest.raises(QaNonExistentException):
#         qa_service.update_qa(qa)

# def test_update_qa_duplicate(qa_service, mock_qa_repo):
#     qa = MagicMock()
#     mock_qa_repo.get_qa_by_id.return_value = qa
#     mock_qa_repo.qa_exists.return_value = True

#     with pytest.raises(DuplicateQuestionAnswerException):
#         qa_service.update_qa(qa)

# def test_update_qa_persistence_error(qa_service, mock_qa_repo):
#     qa = MagicMock()
#     mock_qa_repo.get_qa_by_id.return_value = qa
#     mock_qa_repo.qa_exists.return_value = False
#     mock_qa_repo.update_qa.return_value = None

#     with pytest.raises(PersistenceException):
#         qa_service.update_qa(qa)

# def test_update_qa_invalid_dataset_state(qa_service, mock_qa_repo, mock_dataset_repo):
#     qa = MagicMock()
#     qa.dataset = uuid4()
#     mock_qa_repo.get_qa_by_id.return_value = qa
#     mock_qa_repo.qa_exists.return_value = False
#     mock_dataset_repo.get_dataset_by_id.return_value = MagicMock(is_temp=False, is_working_copy=False)

#     with pytest.raises(InvalidDatasetOperationException):
#         qa_service.update_qa(qa)


# def test_get_qa_page_dataset_not_found(qa_service, mock_dataset_repo):
#     dataset_id = uuid4()
#     mock_dataset_repo.get_dataset_by_id.return_value = None

#     with pytest.raises(QaPageNonExistentException):
#         qa_service.get_qa_page(p=1, dataset=dataset_id)

# def test_get_qa_page_invalid_page(qa_service, mock_qa_repo, mock_dataset_repo):
#     dataset_id = uuid4()
#     mock_dataset_repo.get_dataset_by_id.return_value = MagicMock()
#     mock_qa_repo.get_qa_set.return_value = None

#     with pytest.raises(PageNonExistentException):
#         qa_service.get_qa_page(p=99, dataset=dataset_id)

# def test_get_qa_page_with_query(qa_service, mock_qa_repo, mock_dataset_repo):
#     dataset_id = uuid4()
#     qa1 = qa_pair_factory_function(dataset=dataset_id, question="What is AI?", answer="Artificial Intelligence", id=uuid4())
#     qa2 = qa_pair_factory_function(dataset=dataset_id, question="What is ML?", answer="Machine Learning", id=uuid4())

#     mock_dataset_repo.get_dataset_by_id.return_value = MagicMock()
#     mock_qa_repo.get_qa_set.return_value = {qa1, qa2}

#     result = qa_service.get_qa_page(p=1, dataset=dataset_id, q="What")
#     assert isinstance(result, Page)
#     assert result.page_n == 1
#     assert qa1 in result.content


# def test_question_answer_pair_empty_fields():
#     with pytest.raises(InvalidQuestionAnswerException): 
#         qa_pair_factory_function(dataset=uuid4(), question=" ", answer=" ", id=uuid4())


# def test_get_qa_by_id_not_found(qa_service, mock_qa_repo):
#     mock_qa_repo.get_qa_by_id.return_value = None
#     with pytest.raises(QaNonExistentException): 
#         qa_service.get_qa_by_id(uuid4())


# def test_delete_qa_not_found(qa_service, mock_qa_repo):
#     mock_qa_repo.get_qa_by_id.return_value = None
#     with pytest.raises(QaNonExistentException):
#         qa_service.delete_qa(uuid4())

# def test_delete_qa_persistence_error(qa_service, mock_qa_repo):
#     qa_id = uuid4()
#     mock_qa_repo.get_qa_by_id.return_value = MagicMock()
#     mock_qa_repo.delete_qa.return_value = None

#     with pytest.raises(PersistenceException):
#         qa_service.delete_qa(qa_id)