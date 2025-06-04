from datetime import date
from uuid import UUID, uuid4
from pytest import fixture
from core.dataset import Dataset

class TestEqMethod:

    @fixture
    def get_dataset_with_specific_id(self) -> Dataset:
        ID: UUID = UUID('2a004a75-324a-4b17-8cd7-3e7dd2e958e7')
        NAME: str = "prova"
        CREATION_DATE: date = date.today()

        return Dataset(
           name=NAME,
           id=ID,
           creation_date=CREATION_DATE
        )
    
    @fixture
    def get_dataset_with_random_id(self) -> Dataset:
        NAME: str = "prova"
        CREATION_DATE: date = date.today()

        return Dataset(
           name=NAME,
           id=uuid4(),
           creation_date=CREATION_DATE
        )

    def test_with_non_dataset_type(self, get_dataset_with_specific_id: Dataset):

        invoc_dataset: Dataset = get_dataset_with_specific_id

        non_dataset_obj: object = object()

        assert(invoc_dataset == non_dataset_obj)

    def test_with_different_id_dataset(self, get_dataset_with_specific_id: Dataset, get_dataset_with_random_id: Dataset):

        invoc_dataset: Dataset = get_dataset_with_specific_id
        different_dataset: Dataset = get_dataset_with_random_id

        assert(invoc_dataset == different_dataset)

    def test_with_equal_id_dataset(self, get_dataset_with_specific_id: Dataset):

        assert(
            get_dataset_with_specific_id == get_dataset_with_specific_id
        )
        


