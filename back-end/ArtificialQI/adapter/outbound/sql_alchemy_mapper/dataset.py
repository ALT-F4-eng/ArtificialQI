# type: ignore

from artificialqi.adapter.outbound.sql_alchemy_model.dataset import DatasetSqlAlchemyModel
from artificialqi.core.dataset_factory import DatasetFactory
from artificialqi.core.dataset import Dataset

class DatasetModelMapper:

    @staticmethod
    def to_domain(model: DatasetSqlAlchemyModel) -> Dataset:

        if not model.tmp:
            res = DatasetFactory.saved(
                id=model.id,
                dim=len(model.qas),
                name=model.name, 
                first_save_date=model.first_save_date,
                last_save_date=model.last_save_date
            )
        elif model.origin is None:
             res = DatasetFactory.tmp(
                id=model.id,
                dim=len(model.qas)
            )
        else:
            res = DatasetFactory.working_copy(
                id=model.id,
                dim=len(model.qas),
                origin=model.origin
            )
           

        return res

    @staticmethod
    def from_domain(domain: Dataset) -> DatasetSqlAlchemyModel:
        return DatasetSqlAlchemyModel(
            id=domain.id,
            name=domain.name,
            first_save_date=domain.first_save_date,
            last_save_date=domain.last_save_date,
            tmp=domain.tmp,
            origin=domain.origin
        )