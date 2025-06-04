from os import environ

from flask import Flask
from entry_point.dataset_blueprint import dataset_bp
from entry_point.container import AppContainer
from common.exceptions import DatasetNonExsistentError, DuplicateNameDatasetError, PersistenceError
from flask_cors import CORS
from pydantic import ValidationError

def create_app():

    app = Flask(__name__)
    CORS(app)
    app.config.from_mapping(
        DB_URL=environ.get("DB_URL")
    )

    app.register_blueprint(dataset_bp) 

    container: AppContainer = AppContainer()
    app.container = container # type: ignore
    container.config.from_dict({"db_url": app.config.get("DB_URL")}) # type: ignore

        
    @app.errorhandler(DatasetNonExsistentError)
    def dataset_non_existent(e: Exception): # type: ignore
        return {
            "msg": str(e)
        }, 404

    @app.errorhandler(DuplicateNameDatasetError)
    def dataset_conflict(e: Exception): # type: ignore
        return {
            "msg": str(e)
        }, 409

    @app.errorhandler(PersistenceError)
    def persistence_error(e: Exception): # type: ignore
        return {
            "msg": str(e)
        }, 500

    @app.errorhandler(ValidationError)
    def validation_error(e: ValidationError): # type: ignore
        return {
            "msg": "La validazione dell'input è fallita"
        }, 400
    
    @app.errorhandler(ValueError)
    def value_error(e: Exception): # type: ignore
        return {
            "msg": str(e)
        }, 400


    return app