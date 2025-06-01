from src.db_config import db
import uuid

class TestResultModel(db.Model):
    __tablename__ = 'test_result'

    test_id = db.Column(db.Uuid, db.ForeignKey('test.id'), primary_key=True, nullable=False)
    qa_id = db.Column(db.Uuid, db.ForeignKey('qa.id'), primary_key=True, nullable=False)
    is_correct = db.Column(db.Boolean, nullable=False)
    similarity_score = db.Column(db.Float, nullable=True)
    obtained_answer = db.Column(db.String(255), nullable=True)