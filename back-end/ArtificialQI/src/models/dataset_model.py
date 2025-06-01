from src.db_config import db
import uuid
import json

class DatasetModel(db.Model):
    __tablename__ = 'dataset'

    id = db.Column(db.Uuid, primary_key=True, default=uuid.uuid4())
    tmp = db.Column(db.Boolean, nullable=False)
    name = db.Column(db.String(255), nullable=True)
    first_save_date = db.Column(db.DateTime, nullable=True)
    last_save_date = db.Column(db.DateTime, nullable=True)
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