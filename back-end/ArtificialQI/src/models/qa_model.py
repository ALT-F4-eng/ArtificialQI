from src.db_config import db
import uuid

class QAModel(db.Model):
    __tablename__ = 'questionanswer'

    id= db.Column(db.Uuid, primary_key=True, default=uuid.uuid4)
    domanda = db.Column(db.String(255), nullable=False)
    risposta = db.Column(db.String(255), nullable=False)
    dataset = db.Column(db.Uuid, db.ForeignKey('dataset.id'), nullable=False)

    def get_id(self):
        return self.id
    
    @classmethod
    def get_all_qa_by_dataset_id(cls, dataset_id):
        return cls.query.filter_by(dataset=dataset_id).all()
    
    @classmethod
    def delete_all_qa_by_dataset_id(cls, dataset_id):
        results = cls.get_all_qa_by_dataset_id(dataset_id)
        for r in results:
            db.session.delete(r)
            
        db.session.commit()
        return {
            "deleted_count": len(results),
            "message": f"{len(results)} questionanswer eliminati per dataset {dataset_id}"
        }