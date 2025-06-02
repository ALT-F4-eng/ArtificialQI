from src.db_config import db
import uuid


class DatasetModel(db.Model):
    __tablename__ = 'dataset'

    id = db.Column(db.Uuid, primary_key=True, default=uuid.uuid4)
    tmp = db.Column(db.Boolean, nullable=False)
    name = db.Column(db.String(255), nullable=True)
    first_save_date = db.Column(db.DateTime, nullable=True)
    last_save_date = db.Column(db.DateTime, nullable=True)
    origin = db.Column(db.Uuid, db.ForeignKey('dataset.id'), nullable=True)
