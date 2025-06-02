from src.db_config import db
from datetime import datetime, timezone
import uuid
from src.models.test_model import TestModel
from src.models.qa_model import QAModel
from sqlalchemy import func
import json


class DatasetModel(db.Model):
    __tablename__ = 'dataset'

    id = db.Column(db.Uuid, primary_key=True, default=uuid.uuid4)
    tmp = db.Column(db.Boolean, nullable=False)
    name = db.Column(db.String(255), nullable=True)
    first_save_date = db.Column(db.DateTime, nullable=False)
    last_save_date = db.Column(db.DateTime, nullable=False)
    origin = db.Column(db.Uuid, db.ForeignKey('dataset.id'), nullable=True)

    @staticmethod
    def get_all_dataset():
        results = DatasetModel.query.with_entities(
            DatasetModel.id, DatasetModel.name, DatasetModel.tmp, DatasetModel.last_save_date, DatasetModel.origin
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
    
    @staticmethod
    def create_temporary_dataset() :
        now = datetime.now(timezone.utc)
        new_dataset = DatasetModel(
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

    @staticmethod
    def delete_all_temporary_dataset():
        # Trova tutti i dataset temporanei
        temp_datasets = DatasetModel.query.filter_by(tmp=True).all()

        # Rimuovili dal database
        for dataset in temp_datasets:
            DatasetModel.delete_dataset_by_id(dataset.id)

        db.session.commit()

        return {
            "deleted_count": len(temp_datasets),
            "message": "Dataset temporanei eliminati con successo"
        }
    
    @staticmethod
    def delete_dataset_by_id(dataset_id):
        with db.session.no_autoflush:
            # Ottieni i test collegati al dataset
            linked_tests = TestModel.get_all_test_by_dataset_id(dataset_id)
             # Elimina tutti i test collegati
            for test in linked_tests:
                TestModel.delete_test_by_id(test.id)
            
            qa_delete_result = QAModel.delete_all_qa_by_dataset_id(dataset_id)
            # Procedi con l'eliminazione del dataset
            dataset = DatasetModel.query.get(dataset_id)
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

    @staticmethod
    def rename_dataset_by_id(dataset_id, new_name):
        dataset = DatasetModel.query.get(dataset_id)
        if not dataset:
            return {
                "success": False,
                "message": "Dataset non trovato"
            }

        dataset.name = new_name
        result = DatasetModel.update_last_save_date(dataset_id)

        return {
        "success": True,
        "message": f"Dataset {dataset_id} rinominato in '{new_name}' con successo. {result['message']}"
        }
    
    @staticmethod
    def update_last_save_date(dataset_id):
        dataset = DatasetModel.query.get(dataset_id)
        if not dataset:
            return {
                "success": False,
                "message": "Dataset non trovato"
            }

        dataset.last_save_date = datetime.now(timezone.utc)
        db.session.commit()

        return {
            "success": True,
            "message": f"Data ultima modifica aggiornata per il dataset {dataset_id}."
        }

    @staticmethod
    def clone_dataset_by_id(dataset_id):
        # Ottieni il dataset originale
        original = DatasetModel.query.get(dataset_id)
        if not original:
            return {
                "success": False,
                "message": f"Dataset con ID {dataset_id} non trovato."
            }

        # Base per il nuovo nome
        base_name = f"{original.name} (copia)"
        new_name = base_name
        counter = 1

        # Controlla nomi duplicati e genera un nome univoco
        while DatasetModel.query.filter(func.lower(DatasetModel.name) == new_name.lower()).first():
            new_name = f"{base_name} {counter}"
            counter += 1
            #original = DatasetModel.query.get(dataset_id)

        now = datetime.now(timezone.utc)
        # Crea il nuovo dataset clonando i campi
        cloned_dataset = DatasetModel(
            name=new_name,
            tmp=False,
            first_save_date=now,
            last_save_date=now,
            origin=dataset_id  # imposta l'origine
        )
        db.session.add(cloned_dataset)
        db.session.flush()  # ottieni l'ID per referenziare da altri modelli
        # Clona la QA associata (se esiste)
        QAModel.copy_all_qa_by_dataset_id(dataset_id, cloned_dataset.id)
        db.session.commit()
        
        return {
            "id": cloned_dataset.id,
            "name": cloned_dataset.name,
            "tmp": cloned_dataset.tmp,
            "first_save_date": cloned_dataset.first_save_date,
            "last_save_date": cloned_dataset.last_save_date,
            "origin": cloned_dataset.origin
        }
