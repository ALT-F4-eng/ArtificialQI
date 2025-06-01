from dependency_injector.wiring import inject, Provide
from artificialqi.port.inbound.dataset_use_case import DatasetUseCase
from artificialqi.routes.containers import AppContainer
from flask import Blueprint, jsonify, request
from artificialqi.core.dataset import Dataset
from uuid import UUID
from typing import Optional
from artificialqi.models.dataset_dto import DatasetDTO
from artificialqi.mapper.dataset_mapper import DatasetDtoMapper
from artificialqi.mapper.dataset_list_mapper import DatasetListDtoMapper
from pydantic import ValidationError
from artificialqi.port.outbound.file_qa_reader import IQuestionAnswerFileReader


dataset_bp = Blueprint("datasets", __name__)

@dataset_bp.route("/datasets/<id>", methods=["GET"])
@inject
def get_dataset(id: str, dataset_service: DatasetUseCase = Provide[AppContainer.dataset_service]):
    to_get: UUID = UUID(id)

    res: Dataset = dataset_service.get_dataset_by_id(to_get)

    return DatasetDtoMapper.to_dto(res).model_dump_json()

@dataset_bp.route("/datasets/", methods=["GET"])
@inject
def get_all_dataset(dataset_service: DatasetUseCase = Provide[AppContainer.dataset_service]):
    
    q: Optional[str] = request.args.get('query')

    if q is None:
        q = ''
    
    res: list[Dataset] = dataset_service.get_all_datasets(q)

        
    return DatasetListDtoMapper.to_dto(res).model_dump_json()

@dataset_bp.route("/datasets/", methods=["POST"])
@inject
def create_dataset(dataset_service: DatasetUseCase = Provide[AppContainer.dataset_service]):
    
    try:
        dto: DatasetDTO = DatasetDTO.model_validate(request.json)
    
    except ValidationError as ex:
        raise ex
    
    if dto.tmp and not dto.origin_id:
        res: Dataset = dataset_service.create_dataset_tmp()
    else:
        res: Dataset = dataset_service.create_working_copy(dto.origin_id) 
        
    return DatasetDtoMapper.to_dto(res).model_dump_json()

@dataset_bp.route("/datasets/<id>", methods=["PUT"])
@inject
def update(id: str, dataset_service: DatasetUseCase = Provide[AppContainer.dataset_service], file_reader: IQuestionAnswerFileReader = Provide[AppContainer.file_reader]):
    try:
        dto: DatasetDTO = DatasetDTO.model_validate(request.json)
    
    except ValidationError as ex:
        raise ex  
    
    file = request.files["file"]

    if file.name:
        dataset_service.create_from_file(file.file, dto.name, file_reader)  
    else:

        if not dto.tmp:
            res: Dataset = dataset_service.update_dataset(dto.name, dto.id)
        elif dto.tmp and not dto.origin_id:
            res: Dataset = dataset_service.save_tmp(dto.id, dto.name)
        else:
            res: Dataset = dataset_service.save_working_copy(dto.id)
        
        
    return DatasetDtoMapper.to_dto(res).model_dump_json()

@dataset_bp.route("/datasets/<id>", methods=["DELETE"])
@inject
def delete_dataset(id: str, dataset_service: DatasetUseCase = Provide[AppContainer.dataset_service]):

    to_del: UUID = UUID(id)

    res: UUID = dataset_service.delete_dataset(to_del)

    return jsonify({'id': res})