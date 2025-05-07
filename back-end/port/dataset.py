from flask import Blueprint, request, jsonify
from flask.views import MethodView
from uuid import UUID
from tools.handle_exceptions import handle_exceptions

class Dataset(MethodView):

    def __init__(self, id:UUID = UUID(int=0), state:DatasetState = DatasetState(), dim:DatasetDimension = DatasetDimension()):#per essere condivise tra ogni istanza, togliere il "def __init__(self):"
        self.id:UUID = id
        self.state:DatasetState = state
        self.dim:DatasetDimension = dim

    def set_id(self, id:UUID):
        self.id = id
    
    def set_state(self, state:DatasetState):
        self.state = state
    
    def set_dim(self, dim:DatasetDimension):
        self.dim = dim

    @handle_exceptions
    def get_all_datasets(self):
        q = request.args.get('q', default='', type=str)
        datasetService:DatasetUseCase = datasetService()
        datasetList:list[Dataset] = datasetService.get_all_datasets(q)
        return DatasetListDtoMapper().to_dto(datasetList), 200

    @handle_exceptions
    def get_dataset(self, dataset_id:int):##############################
        datasetService:DatasetUseCase = datasetService()
        dataset:Dataset = datasetService.get_dataset_by_id(UUID(int=dataset_id))
        return DatasetDtoMapper().to_dto(dataset), 200
    
    @handle_exceptions
    def create_dataset(self):
        datasetDto = request.form['dataset']
        file = request.form['file']#CHE ME NE FACCIO
        copy = request.form['copy']#CHE ME NE FACCIO
        dataset:Dataset = DatasetDtoMapper().to_domain(datasetDto)
        datasetService:DatasetUseCase = datasetService()
        datasetService.create_dataset(dataset)
        return datasetDto, 200

    @handle_exceptions
    def update_dataset(self, dataset_id:int):
        datasetDto = request.form['dataset']
        datasetService:DatasetUseCase = datasetService()
        dataset:Dataset = datasetService.update_dataset(DatasetName(datasetDto['name']), UUID(int=datasetDto['name']))#NON NE HO IDEA DI DatasetName
        return DatasetDtoMapper(dataset).to_dto(dataset), 200
    
    @handle_exceptions
    def delete_dataset(self, dataset_id:int):
        return 200
    


"""
date le seguenti classi, scrivi un app in flask con architettura esagonale:

DatasetListDto:
-dataset_list:DatasetDto[0..*]

DatasetDto:
-id:uuid
-name:str
-last_mod:date
-first_save:date
-origin_id:uuid
-tmp:bool
-max_page:int
-element_n:int

DatasetListDtoMapper:
+to_dto(dataset:Dataset[0,..*]):DatasetListDto
+to_domain(dto:DatasetListDto):Dataset[0,..*]

DatasetDtoMapper:
+to_dto(dataset:Dataset):DatasetDto
+to_domain(dto:DatasetDto):Dataset

Dataset:
-id:uuid
-state:DatasetState
-dim:DatasetDimension

DatasetDimension:
-DIM:int

DatasetState:
+can_transist(s:DateState):bool

SaveState(DatasetState):
-NAME: DatasetName
-FIRST_SAVE_DATE: SaveDate
-LAST_SAVE_DATE: SaveDate

TemporaryState(DatasetState):

WorkingCopyState(DatasetState):
-ORIGIN: uuid

SaveDate:

DatasetName:
-NAME: str

DatasetUseCase:
+create_dataset(dataset:Dataset):Dataset
+copy_dataset(id:uuid):Dataset
+delete_dataset(id:uuid):uuid
+save_dataset(id:uuid):Dataset
+update_dataset(name:DatasetName, id:uuid):Dataset
+get_all_datasets(q:str=''):Dataset[0,..*]
+get_dataset_by_id(id:uuid):Dataset
+create_from_json(file:IO, name:DatasetName):Dataset

DatasetService(DatasetUseCase):
-dataset_repo:DatasetRepository
-qa_repo:QuestionAnswerPairRepo
-test_repo:TestRepo

DatasetRepository:
+delete_dataset(id:uuid):Dataset
+update_dataset(dataset:Dataset):Dataset
+create_dataset(dataset:Dataset):Dataset
+get_dataset(id:uuid):Dataset
+get_all_datasets(q:str=''):Dataset[0,..*]

SqlAlchemyDatasetAdapter(DatasetRepository):

I link da mappare sono riportati nel file pdf.
"""