from flask import Blueprint, jsonify
from dependency_injector.wiring import inject, Provide
from routes.containers import Container
from adapter.inbound.dataset_service import DatasetService
from mapper.DatasetMapper import datasetList_to_datasetListDTO


dataset_bp = Blueprint('datasets', __name__)

@staticmethod
@dataset_bp.route("/datasets", methods=["GET"])
@inject
def get_all_datasets(dataset_service: DatasetService = Provide[Container.dataset_service]):
    dataset_list = dataset_service.get_all_datasets()
    datasets_list_dto = datasetList_to_datasetListDTO(dataset_list)
    return jsonify(datasets_list_dto), 200
    
