from src.db_config import db
import uuid
from uuid import UUID
from src.models.test_result_model import TestResultModel

class TestModel(db.Model):
    __tablename__ = 'test'

    id = db.Column(db.Uuid, primary_key=True, default=uuid.uuid4)
    tmp = db.Column(db.Boolean, nullable=False, default=False)
    name = db.Column(db.String(255), nullable=True)
    execution_date = db.Column(db.DateTime, nullable=False)
    llm = db.Column(db.Uuid, db.ForeignKey('llm.id'), nullable=False)
    dataset = db.Column(db.Uuid, db.ForeignKey('dataset.id'), nullable=False)

    def get_id(self):
        return self.id
    
    @staticmethod
    def get_all_test_by_dataset_id(dataset_id): 
        return TestModel.query.filter_by(dataset=dataset_id).all()
    
    @staticmethod
    def delete_test_by_id(test_id):
        with db.session.no_autoflush:
            # Recupera e cancella i testresult prima del test
            result_delete = TestResultModel.delete_test_result_by_test_id(test_id)
            test = TestModel.query.get(test_id)
            if not test:
                return {
                    "success": False,
                    "message": f"Test con ID {test_id} non trovato"
                }
    
            db.session.delete(test)
    
        db.session.commit()
    
        return {
            "success": True,
            "message": f"Test {test_id} eliminato con successo. {result_delete['deleted_count']} testresult eliminati."
        }
