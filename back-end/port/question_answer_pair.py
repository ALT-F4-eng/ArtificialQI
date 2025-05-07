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