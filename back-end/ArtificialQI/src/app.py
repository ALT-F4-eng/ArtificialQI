import os
from routes.containers import Container
from flask import Flask, jsonify
from sqlalchemy import create_engine, text
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Usa la variabile d'ambiente DB_URL
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

container = Container()
container.wire(modules=["routes.dataset_route"]) 
setattr(app, "container", container)

DB_URL = os.environ.get("DB_URL")

@app.route("/prova")
def hello_world():
    db_url = os.getenv("DB_URL")
    if db_url is None:
        raise ValueError("DATABASE_URL is not set")
    engine = create_engine(db_url)
    with engine.connect() as conn:
        results = [tuple(row) for row in conn.execute(text("SELECT * FROM PROVA")).fetchall()]
    return jsonify(results)
