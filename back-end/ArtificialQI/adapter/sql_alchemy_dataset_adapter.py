from typing import Optional
from uuid import UUID

from sqlalchemy.exc import NoResultFound

from core.dataset import Dataset
from port.outbound.dataset_repository import DatasetRepository 
from src.app import db

class SqlAlchemyDatasetRepository(DatasetRepository):
    
    def delete_dataset(self, id: UUID) -> Optional[UUID]:
        dataset = db.session.query(Dataset).filter_by(id=id).one_or_none()
        if dataset is None:
            return None
        db.session.delete(dataset)
        db.session.commit()
        return id

    def update_dataset(self, dataset: Dataset) -> Optional[Dataset]:
        existing = db.session.query(Dataset).filter_by(id=dataset.id).one_or_none()
        if existing is None:
            return None
        for attr, value in dataset.__dict__.items():
            if attr != '_sa_instance_state':
                setattr(existing, attr, value)
        db.session.commit()
        return existing

    def create_dataset(self, dataset: Dataset) -> Optional[Dataset]:
        try:
            db.session.add(dataset)
            db.session.commit()
            return dataset
        except Exception:
            db.session.rollback()
            return None

    def get_dataset_by_id(self, id: UUID) -> Optional[Dataset]:
        return db.session.query(Dataset).filter_by(id=id).one_or_none()

    def get_all_datasets(self, q: str) -> Optional[list[Dataset]]:
        return db.session.query(Dataset).filter(
                                                                    #(Dataset.name.ilike(f"%{q}%")) ma bisogna cambiare le classi per renderle db model  altrimenti non funziona
        ).all()