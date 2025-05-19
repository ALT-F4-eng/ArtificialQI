import unittest

import pytest
from core.dataset import Dataset


@pytest.mark.usefixtures("dataset_pairs")
class _TestClassDatasetEqualMethod(unittest.TestCase):

    def test_different_id_datasets(self):
        FIRST, SECOND = self.neq_dataset_pair
        
        self.assertNotEqual(FIRST, SECOND)

    def test_equal_id_datasets(self):
        FIRST, SECOND = self.eq_dataset_pair

        self.assertEqual(FIRST, SECOND)


@pytest.mark.usefixtures("dataset_types")
class _TestClassDatasetIsTmpMethod(unittest.TestCase):

    def test_tmp_dataset(self):
        res: bool = self.tmp_dataset.is_tmp()

        self.assertTrue(res)

    def test_working_copy_dataset(self):
        res: bool = self.working_copy_dataset.is_tmp()

        self.assertFalse(res)

    def test_saved_dataset(self):
        res: bool = self.saved_dataset.is_tmp()

        self.assertFalse(res)

@pytest.mark.usefixtures("dataset_types")
class _TestClassDatasetIsWorkingCopy(unittest.TestCase):

    def test_tmp_dataset(self):
        res: bool = self.tmp_dataset.is_working_copy()

        self.assertFalse(res)

    def test_working_copy_dataset(self):
        res: bool = self.working_copy_dataset.is_working_copy()

        self.assertTrue(res)

    def test_saved_dataset(self):
        res: bool = self.saved_dataset.is_working_copy()

        self.assertFalse(res)

@pytest.mark.usefixtures("dataset_types")
class _TestClassDatasetIsSaved(unittest.TestCase):

    def test_tmp_dataset(self):
        res: bool = self.tmp_dataset.is_saved()

        self.assertFalse(res)

    def test_working_copy_dataset(self):
        res: bool = self.working_copy_dataset.is_saved()

        self.assertFalse(res)

    def test_saved_dataset(self):
        res: bool = self.saved_dataset.is_saved()

        self.assertTrue(res)
