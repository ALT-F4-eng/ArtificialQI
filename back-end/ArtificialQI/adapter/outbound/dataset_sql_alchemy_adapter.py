from typing import Optional
from uuid import UUID

from core.dataset import Dataset
from sqlalchemy.orm import Session
from sqlalchemy import func, select, update, delete
from port.outbound.dataset_repository import DatasetRepository 
from adapter.outbound.sql_alchemy_model.dataset import DatasetSqlAlchemyModel
from adapter.outbound.sql_alchemy_mapper.dataset import DatasetModelMapper


class SqlAlchemyDatasetAdapter(DatasetRepository):

    def __init__(self, session: Session):
        self.session = session

    def delete_dataset(self, id: UUID) -> Optional[UUID]:

        res: Optional[UUID] = id
        
        del_query = delete(DatasetSqlAlchemyModel).where(DatasetSqlAlchemyModel.id == id)

        try:
            self.session.scalars(del_query).one()
        except:
            res = None
        
        return res
        

    def update_dataset(self, dataset: Dataset) -> Optional[Dataset]:

        res: Optional[Dataset] = dataset
        
        update_query = update(DatasetSqlAlchemyModel).where(DatasetSqlAlchemyModel.id == id).values(
            name=dataset.name,
            first_save_date=dataset.first_save_date,
            last_save_date=dataset.last_save_date,
            tmp=dataset.tmp,
            origin=dataset.origin
        )

        try:
            self.session.scalars(update_query).one()
        except Exception:
            res = None
        
        return res
    
    def create_dataset(self, dataset: Dataset) -> Optional[Dataset]:

        res: Optional[Dataset] = dataset
        
        create_dataset: DatasetSqlAlchemyModel = DatasetModelMapper.from_domain(dataset)

        try:
            self.session.add(create_dataset)
        except Exception:
            res = None
        
        return res
            

    def get_dataset_by_id(self, id: UUID) -> Optional[Dataset]:

        res: Optional[Dataset] = None
        
        get_query = select(DatasetSqlAlchemyModel).where(DatasetSqlAlchemyModel.id == id)

        try:
            dataset: DatasetSqlAlchemyModel = self.session.scalars(get_query).one()
            res = DatasetModelMapper.to_domain(dataset)

        except Exception:
            res = None
            
        return res

    def get_all_datasets(self, q: str) -> Optional[list[Dataset]]:

        res: Optional[list[Dataset]] = []
        
        get_query = select(DatasetSqlAlchemyModel).where(func.lower(DatasetSqlAlchemyModel.name).like(f"%{q}%"))

        try:
            datasets: list[DatasetSqlAlchemyModel] = list(self.session.scalars(get_query).all())
            res = [DatasetModelMapper.to_domain(d) for d in datasets]

        except Exception:
            res = None
        
        return res

        



        

   