from uuid import UUID
from typing import Callable, Optional

from sqlalchemy import delete, update, select
from port.outbound.dataset_repository import DatasetRepository
from core.dataset import Dataset
from sqlalchemy.orm import Session
from adapter.outbound.sql_alchemy.model.dataset_model import DatasetSqlAlchemyModel
from adapter.outbound.sql_alchemy.mapper.dataset_mapper import DatasetSqlAlchemyMapper

class SqlAlchemyDatasetAdapter(DatasetRepository):

    def __init__(self, session_factory: Callable[[], Session]):
        self._session: Session = session_factory()

    def create(self, dataset: Dataset) -> Optional[Dataset]:
        res: Optional[Dataset] = dataset

        db_dataset: DatasetSqlAlchemyModel = DatasetSqlAlchemyMapper.to_model(dataset)
        
        try:
            self._session.add(db_dataset)
            self._session.commit()
        except:
            res = None

        return res


    def delete(self, id: UUID) -> Optional[UUID]:
        res: Optional[UUID] = id

        del_stmt = delete(DatasetSqlAlchemyModel).where(DatasetSqlAlchemyModel.id==id)
        
        try:
            self._session.execute(del_stmt)
            self._session.commit()
        except:
            res = None

        return res

    def update(self, dataset: Dataset) -> Optional[Dataset]:
        res: Optional[Dataset] = dataset

        del_stmt = update(DatasetSqlAlchemyModel)\
            .where(DatasetSqlAlchemyModel.id==dataset.id)\
            .values(name=dataset.name)
        
        try:
            self._session.execute(del_stmt)
            self._session.commit()
        except:
            res = None

        return res

    def get_all(self) -> Optional[list[Dataset]]:
        res: Optional[list[Dataset]] = []

        select_stmt = select(DatasetSqlAlchemyModel)
        
        try:
          res = [DatasetSqlAlchemyMapper.to_domain(dataset) for dataset in self._session.scalars(select_stmt).all()]
        except:
            res = None

        return res
       
    def find_by_name(self, name: str) -> Optional[Dataset]:

        res: Optional[Dataset] = None

        select_stmt = select(DatasetSqlAlchemyModel).where(DatasetSqlAlchemyModel.name == name)
        
        try:
            res = DatasetSqlAlchemyMapper.to_domain(self._session.scalars(select_stmt).one())
        except:
            res = None

        return res
    
    def get_by_id(self, id: UUID) -> Optional[Dataset]:

        res: Optional[Dataset] = None

        select_stmt = select(DatasetSqlAlchemyModel).where(DatasetSqlAlchemyModel.id == id)
        
        try:
            res = DatasetSqlAlchemyMapper.to_domain(self._session.scalars(select_stmt).one())
        except:
            res = None

        return res