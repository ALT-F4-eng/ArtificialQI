
from uuid import UUID

from pydantic import ValidationError
from flask import Blueprint
from core.dataset import Dataset
from port.inbound.dataset_use_case import DatasetUseCase
from entry_point.dto.dataset_update_dto import DatasetUpdateDto
from entry_point.dto.dataset_create_dto import DatasetCreateDto
from entry_point.dto.dataset_response_dto import DatasetResponseDto
from entry_point.dto.dataset_response_dto import DatasetResponseListDto
from dependency_injector.wiring import inject, Provide
from entry_point.container import AppContainer
from flask import request

dataset_bp = Blueprint("dataset", __name__)

@dataset_bp.route("/datasets/", methods=["GET"])
@inject
def get_all(service: DatasetUseCase = Provide[AppContainer.dataset_service]):

    return DatasetResponseListDto.to_dto(service.get_all()).model_dump()

@dataset_bp.route("/datasets/<uuid:id>", methods=["DELETE"])
@inject
def delete(id: UUID, service: DatasetUseCase = Provide[AppContainer.dataset_service]):
    return {"id": service.delete(id)}

@dataset_bp.route("/datasets/", methods=["POST"])
@inject
def create(service: DatasetUseCase = Provide[AppContainer.dataset_service]):
    try:
        dto: DatasetCreateDto = DatasetCreateDto.model_validate(request.json)
    except ValidationError as ex:
        raise ex

    return DatasetResponseDto.to_dto(service.create(dto.name)).model_dump()

@dataset_bp.route("/datasets/<uuid:id>", methods=["PUT"])
@inject
def update(id: UUID, service: DatasetUseCase = Provide[AppContainer.dataset_service]):

    try:
        dataset_dto: DatasetUpdateDto = DatasetUpdateDto.model_validate(request.json)
    except ValidationError as ex:
        raise ex
    
    to_update: Dataset = DatasetUpdateDto.to_domain(dataset_dto)

    return DatasetResponseDto.to_dto(service.update(to_update)).model_dump()
