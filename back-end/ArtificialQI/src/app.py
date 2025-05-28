import os
from routes.containers import Container
from flask import Flask, jsonify
from sqlalchemy import create_engine, text
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres:///mydatabase.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

container = Container()
container.wire(modules=["routes.dataset_route"]) 
setattr(app, "container", container)


@app.route("/prova")
def hello_world():


    engine = create_engine(DB_URL)
    with engine.connect() as conn:
        results = [
            tuple(row) for row in conn.execute(text("SELECT * FROM PROVA")).fetchall()
        ]
        return jsonify(results)
