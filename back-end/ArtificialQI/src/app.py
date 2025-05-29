# app.py

import os
from routes.containers import Container
from flask import Flask, request, jsonify
from flask_cors import CORS
from uuid import uuid4

from src.db_config import db  # usa db separato
from src.models.dataset_model import DatasetModel  # importa solo il modello

app = Flask(__name__)
CORS(app)

# Config DB
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)  # inizializza db con l'app


# DI Container
container = Container()
container.wire(modules=["routes.dataset_route"])
setattr(app, "container", container)

DB_URL = os.environ.get("DB_URL")

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
            "first_save_date": str(last.first_save_date),
            "last_save_date": str(last.last_save_date),
            "origin": uuid4()
        }
    
if __name__ == '__main__':
    app.run(debug=True, port=5000)
