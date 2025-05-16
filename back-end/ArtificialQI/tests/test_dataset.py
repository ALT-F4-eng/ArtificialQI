from datetime import date
import pytest
from core.dataset import Dataset
from uuid import UUID, uuid4


class _TestDataset:

    @pytest.fixture
    def get_tmp_dataset(self)->Dataset:
        return Dataset(uuid4(), 0, None, None, None, True, None) 
    
    @pytest.fixture
    def get_working_copy_dataset(self)->Dataset:
        return Dataset(uuid4(), 0, None, None, None, True, uuid4()) 
    
    @pytest.fixture
    def get_saved_dataset(self)->Dataset:
        return Dataset(uuid4(), 0, "prova", date.today(), date.today(), False, None) 

    @pytest.fixture
    def get_different_dataset_pair(self)->list[Dataset]:
        return [
            Dataset(uuid4(), 0, "prova", date.today(), date.today(), False, None), 
            Dataset(uuid4(), 0, "prova", date.today(), date.today(), False, None)
        ]
    
    @pytest.fixture
    def get_equal_dataset_pair(self)->list[Dataset]:
        ID: UUID = uuid4()

        return [
            Dataset(ID, 0, "prova", date.today(), date.today(), False, None), 
            Dataset(ID, 0, "prova", date.today(), date.today(), False, None)
        ]

    def test_eq_with_different_id_datasets(self, get_different_dataset_pair):
        FIRST, SECOND = get_different_dataset_pair

        assert FIRST != SECOND

    def test_eq_with_equal_id_datasets(self, get_equal_dataset_pair):
        FIRST, SECOND = get_equal_dataset_pair

        assert FIRST == SECOND
    
    def test_is_tmp_with_tmp_dataset(self, get_tmp_dataset, get_saved_dataset, get_working_copy_dataset):
        assert get_tmp_dataset.is_tmp()
        assert not get_working_copy_dataset.is_tmp() 
        assert not get_saved_dataset.is_tmp()
    
    def test_is_working_copy(self, get_tmp_dataset, get_working_copy_dataset, get_saved_dataset):
        assert not get_tmp_dataset.is_working_copy()
        assert get_working_copy_dataset.is_working_copy() 
        assert not get_saved_dataset.is_working_copy()
    
    def test_is_saved(self, get_tmp_dataset, get_saved_dataset, get_working_copy_dataset):

        assert not get_tmp_dataset.is_saved()
        assert not get_working_copy_dataset.is_saved() 
        assert get_saved_dataset.is_saved()
