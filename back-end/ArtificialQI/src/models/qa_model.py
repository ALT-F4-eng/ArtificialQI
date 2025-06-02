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
    
    @staticmethod
    def get_all_qa_by_dataset_id(dataset_id):
        return QAModel.query.filter_by(dataset=dataset_id).all()
    
    @staticmethod
    def delete_all_qa_by_dataset_id(dataset_id):
        results = QAModel.get_all_qa_by_dataset_id(dataset_id)
        for r in results:
            db.session.delete(r)
            
        db.session.commit()
        return {
            "deleted_count": len(results),
            "message": f"{len(results)} questionanswer eliminati per dataset {dataset_id}"
        }
    
    @staticmethod
    def copy_all_qa_by_dataset_id(original_dataset_id, new_dataset_id):
        original_qas = QAModel.query.filter_by(dataset=original_dataset_id).all()

        if not original_qas:
            return  # Nessuna QA da copiare, esci silenziosamente

        for qa in original_qas:
            cloned_qa = QAModel(
                domanda=qa.domanda,
                risposta=qa.risposta,
                dataset=new_dataset_id
            )
            db.session.add(cloned_qa)

    @staticmethod
    def modify_qa_by_id(qa_id, domanda, risposta):
        qa = QAModel.query.get(qa_id)

        if not qa:
            return {
                "success": False,
                "message": f"QA con ID {qa_id} non trovata."
            }

        qa.domanda = domanda
        qa.risposta = risposta

        db.session.commit()

        return {
                "id": qa.id,
                "question": qa.domanda,
                "answer": qa.risposta
            }


    @staticmethod
    def delete_qa_by_id(qa_id):
        qa = QAModel.query.get(qa_id)
        if not qa:
            return {
                "success": False,
                "message": f"Nessuna QA trovata con ID {qa_id}"
            }

        db.session.delete(qa)
        db.session.commit()
        return {
            "success": True,
            "message": f"QA con ID {qa_id} eliminata con successo."
        }



        