# # type: ignore

# from unittest.mock import Mock
# from uuid import uuid4, UUID
# import re

# import pytest
# from adapter.inbound.service.dataset import DatasetService
# from port.outbound.repository. import DatasetRepository
# from port.outbound.test_repository import TestRepository
# from port.outbound.question_answer_pair_repository import QuestionAnswerPairRepository
# from port.outbound.test_result_repository import TestResultRepository
# from common.exceptions import DatasetNonExistentException, InvalidDatasetOperationException, PersistenceException
# from core.dataset_factory import DatasetFactory
# from core.dataset import Dataset

# @pytest.fixture
# def mock_dependencies():

#     return {
#         "dataset_repo": Mock(DatasetRepository),
#         "test_repo": Mock(TestRepository),
#         "qa_repo": Mock(QuestionAnswerPairRepository),
#         "result_repo": Mock(TestResultRepository)
#     }

# @pytest.fixture
# def dataset_service(mock_dependencies, monkeypatch):
    
#     monkeypatch.setattr(DatasetFactory, "saved", 
#                         lambda id, dim, name, first_save_date, last_save_date:
#                         Dataset(id=id, dim=dim, name=name, first_save_date=first_save_date, last_save_date=last_save_date, tmp=False, origin=None)
#                     )
#     monkeypatch.setattr(DatasetFactory, "tmp", lambda id, dim:
#                         Dataset(id=id, dim=dim, name=None, first_save_date=None, last_save_date=None, tmp=True, origin=None)
#                     )
    
#     monkeypatch.setattr(DatasetFactory, "working_copy", lambda id, dim, origin:
#                         Dataset(id=id, dim=dim, name=None, first_save_date=None, last_save_date=None, tmp=True, origin=origin)
#                     )

#     return DatasetService(
#         mock_dependencies["dataset_repo"],
#         mock_dependencies["qa_repo"],
#         mock_dependencies["test_repo"],
#         mock_dependencies["result_repo"]
#     )


    
# class _TestDatasetServiceCopyMethod:

#     DATASET_ID: UUID =  uuid4()

#     def _test_unexistent_dataset(self, mock_dependencies, dataset_service):
        
#         mock_dependencies["dataset_repo"].get_dataset_by_id.return_value = None

#         with pytest.raises(DatasetNonExistentException):
#             dataset_service.copy_dataset(self.DATASET_ID)

#     def _test_tmp_dataset(self, mock_dependencies, dataset_service, get_empty_tmp_dataset):
#         mock_dependencies["dataset_repo"].get_dataset_by_id.return_value = get_empty_tmp_dataset

#         with pytest.raises(InvalidDatasetOperationException):
#             dataset_service.copy_dataset(self.DATASET_ID)

#     def _test_dataset_persistence_error( self, mock_dependencies, dataset_service):

#         mock_dependencies["dataset_repo"].create_dataset.return_value = None

#         with pytest.raises(PersistenceException):
#             dataset_service.copy_dataset(self.DATASET_ID)

#     def _test_qa_persistence_error(self, mock_dependencies, dataset_service, get_non_empty_saved_dataset):

#         mock_dependencies["dataset_repo"].get_dataset_by_id.return_value = get_non_empty_saved_dataset
#         mock_dependencies["qa_repo"].copy_all_from_dataset.return_value = False

#         with pytest.raises(PersistenceException):
#             dataset_service.copy_dataset(self.DATASET_ID)

#     def _test_saved_empty_dataset(self, mock_dependencies, dataset_service, get_empty_saved_dataset):

#         mock_dependencies["dataset_repo"].get_dataset_by_id.return_value = get_empty_saved_dataset
#         mock_dependencies["dataset_repo"].create_dataset.return_value = get_empty_saved_dataset
        
#         copy_res = dataset_service.copy_dataset(self.DATASET_ID)

#         assert copy_res == get_empty_saved_dataset

#     def _test_saved_non_empty_dataset(self, mock_dependencies, dataset_service, get_non_empty_saved_dataset):

#         mock_dependencies["dataset_repo"].get_dataset_by_id.return_value = get_non_empty_saved_dataset
#         mock_dependencies["dataset_repo"].create_dataset.return_value = get_non_empty_saved_dataset
#         mock_dependencies["qa_repo"].copy_all_from_dataset.return_value = True  

#         copy_res = dataset_service.copy_dataset(self.DATASET_ID)

#         assert copy_res == get_non_empty_saved_dataset

# class _TestDatasetServiceNameGenerator:

#     def _test_valid_name(self):

#         NAME: str = "prova"

#         generated_name: str = DatasetService.generate_name(NAME)

#         res: bool = bool(re.match(f"{NAME}-copy-.*", generated_name))

#         assert  res

#     def _test_empty_name(self):

#         NAME: str = ""

#         with pytest.raises(ValueError):
#             DatasetService.generate_name(NAME)

#     def _test_only_space_name(self):

#         NAME: str = "   "

#         with pytest.raises(ValueError):
#             DatasetService.generate_name(NAME)

# class _TestDatasetServiceCreateTmpMethod:

#     def _test_tmp_dataset(self, mock_dependencies, dataset_service, get_empty_tmp_dataset):

#         mock_dependencies["dataset_repo"].create_dataset.return_value = get_empty_tmp_dataset

#         res = dataset_service.create_dataset_tmp()

#         assert res == get_empty_tmp_dataset

#     def _test_persistence_error(self, mock_dependencies, dataset_service):

#         mock_dependencies["dataset_repo"].create_dataset.return_value = None

#         with pytest.raises(PersistenceException):
#             dataset_service.create_dataset_tmp()

# class _TestDatasetServiceDeleteMethod:

#     DATASET_ID: UUID = uuid4()

#     def _test_non_existent_dataset(self, mock_dependencies, dataset_service):

#         mock_dependencies["dataset_repo"].get_dataset_by_id.return_value = None

#         with pytest.raises(DatasetNonExistentException):
#             dataset_service.delete_dataset(self.DATASET_ID)

#     def _test_access_related_test_persistence_error(self, mock_dependencies, dataset_service):

#         mock_dependencies["test_repo"].get_tests_from_dataset.return_value = None

#         with pytest.raises(PersistenceException):
#             dataset_service.delete_dataset(self.DATASET_ID)

#     def _test_delete_releated_test_content_persistence_error(
#         self, mock_dependencies, dataset_service, get_saved_test
#     ):

#         mock_dependencies["test_repo"].get_tests_from_dataset.return_value = [
#             get_saved_test,
#             get_saved_test
#         ]
#         mock_dependencies["result_repo"].delete_all_from_test.return_value = None

#         with pytest.raises(PersistenceException):
#             dataset_service.delete_dataset(self.DATASET_ID)

#     def _test_delete_related_test_persistence_error(
#         self, mock_dependencies, dataset_service, get_saved_test
#     ):

#         mock_dependencies["test_repo"].get_tests_from_dataset.return_value = [
#             get_saved_test,
#             get_saved_test
#         ]
#         mock_dependencies["test_repo"].delete_test.return_value = None

#         with pytest.raises(PersistenceException):
#             dataset_service.delete_dataset(self.DATASET_ID)

#     def _test_dataset_content_persistence_error(self, mock_dependencies, dataset_service):

#         mock_dependencies["test_repo"].get_tests_from_dataset.return_value = []
#         mock_dependencies["qa_repo"].delete_all_from_dataset.return_value = None

#         with pytest.raises(PersistenceException):
#             dataset_service.delete_dataset(self.DATASET_ID)

#     def _test_non_empy_dataset(self, mock_dependencies, dataset_service):

#         mock_dependencies["test_repo"].get_tests_from_dataset.return_value = []
#         mock_dependencies["dataset_repo"].delete_dataset.return_value = self.DATASET_ID

#         res = dataset_service.delete_dataset(self.DATASET_ID)

#         assert res == self.DATASET_ID


# class _TestDatasetServiceUpdateMethod:

#     DATASET_ID: UUID = uuid4()
#     DATASET_NAME: str = "prova"

#     def _test_non_existent_dataset(self, mock_dependencies, dataset_service):

#         mock_dependencies["dataset_repo"].get_dataset_by_id.return_value = None

#         with pytest.raises(DatasetNonExistentException):
#             dataset_service.update_dataset(self.DATASET_NAME, self.DATASET_ID)

#     def _test_tmp_dataset(self, mock_dependencies, dataset_service, get_empty_tmp_dataset):

#         mock_dependencies["dataset_repo"].get_dataset_by_id.return_value = get_empty_tmp_dataset

#         with pytest.raises(InvalidDatasetOperationException):
#             dataset_service.update_dataset(self.DATASET_NAME, self.DATASET_ID)

#     def _test_update_dataset_with_persistence_error(self, mock_dependencies, dataset_service):

#         mock_dependencies["dataset_repo"].update_dataset.return_value = None

#         with pytest.raises(PersistenceException):
#             dataset_service.update_dataset(self.DATASET_NAME, self.DATASET_ID)

#     def _test_update_dataset(self, mock_dependencies, dataset_service, get_empty_saved_dataset):

#         mock_dependencies["dataset_repo"].update_dataset.return_value = get_empty_saved_dataset

#         res = dataset_service.update_dataset(self.DATASET_NAME, self.DATASET_ID)

#         assert res == get_empty_saved_dataset

# class _TestDatasetServiceGetAllMethod:

#     QUERY: str = ""

#     def _test_persistence_error(self, mock_dependencies, dataset_service):

#         mock_dependencies["dataset_repo"].get_all_datasets.return_value = None

#         with pytest.raises(PersistenceException):
#             dataset_service.get_all_datasets(self.QUERY)

#     def _test_correct(self, mock_dependencies, dataset_service, get_empty_saved_dataset):

#         expected_datasets = [
#             get_empty_saved_dataset,
#             get_empty_saved_dataset
#         ]

#         mock_dependencies["dataset_repo"].get_all_datasets.return_value = expected_datasets

#         res = dataset_service.get_all_datasets(self.QUERY)

#         assert res == expected_datasets

# class _TestDatasetServiceGetByIdMethod:

#     DATASET_ID: UUID = uuid4()

#     def _test_non_existent_dataset(self, mock_dependencies, dataset_service):

#         mock_dependencies["dataset_repo"].get_dataset_by_id.return_value = None

#         with pytest.raises(DatasetNonExistentException):
#             dataset_service.get_dataset_by_id(self.DATASET_ID)

#     def _test_correct(self, mock_dependencies, dataset_service, get_empty_tmp_dataset):

#         excepted_dataset = get_empty_tmp_dataset

#         mock_dependencies["dataset_repo"].get_dataset_by_id.return_value = get_empty_tmp_dataset 

#         res = dataset_service.get_dataset_by_id(self.DATASET_ID)

#         assert res == excepted_dataset

# class _TestDatasetServiceSaveTmpMethod:

#     DATASET_ID: UUID = uuid4()
#     DATASET_NAME: str = "prova"

#     def _test_non_existent_tmp_dataset(self, mock_dependencies, dataset_service):

#         mock_dependencies["dataset_repo"].get_dataset_by_id.return_value = None

#         with pytest.raises(DatasetNonExistentException):
#             dataset_service.save_tmp(self.DATASET_ID, self.DATASET_NAME)

#     def _test_saved_dataset(self, mock_dependencies, dataset_service, get_empty_saved_dataset):

#         mock_dependencies["dataset_repo"].get_dataset_by_id.return_value= get_empty_saved_dataset

#         with pytest.raises(InvalidDatasetOperationException):
#             dataset_service.save_tmp(self.DATASET_ID, self.DATASET_NAME)

#     def _test_working_copy_dataset(self, mock_dependencies, dataset_service, get_empty_working_copy_dataset):

#         mock_dependencies["dataset_repo"].get_dataset_by_id.return_value= get_empty_working_copy_dataset

#         with pytest.raises(InvalidDatasetOperationException):
#             dataset_service.save_tmp(self.DATASET_ID, self.DATASET_NAME)

#     def _test_persistence_error(self, mock_dependencies, dataset_service):

#         mock_dependencies["dataset_repo"].update_dataset.return_value = None

#         with pytest.raises(PersistenceException):
#             dataset_service.save_tmp(self.DATASET_ID, self.DATASET_NAME)

#     def _test_correct(self, mock_dependencies, dataset_service, get_empty_saved_dataset):

#         expected_dataset = get_empty_saved_dataset

#         mock_dependencies["dataset_repo"].update_dataset.return_value = get_empty_saved_dataset

#         res = dataset_service.save_tmp(self.DATASET_ID, self.DATASET_NAME)

#         assert res == expected_dataset


# class _TestDatasetServiceSaveWorkingCopyMethod:

#     DATASET_ID: UUID = uuid4()

#     def _test_non_existent_working_copy_dataset(
#         self, mock_dependencies, dataset_service
#     ):

#         mock_dependencies["dataset_repo"].get_dataset_by_id.return_value = None

#         with pytest.raises(DatasetNonExistentException):
#             dataset_service.save_working_copy(self.DATASET_ID)

#     def _test_saved_dataset(
#         self, mock_dependencies, dataset_service, get_empty_saved_dataset
#     ):

#         mock_dependencies["dataset_repo"].get_dataset_by_id.return_value = get_empty_saved_dataset

#         with pytest.raises(InvalidDatasetOperationException):
#             dataset_service.save_working_copy(self.DATASET_ID)

#     def _test_tmp_dataset(
#         self, mock_dependencies, dataset_service, get_empty_tmp_dataset
#     ):

#         mock_dependencies["dataset_repo"].get_dataset_by_id.return_value = get_empty_tmp_dataset

#         with pytest.raises(InvalidDatasetOperationException):
#             dataset_service.save_working_copy(self.DATASET_ID)

#     def _test_save_working_copy_with_persistence_error(
#         self, mock_dependencies, dataset_service, get_empty_working_copy_dataset, monkeypatch
#     ):
#         monkeypatch.setattr(dataset_service, "delete_dataset", lambda id: id)
#         mock_dependencies["dataset_repo"].get_dataset_by_id.return_value = get_empty_working_copy_dataset
#         mock_dependencies["dataset_repo"].update_dataset.return_value = None

#         with pytest.raises(PersistenceException):
#             dataset_service.save_working_copy(self.DATASET_ID)

#     def _test_correct(self, mock_dependencies, dataset_service, monkeypatch, get_non_empty_saved_dataset):

#         expected_dataset = get_non_empty_saved_dataset

#         monkeypatch.setattr(dataset_service, "delete_dataset", lambda id: id)
#         mock_dependencies["dataset_repo"].update_dataset.return_value = expected_dataset

#         res = dataset_service.save_working_copy(self.DATASET_ID)

#         assert res == expected_dataset

# class _TestDatasetServiceCreateWorkingCopyMethod:

#     DATASET_ID: UUID = uuid4()

#     def _test_non_existent_origin(
#         self, mock_dependencies, dataset_service
#     ):

#         mock_dependencies["dataset_repo"].get_dataset_by_id.return_value = None

#         with pytest.raises(DatasetNonExistentException):
#             dataset_service.create_working_copy(self.DATASET_ID)

#     def _test_non_saved_origin(self, mock_dependencies, dataset_service, get_empty_tmp_dataset):

#         mock_dependencies["dataset_repo"].get_dataset_by_id.return_value = get_empty_tmp_dataset

#         with pytest.raises(InvalidDatasetOperationException):
#             dataset_service.create_working_copy(self.DATASET_ID)

#     def _test_persistence_error(
#         self, mock_dependencies, dataset_service
#     ):

#         mock_dependencies["dataset_repo"].create_dataset.return_value = None

#         with pytest.raises(PersistenceException):
#             dataset_service.create_working_copy(self.DATASET_ID)

#     def _test_content_copy_persistence_error(
#         self, mock_dependencies, dataset_service
#     ):

#         mock_dependencies["qa_repo"].copy_all_from_dataset.return_value = False

#         with pytest.raises(PersistenceException):
#             dataset_service.create_working_copy(self.DATASET_ID)

#     def _test_correct(
#         self, mock_dependencies, dataset_service, get_non_empty_working_copy_dataset
#     ):

#         expected_dataset = get_non_empty_working_copy_dataset

#         mock_dependencies["dataset_repo"].create_dataset.return_value = get_non_empty_working_copy_dataset

#         res = dataset_service.create_working_copy(self.DATASET_ID)

#         assert res == expected_dataset
