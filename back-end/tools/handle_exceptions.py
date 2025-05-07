import functools
from flask import jsonify

def handle_exceptions(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        try:
            # Esegui il metodo originale
            return func(*args, **kwargs)
        except Exception as e:
            # Cattura ogni eccezione e restituisci JSON 400
            response = {"error": str(e)}
            return jsonify(response), 400
    return wrapper
