import unittest
from datetime import date
from uuid import UUID, uuid4

import pytest
from core.dataset import Dataset
from core.test import Test

@pytest.fixture(scope="class")
def dataset_types(request):
    request.cls.tmp_dataset = Dataset(
        id=uuid4(), dim=10, name=None, first_save_date=None,
        last_save_date=None, tmp=True, origin=None
    )

    request.cls.working_copy_dataset = Dataset(
        id=uuid4(), dim=10, name=None, first_save_date=None,
        last_save_date=None, tmp=True, origin=uuid4()
    )

    request.cls.saved_dataset = Dataset(
        id=uuid4(), dim=10, name="prova", first_save_date=date.today(),
        last_save_date=date.today(), tmp=False, origin=None
    )

@pytest.fixture(scope="class")
def dataset_pairs(request):
    ID: UUID = uuid4()

    request.cls.eq_dataset_pair = [ 
        Dataset(
            id=ID, dim=0, name="prova", first_save_date=date.today(), 
            last_save_date=date.today(), tmp=False, origin=None
        ),
        Dataset(
            id=ID, dim=0, name="prova", first_save_date=date.today(), 
            last_save_date=date.today(), tmp=False, origin=None
        )
    ]

    request.cls.neq_dataset_pair = [ 
        Dataset(
            id=uuid4(), dim=0, name="prova", first_save_date=date.today(), 
            last_save_date=date.today(), tmp=False, origin=None
        ),
        Dataset(
            id=uuid4(), dim=0, name="prova", first_save_date=date.today(), 
            last_save_date=date.today(), tmp=False, origin=None
        )
    ]

@pytest.fixture(scope="class")
def tests_types(request) -> Test:

    request.cls.tmp_test = Test(
        id=uuid4(), dataset=uuid4(), llm=uuid4(), index=unittest.mock.MagicMock(), 
        tmp=True, name=None, execution_date=date.today()
    )

    request.cls.saved_test = Test(
        id=uuid4(), dataset=uuid4(), llm=uuid4(), index=unittest.mock.MagicMock(), 
        tmp=True, name=None, execution_date=date.today()
    )

@pytest.fixture(scope="class")
def test_pairs(request):

    ID: UUID = uuid4()

    request.cls.eq_test_pair = [
        Test(
            id=ID, dataset=uuid4(), llm=uuid4(), index=unittest.mock.MagicMock(),
            tmp=True, name=None, execution_date=date.today()
        ),
        Test(
            id=ID, dataset=uuid4(), llm=uuid4(), index=unittest.mock.MagicMock(),
            tmp=True, name=None, execution_date=date.today()
        )
    ]

    request.cls.neq_test_pair = [
        Test(
            id=uuid4(), dataset=uuid4(), llm=uuid4(), index=unittest.mock.MagicMock(),
            tmp=True, name=None, execution_date=date.today()
        ),
        Test(
            id=uuid4(), dataset=uuid4(), llm=uuid4(), index=unittest.mock.MagicMock(),
            tmp=True, name=None, execution_date=date.today()
        )
    ]