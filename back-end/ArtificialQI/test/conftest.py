from datetime import date
from uuid import UUID, uuid4
from typing import Any

from pytest import fixture
from core.dataset import Dataset

@fixture
def get_dataset_values()->dict[str, Any]:
    return {
        "NAME" : "prova",
        "ID" : UUID('2a004a75-324a-4b17-8cd7-3e7dd2e958e7'),
        "CREATION_DATE" : date(year="2025", month="6", day="04")
    }

@fixture
def get_dataset_with_specific_id() -> Dataset:
    

    return Dataset(
        _name=NAME,
        _id=ID,
        _creation_date=CREATION_DATE
    )

@fixture
def get_dataset_with_random_id() -> Dataset:
    NAME: str = "prova"
    CREATION_DATE: date = date.today()

    return Dataset(
        _name=NAME,
        _id=uuid4(),
        _creation_date=CREATION_DATE
    )