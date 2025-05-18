from datetime import date, timedelta
from uuid import UUID, uuid4
import unittest

import pytest
from core.dataset_factory import DatasetFactory
from core.dataset import Dataset

class _TestClassDatasetFactorySaveMethod(unittest.TestCase):

    def test_empty_name(self):

        NAME: str = ""
        
        with pytest.raises(ValueError):
            DatasetFactory.saved(
                id=uuid4(), dim=0, name=NAME, 
                first_save_date=date.today(), last_save_date=date.today()
            )

    def test_none_name(self):

        NAME: str = None

        with pytest.raises(ValueError):
            DatasetFactory.saved(
                id=uuid4(), dim=0, name=NAME, 
                first_save_date=date.today(), last_save_date=date.today()
        )

    def test_none_id(self):

        ID: UUID = None

        with pytest.raises(ValueError):
            DatasetFactory.saved(
                ID, dim=0, name="prova", 
                first_save_date=date.today(), last_save_date=date.today()
            )

    def test_none_first_saved_date(self):

        FIRST_SAVED_DATE: date = None

        with pytest.raises(ValueError):
            DatasetFactory.saved(
                id=uuid4(), dim=0, name="prova", 
                first_save_date=FIRST_SAVED_DATE, last_save_date=date.today()
            )

    def test_none_last_saved_date(self):

        LAST_SAVED_DATE: date = None

        with pytest.raises(ValueError):
            DatasetFactory.saved(
                id=uuid4(), dim=0, name="prova", 
                first_save_date=date.today(), last_save_date=LAST_SAVED_DATE
            )

    def test_name_only_spaces(self):

        NAME: str = "   "

        with pytest.raises(ValueError):
            DatasetFactory.saved(
                id=uuid4(), dim=0, name=NAME, 
                first_save_date=date.today(), last_save_date=date.today()
            )

    def test_last_saved_date_grater_then_first_saved_date(self):

        FIRST_SAVED_DATE: date = date.today()
        LAST_SAVED_DATE: date = date.today() - timedelta(days=1)

        with pytest.raises(ValueError):
            DatasetFactory.saved(
                id=uuid4(), dim=0, name="prova", 
                first_save_date=FIRST_SAVED_DATE, last_save_date=LAST_SAVED_DATE
            )

    def test_future_first_saved_date(self):

        FIRST_SAVED_DATE: date = date.today() + timedelta(days=1)

        with pytest.raises(ValueError):
            DatasetFactory.saved(
                id=uuid4(), dim=0, name="prova", first_save_date=FIRST_SAVED_DATE, last_save_date=date.today()+timedelta(2)
            )

    def test_negative_dimension(self):

        DIM: int = -1

        with pytest.raises(ValueError):
            DatasetFactory.saved(
                id=uuid4(), dim=DIM, name="prova", 
                first_save_date=date.today(), last_save_date=date.today()
            )

    def test_valid_saved_dataset(self):

        ID: UUID = uuid4()
        FIRST_SAVED_DATE: date = date.today()
        LAST_SAVED_DATE: date = date.today()
        NAME: str = "prova"
        DIM: int = 10
        IS_TMP: bool = False
        ORIGIN: UUID = None

        expected_dataset: Dataset = Dataset(
            id=ID, dim=DIM, name=NAME, first_save_date=FIRST_SAVED_DATE,
            last_save_date=LAST_SAVED_DATE, tmp=IS_TMP, origin=ORIGIN
        )

        obtained_dataset: Dataset = DatasetFactory.saved(
            id=ID, dim=DIM, name=NAME, first_save_date=FIRST_SAVED_DATE, last_save_date=LAST_SAVED_DATE
        )

        self.assertEqual(expected_dataset.id, obtained_dataset.id)
        self.assertEqual(expected_dataset.dim, obtained_dataset.dim)
        self.assertEqual(expected_dataset.name, obtained_dataset.name)
        self.assertEqual(expected_dataset.first_save_date, obtained_dataset.first_save_date)
        self.assertEqual(expected_dataset.last_save_date, obtained_dataset.last_save_date)
        self.assertEqual(expected_dataset.tmp, obtained_dataset.tmp)
        self.assertEqual(expected_dataset.origin, obtained_dataset.origin)


class _TestClassDatasetFactoryWorkingCopyMethod(unittest.TestCase):

    def test_negative_dimension(self):
        DIM: int = -1

        with pytest.raises(ValueError):
            DatasetFactory.working_copy(
                id=uuid4(), origin=uuid4(), dim=DIM
            )

    def test_none_dimension(self):
        DIM: int = None

        with pytest.raises(ValueError):
            DatasetFactory.working_copy(
                id=uuid4(), origin=uuid4(), dim=DIM
            )

    def test_none_id(self):
        ID: UUID = None

        with pytest.raises(ValueError):
            DatasetFactory.working_copy(
                ID, origin=uuid4(), dim=0
            )

    def test_none_origin(self):
        ORIGIN: UUID = None

        with pytest.raises(ValueError):
            DatasetFactory.working_copy(
                id=uuid4(), origin=ORIGIN, dim=0
            )
    def test_valid_working_copy_dataset(self):
        ID: UUID = uuid4()
        ORIGIN: UUID = uuid4()
        DIM: int = 10
        IS_TMP: bool = True
        FIRST_SAVED_DATE: date = None
        LAST_SAVED_DATE: date = None
        NAME: str = None

        expected_dataset: Dataset = Dataset(
            id=ID, dim=DIM, name=NAME, first_save_date=FIRST_SAVED_DATE, last_save_date=LAST_SAVED_DATE, tmp=IS_TMP, origin=ORIGIN 
        )

        obtained_dataset: Dataset = DatasetFactory.working_copy(
            id=ID, origin=ORIGIN, dim=DIM
        )

        self.assertEqual(expected_dataset.id, obtained_dataset.id)
        self.assertEqual(expected_dataset.dim, obtained_dataset.dim)
        self.assertEqual(expected_dataset.name, obtained_dataset.name)
        self.assertEqual(expected_dataset.first_save_date, obtained_dataset.first_save_date)
        self.assertEqual(expected_dataset.last_save_date, obtained_dataset.last_save_date)
        self.assertEqual(expected_dataset.tmp, obtained_dataset.tmp)
        self.assertEqual(expected_dataset.origin, obtained_dataset.origin)

class _TestClassDatasetFactoryTmpMethod(unittest.TestCase):

    def test_none_id(self):
        ID: UUID = None

        with pytest.raises(ValueError):
            DatasetFactory.tmp(id=ID)

    def test_none_dim(self):
        ID: UUID = uuid4()
        DIM: int = None

        with pytest.raises(ValueError):
            DatasetFactory.tmp(id=ID, dim=DIM)
    
    def test_negative_dim(self):
        ID: UUID = uuid4()
        DIM: int = -1

        with pytest.raises(ValueError):
            DatasetFactory.tmp(id=ID, dim=DIM)

    def test_valid_tmp_dataset(self):
        ID: UUID = uuid4()
        ORIGIN: UUID = None
        DIM: int = 0
        IS_TMP: bool = True
        FIRST_SAVED_DATE: date = None
        LAST_SAVED_DATE: date = None
        NAME: str = None

        expected_dataset: Dataset = Dataset(
            id=ID, dim=DIM, name=NAME, first_save_date=FIRST_SAVED_DATE, last_save_date=LAST_SAVED_DATE, tmp=IS_TMP, origin=ORIGIN 
        )

        obtained_dataset: Dataset = DatasetFactory.tmp(id=ID)

        self.assertEqual(expected_dataset.id, obtained_dataset.id)
        self.assertEqual(expected_dataset.dim, obtained_dataset.dim)
        self.assertEqual(expected_dataset.name, obtained_dataset.name)
        self.assertEqual(expected_dataset.first_save_date, obtained_dataset.first_save_date)
        self.assertEqual(expected_dataset.last_save_date, obtained_dataset.last_save_date)
        self.assertEqual(expected_dataset.tmp, obtained_dataset.tmp)
        self.assertEqual(expected_dataset.origin, obtained_dataset.origin)

        

