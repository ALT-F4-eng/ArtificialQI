# # type: ignore

# from core.dataset import Dataset


# class _TestClassDatasetEqualMethod: 

#     def _test_different_id_datasets(self, get_non_empty_saved_dataset, get_empty_saved_dataset):
#         first: Dataset = get_non_empty_saved_dataset
#         second: Dataset = get_empty_saved_dataset
       
#         assert first != second

#     def _test_equal_id_datasets(self, get_non_empty_saved_dataset):
#         first: Dataset = get_non_empty_saved_dataset
#         second: Dataset = get_non_empty_saved_dataset 

#         assert first == second


# class _TestClassDatasetIsTmpMethod: 

#     def _test_tmp_dataset(self, get_non_empty_tmp_dataset):
#         res: bool = get_non_empty_tmp_dataset.is_tmp() 

#         assert res

#     def _test_working_copy_dataset(self, get_non_empty_working_copy_dataset):
#         res: bool =  get_non_empty_working_copy_dataset.is_tmp() 

#         assert not res

#     def _test_saved_dataset(self, get_non_empty_saved_dataset):
#         res: bool = get_non_empty_saved_dataset.is_tmp() 

#         assert not res

# class _TestClassDatasetIsWorkingCopy: 

#     def _test_tmp_dataset(self, get_non_empty_tmp_dataset):
#         res: bool = get_non_empty_tmp_dataset.is_working_copy() 

#         assert not res

#     def _test_working_copy_dataset(self, get_non_empty_working_copy_dataset):
#         res: bool =  get_non_empty_working_copy_dataset.is_working_copy() 

#         assert res

#     def _test_saved_dataset(self, get_non_empty_saved_dataset):
#         res: bool = get_non_empty_saved_dataset.is_working_copy() 

#         assert not res

# class _TestClassDatasetIsSaved: 

#     def _test_tmp_dataset(self, get_non_empty_tmp_dataset):
#         res: bool = get_non_empty_tmp_dataset.is_saved() 

#         assert not res

#     def _test_working_copy_dataset(self, get_non_empty_working_copy_dataset):
#         res: bool =  get_non_empty_working_copy_dataset.is_saved() 

#         assert not res

#     def _test_saved_dataset(self, get_non_empty_saved_dataset):
#         res: bool = get_non_empty_saved_dataset.is_saved() 

#         assert res
