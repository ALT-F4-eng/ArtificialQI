#type: ignore

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
        "CREATION_DATE" : date(year=2025, month=6, day=4)
    }

@fixture
def get_dataset_with_specific_id(get_dataset_values) -> Dataset:
    

    return Dataset(
        _name=get_dataset_values["NAME"],
        _id=get_dataset_values["ID"],
        _creation_date=get_dataset_values["CREATION_DATE"]
    )

@fixture
def get_dataset_with_random_id(get_dataset_values) -> Dataset:

    return Dataset(
        _name=get_dataset_values["NAME"],
        _id=uuid4(),
        _creation_date=get_dataset_values["CREATION_DATE"]
    )