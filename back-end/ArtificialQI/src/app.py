# app.py

import os
from routes.containers import Container
from flask import Flask, jsonify
from sqlalchemy import create_engine, text
from src.db_config import db  # usa db separato
from src.models.dataset_model import DatasetModel  # importa solo il modello

app = Flask(__name__)

# Config DB
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)  # inizializza db con l'app


# DI Container
container = Container()
container.wire(modules=["routes.dataset_route"])
setattr(app, "container", container)

@app.route("/prova")
def hello_world():
    db_url = os.getenv("DB_URL")
    engine = create_engine(db_url)
    with engine.connect() as conn:
        results = [tuple(row) for row in conn.execute(text("SELECT * FROM Dataset")).fetchall()]
    return jsonify(results)

@app.route("/test-db")
def test_db():
    with app.app_context():  # richiesto da SQLAlchemy
        new_dataset = DatasetModel(nome="Dataset di test", is_tmp=True)
        db.session.add(new_dataset)
        db.session.commit()
        last = DatasetModel.query.order_by(DatasetModel.id.desc()).first()
        return {
            "id": last.id,
            "nome": last.nome,
            "is_tmp": last.is_tmp,
            "data_creazione": str(last.data_creazione),
            "data_ultima_modifica": str(last.data_ultima_modifica)
        }
