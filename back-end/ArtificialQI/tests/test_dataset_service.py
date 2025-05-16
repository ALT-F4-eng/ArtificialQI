from adapter.dataset_service import DatasetService
from unittest.mock import MagicMock, patch
from core.dataset import Dataset
from core.test import Test
from core.question_answer_pair import QuestionAnswerPair
from core.test_result import TestResult
from uuid import UUID, uuid4
from common.exceptions import *
from datetime import date
import re 
import pytest
    
class _TestDatasetService:

    @pytest.fixture 
    def mocked_dataset_service(self):

        dataset_repo = MagicMock()
        qa_repo = MagicMock()
        test_repo = MagicMock()
        result_repo = MagicMock()

        dataset_service = DatasetService(dataset_repo, qa_repo, test_repo, result_repo)

        return {
            "dataset_service": dataset_service,
            "dataset_repo": dataset_repo,
            "qa_repo": qa_repo,
            "test_repo": test_repo,
            "result_repo": result_repo        
        }


    def test_ataset_name_generator(self):

        NAME: str = 'prova'
    
        res: str = DatasetService.generate_name(NAME)

        assert bool(re.match(f"{NAME}-copy-.*" ,res)) == True

    def test_copy_unexistent_dataset(self, mocked_dataset_service):

        mocked_dataset_service["dataset_repo"].get_dataset_by_id.return_value = None

        with pytest.raises(DatasetNonExistentException):
            mocked_dataset_service["dataset_service"].copy_dataset(uuid4())

    def test_copy_tmp_dataset(self, mocked_dataset_service):

        mocked_dataset_service["dataset_repo"].get_dataset_by_id.return_value.is_saved.return_value = False

        with pytest.raises(InvalidDatasetOperationException):
            mocked_dataset_service["dataset_service"].copy_dataset(uuid4())

    @patch("adapter.dataset_service.DatasetFactory.saved")
    def test_copy_saved_empty_dataset_with_persistence_error(self, mock_datasetfactory_saved, mocked_dataset_service):
        
        mocked_dataset_service["dataset_repo"].create_dataset.return_value = None
        mock_datasetfactory_saved.return_value.dim = 0

        with pytest.raises(PersistenceException):
                mocked_dataset_service["dataset_service"].copy_dataset(uuid4())

    @patch("adapter.dataset_service.DatasetFactory.saved")
    def test_copy_saved_non__empty_dataset_with_persistence_error(self, mock_datasetfactory_saved, mocked_dataset_service):   

        mock_datasetfactory_saved.return_value.dim = 10
        mocked_dataset_service["qa_repo"].copy_all_from_dataset.return_value = None

        with pytest.raises(PersistenceException):
            mocked_dataset_service["dataset_service"]. copy_dataset(uuid4())

    @patch("adapter.dataset_service.DatasetFactory.saved")
    def test_copy_saved_empty_dataset(self, mock_datasetfactory_saved, mocked_dataset_service):

        dataset_copy_mock = MagicMock()
        mock_datasetfactory_saved.return_value.dim = 0
        mocked_dataset_service["dataset_repo"].create_dataset.return_value =  dataset_copy_mock

        copy_res = mocked_dataset_service["dataset_service"].copy_dataset(uuid4())

        assert copy_res == dataset_copy_mock

    @patch("adapter.dataset_service.DatasetFactory.saved")
    def test_copy_saved_non_empty_dataset(self, mock_datasetfactory_saved, mocked_dataset_service):

        dataset_copy_mock = MagicMock()
        mock_datasetfactory_saved.return_value.dim = 10
        mocked_dataset_service["dataset_repo"].create_dataset.return_value =  dataset_copy_mock

        copy_res = mocked_dataset_service["dataset_service"].copy_dataset(uuid4())

        assert copy_res == dataset_copy_mock

    @patch("adapter.dataset_service.DatasetFactory.tmp")
    def test_create_dataset_tmp(self, mock_datasetfactory_tmp, mocked_dataset_service):
        
        tmp_dataset = MagicMock()
        mocked_dataset_service["dataset_repo"].create_dataset.return_value = tmp_dataset
        
        res = mocked_dataset_service["dataset_service"].create_dataset_tmp()

        assert res == tmp_dataset

    @patch("adapter.dataset_service.DatasetFactory.tmp")
    def test_create_dataset_tmp_with_persistence_error(self, mock_datasetfactory_tmp,mocked_dataset_service):
        
        mocked_dataset_service["dataset_repo"].create_dataset.return_value = None
        
        with pytest.raises(PersistenceException):
            mocked_dataset_service["dataset_service"].create_dataset_tmp()

    def test_delete_non_existent_dataset(self, mocked_dataset_service):
        
        mocked_dataset_service["dataset_repo"].get_dataset_by_id.return_value = None

        with pytest.raises(DatasetNonExistentException):
            mocked_dataset_service["dataset_service"].delete_dataset(uuid4())

    def test_delete_dataset_get_tests_persistence_error(self, mocked_dataset_service):

        mocked_dataset_service["test_repo"].get_tests_from_dataset.return_value = None

        with pytest.raises(PersistenceException):
            mocked_dataset_service["dataset_service"].delete_dataset(uuid4())

    def test_delete_dataset_with_releated_test_content_persistence_error(self, mocked_dataset_service):

        mocked_dataset_service["test_repo"].get_tests_from_dataset.return_value = [MagicMock(), MagicMock()]
        mocked_dataset_service["result_repo"].delete_all_from_test.return_value = None

        with pytest.raises(PersistenceException):
            mocked_dataset_service["dataset_service"].delete_dataset(uuid4())

    def test_delete_dataset_with_related_test_persistence_error(self, mocked_dataset_service):
        
        mocked_dataset_service["test_repo"].get_tests_from_dataset.return_value = [MagicMock(), MagicMock()]
        mocked_dataset_service["test_repo"].delete_test.return_value = None

        with pytest.raises(PersistenceException):
            mocked_dataset_service["dataset_service"].delete_dataset(uuid4())

    def test_delete_non_empty_dataset_persistence_error(self, mocked_dataset_service):

        mocked_dataset_service["test_repo"].get_tests_from_dataset.return_value = [MagicMock(), MagicMock()]
        mocked_dataset_service["qa_repo"].delete_all_from_dataset.return_value = None

        with pytest.raises(PersistenceException):
            mocked_dataset_service["dataset_service"].delete_dataset(uuid4())
    
    def test_delete_non_empy_dataset(self, mocked_dataset_service):

        DATASET_ID: UUID = uuid4()

        mocked_dataset_service["test_repo"].get_tests_from_dataset.return_value = [MagicMock(), MagicMock()]
        mocked_dataset_service["dataset_repo"].delete_dataset.return_value = DATASET_ID

        res = mocked_dataset_service["dataset_service"].delete_dataset(DATASET_ID)

        assert  res == DATASET_ID


    def test_update_non_existent_dataset(self, mocked_dataset_service):

        mocked_dataset_service["dataset_repo"].get_dataset_by_id.return_value = None

        with pytest.raises(DatasetNonExistentException):
            mocked_dataset_service["dataset_service"].update_dataset("prova", uuid4())

    def test_update_tmp_dataset(self, mocked_dataset_service):

        mocked_dataset_service["dataset_repo"].get_dataset_by_id.return_value.is_saved.return_value = False

        with pytest.raises(InvalidDatasetOperationException):
            mocked_dataset_service["dataset_service"].update_dataset("prova", uuid4())
    

    @patch("adapter.dataset_service.DatasetFactory.saved")
    def test_update_dataset_with_persistence_error(self, mock_datasetfactory_saved,mocked_dataset_service):

        mocked_dataset_service["dataset_repo"].update_dataset.return_value = None

        with pytest.raises(PersistenceException):
            mocked_dataset_service["dataset_service"].update_dataset("prova", uuid4())

    @patch("adapter.dataset_service.DatasetFactory.saved")
    def test_update_dataset(self, mock_datasetfactory_saved, mocked_dataset_service):
        
        mock_updated_dataset = MagicMock()

        mocked_dataset_service["dataset_repo"].update_dataset.return_value = mock_updated_dataset

        res = mocked_dataset_service["dataset_service"].update_dataset("prova", uuid4())

        assert res == mock_updated_dataset 

    def test_get_all_datasets_with_persistence_error(self, mocked_dataset_service):

        mocked_dataset_service["dataset_repo"].get_all_datasets.return_value = None

        with pytest.raises(PersistenceException):
            mocked_dataset_service["dataset_service"].get_all_datasets('')

    def test_get_all_datasets(self, mocked_dataset_service):

        mock_datasets_list = MagicMock()
        mocked_dataset_service["dataset_repo"].get_all_datasets.return_value = mock_datasets_list

        res =  mocked_dataset_service["dataset_service"].get_all_datasets('')

        assert res == mock_datasets_list

    def test_get_non_existent_dataset_by_id(self, mocked_dataset_service):

        mocked_dataset_service["dataset_repo"].get_dataset_by_id.return_value = None

        with pytest.raises(DatasetNonExistentException):
            mocked_dataset_service["dataset_service"].get_dataset_by_id(uuid4())

    def test_get_dataset_by_id(self, mocked_dataset_service):

        mock_dataset = MagicMock()
        mocked_dataset_service["dataset_repo"].get_dataset_by_id.return_value = mock_dataset

        res = mocked_dataset_service["dataset_service"].get_dataset_by_id(uuid4())

        assert res == mock_dataset

    def test_save_non_existent_tmp_dataset(self, mocked_dataset_service):

        mocked_dataset_service["dataset_repo"].get_dataset_by_id.return_value = None

        with pytest.raises(DatasetNonExistentException):
            mocked_dataset_service["dataset_service"].save_tmp(uuid4(), "prova")

    def test_save_tmp_with_non_tmp_dataset(self, mocked_dataset_service):

        mocked_dataset_service["dataset_repo"].get_dataset_by_id.return_value.is_tmp.return_value = False

        with pytest.raises(InvalidDatasetOperationException):
            mocked_dataset_service["dataset_service"].save_tmp(uuid4(), "prova")

    def test_save_tmp_with_persistence_error(self, mocked_dataset_service):

        mocked_dataset_service["dataset_repo"].get_dataset_by_id.return_value.is_tmp.return_value = False

        with pytest.raises(InvalidDatasetOperationException):
            mocked_dataset_service["dataset_service"].save_tmp(uuid4(), "prova")
    
    @patch("adapter.dataset_service.DatasetFactory.saved")
    def test_save_tmp(self, mock_datasetfactory_saved, mocked_dataset_service):

        saved_dataset = MagicMock()
        mocked_dataset_service["dataset_repo"].update_dataset.return_value = saved_dataset

        res = mocked_dataset_service["dataset_service"].save_tmp(uuid4(), "prova")

        assert res == saved_dataset

    def test_save_working_copy_with_non_existent_working_copy_dataset(self, mocked_dataset_service):

        mocked_dataset_service["dataset_repo"].get_dataset_by_id.return_value = None

        with pytest.raises(DatasetNonExistentException):
            mocked_dataset_service["dataset_service"].save_working_copy(uuid4())

    def test_save_working_copy_with_non_working_copy_dataset(self, mocked_dataset_service):

        mocked_dataset_service["dataset_repo"].get_dataset_by_id.return_value.is_working_copy.return_value = False

        with pytest.raises(InvalidDatasetOperationException):
            mocked_dataset_service["dataset_service"].save_working_copy(uuid4())

    @patch("adapter.dataset_service.DatasetFactory.saved")
    def test_save_working_copy_with_persistence_error(self, mock_datasetfactory_saved, mocked_dataset_service):

        mocked_dataset_service["dataset_repo"].update_dataset.return_value = None

        with pytest.raises(PersistenceException):
            mocked_dataset_service["dataset_service"].save_working_copy(uuid4())
    
    @patch("adapter.dataset_service.DatasetFactory.saved")
    def test_save_working_copy(self, mock_datasetfactory_saved, mocked_dataset_service):

        saved_dataset = MagicMock()
        mocked_dataset_service["dataset_repo"].update_dataset.return_value = saved_dataset

        res = mocked_dataset_service["dataset_service"].save_working_copy(uuid4())

        assert res == saved_dataset

    def test_create_working_copy_with_non_existent_working_copy(self, mocked_dataset_service):
        
        mocked_dataset_service["dataset_repo"].get_dataset_by_id.return_value = None

        with pytest.raises(DatasetNonExistentException):
            mocked_dataset_service["dataset_service"].create_working_copy(uuid4())

    def test_create_working_copy_with_non_saved_origin(self, mocked_dataset_service):
        
        mocked_dataset_service["dataset_repo"].get_dataset_by_id.return_value.is_saved.return_value = False

        with pytest.raises(InvalidDatasetOperationException):
            mocked_dataset_service["dataset_service"].create_working_copy(uuid4())
    
    @patch("adapter.dataset_service.DatasetFactory.working_copy")
    def test_create_working_copy_with_persistence_error_while_creation(self, mock_datasetfactory_working_copy, mocked_dataset_service):
        
        mocked_dataset_service["dataset_repo"].create_dataset.return_value = None

        with pytest.raises(PersistenceException):
            mocked_dataset_service["dataset_service"].create_working_copy(uuid4())
    

    @patch("adapter.dataset_service.DatasetFactory.working_copy")
    def test_create_working_copy_with_persistence_error_while_content_copy(self, mock_datasetfactory_working_copy, mocked_dataset_service):
        
        mocked_dataset_service["qa_repo"].copy_all_from_dataset.return_value = None

        with pytest.raises(PersistenceException):
            mocked_dataset_service["dataset_service"].create_working_copy(uuid4())
    
    @patch("adapter.dataset_service.DatasetFactory.working_copy")
    def test_create_working_copy(self, mock_datasetfactory_working_copy, mocked_dataset_service):
        
        working_copy_mock = MagicMock()
        mocked_dataset_service["dataset_repo"].create_dataset.return_value = working_copy_mock

        res = mocked_dataset_service["dataset_service"].create_working_copy(uuid4())

        assert res == working_copy_mock