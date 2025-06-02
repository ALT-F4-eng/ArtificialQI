from src.db_config import db
from datetime import datetime, timezone
import uuid
from src.models.test_model import TestModel
from src.models.qa_model import QAModel
import json


class DatasetModel(db.Model):
    __tablename__ = 'dataset'

    id = db.Column(db.Uuid, primary_key=True, default=uuid.uuid4)
    tmp = db.Column(db.Boolean, nullable=False)
    name = db.Column(db.String(255), nullable=True)
    first_save_date = db.Column(db.DateTime, nullable=False)
    last_save_date = db.Column(db.DateTime, nullable=False)
    origin = db.Column(db.Uuid, db.ForeignKey('dataset.id'), nullable=True)

    @classmethod
    def get_all_dataset(cls):
        results = cls.query.with_entities(
            cls.id, cls.name, cls.tmp, cls.last_save_date, cls.origin
        ).all()
        return [
            {
                'id': str(r.id),  # converti UUID in stringa
                'name': r.name,
                'tmp': r.tmp,
                'last_save_date': r.last_save_date.isoformat() if r.last_save_date else None,
                'origin': str(r.origin) if r.origin else None  # converti anche origin in stringa se presente
            }
            for r in results
        ]
    

    @classmethod
    def create_temporary_dataset(cls) :
        now = datetime.now(timezone.utc)
        new_dataset = cls(
            tmp=True,
            name="New Dataset",
            first_save_date=now,
            last_save_date=now,
            origin=None
        )
        db.session.add(new_dataset)
        db.session.commit()

        return {
        'id': str(new_dataset.id),
        'tmp': new_dataset.tmp,
        'name': new_dataset.name,
        'last_save_date':new_dataset.last_save_date,
        'origin':new_dataset.origin
    }

    @classmethod
    def delete_all_temporary_dataset(cls):
        # Trova tutti i dataset temporanei
        temp_datasets = cls.query.filter_by(tmp=True).all()

        # Rimuovili dal database
        for dataset in temp_datasets:
            db.session.delete(dataset)

        db.session.commit()

        return {
            "deleted_count": len(temp_datasets),
            "message": "Dataset temporanei eliminati con successo"
        }
    
    @classmethod
    def delete_dataset_by_id(cls, dataset_id):
        with db.session.no_autoflush:
            # Ottieni i test collegati al dataset
            linked_tests = TestModel.get_all_test_by_dataset_id(dataset_id)
             # Elimina tutti i test collegati
            for test in linked_tests:
                TestModel.delete_test_by_id(test.id)
             
            qa_delete_result = QAModel.delete_all_qa_by_dataset_id(dataset_id)
            # Procedi con l'eliminazione del dataset
            dataset = cls.query.get(dataset_id)
            if not dataset:
                return {
                    "success": False,
                    "message": "Dataset non trovato"
                }

            db.session.delete(dataset)
            db.session.commit()

            return {
                "success": True,
                "message": f"Dataset {dataset_id} eliminato con successo. "
                            f"{len(linked_tests)} test e {qa_delete_result['deleted_count']} questionanswer eliminati."
            }

        