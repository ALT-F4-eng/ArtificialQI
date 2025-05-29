import os
from routes.containers import Container
from flask import Flask, request, jsonify
from sqlalchemy import create_engine, text
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# Usa la variabile d'ambiente DB_URL
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

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


if __name__ == '__main__':
    app.run(debug=True, port=5000)
