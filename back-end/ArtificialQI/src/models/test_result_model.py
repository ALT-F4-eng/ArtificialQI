from src.db_config import db
import uuid

class TestResultModel(db.Model):
    __tablename__ = 'testresult'  # corretto, deve coincidere con CREATE TABLE

    test = db.Column(db.Uuid, db.ForeignKey('test.id'), primary_key=True, nullable=False)
    qa = db.Column(db.Uuid, db.ForeignKey('questionanswer.id'), primary_key=True, nullable=False)
    is_correct = db.Column(db.Boolean, nullable=False)
    similarity_score = db.Column(db.Float, nullable=False)
    obtained_answer = db.Column(db.Text, nullable=False)

    @staticmethod
    def get_all_test_result_by_test_id(test_id):
        return TestResultModel.query.filter_by(test=test_id).all()
    
    @staticmethod
    def delete_test_result_by_test_id(test_id):
        results = TestResultModel.get_all_test_result_by_test_id(test_id)
    
        for result in results:
            db.session.delete(result)
        
        db.session.commit()
        
        return {
            "deleted_count": len(results),
            "message": f"{len(results)} testresult eliminati per test {test_id}"
        }
