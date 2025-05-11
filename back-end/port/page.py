from flask import request, jsonify
from uuid import UUID
from flask.views import MethodView
from tools.handle_exceptions import handle_exceptions
from tools.page_num import PageNum
from components.dataset_page_dto_mapper import DatasetPageDtoMapper
from models.qa_use_case import QaUseCase
from models.qa_service import QaService

class Page(MethodView):
    def __init__(self, n:int = 0, content:list = []):
        self.n:int = n
        self.content:list = content
    
    def get_n(self) -> int:
        return self.n
    
    def get_content(self) -> list:
        return self.content
    
    @handle_exceptions
    def get_qa_page(self, dataset_id:int):
        page = request.args.get('page', default=1, type=int)
        q = request.args.get('q', default='', type=str)
        qaService:QaUseCase = QaService()
        qaPage:Page = qaService.get_qa_page(PageNum(page), UUID(int=dataset_id), q)
        return jsonify(DatasetPageDtoMapper().to_dto(qaPage)), 200
    
