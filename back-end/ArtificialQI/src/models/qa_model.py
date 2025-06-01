from src.db_config import db
import uuid
from src.models.dataset_model import DatasetModel

class QAModel(db.Model):
    __tablename__ = 'questionanswer'

    id= db.Column(db.Uuid, primary_key=True, default=uuid.uuid4)
    domanda = db.Column(db.String(255), nullable=False)
    risposta = db.Column(db.String(255), nullable=False)
    dataset = db.Column(db.Uuid, db.ForeignKey('dataset.id'), nullable=False)

    def get_id(self):
        return self.id