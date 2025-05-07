from flask import Blueprint, request, jsonify
from flask.views import MethodView
from uuid import UUID
from tools.handle_exceptions import handle_exceptions

class QuestionAnswerPair(MethodView):

    def __init__(self, id:UUID = UUID(int=0), dataset:UUID = UUID(int=0), content:PairContent = PairContent()):#per essere condivise tra ogni istanza, togliere il "def __init__(self):"
        self.id:UUID = id
        self.dataset:UUID = dataset
        self.content:PairContent = content

    def set_id(self, id:UUID):
        self.id = id
    
    def set_dataset(self, dataset:UUID):
        self.dataset = dataset
    
    def set_content(self, content:PairContent):
        self.content = content
    
    @handle_exceptions
    def get_qa_page(self, dataset_id:int):
        page = request.args.get('page', default=1, type=int)
        q = request.args.get('q', default='', type=str)
        return 200
    
    @handle_exceptions
    def create_qa(self, dataset_id:int):
        QaDto = request.form['QaDTO']
        return 200
    
    @handle_exceptions
    def update_qa(self, dataset_id:int, qa_id:int):
        QaDto = request.form['QaDTO']
        return 200
    
    @handle_exceptions
    def delete_qa(self, dataset_id:int, qa_id:int):
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