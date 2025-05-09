import functools
from flask import jsonify

def handle_exceptions(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            response = {"error": str(e)}
            return jsonify(response), 400
    return wrapper
