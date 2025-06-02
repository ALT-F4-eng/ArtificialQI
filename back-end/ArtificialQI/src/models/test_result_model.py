from src.db_config import db
import uuid

class TestResultModel(db.Model):
    __tablename__ = 'testresult'  # corretto, deve coincidere con CREATE TABLE

    test = db.Column(db.Uuid, db.ForeignKey('test.id'), primary_key=True, nullable=False)
    qa = db.Column(db.Uuid, db.ForeignKey('questionanswer.id'), primary_key=True, nullable=False)
    is_correct = db.Column(db.Boolean, nullable=False)
    similarity_score = db.Column(db.Float, nullable=False)
    obtained_answer = db.Column(db.Text, nullable=False)