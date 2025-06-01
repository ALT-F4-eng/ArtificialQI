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
    

    
if __name__ == '__main__':
    app.run(debug=True, port=5000)