# type: ignore

from datetime import date, timedelta
from uuid import UUID, uuid4
import unittest

import pytest
from core.dataset_factory import DatasetFactory
from core.dataset import Dataset

class _TestClassDatasetFactorySaveMethod:

    def _test_empty_name(self):

        NAME: str = ""
        
        with pytest.raises(ValueError):
            DatasetFactory.saved(
                id=uuid4(), dim=0, name=NAME, 
                first_save_date=date.today(), last_save_date=date.today()
            )

    def _test_name_only_spaces(self):

        NAME: str = "   "

        with pytest.raises(ValueError):
            DatasetFactory.saved(
                id=uuid4(), dim=0, name=NAME, 
                first_save_date=date.today(), last_save_date=date.today()
            )

    def _test_last_saved_date_grater_then_first_saved_date(self):

        FIRST_SAVED_DATE: date = date.today()
        LAST_SAVED_DATE: date = date.today() - timedelta(days=1)

        with pytest.raises(ValueError):
            DatasetFactory.saved(
                id=uuid4(), dim=0, name="prova", 
                first_save_date=FIRST_SAVED_DATE, last_save_date=LAST_SAVED_DATE
            )

    def _test_future_first_saved_date(self):

        FIRST_SAVED_DATE: date = date.today() + timedelta(days=1)

        with pytest.raises(ValueError):
            DatasetFactory.saved(
                id=uuid4(), dim=0, name="prova", first_save_date=FIRST_SAVED_DATE, last_save_date=date.today()+timedelta(2)
            )

    def _test_negative_dimension(self):

        DIM: int = -1

        with pytest.raises(ValueError):
            DatasetFactory.saved(
                id=uuid4(), dim=DIM, name="prova", 
                first_save_date=date.today(), last_save_date=date.today()
            )

    def _test_valid_saved_dataset(self, get_non_empty_saved_dataset):

        expected_dataset: Dataset = get_non_empty_saved_dataset

        obtained_dataset: Dataset = DatasetFactory.saved(
            id=expected_dataset.id, dim=expected_dataset.dim, name=expected_dataset.name, first_save_date=expected_dataset.first_save_date, last_save_date=expected_dataset.last_save_date
        )

        assert expected_dataset.id == obtained_dataset.id
        assert expected_dataset.dim == obtained_dataset.dim
        assert expected_dataset.name == obtained_dataset.name
        assert expected_dataset.first_save_date == obtained_dataset.first_save_date
        assert expected_dataset.last_save_date == obtained_dataset.last_save_date
        assert expected_dataset.tmp == obtained_dataset.tmp
        assert expected_dataset.origin == obtained_dataset.origin


class _TestClassDatasetFactoryWorkingCopyMethod:

    def _test_negative_dimension(self):
        DIM: int = -1

        with pytest.raises(ValueError):
            DatasetFactory.working_copy(
                id=uuid4(), origin=uuid4(), dim=DIM
            )
            
    def _test_valid_working_copy_dataset(self, get_non_empty_working_copy_dataset):

        expected_dataset: Dataset = get_non_empty_working_copy_dataset

        obtained_dataset: Dataset = DatasetFactory.working_copy(
            id=expected_dataset.id, origin=expected_dataset.origin, dim=expected_dataset.dim
        )

        assert expected_dataset.id == obtained_dataset.id
        assert expected_dataset.dim == obtained_dataset.dim
        assert expected_dataset.name == obtained_dataset.name
        assert expected_dataset.first_save_date == obtained_dataset.first_save_date
        assert expected_dataset.last_save_date == obtained_dataset.last_save_date
        assert expected_dataset.tmp == obtained_dataset.tmp
        assert expected_dataset.origin == obtained_dataset.origin

class _TestClassDatasetFactoryTmpMethod:

    def _test_negative_dim(self):
        ID: UUID = uuid4()
        DIM: int = -1

        with pytest.raises(ValueError):
            DatasetFactory.tmp(id=ID, dim=DIM)

    def _test_valid_tmp_dataset(self, get_non_empty_tmp_dataset):
        expected_dataset: Dataset = get_non_empty_tmp_dataset

        obtained_dataset: Dataset = DatasetFactory.tmp(id=expected_dataset.id, dim=expected_dataset.dim)

        assert expected_dataset.id == obtained_dataset.id
        assert expected_dataset.dim == obtained_dataset.dim 
        assert expected_dataset.name == obtained_dataset.name
        assert expected_dataset.first_save_date == obtained_dataset.first_save_date
        assert expected_dataset.last_save_date == obtained_dataset.last_save_date
        assert expected_dataset.tmp == obtained_dataset.tmp
        assert expected_dataset.origin == obtained_dataset.origin

        

