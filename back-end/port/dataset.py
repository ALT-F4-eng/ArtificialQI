from flask import request, jsonify
from flask.views import MethodView
from uuid import UUID
from tools.handle_exceptions import handle_exceptions
from datetime import date
from models.dataset_use_case import DatasetUseCase
from components.dataset_dto_mapper import DatasetDtoMapper
from components.dataset_list_dto_mapper import DatasetListDtoMapper


class Dataset(MethodView):
    def __init__(self, id:UUID = UUID(int=0), dim:int = 0, name:str = '', first_save_date:date = date(), tmp:bool = False, origin:UUID = UUID(int=0)):#per essere condivise tra ogni istanza, togliere il "def __init__(self):"
        self.id:UUID = id
        self.dim:int = dim
        self.name:str = name
        self.first_save_date:date = first_save_date
        self.tmp:bool = tmp
        self.origin:UUID = origin
    
    def get_id(self) -> UUID:
        return self.id

    def get_dim(self) -> int:
        return self.dim

    def get_name(self) -> str:
        return self.name

    def get_first_save_date(self) -> date:
        return self.first_save_date

    def is_tmp(self) -> bool:
        return self.tmp

    def get_origin(self) -> UUID:
        return self.origin

    @handle_exceptions
    def get_all_datasets(self):
        q = request.args.get('q', default='', type=str)
        datasetService:DatasetUseCase = DatasetService()
        datasetList:list[Dataset] = datasetService.get_all_datasets(q)
        return jsonify(DatasetListDtoMapper().to_dto(datasetList)), 200

    @handle_exceptions
    def get_dataset(self, dataset_id:int):
        datasetService:DatasetUseCase = DatasetService()
        dataset:Dataset = datasetService.get_dataset_by_id(UUID(int=dataset_id))
        return jsonify(DatasetDtoMapper().to_dto(dataset)), 200
    
    @handle_exceptions
    def create_dataset(self):
        datasetDto = request.form['dataset']
        file = request.form['file']#CHE ME NE FACCIO
        copy = request.form['copy']#CHE ME NE FACCIO
        dataset:Dataset = DatasetDtoMapper().to_domain(datasetDto)
        datasetService:DatasetUseCase = DatasetService()
        datasetService.create_dataset(dataset)
        return jsonify(datasetDto), 200

    @handle_exceptions
    def update_dataset(self, dataset_id:int):
        datasetDto = request.form['dataset']
        datasetService:DatasetUseCase = DatasetService()
        dataset:Dataset = datasetService.update_dataset(datasetDto['name'], UUID(int=datasetDto['name']))
        return jsonify(DatasetDtoMapper(dataset).to_dto(dataset)), 200
    
    @handle_exceptions
    def delete_dataset(self, dataset_id:int):
        datasetService:DatasetUseCase = DatasetService()
        id:UUID = datasetService.delete_dataset(UUID(int=dataset_id))
        return jsonify({'id':id}), 200