import os
from routes.containers import Container
from flask import Flask, request, jsonify
from flask_cors import CORS
from uuid import uuid4
from datetime import datetime
from src.db_config import db  # usa db separato
from src.models.dataset_model import DatasetModel  # importa solo il modello
from models.DatasetDTO import DatasetDTO
from src.models.qa_model import QAModel  # importa il modello QAModel
from src.models.llm_model import LlmModel  # importa il modello LlmModel
from uuid import UUID,uuid4
import uuid
from datetime import datetime
from src.models.qa_model import QAModel
from src.models.test_result_model import TestResultModel


app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:4200"])
#CORS(app)
# Config DB
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)  # inizializza db con l'app


# DI Container
container = Container()
container.wire(modules=["routes.dataset_route"])
setattr(app, "container", container)

DB_URL = os.environ.get("DB_URL")

@app.route('/datasets',methods=['GET'])
def getAllDataset():
    data = DatasetModel.get_all_dataset()  # ritorna lista di dict, non stringa
    return jsonify(data)

@app.route('/api/messaggio', methods=['GET'])
def ricevi_messaggio():
    nome = request.args.get('nome')
    if not nome:
        return jsonify({'errore': 'Parametro "nome" mancante'}), 400
    risposta = f"Ciao, {nome}! Messaggio ricevuto."
    return jsonify({"risposta": risposta})


@app.route("/test-db")
def test_db():
    with app.app_context():  # richiesto da SQLAlchemy
        new_dataset = DatasetModel(name="Dataset di test", tmp=True) 
        db.session.add(new_dataset)
        db.session.commit()
        last = DatasetModel.query.order_by(DatasetModel.id.desc()).first()
        return {
            "id": last.id, 
            "name": last.name,
            "tmp": last.tmp,
            "first_save_date": datetime.now().isoformat(),
            "last_save_date": datetime.now().isoformat(),
            "origin": uuid4()
        }
    

@app.route("/test-test")
def test_test():
    with app.app_context():
        qas : list[QAModel]  = QAModel.query.filter_by(dataset="3f89c1e2-5a3f-4d78-a6b2-2c4b949c18e7").all()
        domande = [questionanswer.domanda for questionanswer in qas]
        stringify_domande = [str(domanda) for domanda in domande]

        return stringify_domande

@app.route("/datasets", methods=["POST"])
def create_dataset():
    with app.app_context():

        # Leggi parametri: dataset JSON (obbligatorio), file JSON (opzionale), copy ID (opzionale)
        dataset_json = request.form.get("dataset")
        file = request.files.get("file")
        copy_id = request.form.get("copy")

        '''if not dataset_json:
            return {"error": "Missing dataset metadata"}, 400

        try:
            # Deserializza i metadati in DatasetDTO
            dataset_dto = DatasetDTO.model_validate_json(dataset_json)
        except Exception as e:
            return {"error": f"Invalid dataset JSON: {e}"}, 400

        # Leggi file JSON se presente
        file_data = None
        if file:
            try:
                file_data = file.read().decode("utf-8")
            except Exception as e:
                return {"error": f"Invalid file content: {e}"}, 400

        # Copia ID opzionale: converti in int o None
        copy_id_int = None
        if copy_id:
            try:
                copy_id_int = int(copy_id)
            except Exception:
                return {"error": "copy must be an integer ID"}, 400

        # Chiama il servizio per creare il dataset
        #new_dataset_dto = dataset_service.create_dataset_tmp()'''


        new_dataset = DatasetModel(id=uuid4(), tmp=True, name="provatmp3000") 
        db.session.add(new_dataset)
        db.session.commit()
        return {"risposta": "Dataset created"}, 201


###########################   R O T T E      L L M   ###########################

@app.route('/llms/<id_llm>', methods=['GET'])
def get_llm(id_llm):
    llm = LlmModel.query.get(id_llm)
    if llm:
        return jsonify(llm.json()), 200
    else:
        return jsonify({'message': 'LLM not found'}), 404
    

@app.route('/llms', methods=['GET'])
def get_all_llms():
    llms = LlmModel.query.all()
    names = [llm.name for llm in llms]
    ids = [llm.id for llm in llms]
    return jsonify([{"id": str(llm.id), "name": llm.name} for llm in llms]), 200


@app.route('/llms', methods=['POST'])
def create_llm():
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No input data provided'}), 400
    
    name = data.get('name')
    url = data.get('url')

    if not name or not url:
        return jsonify({'message': 'Missing required fields: name and url'}), 400
    
    new_llm = LlmModel(
        id=uuid4(),
        name=name,
        url=url,
        save_date=datetime.now()
    )
    
    try:
        db.session.add(new_llm)
        db.session.commit()
        return jsonify(new_llm.json()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error creating LLM', 'error': str(e)}), 500
    

@app.route('/llms/<id_llm>', methods=['DELETE'])
def delete_llm(id_llm):
    llm = LlmModel.query.get(id_llm)
    if not llm:
        return jsonify({'message': 'LLM not found'}), 404
    try:
        db.session.delete(llm)
        db.session.commit()
        return jsonify({'message': f'LLM {id_llm} deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error deleting LLM', 'error': str(e)}), 500
    

@app.route('/llms/<id_llm>', methods=['PUT'])
def update_llm(id_llm):
    llm = LlmModel.query.get(id_llm)
    if not llm:
        return jsonify({'message': 'LLM not found'}), 404

    data = request.get_json()
    if not data:
        return jsonify({'message': 'No input data provided'}), 400

    name = data.get('name')
    url = data.get('url')

    if name:
        llm.name = name
    if url:
        llm.url = url
    llm.save_date = datetime.now()

    try:
        db.session.commit()
        return jsonify(llm.json()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error updating LLM', 'error': str(e)}), 500
    


###########################   R O T T E      Q A   ###########################



@app.route('/datasets/<dataset_id>/qas', methods=['POST'])
def create_qa(dataset_id):
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No input data provided'}), 400

    domanda = data.get('domanda')
    risposta = data.get('risposta')

    if not domanda or not risposta:
        return jsonify({'message': 'Missing required fields: domanda and risposta'}), 400

    try:
        dataset_uuid = uuid.UUID(dataset_id) 
    except ValueError:
        return jsonify({'message': 'Invalid dataset ID format'}), 400

    dataset = DatasetModel.query.get(dataset_uuid)
    if not dataset:
        return jsonify({'message': f'Dataset {dataset_id} not found'}), 404

    new_qa = QAModel(
        id=uuid4(),
        domanda=domanda,
        risposta=risposta,
        dataset=dataset_id
    )

    try:
        db.session.add(new_qa)
        db.session.commit()
        return jsonify({
            'id': str(new_qa.id),
            'domanda': new_qa.domanda,
            'risposta': new_qa.risposta,
            'dataset': str(new_qa.dataset)
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error creating QA', 'error': str(e)}), 500



@app.route('/datasets/<dataset_id>/qas/<qa_id>', methods=['PUT'])
def update_qa(dataset_id, qa_id):
    try:
        dataset_uuid = uuid.UUID(dataset_id)
        qa_uuid = uuid.UUID(qa_id)
    except ValueError:
        return jsonify({'message': 'Invalid UUID format'}), 400

    dataset = DatasetModel.query.get(dataset_uuid)
    if not dataset:
        return jsonify({'message': f'Dataset {dataset_id} not found'}), 404

    qa = QAModel.query.get(qa_uuid)
    if not qa or qa.dataset != dataset_uuid:
        return jsonify({'message': f'QA {qa_id} not found in dataset {dataset_id}'}), 404

    data = request.get_json()
    if not data:
        return jsonify({'message': 'Missing JSON body'}), 400

    if 'domanda' in data:
        qa.domanda = data['domanda']
    if 'risposta' in data:
        qa.risposta = data['risposta']

    db.session.commit()

    return jsonify({
        'id': str(qa.id),
        'domanda': qa.domanda,
        'risposta': qa.risposta,
        'dataset': str(qa.dataset)
    }), 200



@app.route('/datasets/<dataset_id>/qas/<qa_id>', methods=['DELETE'])
def delete_qa(dataset_id, qa_id):
    try:
        dataset_uuid = uuid.UUID(dataset_id)
        qa_uuid = uuid.UUID(qa_id)
    except ValueError:
        return jsonify({'message': 'Invalid UUID format'}), 400

    dataset = DatasetModel.query.get(dataset_uuid)
    if not dataset:
        return jsonify({'message': f'Dataset {dataset_id} not found'}), 404

    qa = QAModel.query.get(qa_uuid)
    if not qa or qa.dataset != dataset_uuid:
        return jsonify({'message': f'QA {qa_id} not found in dataset {dataset_id}'}), 404

    # Elimina tutti i TestResult associati
    TestResultModel.query.filter_by(qa=qa_uuid).delete()

    db.session.delete(qa)
    db.session.commit()

    return jsonify({'message': f'QA {qa_id} deleted from dataset {dataset_id}'}), 200

    
if __name__ == '__main__':
    app.run(debug=True, port=5000)