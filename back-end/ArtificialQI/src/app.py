from flask import Flask, jsonify
from sqlalchemy import create_engine, text
from flask_cors import CORS
import os 

DB_URL = os.environ['DB_URL']

app = Flask(__name__)
CORS(app)

@app.route("/prova")
def hello_world():
    engine = create_engine(DB_URL)
    with engine.connect() as conn:
        results = [tuple(row) for row in conn.execute(text("SELECT * FROM PROVA")).fetchall()]
        return jsonify(results)