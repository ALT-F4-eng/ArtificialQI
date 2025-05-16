from core.dataset import Dataset, DatasetFactory
from uuid import UUID, uuid4
import pytest
from common.exceptions import *
from datetime import date, timedelta

class _TestDatasetFactory:

    def test_create_saved_dataset_with_empty_name(self):
        
        NAME: str = ""
        with pytest.raises(ValueError):    
            DatasetFactory.saved(uuid4(), 0, NAME, date.today(), date.today())

    def test_create_saved_dataset_with_null_name(self):
        
        NAME: str = None
        
        with pytest.raises(ValueError):
            DatasetFactory.saved(uuid4(), 0, NAME, date.today(), date.today())

    def test_create_saved_dataset_with_null_id(self):
        
        ID: UUID = None
            
        with pytest.raises(ValueError):
            DatasetFactory.saved(ID, 0, "prova", date.today(), date.today())

    def test_create_saved_dataset_with_null_first_saved_date(self):
        
        FIRST_SAVED_DATE: date = None
                
        with pytest.raises(ValueError):
            DatasetFactory.saved(uuid4(), 0, "prova", FIRST_SAVED_DATE, date.today())

    def test_create_saved_dataset_with_null_last_saved_date(self):
        
        LAST_SAVED_DATE: date = None

        with pytest.raises(ValueError):
            DatasetFactory.saved(uuid4(), 0, "prova", date.today(), LAST_SAVED_DATE)

    def test_create_saved_dataset_with_name_only_spaces(self):
        
        NAME: str = "   "

        with pytest.raises(ValueError):
            DatasetFactory.saved(uuid4(), 0, NAME, date.today(), date.today())

    def test_create_saved_dataset_with_invalid_date(self):
        
        FIRST_SAVED_DATE: date = date.today()
        LAST_SAVED_DATE: date = date.today() - timedelta(days=1)

        with pytest.raises(ValueError):
            DatasetFactory.saved(uuid4(), 0, "prova", FIRST_SAVED_DATE, LAST_SAVED_DATE)
    
    def test_create_saved_dataset_with_negative_dimension(self):

        DIM: int = -1

        with pytest.raises(ValueError):
            DatasetFactory.saved(uuid4(), DIM, "prova", date.today(), date.today())

    def test_create_working_copy_dataset_with_negative_dimension(self):

        DIM: int = -1

        with pytest.raises(ValueError):
            DatasetFactory.working_copy(uuid4(), uuid4(), DIM)
    
    def test_create_working_copy_dataset_with_null_dimension(self):
        
        DIM: int = None

        with pytest.raises(ValueError):
            DatasetFactory.working_copy(uuid4(), uuid4(), DIM)

    def test_create_working_copy_dataset_with_null_id(self):
        
        ID: UUID = None

        with pytest.raises(ValueError):
            DatasetFactory.working_copy(ID, uuid4(), 0)

    def test_create_working_copy_dataset_with_null_origin(self):
        
        ORIGIN: UUID = None

        with pytest.raises(ValueError):
            DatasetFactory.working_copy(uuid4(), ORIGIN, 0)

    def test_create_tmp_dataset_with_null_id(self):
        
        ID: UUID = None

        with pytest.raises(ValueError):
            DatasetFactory.tmp(ID)

    def test_create_valid_saved_dataset(self):

        FIRST_SAVED_DATE: date = date.today()
        LAST_SAVED_DATE: date = date.today()
        NAME: str = "prova"
        DIM: int = 10
        IS_TMP: bool = False


        dataset: Dataset = DatasetFactory.saved(uuid4(), DIM, NAME, FIRST_SAVED_DATE, LAST_SAVED_DATE)

        assert dataset.dim == DIM
        assert dataset.name == NAME
        assert dataset.first_save_date == FIRST_SAVED_DATE
        assert dataset.last_save_date == LAST_SAVED_DATE
        assert dataset.tmp == IS_TMP
        assert dataset.origin is None
    
    def test_build_valid_tmp_dataset(self):
        DIMENSION: int = 0
        IS_TMP: bool = True


        dataset: Dataset = DatasetFactory.tmp(uuid4())

        assert dataset.dim == DIMENSION
        assert dataset.name is None
        assert dataset.first_save_date is None
        assert dataset.last_save_date is None
        assert dataset.tmp == IS_TMP
        assert dataset.origin is None
    
    def test_build_valid_working_copy_dataset(self):

        ORIGIN: UUID = uuid4()
        DIMENSION: int = 10
        IS_TMP: bool = True
        
        dataset: Dataset = DatasetFactory.working_copy(uuid4(), ORIGIN, DIMENSION)

        assert dataset.dim == DIMENSION
        assert dataset.name is None
        assert dataset.first_save_date is None
        assert dataset.last_save_date is None
        assert dataset.tmp == IS_TMP
        assert dataset.origin == ORIGIN
