from tools.dataset_dto import DatasetDto

class DatasetListDto:
    def __init__(self, dataset_list:list[DatasetDto]):
        self.dataset_list:list[DatasetDto] = dataset_list

    def get_datasets(self) -> list[DatasetDto]:
        return self.dataset_list

    def to_dict(self) -> dict:
        serialized = []
        for dataset in self.dataset_list:
            if hasattr(dataset, 'to_dict') and callable(dataset.to_dict):
                serialized.append(dataset.to_dict())
            else:
                serialized.append(vars(dataset))
        return {"datasets": serialized}