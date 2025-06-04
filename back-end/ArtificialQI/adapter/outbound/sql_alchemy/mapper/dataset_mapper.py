from adapter.outbound.sql_alchemy.model.dataset_model import DatasetSqlAlchemyModel
from core.dataset import Dataset

class DatasetSqlAlchemyMapper:

    @staticmethod
    def to_domain(model: DatasetSqlAlchemyModel) -> Dataset:

        return Dataset(
            _name=model.name,
            _id=model.id, 
            _creation_date=model.creation_date
        )

    @staticmethod
    def to_model(domain: Dataset) -> DatasetSqlAlchemyModel:

        return DatasetSqlAlchemyModel(
            name=domain.name,
            id=domain.id, 
            creation_date=domain.creation_date
        )

