from datetime import date
from uuid import UUID, uuid4
from pytest import fixture
from core.dataset import Dataset

class TestEqMethod:

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
        
class TestNameSetterMethod:

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
        


