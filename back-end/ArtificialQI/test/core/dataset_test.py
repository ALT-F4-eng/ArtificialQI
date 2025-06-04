from datetime import date, timedelta

from core.dataset import Dataset
import pytest

class TestEqMethod:

    def test_with_non_dataset_type(self, get_dataset_with_specific_id: Dataset):

        invoc_dataset: Dataset = get_dataset_with_specific_id

        non_dataset_obj: object = object()

        assert(invoc_dataset != non_dataset_obj)

    def test_with_different_id_dataset(self, get_dataset_with_specific_id: Dataset, get_dataset_with_random_id: Dataset):

        invoc_dataset: Dataset = get_dataset_with_specific_id
        different_dataset: Dataset = get_dataset_with_random_id

        assert(invoc_dataset != different_dataset)

    def test_with_equal_id_dataset(self, get_dataset_with_specific_id: Dataset):

        assert(
            get_dataset_with_specific_id == get_dataset_with_specific_id
        )
        
class TestNameSetterMethod:

    def test_with_empty_name(self, get_dataset_with_specific_id: Dataset):

        invoc_dataset: Dataset = get_dataset_with_specific_id

        with pytest.raises(ValueError):
            invoc_dataset.name = ""

    def test_with_only_space_name(self, get_dataset_with_specific_id: Dataset):

        invoc_dataset: Dataset = get_dataset_with_specific_id

        with pytest.raises(ValueError):
            invoc_dataset.name = "   "
    
    def test_with_valid_name(self, get_dataset_with_specific_id: Dataset):

        NEW_NAME: str = "PROVA"

        invoc_dataset: Dataset = get_dataset_with_specific_id

        invoc_dataset.name = NEW_NAME

        assert(invoc_dataset.name == NEW_NAME)

        
class TestDateSetterMethod:

    def test_future_date(self, get_dataset_with_specific_id: Dataset):

        invoc_dataset: Dataset = get_dataset_with_specific_id

        with pytest.raises(ValueError):
            invoc_dataset.creation_date = date.today() + timedelta(days=1)

    def test_with_valid_date(self, get_dataset_with_specific_id: Dataset):

        NEW_DATE: date = date.today() 

        invoc_dataset: Dataset = get_dataset_with_specific_id

        invoc_dataset.creation_date = NEW_DATE 

        assert invoc_dataset.creation_date == NEW_DATE

        


