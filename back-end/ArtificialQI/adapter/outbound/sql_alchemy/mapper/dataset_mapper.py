from adapter.outbound.sql_alchemy.model.dataset_model import DatasetSqlAlchemyModel
from core.dataset import Dataset

class DatasetSqlAlchemyMapper:

    @staticmethod
    def to_domain(model: DatasetSqlAlchemyModel) -> Dataset:

        return Dataset(
            model.name,
            model.id, 
            model.creation_date
        )

    @staticmethod
    def to_model(domain: Dataset) -> DatasetSqlAlchemyModel:

        return DatasetSqlAlchemyModel(
            domain.name,
            domain.id, 
            domain.creation_date
        )

